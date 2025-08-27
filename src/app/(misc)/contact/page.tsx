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
      <div className="pt-4 px-2 md:px-4 lg:p-4 pb-12 bg-neutral max-w-prose mx-auto md:mb-12">
        <ContactForm />
      </div>
    </>
  );
}
