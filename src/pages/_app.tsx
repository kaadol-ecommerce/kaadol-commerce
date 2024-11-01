import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { parse } from "cookie";
import axios, { AxiosError } from "axios";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { User } from "lucide-react";
import { UserProvider } from "@/context/UserContext";

interface User {
  id: string;
  email: string;
}

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ user?: User }>) {
  const { user } = pageProps;
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <UserProvider user={user}>
    <div className="flex flex-col h-full min-h-screen">
      <Navbar />
      <div className="flex-1">
        
        {getLayout(<Component {...pageProps} />)}
      </div>
      <Footer />
    </div>
    </UserProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const { token } = parse(appContext.ctx.req?.headers.cookie || "");

  if (!token) {
    return { pageProps: {} };
  }
  try {
    const res = await axios.get<User>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { pageProps: { user: res.data } };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return { pageProps: {} };
    }
    throw error;
  }
};
