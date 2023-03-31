import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import HeaderLabel from "@/components/HeaderLabel";
import { useAuth } from "@/context/AuthContext";

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const [input, setInput] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    document.title = "Change Password";
  }, []);
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      current_password: input.current_password,
      password: input.password,
      password_confirmation: input.password_confirmation,
    };
    changePassword(data);
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
