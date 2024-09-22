import Image from 'next/image';
import flag from "../../../public/rwanda.svg"


export default function Footer() {
  return (
  <div className="bg-primary text-white py-10">
  <div className="container mx-auto text-md flex flex-col justify-center items-center gap-3">
    <p>Copyright © KADOOL group - All rights reserved</p>
    <div className="flex items-center gap-1">
      <span>Buy and sell products in </span>
      <Image src={flag} width={32} height={32} alt="rwanda" />
    </div>
  </div>
</div>

  )
}
