import type { Metadata } from "next";
import { TopNav } from "@/components/layout/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI for Normies — The AI concepts you actually need, explained without the jargon",
  description:
    "A reference for PMs, designers, marketers, and anyone building with AI who didn't study CS. MCP, RAG, Evals, Agents — demystified.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
