import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import IconButton from "./IconButton";

export default function CardProduct({ data, compareIcon, ...props }: any) {
  return (
    <div className="bg-white w-full h-full border border-gray-200 rounded-md overflow-hidden shadow">
      <Link href="/collections/smart-watch/garmin-forerunner-955-day-silicone">
        <Image
          src="/asus-vivobook-15x-oled-a1503za-i5-l1290w-1-1.jpg"
          width={200}
          height={400}
          alt=""
          className="w-full h-auto"
        />
      </Link>
      <div className="p-4">
        <div>
          <Link href="/" className="block whitespace-nowrap overflow-hidden text-blue-700 text-ellipsis">
            Laptop Asus VivoBook 15X OLED A1503ZA I5 12500H/8GB/512GB/Win11
          </Link>
          <div className="flex font-bold">
            <span className="text-red-700">1500$ </span>
            <del className="text-gray-500 ml-4">1750$</del>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex ">
            <IconButton className="ml-0 text-red-700 text-2xl bg-transparent hover:bg-primary">
              <AiOutlineHeart />
            </IconButton>
            <IconButton className="text-red-700 text-2xl bg-transparent hover:bg-primary">
              <AiFillEye />
            </IconButton>
          </div>
          <div>
            <button className="px-7 py-2 border border-blue-700 outline-none rounded-md text-blue-700 hover:bg-blue-50">
              <GrAdd/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
