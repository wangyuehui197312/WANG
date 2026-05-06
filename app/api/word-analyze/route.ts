import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";
import { wordAnalysisRules } from "@/rules/word-analysis-rules";
import { wordReportSchema } from "@/lib/word-report-schema";

const singleHanRegex = /[\u4e00-\u9fff]/;

export async function POST(req: NextRequest) {
  try {
    const { inputWord, questionType, questionDetail } = await req.json();
    if (!inputWord || typeof inputWord !== "string") {
      return NextResponse.json({ error: "请输入一个汉字" }, { status: 400 });
    }

    const firstChar = Array.from(inputWord).find((ch) => singleHanRegex.test(ch));
    if (!firstChar) {
      return NextResponse.json({ error: "输入内容不是有效汉字，暂时无法分析。" }, { status: 400 });
    }

    const client = getOpenAIClient();
    const model = getOpenAIModel();

    const systemPrompt = `你是一名“传统测字文化与汉字象意分析顾问”。
你需要根据用户输入的一个汉字、问题方向和补充问题，生成一份传统测字文化解读报告。
你必须遵守：
1. 只做传统文化解释，不做绝对命运预测。
2. 不说“必定发财、必定倒霉、必有灾、必离婚、必生病、必死亡”等绝对化、恐吓性语言。
3. 使用温和表达，如“从传统测字文化看”“可以理解为”“提醒你注意”。
4. 必须把传统象意转化为现实建议。
5. 必须强调：结果仅供文化参考，真正结果取决于人的选择、行动、环境与长期积累。
6. 如果用户输入不是汉字，要提示无法分析。
7. 如果输入多个字，只分析第一个汉字，并提醒最好一次输入一个字。
8. 不要编造古籍原文，不要声称某大师秘法。
9. 不要生成符咒、法术、诅咒或伤害他人的内容。
10. 语气稳重、温和、有文化感，不玄乎吓人。
11. 仅输出 JSON。`;

    const userPrompt = `规则库：\n${wordAnalysisRules}\n\n用户输入：${inputWord}\n实际分析汉字：${firstChar}\n问题方向：${questionType}\n补充问题：${questionDetail || "无"}\n\n请输出 JSON：
{
  "inputWord":"",
  "questionType":"",
  "basicMeaning":{"wordMeaning":"","structure":"","radical":"","fiveElementHint":"","tone":""},
  "visibleAnalysis":[{"title":"字形观察","content":""},{"title":"偏旁象意","content":""},{"title":"拆字联想","content":""},{"title":"谐音与语义","content":""}],
  "traditionalView":{"summary":"","positiveSigns":[""],"reminders":[""]},
  "modernExplanation":{"summary":"","keyPoint":"","risk":"","opportunity":""},
  "actionSuggestions":{"within3Days":[""],"within30Days":[""],"longTerm":[""]},
  "score":{"clarity":0,"stability":0,"growthPotential":0,"relationshipSupport":0,"actionPower":0,"total":0,"reason":""},
  "shortVideoScript":{"title":"","script":""},
  "socialPost":{"title":"","content":""},
  "gentleSummary":""
}`;

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const parsed = wordReportSchema.parse(JSON.parse(content));
    return NextResponse.json({ report: parsed, analyzedWord: firstChar, multiWord: inputWord.trim().length > 1 });
  } catch {
    return NextResponse.json({ error: "分析暂时失败，请稍后重试。" }, { status: 500 });
  }
}
