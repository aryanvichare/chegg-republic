import "@/app/globals.css";
import Nav from "@/components/layout/Nav";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/providers/Providers";
import type { Metadata } from "next";
import { Inter, Lexend, DM_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Chegg Republic",
  description: "Chegg Republic - United We Learn",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`bg-background ${inter.variable} ${lexend.variable} ${dmMono.variable}`}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Nav />
          <main className='min-h-screen flex items-center justify-center h-full'>
            {children}
          </main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
