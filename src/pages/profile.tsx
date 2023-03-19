import React from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { SlEnergy } from "react-icons/sl";

export default function profile() {
  return (
    <div className="w-full md:w-2/4 mx-auto px-5 md:px-0 my-10">
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
        <FormInput size="small" label="User Name" type="text" />
        <FormInput size="small" label="Email" type="email" />
        <FormInput size="small" label="Phone Number" type="text" />
        <FormInput size="small" label="Zip/Pin Code" type="email" />
      </div>
      <FormInput
        textarea
        size="large"
        label="Address"
        className="mt-4"
        cols={2}
        rows={3}
      />
      <Button className="mt-4" variant="contained">
        Save data
      </Button>
    </div>
  );
}
