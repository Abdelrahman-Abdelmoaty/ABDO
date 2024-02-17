"use server";

import { getUserByEmail } from "@/data/user";
import { LoginForm, LoginSchema } from "@/schemas/login";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const login = async (values: LoginForm) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password || "");
    if (isPasswordCorrect) {
      return { success: "Logged in successfuly!" };
    }
  }

  return { error: "Wrong email or password!" };
};
