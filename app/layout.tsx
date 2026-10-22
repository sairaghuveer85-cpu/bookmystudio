import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";
import { ComparisonTray } from "@/components/comparison/ComparisonTray";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LocationProvider } from "@/context/LocationContext";
import { LocationSelectorModal } from "@/components/location/LocationSelectorModal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  title: "BookMyStudio — World-Class Studios & Soundstages for Your Next Shoot",
  description:
    "Instant booking for commercial cycloramas, soundproof stages, natural daylight lofts, and vetted crew across global production hubs.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BookMyStudio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark h-full antialiased scroll-smooth" style={{ colorScheme: 'dark' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{localStorage.removeItem('bms_theme');var d=document.documentElement;d.classList.add('dark');d.setAttribute('data-theme','dark');d.style.colorScheme='dark';}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#09090B] text-[#FAFAFA] selection:bg-amber-500/30 selection:text-amber-200">
        <ThemeProvider>
          <MarketplaceProvider>
            <AuthProvider>
              <LocationProvider>
                <CinematicIntro />
                <Suspense fallback={<div className="h-16 sm:h-20 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]" />}>
                  <Header />
                </Suspense>
                <div className="flex-1 flex flex-col pb-16 lg:pb-0">{children}</div>
                <Footer />
                <ComparisonTray />
                <MobileBottomNav />
                <LocationSelectorModal />
              </LocationProvider>
            </AuthProvider>
          </MarketplaceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
