import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "../components/auth/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "National Travel Key | One Profile. Faster Check-In. Smarter Park Search.",
  description:
    "National Travel Key lets travelers store their information once, search participating parks by county, see live availability, and share their profile instantly at check-in.",
  keywords: [
    "national travel key",
    "florida state parks",
    "rv park availability",
    "campground search",
    "travel profile",
    "park check-in",
    "florida camping",
    "rv sites florida",
  ],
  openGraph: {
    title: "National Travel Key | One Profile. Faster Check-In. Smarter Park Search.",
    description:
      "Search participating parks by county, see live availability, and share your traveler profile instantly at check-in.",
    type: "website",
    siteName: "National Travel Key",
  },
  twitter: {
    card: "summary_large_image",
    title: "National Travel Key",
    description:
      "One travel profile. Faster check-in. Smarter Florida park search.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
