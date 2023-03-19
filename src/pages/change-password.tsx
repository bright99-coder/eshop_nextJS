import React from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { SlEnergy } from "react-icons/sl";

export default function changePassword() {
  return (
    <div className="w-full md:w-2/4 px-5 md:px-10 lg:px-24 mx-auto my-10">
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
        <FormInput size="small" label="Current Password" type="password" />
        <FormInput size="small" label="New Password" type="password" />
        <FormInput size="small" label="Confirm Password" type="password" />
      </div>
      <Button className="mt-4" variant="contained">
        Update password
      </Button>
    </div>
  );
}
