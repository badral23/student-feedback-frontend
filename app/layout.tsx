import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Сурагчийн санал хүсэлтийн систем",
  description: "Сурагчийн санал хүсэлтийг хүлээн авч хариу өгөх систем",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
