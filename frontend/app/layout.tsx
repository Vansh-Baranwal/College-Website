import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus OS | IIT Delhi",
  description: "A complete, production-ready frontend university platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <AppProvider>
          <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-primary">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute w-full h-full object-cover hidden md:block opacity-60"
            >
              <source src="/campus-tour.mp4" type="video/mp4" />
            </video>
            <div className="absolute w-full h-full bg-primary md:hidden opacity-60" />
            <div className="absolute inset-0 bg-primary/70 z-10" />
            <div className="absolute inset-0 z-10" 
                 style={{ backgroundImage: "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          <SmoothScroll>
            <Navbar />
            <CustomCursor />
            <PageTransition>
              <main className="min-h-screen">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
