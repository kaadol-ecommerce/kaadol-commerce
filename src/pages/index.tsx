import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Popular from "@/components/sections/Popular";
import type { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home({repo}:any) {
  return (
    <main
      className={`container mx-auto ${inter.className}`}
    >
      <Navbar/>
      <Popular data={repo}/>
    </main>
  );
}


type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps = (async () => {
  // Fetch data from external API

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/popular`);
  const repo =await res.json()
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo }>;
