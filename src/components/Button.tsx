import React from "react";

export default function Button({
  variant,
  children,
  className,
  ...props
}: any) {
  switch (variant) {
    case "contained":
      return (
        <div
          {...props}
          className={`py-2 px-4 text-sm font-normal text-white bg-[#1976d2] hover:bg-blue-700 inline-flex items-center justify-center uppercase rounded-sm cursor-pointer select-none ${className}`}
        >
          {children}
        </div>
      );
    case "outlined":
      return (
        <div
          {...props}
          className={`py-2 px-4 text-sm font-normal border border-blue-400 hover:border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center justify-center uppercase rounded-sm cursor-pointer select-none ${className}`}
        >
          {children}
        </div>
      );
    default:
      return null;
  }
}
