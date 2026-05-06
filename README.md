# fengshui-image-analyzer / word-divination-analyzer

本项目包含两个温和理性的传统文化工具：

1. **建筑风水图片分析器**：上传房屋/户型/室内图，输出传统参考与现代居住建议。
2. **测字文化分析器**：输入一个汉字，结合字形、偏旁、谐音、拆字与现实问题，输出文化解读与行动建议。

## 如何配置 OpenAI API Key

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
OPENAI_API_KEY=your_key
OPENAI_MODEL=
```

- `OPENAI_API_KEY` 必填。
- `OPENAI_MODEL` 可选，不填走 `lib/openai.ts` 默认模型。

## 如何安装与运行

```bash
npm install
npm run dev
```

访问：
- 首页工具箱：`/`
- 测字文化分析器：`/word`

## 如何部署

### Vercel
1. 导入仓库。
2. 配置环境变量 `OPENAI_API_KEY`（以及可选 `OPENAI_MODEL`）。
3. Deploy。

### 其他 Node 环境

```bash
npm run build
npm run start
```

> 如未配置 `OPENAI_API_KEY`，调用 API 会失败，请先设置环境变量。

## 如何修改规则库

- 建筑图片规则：`rules/fengshui-rules.ts`
- 测字文化规则：`rules/word-analysis-rules.ts`

修改规则后，API 会自动读取最新内容。

## 安全表达原则

- 不恐吓。
- 不绝对预测。
- 不制造焦虑。
- 不宣称灵验。
- 只做传统文化解释与现实行动建议。
