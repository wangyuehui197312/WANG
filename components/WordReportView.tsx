import { WordAnalysisReport } from "@/lib/word-report-schema";

export default function WordReportView({ report }: { report: WordAnalysisReport }) {
  return (
    <section className="space-y-4 rounded-2xl border border-[#d8cab8] bg-white p-5">
      <div className="rounded-xl bg-[#f7efe4] p-4">
        <p className="text-sm text-[#6d5a4a]">输入汉字</p>
        <p className="text-5xl font-bold text-[#6d4f38]">{report.inputWord}</p>
        <p className="mt-1 text-sm">问题方向：{report.questionType}</p>
        <p className="mt-1 text-sm">综合参考分：{report.score.total}</p>
        <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-900">温和文化参考，不作绝对预测</span>
      </div>

      <Card title="这个字的基本信息">
        <Item k="字义" v={report.basicMeaning.wordMeaning} />
        <Item k="结构" v={report.basicMeaning.structure} />
        <Item k="偏旁" v={report.basicMeaning.radical} />
        <Item k="五行象意" v={report.basicMeaning.fiveElementHint} />
        <Item k="整体气质" v={report.basicMeaning.tone} />
      </Card>

      <Card title="测字文化分析">
        {report.visibleAnalysis.map((a, i) => <Item key={i} k={a.title} v={a.content} />)}
      </Card>

      <Card title="传统文化参考">
        <Item k="总体参考" v={report.traditionalView.summary} />
        <List k="积极象意" arr={report.traditionalView.positiveSigns} />
        <List k="需要提醒的地方" arr={report.traditionalView.reminders} />
      </Card>

      <Card title="现代现实解释">
        <Item k="总结" v={report.modernExplanation.summary} />
        <Item k="核心问题" v={report.modernExplanation.keyPoint} />
        <Item k="风险" v={report.modernExplanation.risk} />
        <Item k="机会" v={report.modernExplanation.opportunity} />
      </Card>

      <Card title="行动建议">
        <List k="3天内行动" arr={report.actionSuggestions.within3Days} />
        <List k="30天内行动" arr={report.actionSuggestions.within30Days} />
        <List k="长期建议" arr={report.actionSuggestions.longTerm} />
      </Card>

      <Card title="一键生成内容">
        <Item k={report.shortVideoScript.title} v={report.shortVideoScript.script} />
        <Item k={report.socialPost.title} v={report.socialPost.content} />
      </Card>

      <Card title="温和总结">
        <p>{report.gentleSummary}</p>
      </Card>

      <p className="text-xs text-[#6f6558]">本工具仅用于传统测字文化、汉字象意与自我反思参考，不作绝对预测，不替代法律、医疗、心理、财务等专业建议。真正结果取决于个人选择、行动、环境与长期积累。</p>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-[#e7dbc9] bg-[#fdfaf5] p-4"><h3 className="mb-2 font-semibold">{title}</h3>{children}</div>;
}

function Item({ k, v }: { k: string; v: string }) {
  return <p className="mb-1 text-sm"><span className="font-medium">{k}：</span>{v}</p>;
}

function List({ k, arr }: { k: string; arr: string[] }) {
  return <div className="mb-2 text-sm"><p className="font-medium">{k}：</p><ul className="list-disc pl-5">{arr.map((a, i) => <li key={i}>{a}</li>)}</ul></div>;
}
