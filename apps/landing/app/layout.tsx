import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

export const metadata = {
  title: "Etthos",
  description: "Landing page for Etthos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
