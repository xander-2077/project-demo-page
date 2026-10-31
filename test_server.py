import http.client
import json
from pathlib import Path
import tempfile
import threading
import unittest
from unittest.mock import patch

import server


class LaunchTests(unittest.TestCase):
    def test_launch_uses_requested_directory_and_arguments(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "scripts").mkdir()
            (root / "scripts/start_teleop_tmux.sh").write_text("exit 0\n")
            with patch.object(server, "ROBOT_DIR", root), \
                 patch.dict("os.environ", {"DISPLAY": ":0"}), \
                 patch("server.shutil.which", return_value="/usr/bin/gnome-terminal"), \
                 patch("server.subprocess.run") as run:
                run.return_value.returncode = 0
                server.launch_b2z1()
            args, kwargs = run.call_args
            self.assertEqual(kwargs["cwd"], root)
            self.assertEqual(args[0][:4], ["/usr/bin/gnome-terminal", "--", "bash", "-c"])
            self.assertIn("bash scripts/start_teleop_tmux.sh --skip-service --mode live --b2-interface enp110s0", args[0][4])

    def test_missing_script_is_reported(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(server, "ROBOT_DIR", Path(directory)):
            with self.assertRaisesRegex(RuntimeError, "脚本不存在"):
                server.launch_b2z1()


class HttpTests(unittest.TestCase):
    def setUp(self):
        self.httpd = server.HTTPServer(("127.0.0.1", 0), server.Handler)
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()
        self.origin = f"http://127.0.0.1:{self.httpd.server_port}"

    def tearDown(self):
        self.httpd.shutdown()
        self.httpd.server_close()
        self.thread.join()

    def request(self, method, path, origin=None):
        connection = http.client.HTTPConnection("127.0.0.1", self.httpd.server_port)
        headers = {"Origin": origin or self.origin, "X-Teleop-Launch": "1"}
        connection.request(method, path, headers=headers)
        response = connection.getresponse()
        result = response.status, response.read()
        connection.close()
        return result

    def test_launch_endpoint_returns_result(self):
        with patch("server.launch_b2z1") as launch:
            status, body = self.request("POST", "/api/launch/b2z1")
            self.assertEqual(status, 200)
            self.assertTrue(json.loads(body)["ok"])
            launch.assert_called_once_with()

    def test_launch_error_reaches_browser(self):
        with patch("server.launch_b2z1", side_effect=RuntimeError("终端启动失败")):
            status, body = self.request("POST", "/api/launch/b2z1")
            self.assertEqual(status, 500)
            self.assertEqual(json.loads(body)["message"], "终端启动失败")

    def test_foreign_origin_and_unknown_route_do_not_launch(self):
        with patch("server.launch_b2z1") as launch:
            self.assertEqual(self.request("POST", "/api/launch/b2z1", "https://example.com")[0], 403)
            self.assertEqual(self.request("POST", "/api/launch/g1")[0], 404)
            self.assertEqual(self.request("GET", "/api/launch/b2z1")[0], 404)
            launch.assert_not_called()

    def test_only_page_assets_are_served(self):
        self.assertEqual(self.request("GET", "/")[0], 200)
        self.assertEqual(self.request("GET", "/app.js?v=test")[0], 200)
        self.assertEqual(self.request("GET", "/.git/config")[0], 404)


if __name__ == "__main__":
    unittest.main()
