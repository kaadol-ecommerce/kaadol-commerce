import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';


export default function Navbar() {
  return (
    <div className="w-full pt-4">
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-bold text-2xl text-blue-950">KADOOL LOGO</h1>
        <div className="flex gap-4 items-center">
          <Button variant="secondary">Login or Sign up</Button>
          <Button>Place your Ad</Button>
        </div>
      </div>
      <div className="flex items-center justify-evenly py-4 border-y border-gray-200">
        <Link href="/" className="font-medium text-blue-950">
          Motors
        </Link>
        <Link href="/" className="font-medium text-blue-950">
          Plots
        </Link>
        <Link href="/" className=" font-medium text-blue-950">
          Houses
        </Link>
        <Link href="/" className="font-medium text-blue-950">
          Jobs
        </Link>
      </div>
    </div>
  );
}
