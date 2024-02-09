"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginForm, LoginSchema } from "@/schemas/login";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { toast } from "sonner";
import { login } from "@/actions/login";
import { useSignIn } from "@clerk/nextjs";

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [pending, startTransition] = useTransition();

  const { isLoaded, signIn, setActive } = useSignIn();

  function onSubmit(values: LoginForm) {
    startTransition(async () => {
      setError("");
      setSuccess("");
      const { success, error } = await login(values);
      if (success) {
        const result = await signIn?.create({
          identifier: values.email,
          strategy: "password",
          password: values.password,
        });

        if (result?.status === "complete") {
          await setActive?.({ session: result.createdSessionId });
        }
        setSuccess(success);
      }
      if (error) {
        setError(error);
      }
    });
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to our amazing store</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>{error && <FormError message={error} />}</FormItem>
            <FormItem>{success && <FormSuccess message={success} />}</FormItem>
            <FormItem>
              <Button type="submit" disabled={pending}>
                Login
              </Button>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/register">
          <Button variant="link">Register</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
