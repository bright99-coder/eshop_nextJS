import React, { useState } from "react";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import axios from "axios";
import swal from "sweetalert";
import HeaderLabel from "@/components/HeaderLabel";

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
      <HeaderLabel
        title="Change Password"
        contentButton="Back"
        href="/profile"
      />
      <div className="grid grid-cols-1 gap-4">
        <TextField
          name="current_password"
          value={input.current_password}
          onChange={handleInput}
          variant="small"
          label="Current Password"
          type="password"
        />
        <TextField
          name="password"
          value={input.password}
          onChange={handleInput}
          variant="small"
          label="New Password"
          type="password"
        />
        <TextField
          name="password_confirmation"
          value={input.password_confirmation}
          onChange={handleInput}
          variant="small"
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
