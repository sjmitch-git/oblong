import type { Metadata } from "next";

import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";

const title = "Contact";
const description =
  "Get in touch with Oblong for web and AI services, project inquiries, or to discuss possible digital solutions. Use the form below to send us your message.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function ContactPage() {
  return (
    <>
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 max-w-prose mx-auto">
        <ContactForm />
      </div>
    </>
  );
}
