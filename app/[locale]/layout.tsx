import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google"; // Keep Geist for now or swap to Cairo/Inter
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EditModeProvider } from '@/contexts/EditModeContext';
import EditModeToggle from '@/components/EditModeToggle';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Al-Maali Tours",
  description: "Travel Agency",
  icons: {
    icon: '/logo.svg',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-gray-50 dark:bg-black`}>
        <NextIntlClientProvider messages={messages}>
          <EditModeProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
            </div>
            <EditModeToggle />
          </EditModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
