import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Grid from "@/components/Grid";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";
import TextArea from "@/components/TextArea";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { TableRow } from "@/components/CartItem";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Checkout() {
  const { push } = useRouter();
  const { totalPrice, setCartItems } = useShoppingCart();
  const { user, setUser } = useAuth();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitOrder = (e: any, payment_mode: any) => {
    e.preventDefault();
    var data = {
      fullname: user?.name,
      email: user?.email,
      phone: user?.phone,
      pincode: user?.pin_code,
      address: user?.address,
      payment_mode: payment_mode,
      payment_id: "",
    };

    axios.post(`/api/place-order`, data).then((res) => {
      if (res.data.status === 200) {
        push("/orders");
        swal("Order Placed Successfully", res.data.message, "success");
        setCartItems([]);
      } else if (res.data.status === 422) {
        swal("All fields are mandetory", "", "error");
      }
    });
  };

  if (!user && typeof window !== "undefined") {
    push("/login");
    swal("Warning", "Login First", "warning");
  }
  return (
    <Grid variant="second" className="gap-2 lg:gap-4">
      <div className="col-span-12">
        <div className="text-xl md:text-2xl flex justify-between">
          Make Your Checkout Here
          <Link href="/cart">
            <Button variant={"contained"}>Back</Button>
          </Link>
        </div>
        <p>Please register in order to checkout more quickly</p>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="name"
            value={user?.name}
            onChange={handleInput}
            variant="small"
            label="Full Name"
            type="text"
          />
          <TextField
            name="email"
            value={user?.email}
            onChange={handleInput}
            variant="small"
            label="Email"
            type="email"
          />
          <TextField
            value={user?.phone}
            onChange={handleInput}
            name="phone"
            variant="small"
            label="Phone Number"
            type="text"
          />
          <TextField
            value={user?.pin_code}
            onChange={handleInput}
            name="pin_code"
            variant="small"
            label="Zip/Pin Code"
            type="text"
          />
        </div>
        <TextArea
          value={user?.address}
          onChange={handleInput}
          name="address"
          variant="small"
          label="Address"
          className="mt-4"
        />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="lg:border border-gray-100 lg:p-4">
          <h2 className="font-bold mb-4 flex justify-between">
            <div>CART TOTALS</div>
          </h2>
          <TableRow>
            <span>Sub Total</span>
            <span>${totalPrice ?? "0"}</span>
          </TableRow>
          <TableRow>
            <span>(+) Shipping</span>
            <span>$5.00</span>
          </TableRow>
          <hr className="my-3" />
          <TableRow className="font-bold">
            <span>Total</span>
            <span>${totalPrice + 5 ?? "0"}</span>
          </TableRow>
          <Button
            variant="contained"
            className="w-full mt-10"
            onClick={(e: any) => submitOrder(e, "cod")}
          >
            Place Order
          </Button>
        </div>
      </div>
    </Grid>
  );
}
