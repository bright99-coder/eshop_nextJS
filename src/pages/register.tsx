import Button from "@/components/Button";
import TextField from "@/components/TextField";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import React, { useState } from "react";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };
    register(data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 lg:w-1/3 mx-auto my-10 px-5 lg:px-7"
    >
      <div className="mb-5 flex flex-col justify-center items-center">
        <IconButton className="bg-violet-700 text-white">
          <TbLockSquareRoundedFilled />
        </IconButton>
        <h4 className="text-2xl">Sign up</h4>
      </div>
      <TextField
        onChange={handleInput}
        value={registerInput.name}
        name="name"
        variant="large"
        label="Full Name *"
        type="text"
        autoFocus
      />
      <TextField
        onChange={handleInput}
        value={registerInput.email}
        name="email"
        className="mt-4"
        variant="large"
        label="Email Address *"
        type="text"
      />
      <TextField
        onChange={handleInput}
        value={registerInput.password}
        name="password"
        className="mt-4"
        variant="large"
        label="Password *"
        type="password"
      />
      <Button type="submit" className="mt-4 w-full" variant="contained">
        Sign up
      </Button>
      <Link
        className="text-end block text-blue-600 underline mt-4"
        href="/login"
      >
        Already have an account? Sign in
      </Link>
    </form>
  );
}
