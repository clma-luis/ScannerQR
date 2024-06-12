import { Toaster } from "@/components/ui/Toast/toaster";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProtectRoute from "@/shared/hooks/ProtectRoute";
import QRProvider from "@/shared/context/QRContext";
import { ThemeProvider } from "@/shared/Providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "QR Scanner PWA",
  description: "QR Scanner PWA",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#FFFFFF" />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <QRProvider>
            <ProtectRoute>{children}</ProtectRoute>
            <Toaster />
          </QRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
