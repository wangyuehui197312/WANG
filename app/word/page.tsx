import WordAnalyzer from "@/components/WordAnalyzer";

export default function WordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f7f1e8] to-[#f2ece4]">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold text-[#5d4736]">测字文化分析器</h1>
        <p className="mt-2 text-[#6b5d4f]">输入一个汉字，结合传统测字文化、汉字结构、偏旁字义、谐音象意与现实行动建议，生成一份温和理性的文化解读报告。</p>
        <div className="mt-6"><WordAnalyzer /></div>
      </div>
    </main>
  );
}
