import React from "react";
import { BsSearch } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

export default function SearchWrapper({className}:any) {
  return (
    <div className={`${className}`}>
      <BsSearch className="absolute left-4 top-2/4 -translate-y-2/4 cursor-pointer text-lg text-gray-500" />
      <input
        type="text"
        placeholder="Search for..."
        className="w-full h-full bg-primary rounded-3xl pl-10 pr-4 outline-1 outline-slate-400"
      />
      <TiDeleteOutline className="absolute right-4 top-2/4 -translate-y-2/4 text-xl cursor-pointer text-gray-500" />
    </div>
  );
}
