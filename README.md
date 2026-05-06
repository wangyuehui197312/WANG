# fengshui-image-analyzer

一个“建筑风水图片分析生成器”网页应用：把传统风水图解规则转化为现代、温和、理性的居住舒适度建议。

## 如何安装

```bash
npm install
```

## 如何配置 OPENAI_API_KEY

1. 复制环境变量模板：

```bash
cp .env.example .env.local
```

2. 编辑 `.env.local`：

```env
OPENAI_API_KEY=你的OpenAI密钥
OPENAI_MODEL=
```

- `OPENAI_API_KEY` 必填。
- `OPENAI_MODEL` 可选；留空时使用 `lib/openai.ts` 里的默认视觉模型。

## 如何启动

```bash
npm run dev
```

访问：`http://localhost:3000`

## 如何部署

### Vercel（推荐）

1. 推送代码到 GitHub。
2. 在 Vercel 导入该仓库。
3. 在 Vercel Project Settings > Environment Variables 设置：
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`（可选）
4. 点击 Deploy。

### 其他 Node 环境

```bash
npm run build
npm run start
```

并确保服务器环境已设置同名环境变量。

## 如何修改风水规则库

风水规则集中在：`rules/fengshui-rules.ts`

- 你可以按分类（外部环境/大门道路/户型结构/卧室/厨卫/客厅）增加、删除或细化规则。
- 修改后无需改前端，接口会自动读取最新规则并参与分析。

## 使用说明

1. 选择功能入口（建筑风水图片分析 / 户型图风水分析 / 卧室床位布局分析）。
2. 上传 JPG/PNG/WEBP 图片并预览。
3. 选择图片类型，填写补充信息。
4. 点击“开始分析”。
5. 获取结构化报告与一键生成内容（口播文案、朋友圈文案、装修清单、通俗解释）。

## 输出安全原则

- 不允许恐吓性表达（如“必破财、必生病、必出事”等）。
- 图片看不清时必须写明“图片信息不足，无法判断”。
- 仅基于可见信息分析，不编造不可见细节。

## 可扩展方向

- 多图联合分析
- 导出 PDF
- 家装优化方案细化
- 历史报告存档
- 学校/商铺/办公室模式
