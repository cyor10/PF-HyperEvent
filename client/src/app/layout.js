import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Providers } from "../redux/provider";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

export const metadata = {
  title: "Hyper Events",
  description: "In progess",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Providers>
          <header>
            <NavBar />
          </header>
          <main>
              {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
