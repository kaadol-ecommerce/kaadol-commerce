import { Inter } from "next/font/google";
import Popular from "@/components/sections/Popular";
import type { GetServerSideProps } from "next";
import { fetchAPI } from "@/lib/fetchApi";
import { House, Motor, Plot } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ popular }: { popular: PopularResponse }) {
  return (
    <main className={`container mx-auto ${inter.className}`}>
      <Popular data={popular} />
    </main>
  );
}

export type PopularResponse = {
  motors: Motor[];
  houses: House[];
  plots: Plot[];
};

export const getServerSideProps = (async () => {
  try {
    const popular = await fetchAPI<PopularResponse>("/popular");
    return { props: { popular } };
  } catch (error) {
    console.log(error);
    return { props: { popular: [] } };
  }
}) satisfies GetServerSideProps<{ popular: PopularResponse | [] }>;
