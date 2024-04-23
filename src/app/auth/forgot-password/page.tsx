"use client";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-10 items-center">
      <form
        className="flex flex-col gap-2 p-2 border rounded-md shadow m-2"
        onSubmit={handleSubmit(submitRequest)}
      >
        <div>Enter Your Email </div>

        <Input
          label="Email"
          {...register("email")}
          startContent={<EnvelopeIcon className="w-4" />}
          errorMessage={errors.email?.message}
        />

        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          color="primary"
        >
          {isSubmitting ? "Please Wait..." : "Submit"}
        </Button>
      </form>

      <Image
        src="/login.png"
        alt="Login Form"
        width={500}
        height={500}
        className="col-span-2"
      />
    </div>
  );
};

export default ForgotPasswordPage;
