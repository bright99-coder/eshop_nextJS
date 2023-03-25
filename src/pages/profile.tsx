import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import axios from "axios";
import HeaderLabel from "@/components/HeaderLabel";
import TextArea from "@/components/TextArea";

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
      <HeaderLabel
        title="Profile"
        contentButton="Change password"
        href="/change-password"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          value={input.name ?? " "}
          onChange={handleInput}
          name="name"
          label="User Name"
          type="text"
          variant="small"
        />
        <TextField
          value={input.email ?? " "}
          onChange={handleInput}
          className="bg-gray-100 pointer-events-none"
          name="email"
          variant="small"
          label="Email"
          type="email"
          disabled
        />
        <TextField
          value={input.phone ?? " "}
          onChange={handleInput}
          name="phone"
          variant="small"
          label="Phone Number"
          type="text"
        />
        <TextField
          value={input.pin_code ?? " "}
          onChange={handleInput}
          name="pin_code"
          variant="small"
          label="Zip/Pin Code"
          type="text"
        />
      </div>
      <TextArea
        value={input.address ?? " "}
        onChange={handleInput}
        name="address"
        label="Address"
        className="mt-4"
        variant="small"
      />
      <Button type="submit" className="mt-4" variant="contained">
        Save data
      </Button>
    </form>
  );
}
