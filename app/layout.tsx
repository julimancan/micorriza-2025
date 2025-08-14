import { Metadata } from "next";
import "./globals.css";
import { getHomepageSeo } from "@/sanity/queries/homepageQueries";
import { getLogo } from "@/sanity/queries/siteSettingsQueries";
import { urlFor } from "@/sanity/lib/image";
import localFont from "next/font/local";
import { Tilt_Neon, Inter, Reem_Kufi_Fun } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

export const generateMetadata = async (): Promise<Metadata> => {
  const seo = await getHomepageSeo();
  const logo = await getLogo();
  if (seo)
    return {
      title: seo.title,
      description: seo.description,
      icons: logo?.logo
        ? {
            icon: urlFor(logo.logo).url(),
            shortcut: urlFor(logo.logo).url(),
            apple: urlFor(logo.logo).url(),
          }
        : undefined,
      openGraph: {
        title: seo.title,
        description: seo.description,
        images: [
          {
            url: "https://cdn.sanity.io/images/bbgd3it4/production/21c39d2f464f1d730669be685e1955852d00e70a-1261x779.png",
            width: 1880,
            height: 1125,
            alt: "Logo de Micorriza Musica",
          },
        ],
      },
      // favicon: logo?.logo ? urlFor(logo.logo).url() : undefined,
    };
  return {
    title: "Micorriza Musica",
    description: "Sitio web de la banda colombiana Micorriza",
  };
};

const mailart = localFont({
  src: "./MailartRubberstamp-Regular.otf",
  variable: "--font-mailart",
});
const inter = Inter({ subsets: ["latin"] });

const tiltLeon = Tilt_Neon({
  subsets: ["latin"],
  variable: "--font-tilt-neon",
});

const reemKufiFun = Reem_Kufi_Fun({
  subsets: ["latin"],
  variable: "--font-reem-kufi-fun",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-9FQX9HCQ1B" />

      <body
        className={`${inter.className} ${mailart.variable} ${tiltLeon.variable} ${reemKufiFun.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
