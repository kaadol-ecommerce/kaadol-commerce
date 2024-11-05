import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { NAVBAR_LINKS } from "@/constants/navbarLinks";
import AuthDialog from "../dialogs/AuthDialog";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";

interface User {
  id: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const handleLogout = () => {
    Cookies.remove("token");
    router.reload();
  };

  return (
    <div className="w-full pt-4">
      <div className="flex justify-between items-center pb-4 container mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl text-blue-950">KADOOL LOGO</h1>
        </Link>
        <div className="flex gap-4 items-center">
          {!user && <AuthDialog />}

          {user && (
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          )}
          {user && (
            <Button variant={"outline"} asChild>
              <Link href={"/dashboard"}>My Ads</Link>
            </Button>
          )}
          {user ? (
            <Button asChild><Link href={"/dashboard/create/pick-category"}>Place your ad</Link></Button>
          ) : (
            <AuthDialog redirectPath="/dashboard/create/pick-category" button={<Button>Place your Ad</Button>} />
          )}
        </div>
      </div>
      <div className=" py-4 border-y border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
          {NAVBAR_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              className={`font-medium text-primary relative p-1 cursor-pointer transition duration-300 
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
    after:bg-accent after:transition-all after:duration-300 hover:after:w-full hover:after:scale-100 ${pathname === link.link ? "after:w-full after:scale-100" : "after:w-0"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
