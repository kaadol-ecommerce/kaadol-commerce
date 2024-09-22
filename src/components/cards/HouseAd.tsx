import { House } from "@/types";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HouseAd({data}:{data: House}) {
  return (
    <div className="w-full rounded-md  border border-gray-200 hover:shadow-md relative">
      <div className="relative w-full h-52">
        <Image src="/house.jpg" alt="car" fill />
      </div>
      <div className="text-md pt-5 flex flex-col gap-1 p-4">
        <span className="line-clamp-1">{data?.title}</span>
        <span className="font-bold text-blue-950 text-lg">
          {data?.price} RWF
        </span>
        <div className="flex gap-1 items-center">
          <MapPin color="#ff8906" />
          <span>{data.location}</span>
        </div>
      </div>
      <Link href={`/houses/${data?.id}`}  className="absolute w-full h-full inset-0"/>
    </div>
  );
}
