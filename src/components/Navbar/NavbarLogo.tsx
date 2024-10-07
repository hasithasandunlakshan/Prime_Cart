import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBarLogo = () => {
  return (
    <Link href="" className="text-xl btn btn-ghost hover:bg-transparent">
      <div className="relative w-16 h-16">
        <Image
          src="/images/c_logo.png"
          layout="fill"
          objectFit="cover"
          alt="C Logo"
          className="absolute"
        />
      </div>
    </Link>
  );
};

export default NavBarLogo;
