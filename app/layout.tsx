import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";


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
  metadataBase: new URL("https://waypoint.mecoding4fun.com"),
  title: "Waypoint — Track your job search on one honest pipeline",
  description:
    "Waypoint turns your scattered job search into one visible pipeline. Track applications, interviews, and offers in one place — free, no signup friction.",
  keywords: ["job application tracker", "job search tracker", "interview tracker", "job hunting tool"],
  openGraph: {
    title: "Waypoint — Track your job search on one honest pipeline",
    description:
      "Every application, on one honest map. Track applications, interviews, and offers in one place.",
    url: "https://waypoint.mecoding4fun.com",
    siteName: "Waypoint",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Waypoint job application tracker dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waypoint — Track your job search on one honest pipeline",
    description: "Every application, on one honest map.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "dmEeXBjhjIqXxswVStx7kcMR0dN9UZ0Y_B_sQ0Rub_8",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}  ${fraunces.variable} h-full antialiased`}
        style={{ colorScheme: "light" }}
      >
        <body className="min-h-full flex flex-col">
          {children}
          <Analytics/>  
        </body>
      </html>
    </ClerkProvider>
  );
}