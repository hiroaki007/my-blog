
import { ReactNode } from "react";
import Header from '@/components/Header';
import "./globals.css";
import ClientProvider from './client-provider';



export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ClientProvider>
            <Header /> 
            <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
