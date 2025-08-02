"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, Dialog } from "@/lib/fluid";
import { FaEnvelopeSquare } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Button
        btnBackground="dark"
        layout="circle"
        onClick={() => setIsOpen(true)}
        size="lg"
        disabled={pathname === "/contact"}
        title="Contact Us"
        hoverScale
      >
        <FaEnvelopeSquare />
        <span className="sr-only">Contact Us</span>
      </Button>
      <Dialog
        open={isOpen}
        modal={true}
        title="Contact Us!"
        titleSize="lg"
        titleBold={true}
        closeBtnSize="lg"
        onClose={() => setIsOpen(false)}
      >
        <div className="p-4 selectcoin-wrapper">
          <ContactForm setIsOpen={setIsOpen} />
        </div>
      </Dialog>
    </>
  );
};

export default ContactButton;
