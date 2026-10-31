# 遥操入口页面

Claude 风格的遥操入口，展示 G1、B2 + Z1 两个机器人系列。启动服务仅使用 Python 3 标准库，无需安装依赖。

在仓库根目录启动：

```bash
python3 server.py
```

在运行机器人脚本的本机桌面终端启动服务，浏览器访问 **http://127.0.0.1:8080**。端口可通过 `python3 server.py --port 8081` 修改。直接打开 `index.html` 或使用普通静态服务器只能展示页面，不能启动脚本。

- 两张机器人入口卡片，包含风格化 SVG 插画。
- 点击 B2 + Z1 的「进入遥操」打开本机终端，执行下方命令；启动请求成功后保存最近选择。
- G1 仍支持查看并选择机器人，最近选择保存到当前浏览器。
- 支持移动端布局、键盘操作及系统减少动画设置。
- 插画不是设备技术模型。B2 + Z1 使用 live 模式，脚本会连接真机，实际启动状态和错误请查看打开的终端。

按钮执行的固定命令：

```bash
cd ~/Code/Deploy/Z1/z1_control_dds
bash scripts/start_teleop_tmux.sh --skip-service --mode live --b2-interface enp110s0
```

需要桌面会话及终端（优先使用 gnome-terminal，也支持 konsole、xfce4-terminal、xterm）。脚本自身负责检查 tmux、机器人环境和网卡；重复启动已有会话会在终端报错。终端退出 tmux 或脚本失败后会保留输出，按回车关闭。停止遥操请先在 receiver 窗格按 Ctrl+C；关闭网页或停止页面服务不会停止遥操。

`index.html` 为页面结构，`styles.css` 为样式，`app.js` 为交互逻辑，`server.py` 为本地启动服务。服务仅绑定 `127.0.0.1`，只允许同源页面请求固定命令，不接收网页传入的 shell 命令。

验证（不会启动真机，终端进程调用由测试替代）：

```bash
python3 -m unittest -v
node --check app.js
```

修改样式或脚本并发布时，同步更新 `index.html` 中两个资源 URL 的 `v` 版本号，避免浏览器沿用旧缓存。如果已经打开的页面仍显示旧内容，可按 `⌘⇧R`（macOS）或 `Ctrl+Shift+R` 强制刷新。
