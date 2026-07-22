import type { Metadata } from 'next';
import { Fredoka, Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/auth-context';
import { CartProvider } from '@/lib/cart/cart-context';
import { FavoritesProvider } from '@/lib/favorites/favorites-context';
import ThemeProvider from '@/components/providers/theme-provider';

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DIUPoint — Student Marketplace',
  description:
    'Buy and sell textbooks, electronics, housing, and campus essentials with fellow DIU students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${fredoka.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>{children}</FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
