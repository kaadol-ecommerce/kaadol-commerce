import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/fetchApi";
import { House } from "@/types";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default function SinglePlot({ house }: { house: House }) {
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
            <p>
              {house.description}
            </p>
          </div>
        </div>
        <div>
          <Button>Show phone number</Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  const house = await fetchAPI<House>(`/houses/${id}`);
  console.log(house, "==== house");
  return { props: { house } };
};
