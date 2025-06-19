---
title: 建站日志Day1
date: 2025-06-19 14:35:55
tags:
  - Hexo
  - Git
  - Netlify
categories:
  - 建站日志
---

## 建站Day1日志

<!-- toc -->
---

### **阶段一：环境准备**

*目的：在本地计算机上安装所有必需的基础软件。*

**安装 Git**
- **用途**：版本控制（如时光机）和代码推送（如传送带）。
- **操作**：从 `git-scm.com` 下载并安装。安装过程中，根据建议的关键配置包括：
    - 默认编辑器: `Visual Studio Code`
    - SSH 工具: `Use bundled OpenSSH`
    - HTTPS 库: `Use the OpenSSL library`
    - 换行符: `Checkout Windows-style, commit Unix-style`
    - 终端: `Use MinTTY`

**安装 Node.js**
- **用途**：为 Hexo 提供必要的 JavaScript 运行环境。
- **操作**：从 `nodejs.org` 下载并安装 LTS (长期支持) 版本。

**安装 Hexo 命令行工具**
- **用途**：安装 Hexo 的全局命令，以便在系统任何位置创建和管理博客。
- **指令**：
    ```bash
    npm install -g hexo-cli
    ```
- **指令详解**：
    - **`npm`**: Node Package Manager (Node包管理器)，是 Node.js 自带的“应用商店”和“包管理工具”。
    - **`install`**: 安装指令。
    - **`-g`**: `--global` 的缩写，代表“全局安装”，使 `hexo` 命令在系统任何路径下都可用。
    - **`hexo-cli`**: 需要安装的软件包的精确名称，即“Hexo 命令行界面工具”。
    - **注**：指令的选项有简写（如 `-g`）和全称（如 `--global`）之分。软件包的名称（如 `hexo-cli`）是唯一的标识符，不能用描述性文字代替。

---

### **阶段二：本地博客创建**

*目的：在本地计算机上生成初始的博客项目文件。*

**切换工作磁盘**
- **用途**：进入希望存放项目的 D 盘。
- **指令**：`D:`

**初始化博客项目**
- **用途**：使用 `hexo` 命令，创建一个名为 `my-blog` 的新文件夹，并填入所有必需的博客基础文件。
- **指令**：`hexo init my-blog`
- **遇到的问题**：`EPERM` 权限错误。
- **解决方案**：以管理员身份运行 CMD 终端后成功执行。

**进入项目目录**
- **用途**：将命令行的当前位置移动到新建的博客文件夹内部。
- **指令**：`cd my-blog`
- **指令详解**：
    - **`cd`**: **C**hange **D**irectory (改变目录) 的缩写，是所有命令行通用的基础指令，用于在文件夹之间移动。

---

### **阶段三：连接 GitHub**

*目的：将本地项目与云端 GitHub 仓库关联，并完成第一次代码同步。*

**配置 Git 用户身份**
- **用途**：为每一次 `commit` 设置作者签名。
- **遇到的问题**：`Author identity unknown` 错误。
- **解决方案指令**：
    ```bash
    # 将 "Your Name" 替换为你的名字
    git config --global user.name "Your Name"
    # 将 "you@example.com" 替换为你的 GitHub 邮箱
    git config --global user.email "you@example.com"
    ```

**添加文件到暂存区**
- **用途**：告诉 Git，希望将哪些文件的改动纳入下一次的“快照”中。
- **指令**：`git add .`
- **指令详解**：
    - `.` (点)：代表“当前目录下的所有文件和文件夹”。`git add .` 即暂存所有改动。

**创建提交（快照）**
- **用途**：正式为暂存区的所有改动，在本地创建一条不可变的“历史存档记录”。
- **指令**：`git commit -m "First commit: My blog is ready!"`
- **指令详解**：
    - **`commit`** 是将文件快照保存到**本地仓库**的操作。
    - **`-m`** 是 `--message` 的缩写，允许直接在命令行中添加本次提交的说明信息。

**关联远程仓库**
- **用途**：为本地仓库指定一个名为 `origin` 的云端地址（即 GitHub 仓库地址）。
- **遇到的问题**：`remote origin already exists` 错误，且地址不正确。
- **解决方案指令**：
    ```bash
    git remote remove origin
    git remote add origin [https://github.com/SouNdmys/SouNd.github.io.git](https://github.com/SouNdmys/SouNd.github.io.git)
    ```

**推送到远程仓库**
- **用途**：将本地的所有提交（commits）一次性上传到 GitHub 云端。
- **指令**：`git push -u origin master`
- **结果**：成功，本地与远程仓库完成同步。

---

### **阶段四：部署到 Netlify**

*目的：利用 Netlify 的自动化服务，将 GitHub 仓库里的代码构建成一个公开的网站。*

- **连接仓库**：在 Netlify 网站上，授权并选择了 `SouNd.github.io` 仓库。
- **解决部署失败问题**：
    - **遇到的问题**：404 错误、`Initializing: Failed`、`Deploy directory 'public' does not exist`。
    - **原因分析**：发布目录、Node.js 版本、构建命令三项配置不正确。
    - **解决方案**：在 Netlify 的 `Build & deploy` 设置中，进行了以下修改：
        - **环境变量**: `NODE_VERSION` 设置为 `18`。
        - **构建命令**: `hexo generate`
        - **发布目录**: `public`
- **触发部署**：在 Netlify 手动触发了一次新的部署，最终成功。

---

### **阶段五：绑定个人域名**

*目的：为网站启用个人专属域名。*

- **购买域名**：在 Porkbun 注册了域名 `insound.blog`，并开启了 WHOIS 隐私保护。
- **配置域名**：在 Netlify 添加了 `insound.blog`，并从 Netlify 获取了 4 个域名服务器(Nameservers)地址。
- **修改域名服务器**：登录 Porkbun，将域名的 Nameservers 修改为 Netlify 提供的地址，将域名的解析管理权正式移交给 Netlify。
- **等待 DNS 传播**：等待全球网络同步新的设置，在 Netlify 面板看到 `Preparing your domain...` 的状态。