import { z } from "zod";

export const issueSchema = z.object({
  title: z.string(),
  level: z.enum(["轻微", "中等", "重点"]),
  visibleEvidence: z.string(),
  traditionalView: z.string(),
  modernExplanation: z.string(),
  suggestion: z.string()
});

export const reportSchema = z.object({
  imageType: z.string(),
  visibleEvidence: z.array(z.string()),
  uncertainParts: z.array(z.string()),
  goodPoints: z.array(
    z.object({
      title: z.string(),
      explanation: z.string()
    })
  ),
  issues: z.array(issueSchema),
  score: z.object({
    total: z.number().min(0).max(100),
    externalEnvironment: z.number().min(0).max(20),
    gateAndRoad: z.number().min(0).max(15),
    layoutAndCirculation: z.number().min(0).max(20),
    bedroomComfort: z.number().min(0).max(15),
    kitchenBathroom: z.number().min(0).max(15),
    lightingVentilationCleanliness: z.number().min(0).max(15),
    reason: z.string()
  }),
  adjustments: z.object({
    light: z.array(z.string()),
    medium: z.array(z.string()),
    major: z.array(z.string())
  }),
  contentAssets: z.object({
    shortVideoScript: z.string(),
    socialPost: z.string(),
    renovationChecklist: z.array(z.string()),
    simpleExplanation: z.string()
  }),
  summary: z.string()
});

export type FengshuiReport = z.infer<typeof reportSchema>;
