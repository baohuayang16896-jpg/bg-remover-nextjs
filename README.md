# AI背景移除工具 (Next.js版)

基于 Next.js + Tailwind CSS + Remove.bg API 的在线图片背景移除工具。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **API**: Remove.bg

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`:

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`，填入你的 Remove.bg API Key:

```
REMOVEBG_API_KEY=your_api_key_here
```

获取 API Key: https://www.remove.bg/api

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 功能特点

- ✅ 拖拽上传图片
- ✅ 一键去除背景
- ✅ 原图对比预览
- ✅ 下载透明背景图
- ✅ 响应式设计
- ✅ TypeScript 类型安全

## 部署

### Vercel (推荐)

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 添加环境变量 `REMOVEBG_API_KEY`
4. 部署完成

### 其他平台

支持任何支持 Next.js 的平台（Netlify、Railway 等）

## 项目结构

```
bg-remover-nextjs/
├── app/
│   ├── api/remove-bg/
│   │   └── route.ts          # API 路由
│   ├── page.tsx               # 主页面
│   └── layout.tsx
├── components/
│   ├── ImageUpload.tsx        # 上传组件
│   ├── ImageResult.tsx        # 结果展示
│   └── LoadingSpinner.tsx     # 加载动画
└── .env.local.example         # 环境变量示例
```

## License

MIT
