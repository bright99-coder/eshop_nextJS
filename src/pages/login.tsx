import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import React from "react";
import { TbLockSquareRoundedFilled } from "react-icons/tb";

export default function login() {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-10 px-5 lg:px-7">
      <div className="mb-5 flex flex-col justify-center items-center">
        <IconButton className="bg-violet-700 text-white">
          <TbLockSquareRoundedFilled />
        </IconButton>
        <h4 className="text-2xl">Sign in</h4>
      </div>
      <FormInput size="large" label="Email Adress *" type="text" />
      <FormInput size="large" label="Password *" type="password" className="my-4"/>
      <Button className="w-full" variant="contained">Sign In</Button>
      <Button className="my-4" variant="outlined">
        Login with google
      </Button>
      <Link className="text-end block text-blue-600 underline" href="/register">Do not have an account? Sign Up</Link>
    </div>
  );
}
