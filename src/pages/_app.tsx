import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavMobile from "@/components/NavMobile";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="h-navbar w-full sticky top-0 z-20 bg-white shadow">
        <Navbar />
      </div>
      <div className="h-content">
        <Component {...pageProps} />
        <Footer />
      </div>
      <div className="fixed w-full bottom-0 md:hidden z-20">
        <NavMobile />
      </div>
    </div>
  );
}
