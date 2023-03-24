import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import swal from "sweetalert";
import Button from "./Button";

export default function CardProduct({ data, compareIcon, ...props }: any) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const submitAddtoWishList = (product: any) => {
    const data = {
      product_id: product.id,
    };

    axios.post(`/api/add-to-wishlist`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        swal("Error", res.data.message, "warning");
      } else if (res.data.status === 404) {
        //Not Found
        swal("Warning", res.data.message, "error");
      }
    });
  };

  const submitAddtocart = (product: any) => {
    const data = {
      product_id: product.id,
      product_color_name: "",
      product_quantity: quantity,
    };

    axios.post(`/api/add-to-cart`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        swal("Error", res.data.message, "warning");
      } else if (res.data.status === 404) {
        //Not Found
        swal("Warning", res.data.message, "error");
      }
    });
  };
  return (
    <div
      {...props}
      className="bg-white w-full h-full border border-gray-200 rounded-md overflow-hidden shadow"
    >
      <Link href={`/collections/${data.category.slug}/${data.slug}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${data.image}`}
          width={400}
          height={185}
          alt=""
          className="w-full h-auto"
        />
      </Link>
      <div className="p-4">
        <div>
          <Link
            href="/"
            className="block whitespace-nowrap overflow-hidden text-blue-700 text-ellipsis"
          >
            {data.product_name}
          </Link>
          <div className="flex font-bold">
            <span className="text-red-700">{data.selling_price}$</span>
            <del className="text-gray-500 ml-4">{data.original_price}$</del>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex ">
            <button
              className="text-red-700 text-2xl hover:bg-primary p-2 rounded-full"
              onClick={() => submitAddtoWishList(data)}
            >
              <AiOutlineHeart />
            </button>
            <button
              className="text-red-700 text-2xl hover:bg-primary p-2 rounded-full"
            >
              <AiFillEye />
            </button>
          </div>
          <div>
            <Button
              variant="outlined"
              className="px-7 py-2"
              onClick={() => submitAddtocart(data)}
            >
              <MdAdd className="text-blue-700" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
