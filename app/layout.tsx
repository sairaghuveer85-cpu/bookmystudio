import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "BookMyStudio — World-Class Studios & Soundstages for Your Next Shoot",
  description:
    "Instant booking for commercial cycloramas, soundproof stages, natural daylight lofts, and vetted crew across global production hubs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bms_theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--bg-page)] text-[var(--text-primary)] selection:bg-emerald-600 selection:text-white">
        <ThemeProvider>
          <MarketplaceProvider>
            <AuthProvider>
              <Suspense fallback={<div className="h-16 sm:h-20 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]" />}>
                <Header />
              </Suspense>
              <div className="flex-1 flex flex-col">{children}</div>
              <Footer />
            </AuthProvider>
          </MarketplaceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
