import "./globals.css";
import { Inter } from "next/font/google";

import { ModalProvider } from '@/providers/modal-provider';
import { SessionProvider } from "next-auth/react"
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nimark Admin",
  description: "Nimark Admin is a dashboard for managing your Nimark account.",
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
