import Grid from "@/components/Grid";
import HeaderLabel from "@/components/HeaderLabel";
import OrderItem, {
  HeaderOrder,
  OrderItemMobile,
} from "@/components/OrderItem";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/orders`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setOrders(res.data.orders);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [setOrders]);

  return (
    <Grid variant="primary">
      <HeaderLabel title="My Orders" contentButton="Back" href="/" />
      <HeaderOrder />
      {orders.length > 0 ? (
        orders.map((order) => {
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
