import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-between flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex-1 mx-auto max-w-7xl px-4 mt-6">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
