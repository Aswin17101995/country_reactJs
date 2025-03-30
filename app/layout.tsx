import type { Metadata } from "next";
import "./globals.css";


export const metadata = {
  title: 'CountryList',
  description: 'List of Countries in the world, you can search a country and fliter ',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900 select-none">{children}</body>
    </html>
  );
}
