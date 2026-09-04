import type { Metadata } from "next";
import { Geist, Geist_Mono,Fraunces } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Waypoint",
  description: "Track your job search on one honest pipeline.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}  ${fraunces.variable} h-full antialiased`}
        style={{ colorScheme: "light" }}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}