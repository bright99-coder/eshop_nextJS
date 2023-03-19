import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div>
      <div className="h-12 bg-primary px-24 flex items-center">
        <Link className="text-blue-500 underline" href="/collections">
          Collections
        </Link>{" "}
        /
        <Link className="text-blue-500 underline" href="/collections">
          Laptop
        </Link>
      </div>
      <div className="px-24">
        <div className="mt-4 mb-8 flex gap-4">
          <Button variant="outlined">All Brand</Button>
          <Button variant="outlined">ASUS</Button>
          <Button variant="outlined">DELl</Button>
          <Button variant="outlined">LENOVO</Button>
        </div>
        <div>Product LIst</div>
      </div>
    </div>
  );
}
