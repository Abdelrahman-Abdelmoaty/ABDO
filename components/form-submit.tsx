import React from "react";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loading-spinner";
import { useFormStatus } from "react-dom";

export default function FormSubmit({ type }: { type: "register" | "login" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending ? <LoadingSpinner className="mr-2" /> : type === "register" ? "Register" : "Login"}
    </Button>
  );
}
