import "./globals.css";
import { Inter } from "next/font/google";

import { ModalProvider } from '@/providers/modal-provider';

import { ClerkProvider } from '@clerk/nextjs' ;
import { ToasterProvider } from "@/providers/toast-provider";



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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
