import Button from "@/components/Button";
import TextField from "@/components/TextField";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import React, { useState } from "react";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function Register() {
  const { setUser } = useAuth();
  const { push } = useRouter();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    errors: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: input.name,
      email: input.email,
      password: input.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          sessionStorage.setItem("auth_token", res.data.token);
          sessionStorage.setItem("user", res.data.username);
          setUser(res.data.username);
          swal("Success", res.data.message, "success");
          push("/profile");
        } else {
          setInput({
            ...input,
            errors: res.data.validation_errors,
          });
        }
      });
    });
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
        value={input.name}
        name="name"
        variant="large"
        label="Full Name *"
        type="text"
        autoFocus
        helperText={input.errors.name}
      />
      <TextField
        onChange={handleInput}
        value={input.email}
        name="email"
        className="mt-4"
        variant="large"
        label="Email Address *"
        type="text"
        helperText={input.errors.email}
      />
      <TextField
        onChange={handleInput}
        value={input.password}
        name="password"
        className="mt-4"
        variant="large"
        label="Password *"
        type="password"
        helperText={input.errors.password}
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
