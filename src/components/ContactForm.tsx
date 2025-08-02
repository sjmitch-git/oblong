"use client";

import { useEffect, useState } from "react";
import { useForm } from "@formspree/react";
import { Form, Fieldset, TextInput, Alert, TextArea, Button } from "@/lib/fluid";

type ContactFormProps = {
  setIsOpen?: (open: boolean) => void;
};

export default function ContactForm({ setIsOpen }: ContactFormProps) {
  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const [messagePlaceholder, setMessagePlaceholder] = useState("");

  useEffect(() => {
    setEmailPlaceholder("myname@email.com");
    setMessagePlaceholder("Write your message here...");
  }, []);

  const [state, handleSubmit, reset] = useForm("mldlngae");

  useEffect(() => {
    if (state.succeeded && setIsOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, setIsOpen]);

  const closeDialog = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  if (state.succeeded) {
    return (
      <div>
        <Alert
          status="success"
          layout="default"
          rounded="none"
          title="Success"
          message="Thank you for your message! We will get back to you soon."
        />
        {!setIsOpen && (
          <div className="mt-8 flex justify-center">
            <Button onClick={reset} size="lg" btnBackground="secondary" hoverScale>
              Reset
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (state.errors) {
    return (
      <div>
        <Alert
          status="error"
          layout="default"
          rounded="none"
          title="Oops!"
          message="Something went wrong."
        />
        {!setIsOpen && (
          <div className="mt-8 flex justify-center">
            <Button onClick={reset} size="lg" btnBackground="danger" hoverScale>
              Try Again?
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="form-contact">
      <Form
        onsubmit={handleSubmit}
        actions={true}
        showCancel={setIsOpen ? true : false}
        submitLabel="Submit"
        onCancel={closeDialog}
      >
        <Fieldset legendSize="xl" legendText={!setIsOpen ? "Contact Us!" : undefined} spacing="8">
          <TextInput
            autocomplete="email"
            hint
            id="email"
            type="email"
            label="e-Mail"
            layout="row"
            name="email"
            placeholder={emailPlaceholder}
            required
            title="Enter a vaild e-Mail address"
            size="lg"
          />
          <TextInput
            id="subject"
            label="Subject"
            layout="row"
            name="subject"
            title="Enter your subject"
            size="lg"
          />
          <TextArea
            label="Message"
            id="message"
            name="message"
            placeholder={messagePlaceholder}
            rows={4}
            resize={true}
            required
            layout="col"
            size="lg"
          />
          <input type="text" name="_gotcha" className="hidden" />
        </Fieldset>
      </Form>
    </div>
  );
}
