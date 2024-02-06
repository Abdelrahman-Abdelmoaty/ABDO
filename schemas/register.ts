import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required.",
    })
    .min(8, {
      message: "Name must be at least 8 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: z
    .string()
    .min(1, {
      message: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.",
    }),
});

export type RegisterForm = z.infer<typeof RegisterSchema>;
