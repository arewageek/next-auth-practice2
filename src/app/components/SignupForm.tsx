"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { z } from "zod";
import validator from "validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 48 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special Characters allowed"),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(45, "Last name must be less than 48 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special Characters allowed"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be"),
    accepted: z.literal(true, {
      errorMap: () => ({ message: "Please accept all terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password did not match",
    path: ["password", "confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const [isVisiblePassword, setIsVisibilePassword] = useState(true);

  const toggleIsVisiblePass = () => setIsVisibilePassword((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    console.log({ data });
  };

  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md"
    >
      <Input
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        {...register("firstName")}
        label="First Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        {...register("lastName")}
        label="Last Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        label="Password"
        {...register("password")}
        type={isVisiblePassword ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        endContent={
          isVisiblePassword ? (
            <EyeIcon className="w-4" onClick={toggleIsVisiblePass} />
          ) : (
            <EyeSlashIcon
              className="w-4 cursor-pointer"
              onClick={toggleIsVisiblePass}
            />
          )
        }
        className="col-span-2"
      />

      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        label="Confirm Password"
        type={isVisiblePassword ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        className="col-span-2"
      />

      <Checkbox className="col-span-2" {...register("accepted")}>
        I accept The <Link href="#">Terms</Link>
      </Checkbox>
      {!!errors.accepted && (
        <p className="text-xs text-red-400">{errors.accepted.message}</p>
      )}

      <div className="col-span-2 flex justify-center">
        <Button type="submit" className="w-48" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
