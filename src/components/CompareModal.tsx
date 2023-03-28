import { useCompare } from "@/context/CompareContext";
import React from "react";
import Button from "./Button";
import CompareItem from "./CompareItem";

export default function CompareModal() {
  const { compareItems } = useCompare();

  return (
    <div className="grid grid-cols-12 border border-gray-300 shadow-sm fixed bottom-0 bg-white mx-20">
      <div className="col-span-9 flex">
        {compareItems.map((item) => (
          <CompareItem product={item} key={item.id} />
        ))}
      </div>
      {compareItems.length > 1 && (
        <div className="col-span-3 flex flex-col justify-center items-center">
          <Button variant="contained" className="mb-3">
            Compare
          </Button>
          <Button variant="outlined">Delete All</Button>
        </div>
      )}
    </div>
  );
}
