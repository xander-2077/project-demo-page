"""Local page server and fixed B2 + Z1 terminal launcher (standard library only)."""

import argparse
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
from pathlib import Path
import shlex
import shutil
import subprocess
from urllib.parse import urlsplit


PAGE_DIR = Path(__file__).resolve().parent
ROBOT_DIR = Path.home() / "Code/Deploy/Z1/z1_control_dds"
COMMAND = ["bash", "scripts/start_teleop_tmux.sh", "--skip-service",
           "--mode", "live", "--b2-interface", "enp110s0", "--record"]


def launch_b2z1():
    if not (ROBOT_DIR / COMMAND[1]).is_file():
        raise RuntimeError(f"脚本不存在：{ROBOT_DIR / COMMAND[1]}")
    if not (os.environ.get("DISPLAY") or os.environ.get("WAYLAND_DISPLAY")):
        raise RuntimeError("未检测到桌面会话，请在本机桌面终端运行 python3 server.py。")

    # Keep script errors visible after tmux exits or startup fails.
    body = shlex.join(COMMAND) + '; status=$?; printf "\\n脚本已退出（%s），按回车关闭终端。" "$status"; read -r _'
    for name, separator in [("gnome-terminal", "--"), ("konsole", "-e"),
                            ("xfce4-terminal", "-x"), ("xterm", "-e")]:
        executable = shutil.which(name)
        if executable:
            break
    else:
        raise RuntimeError("未找到终端，请安装 gnome-terminal 或 xterm。")

    # GNOME Terminal delegates the window to its desktop process and returns.
    # Other terminals stay attached: launch them without blocking the HTTP server.
    argv = [executable, separator, "bash", "-c", body]
    if name == "gnome-terminal":
        result = subprocess.run(argv, cwd=ROBOT_DIR, capture_output=True, text=True, timeout=15)
        if result.returncode:
            raise RuntimeError(result.stderr.strip() or "终端启动失败。")
    else:
        process = subprocess.Popen(argv, cwd=ROBOT_DIR, start_new_session=True)
        # Reap the terminal when it closes without blocking subsequent requests.
        import threading
        threading.Thread(target=process.wait, daemon=True).start()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PAGE_DIR), **kwargs)

    def allowed_host(self):
        port = self.server.server_port
        return self.headers.get("Host") in {f"127.0.0.1:{port}", f"localhost:{port}"}

    def send_json(self, status, message):
        body = json.dumps({"ok": status == 200, "message": message}, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if not self.allowed_host() or self.headers.get("Origin") != f"http://{self.headers.get('Host')}" or self.headers.get("X-Teleop-Launch") != "1":
            self.send_json(403, "请从本地启动服务的页面操作。")
            return
        if self.path != "/api/launch/b2z1":
            self.send_json(404, "未配置此启动入口。")
            return
        try:
            launch_b2z1()
        except (RuntimeError, OSError, subprocess.SubprocessError) as error:
            self.send_json(500, str(error))
            return
        self.send_json(200, "已请求打开 B2 + Z1 遥操终端，请在终端查看启动结果。")

    def send_head(self):
        if not self.allowed_host():
            self.send_error(403)
            return None
        if urlsplit(self.path).path not in {"/", "/index.html", "/app.js", "/styles.css"}:
            self.send_error(404)
            return None
        return super().send_head()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()
    with HTTPServer(("127.0.0.1", args.port), Handler) as httpd:
        print(f"遥操入口：http://127.0.0.1:{httpd.server_port}", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
