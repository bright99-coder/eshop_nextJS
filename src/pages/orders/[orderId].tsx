import Button from "@/components/Button";
import Grid from "@/components/Grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";
import HeaderLabel from "@/components/HeaderLabel";
import OrderItemDetails, {
  Header,
  HeaderOrderItemDetails,
  Item,
  OrderItemDetailsMobile,
} from "@/components/OrderItemDetails";

export default function OrderDetail() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<OrderItem>();
  const [orderItems, setOrderItems] = useState<OrderItemDetail[]>([]);
  var totalPrice = 0;

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    document.title = "Orders Details";
    axios.get(`/api/orders/${orderId}`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setOrder(res.data.data.order);
          setOrderItems(res.data.data.orderItems);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [orderId]);

  return (
    <Grid variant="third">
      <HeaderLabel title="Order Details" contentButton="Back" href="/orders" />
      <div className="grid grid-cols-12 lg:p-4 lg:shadow lg:border border-gray-50 rounded-md">
        <div className="col-span-12 md:col-span-6">
          <Header content="Order Details" />
          <Item title="Order Id:">{order?.id}</Item>
          <Item title="Tracking Id/No:">{order?.tracking_no}</Item>
          <Item title="Order Created Date:">{order?.created_at}</Item>
          <Item title="Payment Mode:">{order?.payment_mode}</Item>
          <Button variant="outlined">
            Order Status Message: {order?.status_message}
          </Button>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Header content="User Details" />
          <Item title="Fullname:">{order?.fullname}</Item>
          <Item title="Email:">{order?.email}</Item>
          <Item title="Phone:">{order?.phone}</Item>
          <Item title="Address:">{order?.address}</Item>
          <Item title="Pincode:">{order?.pincode}</Item>
        </div>
        <div className="col-span-12">
          <Header content="Order Items" className="mb-3" />
          <HeaderOrderItemDetails />
          {orderItems?.map((orderItem) => (
            <div key={orderItem.id}>
              <OrderItemDetails orderItem={orderItem} />
              <OrderItemDetailsMobile orderItem={orderItem} />
              <p className="hidden">
                {(totalPrice += orderItem.price * orderItem.quantity)}
              </p>
            </div>
          ))}
          <div className="col-span-12">
            <Item className="justify-between">
              <Header content="Total Amount :" />
              <Header content={`${totalPrice}$`} />
            </Item>
          </div>
        </div>
      </div>
    </Grid>
  );
}
