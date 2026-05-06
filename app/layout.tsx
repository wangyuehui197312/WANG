import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "建筑风水图片分析生成器",
  description: "传统风水参考与现代居住舒适度分析"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
