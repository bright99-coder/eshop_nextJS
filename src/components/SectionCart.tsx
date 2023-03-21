import Image from "next/image";
import React from "react";
import Button from "./Button";
import IconButton from "./IconButton";
import { MdDelete } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";

const Item = ({ children }: any) => {
  return (
    <div className="py-4 flex justify-center items-center">{children}</div>
  );
};

export const HeaderCart = ({ className }: any) => {
  return (
    <div
      className={`grid grid-cols-6 bg-[#F7941D] text-sm uppercase  text-white border border-[#F7941D] ${className}`}
    >
      <Item>Product</Item>
      <Item>Name</Item>
      <Item>Unit Price</Item>
      <Item>Quantity</Item>
      <Item>Total</Item>
      <Item>Action</Item>
    </div>
  );
};

const CartItem = () => {
  return (
    <div className="grid grid-cols-6 border border-gray-100">
      <Item>
        <Image
          src="/asus-vivobook-15x-oled-a1503za-i5-l1290w-1-1.jpg"
          width={100}
          height={100}
          alt=""
        />
      </Item>
      <Item>Samsung Galaxy Watch5 LTE 40mm</Item>
      <Item>1100$</Item>
      <Item>
        <div className="flex justify-center items-center">
          <Button variant="outlined">-</Button>
          <Button variant="outlined">1</Button>
          <Button variant="outlined">+</Button>
        </div>
      </Item>
      <Item>2000$</Item>
      <Item>
        <IconButton className="bg-transparent hover:bg-primary">
          <MdDelete />
        </IconButton>
      </Item>
    </div>
  );
};

const CartItemMobile = () => {
  return (
    <div className="grid grid-cols-12 py-4 border-b border-gray-100 relative">
      <div className="col-span-4">
        <Image
          src="/asus-vivobook-15x-oled-a1503za-i5-l1290w-1-1.jpg"
          width={100}
          height={100}
          alt=""
        />
      </div>
      <div className="col-span-8 flex flex-col">
        <h6 className="text-sm">Samsung Galaxy Watch5 LTE 40mm</h6>
        <div className="flex text-sm">
          <del className="mr-4">2500$</del>
          <span className="text-red-600">1600$</span>
        </div>
        <div className="flex items-center mt-2">
          <Button className="py-1" variant="outlined">
            -
          </Button>
          <Button className="py-1" variant="outlined">
            1
          </Button>
          <Button className="py-1" variant="outlined">
            +
          </Button>
        </div>
        <HiXMark className="absolute right-1 top-3" />
      </div>
    </div>
  );
};

export default function SectionCart() {
  return (
    <>
      <div className="hidden md:block">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="md:hidden">
        <CartItemMobile />
        <CartItemMobile />
        <CartItemMobile />
        <CartItemMobile />
      </div>
    </>
  );
}
