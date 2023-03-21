import SectionCart, { HeaderCart } from "@/components/SectionCart";
import React from "react";

export default function cart() {
  return (
    <>
      <div className="h-12 bg-primary px-5 md:px-10 lg:px-20 flex items-center">
        <h3 className="text-2xl">My Cart</h3>
      </div>
      <div className="px-5 lg:px-20 my-0 md:my-5 lg:my-10 flex flex-col">
        <HeaderCart className="hidden md:grid" />
        <SectionCart />
      </div>
    </>
  );
}
