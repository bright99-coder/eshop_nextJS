import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { SlEnergy } from "react-icons/sl";
import axios from "axios";

export default function Profile({ data }: any) {
  const [input, setInput] = useState<any>({});
  useEffect(() => {
    let isMounted = true;
    document.title = "My Profile";
    axios.get(`/api/profile`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          console.log(res.data.myProfile);
          setInput(res.data.myProfile);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("phone", input.phone);
    formData.append("pin_code", input.pin_code);
    formData.append("address", input.address);
    axios.post(`/api/profile`, formData).then((res) => {
      if (res.data.status === 200) {
        alert("Update Success");
      } else if (res.data.status === 422) {
      } else if (res.data.status === 404) {
      }
    });
  };

  return (
    <form
      className="w-full md:w-2/4 mx-auto px-5 md:px-0 my-10"
      onSubmit={handleUpdate}
    >
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center font-bold text-2xl select-none">
          <SlEnergy className="mr-2" />
          Profile
        </div>
        <Link href="/change-password">
          <Button variant="contained">Change password</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          value={input.name ?? " "}
          onChange={handleInput}
          name="name"
          size="small"
          label="User Name"
          type="text"
        />
        <FormInput
          value={input.email ?? " "}
          onChange={handleInput}
          name="email"
          size="small"
          label="Email"
          type="email"
          disabled
        />
        <FormInput
          value={input.phone ?? " "}
          onChange={handleInput}
          name="phone"
          size="small"
          label="Phone Number"
          type="text"
        />
        <FormInput
          value={input.pin_code ?? " "}
          onChange={handleInput}
          name="pin_code"
          size="small"
          label="Zip/Pin Code"
          type="text"
        />
      </div>
      <FormInput
        value={input.address ?? " "}
        onChange={handleInput}
        name="address"
        textarea
        size="large"
        label="Address"
        className="mt-4"
        cols={2}
        rows={3}
      />
      <Button type="submit" className="mt-4" variant="contained">
        Save data
      </Button>
    </form>
  );
}
