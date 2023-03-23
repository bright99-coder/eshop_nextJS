import React, { useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { SlEnergy } from "react-icons/sl";
import axios from "axios";
import swal from "sweetalert";

export default function ChangePassword() {
  const [input, setInput] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const handleInput = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("current_password", input.current_password);
    formData.append("password", input.password);
    formData.append("password_confirmation", input.password_confirmation);
    axios.post(`/api/change-password`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 422) {
        swal("All Fields are mandetory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };
  return (
    <form
      className="w-full md:w-2/4 px-5 md:px-10 lg:px-24 mx-auto my-10"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center font-bold text-2xl select-none">
          <SlEnergy className="mr-2" />
          Change Password
        </div>
        <Link href="/profile">
          <Button variant="contained">Back</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <FormInput
          name="current_password"
          value={input.current_password}
          onChange={handleInput}
          size="small"
          label="Current Password"
          type="password"
        />
        <FormInput
          name="password"
          value={input.password}
          onChange={handleInput}
          size="small"
          label="New Password"
          type="password"
        />
        <FormInput
          name="password_confirmation"
          value={input.password_confirmation}
          onChange={handleInput}
          size="small"
          label="Confirm Password"
          type="password"
        />
      </div>
      <Button type="submit" className="mt-4" variant="contained">
        Update password
      </Button>
    </form>
  );
}
