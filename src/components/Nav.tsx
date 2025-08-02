"use client";

import dynamic from "next/dynamic";

const ContactButton = dynamic(() => import("./ui/ContactButton"), { ssr: false });

const Nav = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <ContactButton />
    </div>
  );
};

export default Nav;
