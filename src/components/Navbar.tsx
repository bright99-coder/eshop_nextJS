import React from "react";
import IconButton from "./IconButton";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import SearchWrapper from "./SearchWrapper";
import { useAuth } from "@/context/AuthContext";
import { CiUser } from "react-icons/ci";
import Button from "./Button";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaJediOrder } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function Navbar() {
  const { logged, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const handleToggleOpen = () => setOpenProfile(!openProfile);
  const handleClose = () => setOpenProfile(false);
  // useClickOutside(profileRef, handleClose);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="px-5 md:px-10 lg:px-20 flex flex-col">
      <div className="flex justify-between py-2 md:py-4">
        <Link href="/" className="flex items-end text-2xl text-blue-600">
          ECOMERCE
        </Link>
        <SearchWrapper className="relative w-full md:w-2/4 h-searchWrapper max-w-lg hidden md:block" />
        <div className="flex">
          <IconButton href="/wishlist">
            <AiOutlineHeart />
          </IconButton>
          <IconButton href="/cart">
            <BsHandbag />
          </IconButton>
          {logged ? (
            <div className="relative">
              <div ref={profileRef} onClick={handleToggleOpen}>
                <IconButton>
                  <CiUser />
                </IconButton>
              </div>
              {openProfile && (
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
                    onClick={handleLogout}
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
