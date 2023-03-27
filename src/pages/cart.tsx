import axios from "axios";
import swal from "sweetalert";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Grid from "@/components/Grid";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import CartItem, {
  CartItemMobile,
  HeaderCart,
  TableRow,
} from "@/components/CartItem";
import { useAuth } from "@/context/AuthContext";

export default function Cart() {
  const router = useRouter();
  const { user } = useAuth();
  const { totalPrice, cartItems, setCartItems } = useShoppingCart();

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCartItems(res.data.cart);
          console.log(cartItems);
          localStorage.setItem("shopping_cart", JSON.stringify(res.data.cart));
        } else if (res.data.status === 401) {
          router.push("/login");
          swal("Warning", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    if (typeof window !== "undefined") {
      swal("Warning", "Login to goto Cart Page", "warning");
      router.push("/login");
      return null;
    }
  }
  return (
    <>
      {cartItems.length > 0 && (
        <div className="h-12 bg-primary px-5 md:px-10 lg:px-20 flex items-center">
          <h3 className="text-2xl">My Cart</h3>
        </div>
      )}
      <Grid variant="primary" className="flex flex-col">
        {cartItems.length > 0 && <HeaderCart />}
        {cartItems.length > 0 ? (
          <div>
            {cartItems?.map((item) => {
              return (
                <div key={item.id}>
                  <CartItem item={item} />
                  <CartItemMobile item={item} />
                </div>
              );
            })}
            <div className="mt-5 grid grid-cols-12">
              <div className="col-span-12 lg:col-span-9"></div>
              <div className="col-span-12 lg:col-span-3">
                <TableRow>
                  <span>Cart Subtotal</span>
                  <span>${totalPrice}</span>
                </TableRow>
                <TableRow>
                  <span>Shipping</span>
                  <span>Free</span>
                </TableRow>
                <TableRow style={{ borderBottom: "1px solid #ccc" }}>
                  <span>You Save</span>
                  <span>Free</span>
                </TableRow>
                <hr />
                <TableRow>
                  <span>You Pay</span>
                  <span>${totalPrice}</span>
                </TableRow>
                <Link href="/checkout" className="flex">
                  <Button variant="contained" className="w-100 mt-3 w-full">
                    CHECKOUT
                  </Button>
                </Link>
                <Link href="/" className="flex">
                  <Button variant="contained" className="w-100 mt-2 w-full">
                    CONTINUE SHOPPING
                  </Button>
                </Link>
              </div>
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
      </Grid>
    </>
  );
}
