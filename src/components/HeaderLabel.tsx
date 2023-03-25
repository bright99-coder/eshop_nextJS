import Link from "next/link";
import React from "react";
import { SlEnergy } from "react-icons/sl";
import Button from "./Button";

export default function HeaderLabel({ title, contentButton, href }: HeaderLabel) {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex items-center font-bold text-2xl select-none">
        <SlEnergy className="mr-2" />
        {title}
      </div>
      <Link href={href}>
        <Button variant="contained">{contentButton}</Button>
      </Link>
    </div>
  );
}
