import React from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface MyAdProps {
  status: string;
  title: string;
  price: string;
  expiresIn: string;
  id: number;
  type: 'houses' | 'motors' | 'plots';
}

const MyAd: React.FC<MyAdProps> = ({
  status,
  title,
  price,
  expiresIn,
  id,
  type,
}) => {
  return (
    <Link href={`dashboard/${type}/${id}`} className="mt-4 border rounded-lg p-4 block">
      <div className="flex gap-4">
        <div className="relative w-24 h-24 bg-muted rounded-lg">
          <Image
            src={'https://g-mraoxskivld.vusercontent.net/placeholder.svg'}
            alt="Car image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-block bg-slate-200 text-xs px-2 py-1 rounded mb-2">
                {status}
              </div>
              <h3 className="font-medium">{title}</h3>
              <div className="text-sm">{price}</div>
              <div className="text-sm text-muted-foreground">
                Ad expires in {expiresIn}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};


export default MyAd;
