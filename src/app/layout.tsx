import type { Metadata } from "next";
import { Providers } from "./providers"; 
import "./index.css";

export const metadata: Metadata = {
  title: "Firsh De Noir – Luxury Perfume Collection",
  description:
    "Firsh De Noir is a luxury perfume brand inspired by darkness, elegance, and timeless sophistication.",
  authors: [{ name: "Firsh De Noir" }],

  openGraph: {
    title: "Firsh De Noir – Luxury Perfume Collection",
    description:
      "Discover Firsh De Noir, a luxury perfume collection crafted for those who embrace elegance, mystery, and bold identity.",
    type: "website",
    images: [
      {
        url: "/assets/hero-perfume.jpg",
        width: 1200,
        height: 630,
        alt: "Firsh De Noir – Luxury Perfume Collection",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Firsh De Noir – Luxury Perfume Collection",
    description:
      "Discover Firsh De Noir, a luxury perfume collection crafted for elegance, mystery, and bold identity.",
    images: ["/assets/hero-perfume.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
