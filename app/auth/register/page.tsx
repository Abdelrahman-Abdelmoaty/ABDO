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
import { RegisterForm, RegisterSchema } from "@/schemas/register";
import { register } from "@/actions/register";
import { useEffect, useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useAuth, useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/");
    }
  }, [isLoaded, userId]);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [pending, startTransition] = useTransition();

  const { signUp } = useSignUp();

  async function onSubmit(values: RegisterForm) {
    startTransition(async () => {
      setError("");
      setSuccess("");
      const { success, error } = await register(values);

      if (success) {
        const result = await signUp?.create({
          emailAddress: values.email,
          password: values.password,
        });

        // setSuccess(success);
        toast.success(success);
        router.push("/");
      }

      if (error) {
        setError(error);
      }
    });
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Register to our amazing store</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
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
                Register
              </Button>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Already have an account?</p>
        <Link href="/auth/login">
          <Button variant="link">Login</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
