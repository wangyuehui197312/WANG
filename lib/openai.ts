import OpenAI from "openai";

export const DEFAULT_VISION_MODEL = "gpt-4.1-mini";

export function getOpenAIModel() {
  return process.env.OPENAI_MODEL || DEFAULT_VISION_MODEL;
}

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("缺少 OPENAI_API_KEY 环境变量");
  }
  return new OpenAI({ apiKey });
}
