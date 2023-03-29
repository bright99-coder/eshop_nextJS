import Link from "next/link";

export default function Button({
  variant,
  children,
  className,
  icons,
  href,
  ...props
}: Button) {
  switch (variant) {
    case "contained":
      return (
        <button
          {...props}
          className={`py-2 px-4 text-sm font-normal text-white bg-[#1976d2] hover:bg-blue-700 inline-flex items-center justify-center uppercase rounded-[4px] cursor-pointer select-none ${className}`}
        >
          {children}
        </button>
      );
    case "outlined":
      return (
        <button
          {...props}
          className={`button py-2 px-4 text-sm font-normal border border-blue-400 hover:border-blue-500 text-blue-500 hover:bg-blue-50 inline-flex items-center justify-center uppercase rounded-[4px] cursor-pointer select-none ${className}`}
        >
          {children}
        </button>
      );
    case "startIcon":
      if (href) {
        return (
          <Link
            {...props}
            href={href}
            className={`w-40 py-2 px-4 text-sm font-normal text-gray-600 outline-none hover:bg-blue-50  flex items-center flex-nowrap justify-start uppercase rounded-[4px] cursor-pointer select-none ${className}`}
          >
            <span className="mr-2">{icons}</span>
            <span> {children}</span>
          </Link>
        );
      } else {
        return (
          <button
            {...props}
            className={`w-40 py-2 px-4 text-sm font-normal text-gray-600 outline-none hover:bg-blue-50  flex items-center flex-nowrap justify-start uppercase rounded-[4px] cursor-pointer select-none ${className}`}
          >
            <span className="mr-2">{icons}</span>
            <span> {children}</span>
          </button>
        );
      }
    default:
      return <button>{children}</button>;
  }
}
