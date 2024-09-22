import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function MotorAd({data}:any) {
  return (
    <div className="w-full rounded-md  border border-gray-200 hover:shadow-md relative">
      <div className="relative w-full h-52">
        <Image src="/wagon.jpg" alt="car" fill />
      </div>
      <div className="text-md pt-5 flex flex-col gap-1 p-4">
        <span className="line-clamp-1">{data?.title}</span>
        <span className="font-bold text-blue-950 text-lg">
          {data?.price} RWF
        </span>
        <div>
          <span>{data?.year} -</span> <span>{data?.kilometers} km</span>
        </div>
      </div>
      <Link href={`/motors/${data?.id}`}  className="absolute w-full h-full inset-0"/>
    </div>
  );
}
