import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductDetail() {
  return (
    <div className="mb-10">
      <div className="min-h-[48px] bg-primary px-5 md:px-10 lg:px-20 lg:flex items-center">
        <Link className="text-blue-500 underline" href="/collections">
          Collections
        </Link>{" "}
        /
        <Link className="text-blue-500 underline" href="/collections">
          Laptop
        </Link>{" "}
        /
        <span>
          Laptop Dell Gaming G15 5511 i5 11400H/8GB/256GB/4GB
          RTX3050/120Hz/OfficeHS/Win11
        </span>
      </div>
      <div className="px-5 md:px-10 lg:px-20 mt-4 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-5">
          <Image
            src="/asus-vivobook-15x-oled-a1503za-i5-l1290w-1-1.jpg"
            width={500}
            height={500}
            className="w-full h-auto"
            alt=""
          />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <h2 className="text-2xl overflow-hidden text-ellipsis">
            Laptop Dell Gaming G15 5511 I5 11400H/8GB/256GB/4GB
            RTX3050/120Hz/OfficeHS/Win11
          </h2>
          <h4 className="my-4">Brand: Dell</h4>
          <h3 className="text-2xl text-red-600">1750$</h3>
          <div>Stock Available</div>
          <div className="flex justify-start items-center my-4">
            <Button variant="outlined">-</Button>
            <Button variant="outlined">1</Button>
            <Button variant="outlined">+</Button>
          </div>
          <div className="flex mb-4">
            <Button className="mr-4" variant="contained">
              Add to cart
            </Button>
            <Button variant="outlined">Add to wishlist</Button>
          </div>
          <p>
            Description: Không những mang đến cho người dùng hiệu năng ấn tượng
            nhờ con chip Intel thế hệ 11 tân tiến, laptop Dell Gaming G15 5511
            i5 11400H (70266676) còn sở hữu thiết kế thời thượng, lôi cuốn, hứa
            hẹn sẽ là người cộng sự lý tưởng cùng bạn chinh phục mọi chiến
            trường.
          </p>
        </div>
      </div>
    </div>
  );
}
