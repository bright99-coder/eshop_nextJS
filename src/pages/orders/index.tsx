import Grid from "@/components/Grid";
import HeaderLabel from "@/components/HeaderLabel";
import OrderItem, {
  HeaderOrder,
  OrderItemMobile,
} from "@/components/OrderItem";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import swal from "sweetalert";
import { useOrderContext } from "./../../context/OrderContext";

export default function Orders() {
  const { orderItems, setOrderItems } = useOrderContext();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    document.title = "Orders";
    axios.get(`/api/orders`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setOrderItems(res.data.orders);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [setOrderItems]);

  if (!user && typeof window !== "undefined") {
      swal("Warning", "Login to Order Page", "warning");
      router.push("/login");
  }
  return (
    <Grid variant="primary">
      <HeaderLabel title="My Orders" contentButton="Back" href="/" />
      <HeaderOrder />
      {orderItems.length > 0 ? (
        orderItems.map((order) => {
          return (
            <div key={order.id}>
              <OrderItem order={order} />
              <OrderItemMobile order={order} />
            </div>
          );
        })
      ) : (
        <div className="card text-center py-5 my-4">
          <h4>You do not have any orders yet</h4>
        </div>
      )}
    </Grid>
  );
}
