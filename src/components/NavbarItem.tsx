import Link from 'next/link'
import React from 'react'

export default function NavbarItem({title, href}:any) {
  return (
    <Link className="ml-7" href={href}>{title}</Link>
  )
}
