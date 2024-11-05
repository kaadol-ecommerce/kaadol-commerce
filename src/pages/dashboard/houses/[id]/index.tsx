import { Button } from "@/components/ui/button";
import { House, Purchase } from "@/types";
import axios, { AxiosError } from "axios";
import { parse } from "cookie";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";

export default function SingleHouse({ house, purchase }: { house: House, purchase: Purchase }) {
  return (
    <div className="mx-auto max-w-7xl px-4 mt-6">
      <div className="flex justify-between mb-5">
        <h2 className="text-3xl">{house.title}</h2>
        <h3 className="text-primary text-3xl font-semibold">
          {house.price} RWF
        </h3>
      </div>

      <div className="flex gap-10">
        <div className="w-full">
          <div>
            <div className="relative aspect-video">
              <Image
                src="/house.jpg"
                alt="house"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex-1 relative aspect-square">
                  <Image
                    src="/house.jpg"
                    alt="house"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="flex items-center gap-2">
              <CiLocationOn height={32} width={32} />
              <span className="text-gray-500">{house.location}</span>
            </p>
          </div>

          <div className="border-b-[rgb(238, 240, 241)] border-b-[1px] pb-5">
            <h3 className="text-xl font-medium mt-6 mb-2">Description</h3>
            <p>{house.description}</p>
          </div>
        </div>
        <div>
          {purchase?.status === "completed" ? (
            <Button>Show phone number</Button>
          ) : (
            <Button asChild>
              <Link href={`/dashboard/plans?itemType=house&itemId=${house.id}`}>Pay Your ad</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}




export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
      const { id } = context.params as { id: string };
      const { token } = parse(context.req.headers.cookie || "");
      const { data } = await axios.get<{ house: House }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/houses/${id}/owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const purchase = await axios.get<{ purchase: Purchase | null }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/houses/${id}/purchase`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        props: {
          house: data.house,
          purchase: purchase.data.purchase,
        },
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
      }
      throw error;
    }
  };
