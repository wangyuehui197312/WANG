import { NextRequest, NextResponse } from "next/server";
import { fengshuiRules } from "@/rules/fengshui-rules";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";
import { reportSchema } from "@/lib/report-schema";

export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl, selectedType, extraInfo, analysisMode } = await req.json();
    if (!imageDataUrl) return NextResponse.json({ error: "缺少图片" }, { status: 400 });

    const client = getOpenAIClient();
    const model = getOpenAIModel();

    const systemPrompt = `你是一名“建筑空间与传统风水图像分析顾问”。
你需要根据用户上传图片进行建筑风水与现代居住舒适度分析。
必须遵守：
1. 风水仅作传统居住文化与现代空间体验参考。
2. 不做绝对吉凶断言，不恐吓。
3. 禁止使用“必破财、必生病、必出事、必离婚、必倒霉”等恐吓性表达。
4. 只根据可见信息判断，不能编造。
5. 看不清处必须写“图片信息不足，无法判断”。
6. 将传统说法转化为现代居住逻辑。
7. 语气稳重理性温和专业。
8. 必须给出可执行调整建议。
9. 仅输出 JSON，不要 markdown。`;

    const userPrompt = `请结合下列规则库与图片分析：\n${fengshuiRules}\n\n分析入口：${analysisMode}\n用户选择类型：${selectedType}\n用户补充信息：${extraInfo || "无"}\n\n评分规则：总分100（外部20/大门道路15/户型动线20/卧室15/厨卫15/采光通风整洁15）。如果仅局部图片，不要强行评价全屋，并在评分理由中说明“由于图片只显示局部空间，综合评分仅代表当前图片可见区域，不代表整套住宅。”\n\n输出 JSON 字段：
{
  imageType, visibleEvidence, uncertainParts, goodPoints, issues, score, adjustments,
  contentAssets: { shortVideoScript, socialPost, renovationChecklist, simpleExplanation },
  summary
}
其中 uncertainParts 至少包含一条，若信息清楚可写“当前关键区域基本可辨识，仍建议补充更多角度照片”。`;

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: userPrompt },
            { type: "image_url", image_url: { url: imageDataUrl } }
          ]
        }
      ]
    });

    const text = completion.choices[0]?.message?.content || "{}";
    const parsed = reportSchema.parse(JSON.parse(text));
    return NextResponse.json(parsed);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "服务异常";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
