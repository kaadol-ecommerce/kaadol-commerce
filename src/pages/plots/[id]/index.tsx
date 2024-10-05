import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/fetchApi";
import { Plot } from "@/types";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default function SinglePlot({ plot }: { plot: Plot }) {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2 className="text-3xl">{plot.title}</h2>
        <h3 className="text-primary text-3xl font-semibold">
          {plot.price} RWF
        </h3>
      </div>

      <div className="flex gap-10">
        <div className="w-full">
          <div>
            <div className="relative aspect-video">
              <Image
                src="/land.jpg"
                alt="land"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex-1 relative aspect-square">
                  <Image
                    src="/land.jpg"
                    alt="land"
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
              <span className="text-gray-500">{plot.location}</span>
            </p>
          </div>

          <div className="border-b-[rgb(238, 240, 241)] border-b-[1px] pb-5">
            <h3 className="text-xl font-medium mt-6 mb-2">Description</h3>
            <p>
              Vida Residences at Creek Beach exclusively designed waterfront
              homes offer stunning views of the Creek Tower and the adjoining
              areas.
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
  const plot = await fetchAPI<Plot>(`/plots/${id}`);
  console.log(plot, "==== plot");
  return { props: { plot } };
};
