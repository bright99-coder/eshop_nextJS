import useClickOutside from "@/hooks/useClickOutside";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import SearchItem from "./SearchItem";

export default function SearchWrapper({ className }: any) {
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const debouncedValue = useDebounce(searchTerm, 1000);

  const handleClickOutside = () => setIsOpen(false);
  useClickOutside(inputRef, handleClickOutside);

  const handleChange = (e: any) => {
    const searchTerm = e.target.value;
    if (!searchTerm.startsWith(" ")) {
      setSearchTerm(searchTerm);
    }
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    axios
      .get(`/api/search-product`, {
        params: {
          keyword: debouncedValue,
        },
      })
      .then((res) => {
        setSearchResult(res.data.searchProducts);
      });
  }, [debouncedValue]);

  const handleKeyDown = (e: any) => {
    setIsOpen(true);
    const searchResult = e.target.value;
    if (e.key === "Enter" && searchResult !== "") {
      setSearchTerm(searchTerm);
      setIsOpen(false);
      push(`/search/${searchTerm}`);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchResult([]);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`relative w-full md:w-2/4 h-searchWrapper max-w-lg ${className}`}
    >
      <BsSearch className="absolute left-4 top-2/4 -translate-y-2/4 cursor-pointer text-lg text-gray-500" />
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for..."
        className={`w-full h-full bg-primary rounded-t-3xl pl-10 pr-4 outline-none z-10 ${
          !isOpen && "rounded-b-3xl"
        }`}
      />
      <TiDeleteOutline
        className="absolute right-4 top-2/4 -translate-y-2/4 text-xl cursor-pointer text-gray-500"
        onClick={handleClear}
      />
      {isOpen && (
        <div className="absolute w-full min-h-[150px] max-h-[300px] bg-primary top-10 rounded-b-3xl px-4 overflow-auto">
          {searchResult?.map((product) => {
            return (
              <div key={product.id}>
                <SearchItem product={product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
