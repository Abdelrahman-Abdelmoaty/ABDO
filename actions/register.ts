"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterForm, RegisterSchema } from "@/schemas/register";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterForm) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await db.cart.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(verificationToken.email, verificationToken.token);
  // return { success: "Confirmation email sent!" };

  return { success: "Signed up successfuly!" };
};
