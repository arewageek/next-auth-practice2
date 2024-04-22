"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import { compileActivationTemplate, sendMail } from "../mail";
// import * as bcrypt from "bcrypt";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  const result = await prisma.user.create({
    // bcrypt not working
    // data: {
    //   ...user,
    //   password: await bcrypt.hash(user.password, 10),
    // },

    // alternative 2
    data: user,
  });

  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${result.id}`;

  const body = compileActivationTemplate(user.firstName, activationUrl);

  await sendMail({
    to: user.email,
    subject: "Activate your account",
    body,
  });
}
