import { FengshuiReport } from "@/lib/report-schema";

const levelMap = {
  重点: { title: "重点关注", color: "border-rose-300 bg-rose-50" },
  中等: { title: "中度优化", color: "border-amber-300 bg-amber-50" },
  轻微: { title: "轻度调整", color: "border-sky-300 bg-sky-50" }
};

export default function ReportView({ report }: { report: FengshuiReport }) {
  return (
    <section className="space-y-6 rounded-2xl border border-[#d8cab8] bg-white p-6 shadow-sm">
      <header className="rounded-xl bg-gradient-to-r from-[#f5ede3] to-[#efe4d6] p-5">
        <p className="text-sm text-[#6d5a4a]">综合评分</p>
        <p className="text-5xl font-bold text-[#7a5a43]">{report.score.total}</p>
        <p className="mt-1 text-sm text-[#6d5a4a]">{report.score.reason}</p>
      </header>

      <Section title="图片识别结果" lines={[report.imageType]} />
      <Section title="可见信息" lines={report.visibleEvidence} />
      <Section title="传统风水参考" lines={report.issues.map((i) => `${i.title}：${i.traditionalView}`)} />
      <Section title="现代居住解释" lines={report.issues.map((i) => `${i.title}：${i.modernExplanation}`)} />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#3d3a36]">主要问题</h3>
        {(["重点", "中等", "轻微"] as const).map((lv) => {
          const issues = report.issues.filter((i) => i.level === lv);
          if (!issues.length) return null;
          return (
            <div key={lv}>
              <h4 className="mb-2 font-semibold text-[#3d3a36]">{levelMap[lv].title}</h4>
              <div className="space-y-3">
                {issues.map((issue, idx) => (
                  <article key={idx} className={`rounded-lg border p-4 ${levelMap[lv].color}`}>
                    <p className="font-semibold">{issue.title}</p>
                    <p className="text-sm">图片依据：{issue.visibleEvidence}</p>
                    <p className="mt-2 rounded bg-emerald-100 p-2 text-sm text-emerald-900">调整建议：{issue.suggestion}</p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Section title="轻度调整建议" lines={report.adjustments.light} tone="green" />
      <Section title="中度调整建议" lines={report.adjustments.medium} tone="green" />
      <Section title="重点调整建议" lines={report.adjustments.major} tone="green" />

      <Section title="一键生成：短视频口播文案" lines={[report.contentAssets.shortVideoScript]} />
      <Section title="一键生成：朋友圈文案" lines={[report.contentAssets.socialPost]} />
      <Section title="一键生成：装修调整清单" lines={report.contentAssets.renovationChecklist} />
      <Section title="一键生成：通俗解释" lines={[report.contentAssets.simpleExplanation]} />
      <Section title="温和总结" lines={[report.summary]} />

      <p className="border-t pt-4 text-xs text-[#6f6558]">
        本工具仅作为传统居住文化、空间心理、采光通风、动线安全与居住舒适度参考，不作绝对吉凶判断，不替代专业建筑、装修、消防、法律或医疗建议。
      </p>
    </section>
  );
}

function Section({ title, lines, tone = "neutral" }: { title: string; lines: string[]; tone?: "neutral" | "green" }) {
  const style = tone === "green" ? "bg-emerald-50 border-emerald-200" : "bg-[#faf7f2] border-[#e5dacd]";
  return (
    <div className={`rounded-lg border p-4 ${style}`}>
      <h3 className="mb-2 font-semibold text-[#3d3a36]">{title}</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-[#4b4742]">
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
