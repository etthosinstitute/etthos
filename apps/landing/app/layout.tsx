import "./globals.css";
export const metadata = {
  title: "Etthos",
  description: "Landing page for Etthos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
