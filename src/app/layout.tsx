import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import Footer from "@/partials/Footer";
import SmoothScrolling from "@/components/SmoothScrolling";
import { GoogleTagManager } from "@next/third-parties/google";
import Providers from "@/partials/Providers";
import "@/styles/main.scss";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="starter-template" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${sf ? "&family=" + sf : ""
            }&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Providers>
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          <Toaster />
          <SmoothScrolling />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
