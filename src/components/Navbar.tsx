import React, { useEffect } from "react";
import IconButton from "./IconButton";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import SearchWrapper from "./SearchWrapper";
import { CiUser } from "react-icons/ci";
import Button from "./Button";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaJediOrder } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ className }: any) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={`px-5 md:px-10 lg:px-20 flex flex-col ${className}`}>
      <div className="flex justify-between py-2 md:py-4">
        <Link href="/" className="flex items-end text-2xl text-blue-600">
          ECOMERCE
        </Link>
        <SearchWrapper className="hidden md:block" />
        <div className="flex">
          <IconButton href="/wishlist">
            <AiOutlineHeart />
          </IconButton>
          <IconButton href="/cart" className="relative">
            <BsHandbag />
          </IconButton>
          {user ? (
            <div className="relative">
              <div ref={ref} onClick={() => setIsOpen(!isOpen)}>
                <IconButton>
                  <CiUser />
                </IconButton>
              </div>
              {isOpen && (
                <div className="bg-white rounded-md absolute top-full border border-gray-200 right-0 shadow mt-3 flex flex-col z-20">
                  <Button
                    href="/profile"
                    variant="startIcon"
                    icons={<IoInformationCircleOutline />}
                  >
                    Profile
                  </Button>
                  <Button
                    href="/orders"
                    variant="startIcon"
                    icons={<FaJediOrder />}
                  >
                    My Orders
                  </Button>
                  <Button
                    variant="startIcon"
                    icons={<IoLogOutOutline />}
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <IconButton href="/login">
              <FiLogIn />
            </IconButton>
          )}
        </div>
      </div>
      <div className="hidden md:flex justify-end">
        <NavbarItem title="Home" href="/" />
        <NavbarItem title="Collections" href="/collections" />
        <NavbarItem title="Trending Product" href="/trending" />
        <NavbarItem title="Featured Product" href="/featured" />
      </div>
      <div className="">
        <SearchWrapper className="relative w-full h-searchWrapper md:hidden" />
      </div>
    </div>
  );
}

function NavbarItem({ title, href }: NavbarItem) {
  return (
    <Link
      className={`ml-7 border-b-2 border-transparent hover:border-gray-300`}
      href={href}
    >
      {title}
    </Link>
  );
}
