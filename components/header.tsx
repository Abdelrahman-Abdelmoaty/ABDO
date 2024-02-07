"use client";
import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useTransition } from "react";
import Link from "next/link";
import Cart from "./cart";

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
      <div className="space-x-2 flex items-center">
        <Cart />
        {user ? (
          <Button onClick={handleSignOut} disabled={isPending}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
