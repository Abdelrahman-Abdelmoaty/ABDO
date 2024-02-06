"use client";
import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useTransition } from "react";
import Link from "next/link";

export default function Header() {
  const { user, signOut } = useClerk();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/">
        <h1 className="text-primary font-black text-3xl">ABDO</h1>
      </Link>
      {user ? (
        <Button onClick={handleSignOut} disabled={isPending}>
          Logout
        </Button>
      ) : (
        <div className="space-x-2">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
