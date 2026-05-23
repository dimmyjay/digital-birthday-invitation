import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Birthday Invitation",
  description:
    "Create and share beautiful digital birthday invitation links with RSVP, countdown, and WhatsApp sharing.",
  keywords: [
    "birthday invitation",
    "digital invitation",
    "electronic invitation",
    "birthday invite link",
    "RSVP invitation",
  ],
  authors: [{ name: "TechTune International" }],
  openGraph: {
    title: "Digital Birthday Invitation",
    description:
      "Create and share beautiful digital birthday invitation links with RSVP, countdown, and WhatsApp sharing.",
    type: "website",
    siteName: "Digital Birthday Invitation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}