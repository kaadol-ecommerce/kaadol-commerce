import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { NAVBAR_LINKS } from '@/constants/navbarLinks';
import AuthDialog from '../dialogs/AuthDialog';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface User {
  id: string;
  email: string;
}

export default function Navbar({ user } : { user?: User }) {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('token');
    router.reload();
  }

  return (
    <div className="w-full pt-4">
      <div className="flex justify-between items-center pb-4 container mx-auto">
        <h1 className="font-bold text-2xl text-blue-950">KADOOL LOGO</h1>
        <div className="flex gap-4 items-center">
        {!user && <AuthDialog />}
        {user && <Button variant='outline' onClick={handleLogout}>Logout</Button>}
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
