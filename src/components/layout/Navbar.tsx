import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { NAVBAR_LINKS } from '@/constants/navbarLinks';


export default function Navbar() {
  return (
    <div className="w-full pt-4">
      <div className="flex justify-between items-center pb-4 container mx-auto">
        <h1 className="font-bold text-2xl text-blue-950">KADOOL LOGO</h1>
        <div className="flex gap-4 items-center">
          <Button variant="secondary">Login or Sign up</Button>
          <Button>Place your Ad</Button>
        </div>
      </div>
      <div className=" py-4 border-y border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
          {NAVBAR_LINKS.map((link) => (
            <Link
              key={link.id}
              href="/"
              className="font-medium text-blue-950 relative p-1 cursor-pointer transition duration-300 
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
    after:bg-[#ff8906] after:transition-all after:duration-300 hover:after:w-full hover:after:scale-100"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
