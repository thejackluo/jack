import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { RouteTransition } from "@/components/animations/PageTransition";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CommandPaletteProvider } from "@/components/CommandPaletteProvider";
import {
  getProjects,
  getBlogPosts,
  getToyProjects,
  getSiteSettings
} from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Jack Luo - Portfolio",
  description: "Personal portfolio website showcasing Jack Luo's projects, journey, and creative work",
  keywords: ["Jack Luo", "portfolio", "developer", "creative", "projects"],
  authors: [{ name: "Jack Luo" }],
  creator: "Jack Luo",
  publisher: "Jack Luo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Jack Luo - Portfolio",
    description: "Personal portfolio website showcasing Jack Luo's projects, journey, and creative work",
    url: "https://jack-luo.com",
    siteName: "Jack Luo Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Luo - Portfolio",
    description: "Personal portfolio website showcasing Jack Luo's projects, journey, and creative work",
    creator: "@jackluo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data for command palette
  const [projects, blogPosts, toyProjects, siteSettings] = await Promise.all([
    getProjects(),
    getBlogPosts(),
    getToyProjects(),
    getSiteSettings(),
  ]);

  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <ScrollProgress />
        <CommandPaletteProvider
          projects={projects}
          blogPosts={blogPosts}
          toyProjects={toyProjects}
          siteSettings={siteSettings}
        >
          <RouteTransition>
            {children}
          </RouteTransition>
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
