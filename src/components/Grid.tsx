import React, { ReactNode } from "react";

export default function Grid({
  children,
  variant,
  className,
  ...props
}: Grid) {
  switch (variant) {
    case "primary":
      return (
        <div
          {...props}
          className={`px-5 md:px-10 lg:px-20 py-5 lg:py-10 ${className}`}
        >
          {children}
        </div>
      );
    case "second":
      return (
        <div
          {...props}
          className={`grid grid-cols-12 px-5 md:px-16 lg:px-32 lg:gap-8 py-5 lg:py-10 ${className}`}
        >
          {children}
        </div>
      );
    case "third":
      return (
        <div
          {...props}
          className={`px-5 md:px-16 lg:px-32 py-5 lg:py-10 ${className}`}
        >
          {children}
        </div>
      );
    default:
      return <div>{children}</div>;
  }
}
