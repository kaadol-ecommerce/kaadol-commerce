import Image from "next/image"
import motor from "../../../public/wagon.jpg"
import { Motor as MotorType } from "@/types"

export default function Motor({data}:{data:MotorType}) {
  return (
    <div>
        <div className="h-60 relative w-full">
            <Image src={motor} alt="moto" fill/>
        </div>
        <div>
            <h1>{data.price} rwf</h1>
            <div>
                
            </div>
        </div>
    </div>
  )
}
