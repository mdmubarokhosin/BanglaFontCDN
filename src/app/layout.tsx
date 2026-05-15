import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: 'বাংলা ফন্ট সিডিএন - জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং ব্যবহার করুন',
    template: '%s | বাংলা ফন্ট সিডিএন',
  },
  description: 'জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং আপনার প্রকল্পে ব্যবহার করুন। কালপুরুষ, সোলায়মানলিপি, হিন্দ সিলিগুড়ি এবং আরও অনেক ফন্ট।',
  keywords: ['বাংলা ফন্ট', 'Bangla font', 'বাংলা ফন্ট সিডিএন', 'Bangla Font CDN', 'কালপুরুষ', 'সোলায়মানলিপি', 'হিন্দ সিলিগুড়ি', 'ফ্রি বাংলা ফন্ট', 'বাংলাদেশ', 'CDN'],
  authors: [{ name: 'মোঃ মোবারক ভূঁইয়া' }],
  creator: 'মোঃ মোবারক ভূঁইয়া',
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'https://banglafontcdn.pages.dev',
    siteName: 'বাংলা ফন্ট সিডিএন',
    title: 'বাংলা ফন্ট সিডিএন - জনপ্রিয় বাংলা ফন্ট',
    description: 'জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং ব্যবহার করুন।',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বাংলা ফন্ট সিডিএন',
    description: 'জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং ব্যবহার করুন।',
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
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnmx.pages.dev" />
        <link rel="preconnect" href="https://banglawebfonts.pages.dev" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <a href="#main-content" className="skip-to-content">
          প্রধান বিষয়বস্তুতে যান
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
