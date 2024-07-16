import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import ProductAd from "@/components/cards/MotorAd";
import Popular from "@/components/sections/Popular";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home({repo}:any) {
console.log(repo)
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
  const res = await fetch("https://mmq63dzj-3000.uks1.devtunnels.ms/api/popular")
  console.log(res)
  const repo =await res.json()
  console.log(repo)
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo }>;
