import Button from "@/components/Button";
import Grid from "@/components/Grid";
import WishListItem, {
  CartItemWishListMobile,
  HeaderWishList,
} from "@/components/WishListItem";
import { useAuth } from "@/context/AuthContext";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import swal from "sweetalert";

export default function Wishlist() {
  const { wishListItems, setWishListItems } = useShoppingCart();
  const { push } = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    document.title = "WishList Product";
    axios.get(`/api/wishlist`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setWishListItems(res.data.wishlists);
          console.log(res.data.wishlists);
        } else if (res.data.status === 401) {
          push("/login");
          swal("Warning", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!user) {
    if (typeof window !== "undefined") {
      swal("Warning", "Login to goto WishList Page", "warning");
      push("/login");
      return null;
    }
  }
  return (
    <div>
      {wishListItems.length > 0 && (
        <div className="h-12 bg-primary px-5 md:px-10 lg:px-20 flex items-center">
          <h3 className="text-2xl">My Wishlist</h3>
        </div>
      )}
      <Grid variant="primary" className="flex flex-col">
        {wishListItems.length > 0 && <HeaderWishList />}
        {wishListItems.length > 0 ? (
          <div>
            {wishListItems?.map((item: any) => {
              return (
                <div key={item.id}>
                  <WishListItem item={item} />
                  <CartItemWishListMobile item={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-5">
            <FaShoppingCart className="text-6xl text-red-600" />
            No Product WishList
            <Link href="/" className="mt-3">
              <Button variant="outlined">BACK HOME</Button>
            </Link>
          </div>
        )}
      </Grid>
    </div>
  );
}
