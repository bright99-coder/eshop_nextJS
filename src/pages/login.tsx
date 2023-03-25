import Button from "@/components/Button";
import TextField from "@/components/TextField";
import IconButton from "@/components/IconButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import { TbLockSquareRoundedFilled } from "react-icons/tb";

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.username.value;
    const password = e.target.password.value;
    login(email, password);
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
        <h4 className="text-2xl">Sign in</h4>
      </div>
      <TextField
        name="username"
        required
        variant="large"
        label="Email Adress *"
        type="email"
        autoFocus
      />
      <TextField
        name="password"
        required
        variant="large"
        label="Password *"
        type="password"
        className="my-4"
      />
      <Button className="w-full" type="submit" variant="contained">
        Sign In
      </Button>
      <Button className="my-4 w-full" variant="outlined">
        Login with google
      </Button>
      <Link className="text-end block text-blue-600 underline" href="/register">
        Do not have an account? Sign Up
      </Link>
    </form>
  );
}
