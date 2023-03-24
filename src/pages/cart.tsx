import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/Button";
import { MdDelete } from "react-icons/md";
import IconButton from "@/components/IconButton";
import { HiXMark } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const Item = ({ children }: any) => {
  return (
    <div className="py-4 flex justify-center items-center">{children}</div>
  );
};
const HeaderCart = ({ className }: any) => {
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

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  var totalCartPrice = 0;

  useEffect(() => {
    let isMounted = true;
    if (!sessionStorage.getItem("auth_token")) {
      router.push("/login");
      swal("Warning", "Login to goto Cart Page", "warning");
    }
    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCartItems(res.data.cart);
        } else if (res.data.status === 401) {
          router.push("/login");
          swal("Warning", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [router, setCartItems]);

  const handleDecrement = (id: number) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? {
              ...item,
              product_quantity:
                item.product_quantity - (item.product_quantity > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(id, "dec");
  };

  const handleIncrement = (id: number) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? {
              ...item,
              product_quantity:
                item.product_quantity + (item.product_quantity < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(id, "inc");
  };

  function updateCartQuantity(id: number, scope: string) {
    axios.put(`/api/cart-updatequantity/${id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      }
    });
  }

  const deleteCartItem = (e: any, id: number) => {
    e.preventDefault();
    axios.delete(`/api/delete-cartitem/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setCartItems(
          cartItems.filter(function (item) {
            return item.id !== id;
          })
        );
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };

  return (
    <>
      {cartItems.length > 0 && (
        <div className="h-12 bg-primary px-5 md:px-10 lg:px-20 flex items-center">
          <h3 className="text-2xl">My Cart</h3>
        </div>
      )}
      <div className="px-5 lg:px-20 my-0 md:my-5 lg:my-10 flex flex-col">
        {cartItems.length > 0 && <HeaderCart className="hidden md:grid" />}
        {cartItems.length > 0 ? (
          <div>
            {/* laptop */}
            <div className="hidden md:block">
              {cartItems?.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="grid grid-cols-6 border border-gray-100">
                      <Item>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.product.image}`}
                          width={100}
                          height={100}
                          alt=""
                        />
                      </Item>
                      <Item>{item.product.product_name}</Item>
                      <Item>{item.product.selling_price}$</Item>
                      <Item>
                        <div className="flex justify-center items-center">
                          <Button
                            variant="outlined"
                            onClick={() => handleDecrement(item.id)}
                          >
                            -
                          </Button>
                          <Button variant="outlined">
                            {item.product_quantity}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </Button>
                        </div>
                      </Item>
                      <Item>
                        {
                          (totalCartPrice +=
                            item.product.selling_price * item.product_quantity)
                        }
                        $
                      </Item>
                      <Item>
                        <IconButton
                          className="bg-transparent hover:bg-primary"
                          onClick={(e: any) => deleteCartItem(e, item.id)}
                        >
                          <MdDelete />
                        </IconButton>
                      </Item>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* mobile */}
            <div className="md:hidden">
              {cartItems?.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="grid grid-cols-12 py-4 border-b border-gray-100 relative">
                      <div className="col-span-4">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.product.image}`}
                          width={100}
                          height={100}
                          alt=""
                        />
                      </div>
                      <div className="col-span-8 flex flex-col">
                        <h6 className="text-sm">{item.product.product_name}</h6>
                        <div className="flex text-sm">
                          <del className="mr-4">
                            {item.product.original_price}$
                          </del>
                          <span className="text-red-600">
                            {item.product.selling_price}
                          </span>
                        </div>
                        <div className="flex items-center mt-2">
                          <Button
                            className="py-1"
                            variant="outlined"
                            onClick={() => handleDecrement(item.id)}
                          >
                            -
                          </Button>
                          <Button className="py-1" variant="outlined">
                            {item.product_quantity}
                          </Button>
                          <Button
                            className="py-1"
                            variant="outlined"
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </Button>
                        </div>
                        <HiXMark
                          className="absolute right-1 top-3"
                          onClick={(e: any) => deleteCartItem(e, item.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-5">
            <FaShoppingCart className="text-6xl text-red-600" />
            No Product Cart Shopping
            <Link href="/" className="mt-3">
              <Button variant="outlined">BACK HOME</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
