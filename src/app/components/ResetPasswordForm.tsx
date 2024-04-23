"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import prisma from "@/lib/prisma";
import { Button, Input } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import PasswordStrength from "./PasswordStrength";
import { passwordStrength } from "check-password-strength";
import { verifyJwt } from "@/lib/jwt";
import { resetPasswordFunc } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

interface Props {
  jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Your password is too short")
      .max(20, "Your password is too long"),

    confirmPassword: z
      .string()
      .min(6, "Your password is too short")
      .max(20, "Your password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password did not match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passStrength, setPassStrength] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const router = useRouter();

  const submitForm: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPasswordFunc(jwtUserId, data.password);
      if (result === "success") {
        toast.success("Your password has been reset");
        //   router.push("/auth/signin");
      } else {
        toast.error("It seems you don't have an account yet");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full md:w-1/2 lg:w-1/3 border shadow rounded-md flex flex-col gap-2 p-4"
    >
      <div className="w-full text-2xl font-bold">Reset Password</div>

      <Input
        label="Password"
        {...register("password")}
        errorMessage={errors.password?.message}
        type={showPassword ? "text" : "password"}
        endContent={
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer"
            type="button"
          >
            {showPassword ? (
              <EyeIcon className="w-4" />
            ) : (
              <EyeSlashIcon className="w-4" />
            )}
          </button>
        }
      />

      <PasswordStrength passStrength={passStrength} />

      <Input
        label="Confirm Password"
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
        type={showPassword ? "text" : "password"}
        endContent={
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer"
            type="button"
          >
            {showPassword ? (
              <EyeIcon className="w-4" />
            ) : (
              <EyeSlashIcon className="w-4" />
            )}
          </button>
        }
      />

      <Button
        type="submit"
        color="primary"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
