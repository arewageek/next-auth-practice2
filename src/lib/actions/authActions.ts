"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import { compileActivationTemplate, sendMail } from "../mail";
import { signJwt, verifyJwt } from "../jwt";
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

  const jwtUserId = signJwt({ id: result.id });

  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;

  const body = compileActivationTemplate(user.firstName, activationUrl);

  await sendMail({
    to: user.email,
    subject: "Activate your account",
    body,
  });
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"invalidLink" | "userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId);

  if (!payload) return "invalidLink";

  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return "userNotExist";
  if (user.emailVerified) return "alreadyActivated";

  const result = await prisma.user.update({
    where: { id: userId },
    data: { emailVerified: new Date() },
  });

  return "success";
};
