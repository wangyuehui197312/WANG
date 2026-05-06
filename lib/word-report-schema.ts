import { z } from "zod";

export const wordReportSchema = z.object({
  inputWord: z.string().min(1),
  questionType: z.string(),
  basicMeaning: z.object({
    wordMeaning: z.string(),
    structure: z.string(),
    radical: z.string(),
    fiveElementHint: z.string(),
    tone: z.string()
  }),
  visibleAnalysis: z.array(
    z.object({
      title: z.string(),
      content: z.string()
    })
  ),
  traditionalView: z.object({
    summary: z.string(),
    positiveSigns: z.array(z.string()),
    reminders: z.array(z.string())
  }),
  modernExplanation: z.object({
    summary: z.string(),
    keyPoint: z.string(),
    risk: z.string(),
    opportunity: z.string()
  }),
  actionSuggestions: z.object({
    within3Days: z.array(z.string()),
    within30Days: z.array(z.string()),
    longTerm: z.array(z.string())
  }),
  score: z.object({
    clarity: z.number().min(0).max(20),
    stability: z.number().min(0).max(20),
    growthPotential: z.number().min(0).max(20),
    relationshipSupport: z.number().min(0).max(20),
    actionPower: z.number().min(0).max(20),
    total: z.number().min(0).max(100),
    reason: z.string()
  }),
  shortVideoScript: z.object({
    title: z.string(),
    script: z.string()
  }),
  socialPost: z.object({
    title: z.string(),
    content: z.string()
  }),
  gentleSummary: z.string()
});

export type WordAnalysisReport = z.infer<typeof wordReportSchema>;
