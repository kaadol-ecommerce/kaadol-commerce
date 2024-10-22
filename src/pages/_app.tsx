import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Cookies from "cookie";
import axios, { AxiosError } from "axios";

interface User {
  id: string;
  email: string;
}
export default function App({
  Component,
  pageProps,
}: AppProps<{ user?: User }>) {
  const { user } = pageProps;
  return (
    <>
      <Navbar user={user} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const cookies = Cookies.parse(appContext.ctx.req?.headers.cookie || "");
  const token = cookies.token;
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
    console.log(res.data);
    return { pageProps: { user: res.data } };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return { pageProps: {} };
    }
    throw error;
  }
};
