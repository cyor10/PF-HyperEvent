"use client"
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { SessionProvider } from "next-auth/react";
import { Providers } from "../redux/provider";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

export const metadata = {
  title: "Hyper Events",
  description: "In progess",
};

export default function RootLayout({ children , params: {session, ...params} }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <SessionProvider session={session}>
          <Providers {...params}>
            <header>
              <NavBar />
            </header>
            <main>
              {children}
            </main>
          </Providers>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
