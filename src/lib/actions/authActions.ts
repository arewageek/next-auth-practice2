"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import {
  compileActivationTemplate,
  compileResetPasswordTemplate,
  sendMail,
} from "../mail";
import { signJwt, verifyJwt } from "../jwt";
import { toast } from "react-toastify";
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

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Seems your email is incorrect");
  }

  const jwtUserId = signJwt({ id: user.id });

  const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${jwtUserId}`;

  const body = compileResetPasswordTemplate(user.firstName, resetPasswordUrl);

  const sent = await sendMail({
    to: user.email,
    subject: "Reset your password",
    body,
  });

  console.log(sent);

  return "success";
}

type ResetPassFunc = (
  jwtUserId: string,
  newPassword: string
) => Promise<"invalidLink" | "errorOccurred" | "userNotExist" | "success">;

export const resetPasswordFunc: ResetPassFunc = async (
  jwtUserId,
  newPassword
) => {
  const payload = verifyJwt(jwtUserId);

  if (!payload) return "userNotExist";

  const userId = payload?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return "userNotExist";

  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      password: newPassword,
    },
  });
  console.log(result);

  return "success";
};
