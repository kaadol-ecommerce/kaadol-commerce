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
  console.log(data)
  return (
    <Link href={`/motors/${data?.id}`}>
    <Card>
      <CardHeader>
        <div className="relative w-full h-52 rounded-lg overflow-hidden">
          <Image src="/wagon.jpg" alt="car" fill />
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-blue-950 text-lg">{data?.price}</p>
        <div className="text-sm">
          <div>
            <span>{data?.title}</span>
          </div>
          <div>
            <span>{data?.year} -</span> <span>{data?.kilometers} km</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
