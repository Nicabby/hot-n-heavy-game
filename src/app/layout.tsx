import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hot 'N Heavy - Digital Game of Lifestyle",
  description: "Digital version of the adult party card game from Game of Lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
