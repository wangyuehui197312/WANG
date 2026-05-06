# fengshui-image-analyzer / word-divination-analyzer

这是一个“传统文化 AI 工具箱”项目，包含两个功能：

1. **建筑风水图片分析器**
   - 上传房屋、户型、卧室、大门图片，生成传统风水参考与现代居住建议。
2. **测字文化分析器**
   - 输入一个汉字，结合字形、偏旁、谐音、拆字与现实问题，生成温和理性的文化解读。

## 安装与运行

```bash
npm install
npm run dev
```

访问：
- 首页（传统文化 AI 工具箱）：`/`
- 测字文化分析器：`/word`

## 环境变量

```bash
cp .env.example .env.local
```

在 `.env.local` 中配置：

```env
OPENAI_API_KEY=your_key
OPENAI_MODEL=
```

- `OPENAI_API_KEY` 必填。
- `OPENAI_MODEL` 可选，不填时使用默认视觉模型。

## 部署

### Vercel
1. 导入仓库
2. 配置环境变量 `OPENAI_API_KEY`（可选 `OPENAI_MODEL`）
3. Deploy

### 其他 Node 环境

```bash
npm run build
npm run start
```

> 若未配置 `OPENAI_API_KEY`，相关 API 调用会失败。

## 规则库位置

- 建筑风水图片分析规则：`rules/fengshui-rules.ts`
- 测字文化分析规则：`rules/word-analysis-rules.ts`

## 安全表达原则

- 不恐吓
- 不绝对预测
- 不制造焦虑
- 不宣称灵验
- 只做传统文化解释与现实行动建议
