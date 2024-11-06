import type { Metadata } from "next";
import "./globals.css";
import { NavLinks } from "./components/nav/nav-links";
import FooterSection from "./components/footer/footer-section";
import Banner from "./components/banner/banner";

export const metadata: Metadata = {
  title: "Wiz Fitness",
  description: "Purley's number one personal training studio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDisplayBanner } = await require("./data/nav.json");
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          sizes="192x192"
          href="https://static.wixstatic.com/media/5924bf_f7ba72511e3449dfa40c29ec380f9e59%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/5924bf_f7ba72511e3449dfa40c29ec380f9e59%7Emv2.png"
          type="image/png"
        />
        <link
          rel="shortcut icon"
          href="https://static.wixstatic.com/media/5924bf_f7ba72511e3449dfa40c29ec380f9e59%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/5924bf_f7ba72511e3449dfa40c29ec380f9e59%7Emv2.png"
          type="image/png"
        ></link>
        <link
          rel="apple-touch-icon"
          href="https://static.wixstatic.com/media/5924bf_f7ba72511e3449dfa40c29ec380f9e59%7Emv2.png/v1/fill/w_180%2Ch_180%2Clg_1%2Cusm_0.66_1.00_0.01/5924bf_f7ba72511e3449dfa40c29ec380f9e59%7Emv2.png"
          type="image/png"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="font-custom">
        <NavLinks />
        {isDisplayBanner && <Banner />}
        <div className={isDisplayBanner ? "mt-[15vh]" : "mt-[10vh"}>
          {children}
        </div>

        <FooterSection />
      </body>
    </html>
  );
}
