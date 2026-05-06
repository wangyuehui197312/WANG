"use client";

import { useState } from "react";
import WordReportView from "./WordReportView";
import { WordAnalysisReport } from "@/lib/word-report-schema";

const questionTypes = ["综合分析", "学业成长", "事业工作", "财富经营", "家庭关系", "感情婚恋", "人际合作", "近期选择", "自我成长", "其他"];

export default function WordAnalyzer() {
  const [inputWord, setInputWord] = useState("");
  const [questionType, setQuestionType] = useState(questionTypes[0]);
  const [questionDetail, setQuestionDetail] = useState("");
  const [report, setReport] = useState<WordAnalysisReport | null>(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!inputWord.trim()) return;
    setLoading(true);
    setNotice("");
    try {
      const res = await fetch("/api/word-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputWord, questionType, questionDetail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.multiWord) {
        setNotice("已自动取第一个汉字进行分析，建议一次输入一个字。");
      }
      setReport(data.report);
    } catch {
      setNotice("分析暂时失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[#d8cab8] bg-white p-5 shadow-sm">
      <input value={inputWord} onChange={(e) => setInputWord(e.target.value)} placeholder="请输入一个想测的汉字，例如：安、财、学、成、路、家、明、困、变、稳。" className="w-full rounded-lg border p-3" />
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="w-full rounded-lg border p-3">
        {questionTypes.map((q) => <option key={q}>{q}</option>)}
      </select>
      <textarea value={questionDetail} onChange={(e) => setQuestionDetail(e.target.value)} placeholder="可以简单写下你关心的问题，例如：我想知道最近做这个项目是否顺利。" className="h-28 w-full rounded-lg border p-3" />
      <div className="flex flex-wrap gap-3">
        <button disabled={!inputWord.trim() || loading} onClick={handleAnalyze} className="rounded-lg bg-[#7d5c44] px-4 py-2 text-white disabled:opacity-50">{loading ? "正在结合汉字结构与传统测字文化生成报告，请稍候……" : "开始测字文化分析"}</button>
        {report && (
          <>
            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(report, null, 2))} className="rounded-lg border px-4 py-2">复制报告</button>
            <button onClick={() => navigator.clipboard.writeText(`${report.shortVideoScript.title}\n${report.shortVideoScript.script}`)} className="rounded-lg border px-4 py-2">生成短视频口播版</button>
            <button onClick={() => navigator.clipboard.writeText(`${report.socialPost.title}\n${report.socialPost.content}`)} className="rounded-lg border px-4 py-2">生成朋友圈文案</button>
            <button onClick={() => { setReport(null); setInputWord(""); setQuestionDetail(""); setNotice(""); }} className="rounded-lg border px-4 py-2">重新分析</button>
          </>
        )}
      </div>
      {notice && <p className="rounded bg-amber-50 p-2 text-sm text-amber-900">{notice}</p>}
      {report && <WordReportView report={report} />}
    </section>
  );
}
