import type { Metadata } from "next";
import TopNav from "./components/top-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Designated",
  description: "A Next.js app inside an npm monorepo."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
