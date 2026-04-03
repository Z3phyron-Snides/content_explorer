import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: "Checkit Content Explorer | Products",
  description:
    "Browse products from DummyJSON with search, filters, and detailed views.",
  keywords: "products, dummyjson, next.js, typescript",
  openGraph: {
    title: "Checkit Content Explorer",
    description:
      "Production-quality product browser built with Next.js 15 App Router",
    images: ["/og-image.jpg"], // we'll add this later if needed
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="antialiased bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto min-h-screen">{children}</div>
      </body>
    </html>
  );
}
