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

export default function Login() {
  const { user, setUser } = useAuth();
  const { push } = useRouter();

  const [input, setInput] = useState({
    email: "",
    password: "",
    errors: {
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
      email: input.email,
      password: input.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          sessionStorage.setItem("auth_token", res.data.token);
          sessionStorage.setItem("user", res.data.username);
          setUser(res.data.username);
          swal("Success", res.data.message, "success");
          push("/");
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setInput({
            ...input,
            errors: res.data.validation_errors,
          });
        }
      });
    });
  };
  if (user) {
    push("/");
  }
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
        name="email"
        variant="large"
        label="Email Adress *"
        type="email"
        autoFocus
        onChange={handleInput}
        value={input.email}
        helperText={input.errors.email}
      />
      <TextField
        name="password"
        variant="large"
        label="Password *"
        type="password"
        className="mt-4"
        onChange={handleInput}
        value={input.password}
        helperText={input.errors.password}
      />
      <Button className="w-full mt-4" type="submit" variant="contained">
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
