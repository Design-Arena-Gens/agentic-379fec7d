import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobile Arena Targeting Lab",
  description: "Experiment with arena matchmaking and targeting strategies for mobile esports experiences."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`}>{children}</body>
    </html>
  );
}
