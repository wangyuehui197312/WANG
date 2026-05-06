"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";
import ReportView from "@/components/ReportView";
import { FengshuiReport } from "@/lib/report-schema";

const imageTypeOptions = ["自动识别", "建筑外观", "户型图", "卧室", "客厅", "厨房", "卫生间", "庭院/大门", "道路/周边环境"];

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState("自动识别");
  const [extra, setExtra] = useState("");
  const [report, setReport] = useState<FengshuiReport | null>(null);
  const [loading, setLoading] = useState(false);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  async function analyze() {
    if (!file) return;
    setLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: base64, selectedType: imageType, extraInfo: extra, analysisMode: "建筑风水图片分析" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "分析失败");
      setReport(data);
    } catch {
      alert("分析失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f7f1e8] to-[#f2ece4]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="rounded-2xl border border-[#dccfbe] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#5d4736]">传统文化 AI 工具箱</h1>
          <p className="mt-3 text-[#6b5d4f]">融合传统文化参考与现代生活解释，提供温和、理性的智能分析工具。</p>
        </header>

        <section className="mt-6 rounded-2xl border border-[#dccfbe] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#5d4736]">工具入口</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-[#ddd2c6] bg-[#f9f5ef] p-4">
              <h3 className="font-semibold text-[#4f4032]">建筑风水图片分析器</h3>
              <p className="mt-1 text-sm text-[#7b6a58]">上传房屋、户型、卧室、大门图片，生成传统风水参考与现代居住建议。</p>
              <p className="mt-2 text-xs text-[#8a7b69]">本页下方可直接使用。</p>
            </article>
            <Link href="/word" className="rounded-xl border border-[#ddd2c6] bg-[#f9f5ef] p-4 block">
              <h3 className="font-semibold text-[#4f4032]">测字文化分析器</h3>
              <p className="mt-1 text-sm text-[#7b6a58]">输入一个汉字，结合字形、偏旁、谐音、拆字与现实问题，生成温和理性的文化解读。</p>
              <p className="mt-2 text-xs text-[#8a7b69]">点击进入 /word。</p>
            </Link>
          </div>
        </section>

        <section className="mt-6 space-y-4 rounded-2xl border border-[#d9cbbb] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#5d4736]">建筑风水图片分析器</h2>
          <ImageUploader previewUrl={previewUrl} onFileChange={(f) => { setFile(f); setReport(null); }} />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#4f4032]">图片类型选择</label>
              <select className="w-full rounded-lg border border-[#d7c8b7] p-2" value={imageType} onChange={(e) => setImageType(e.target.value)}>
                {imageTypeOptions.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#4f4032]">用户补充信息</label>
              <input
                className="w-full rounded-lg border border-[#d7c8b7] p-2"
                placeholder="房屋朝向、大门位置、楼层、最关心问题"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
              />
            </div>
          </div>
          <div className="no-print flex flex-wrap gap-3">
            <button disabled={!file || loading} onClick={analyze} className="rounded-lg bg-[#7d5c44] px-4 py-2 text-white disabled:opacity-50">
              {loading ? "正在分析图片，请稍候……" : "开始分析"}
            </button>
            {report && (
              <>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(report, null, 2))} className="rounded-lg border px-4 py-2">复制报告</button>
                <button onClick={() => window.print()} className="rounded-lg border px-4 py-2">打印报告</button>
                <button onClick={() => { setReport(null); setFile(null); setExtra(""); }} className="rounded-lg border px-4 py-2">重新上传</button>
              </>
            )}
          </div>
          {report && <ReportView report={report} />}
        </section>
      </div>
    </main>
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
