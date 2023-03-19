import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function cart() {
  return (
    <div className="mb-10">
      <div className="h-12 bg-primary px-24 flex items-center">
        <h3 className="text-2xl">My Cart</h3>
      </div>
      <div className="px-24 mt-10">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F7941D] text-sm uppercase  text-white">
              <th className="py-4">Product</th>
              <th className="py-4">Name</th>
              <th className="py-4">Unit Price</th>
              <th className="py-4">Quantity</th>
              <th className="py-4">Total</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="px-2 py-3 text-sm h-[83px] border border-gray-300">
              <td>
                <div className="flex justify-center items-center">
                  <Image
                    src="/asus-vivobook-15x-oled-a1503za-i5-l1290w-1-1.jpg"
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
              </td>
              <td className="text-center">Samsung Galaxy Watch5 LTE 40mm</td>
              <td className="text-center">1100</td>
              <td>
                <div className="flex justify-center items-center">
                  <Button variant="outlined">-</Button>
                  <Button variant="outlined">1</Button>
                  <Button variant="outlined">+</Button>
                </div>
              </td>
              <td className="text-center">2200$</td>
              <td>
                <div className="flex justify-center items-center">
                  <IconButton className="bg-transparent hover:bg-primary">
                    <MdDelete />
                  </IconButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
