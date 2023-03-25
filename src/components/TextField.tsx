import React from "react";

export default function TextField({
  variant,
  label,
  className,
  type,
  ...props
}: TextField) {
  switch (variant) {
    case "large":
      return (
        <div className={`relative w-full rounded-md ${className}`}>
          <input
            className="form-input bg-transparent h-14 w-full block outline-none border border-gray-500 focus:border-blue-700 hover:border-black rounded-md px-4"
            type={type}
            {...props}
            placeholder=" "
          />
          <label className="form-label inline-block absolute top-2/4 -translate-y-2/4 left-4 select-none pointer-events-none text-base text-gray-500">
            {label}
          </label>
        </div>
      );
    case "small":
      return (
        <div className={`relative w-full rounded-md ${className}`}>
          <input
            className="form-input bg-transparent h-10 w-full block outline-none border border-gray-500 focus:border-blue-700 hover:border-black rounded-md px-4"
            type={type}
            {...props}
            placeholder=" "
          />
          <label className="form-label inline-block absolute top-2/4 -translate-y-2/4 left-4 select-none pointer-events-none text-base text-gray-500">
            {label}
          </label>
        </div>
      );
    default:
      return null;
  }
}
