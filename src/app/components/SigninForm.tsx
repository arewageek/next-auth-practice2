"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SigninForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitForm: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }

    toast.success("Successfully signed in");

    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-2 border rounded-md shadow overflow-hidden"
      >
        <div className="bg-gradient-to-b from-white to-slate-900 p-2 dark:from-slate-700 dark:to-slate-900 font-bold">
          Signin Form
        </div>

        <div className="p-2 flex flex-col gap-2">
          <Input
            label="Email"
            {...register("email")}
            errorMessage={errors.email?.message}
          />

          <Input
            label="Password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            errorMessage={errors.password?.message}
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeIcon className="w-4" />
                ) : (
                  <EyeSlashIcon className="w-4" />
                )}
              </button>
            }
          />

          <div className="flex justify-center items-center gap-3">
            <Button
              isLoading={isSubmitting}
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In" : "Sign In"}
            </Button>
            <Button as={Link} href="/auth/signup">
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
