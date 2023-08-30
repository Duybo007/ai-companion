import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
import ProModal from "@/components/pro-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your AI Pal",
  description: "Talk with Your AI Companion",
  icons: {
    icon: [
      '/favicon.ico?v=4'
    ],
    apple: [
      '/apple-touch-icon.png?v=4',
    ],
    shortcut: [
      'apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-secondary",inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProModal/>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
