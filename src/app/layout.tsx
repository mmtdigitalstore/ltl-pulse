import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Premium podcasts, magazine articles, and vlogs where leadership meets culture — for ambitious leaders.";

export const metadata: Metadata = {
  title: "LTL Pulse",
  description: siteDescription,
  openGraph: {
    title: "LTL Pulse",
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LTL Pulse",
    description: siteDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-ltl-bg text-ltl-text-primary">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar user={user} />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
