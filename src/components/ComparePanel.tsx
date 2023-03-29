import { useCompare } from "@/context/CompareContext";
import React from "react";
import Button from "./Button";
import CompareItem from "./CompareItem";

export default function ComparePanel() {
  const { setOpenModal, compareItems, removeAll } = useCompare();

  return (
    <div className="flex justify-center z-10">
      <div className="w-full max-w-5xl grid grid-cols-12 border border-gray-300 shadow-sm fixed bottom-0 bg-white">
        <div className="col-span-9 grid grid-cols-3">
          {compareItems.map((item) => (
            <CompareItem product={item} key={item.id} />
          ))}
        </div>
        {compareItems.length > 1 && (
          <div className="col-span-3 flex flex-col justify-center items-center">
            <Button
              variant="contained"
              className="mb-2"
              onClick={() => setOpenModal(true)}
            >
              Compare
            </Button>
            <Button
              variant="outlined"
              className="border-none capitalize"
              onClick={() => removeAll()}
            >
              Delete All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
