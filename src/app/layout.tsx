import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { AppShell } from "@/components/ui/app-shell";
import { getAllUsers } from "@/features/social";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Hub — Creator Reputation Layer",
  description: "Where creative know-how becomes verified currency",
};

const themeScript = `(function(){try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const users = getAllUsers();

  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <AppShell users={users}>{children}</AppShell>
      </body>
    </html>
  );
}
