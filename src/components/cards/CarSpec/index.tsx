import { Calendar, FuelIcon, GaugeCircle, MapPin } from "lucide-react";
import Wagon from "../../../../public/wagon.jpg";
import Image from "next/image";
import SpecLogo from "./SpecLogo";
import Link from "next/link";
import { Motor } from "@/types";
function CarSpec({ motor }: { motor: Motor }) {
  const specs = [
    { id: 1, icon: <Calendar color="#ff8906" />, text: "2021" },
    { id: 2, icon: <FuelIcon color="#ff8906" />, text: "Diesel" },
    { id: 3, icon: <GaugeCircle color="#ff8906" />, text: "100,000 Km" },
  ];
  const {
    title,
    id,
    price,
    location,
    brand,
    transmissionType,
    brandDescription,
    features,
    steelingSide,
  } = motor;
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-20 py-10 border-b border-gray-200 relative w-full hover:border-accent transition-all duration-300">
      <Link
        href={`/motors/${id}`}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="relative aspect-[16/9] md:w-[400px] md:h-[250px] rounded-md overflow-hidden">
        <Image src={Wagon} alt="car" fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2 text-lg text-primary">
        <span className="font-bold">{price} RWF</span>
        <div className="flex gap-2 items-center">
          <span>{brand}</span>
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>{brandDescription}</span>
        </div>
        <div className="flex gap-2 flex-col md:flex-row">{title}</div>
        <span className="md:separator flex items-center">
          {transmissionType}
        </span>
        <span className="flex gap-2 flex-col md:flex-row">
          {features.map((feature) => (
            <span key={feature} className="md:separator flex items-center">
              {feature}
            </span>
          ))}
        </span>
        <span className="md:separator flex items-center">{steelingSide}</span>
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          {specs.map((spec) => (
            <SpecLogo key={spec.id} text={spec.text}>
              {spec.icon}
            </SpecLogo>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <MapPin color="#ff8906" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}

export default CarSpec;
