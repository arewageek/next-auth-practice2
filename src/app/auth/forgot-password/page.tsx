"use client";
import { forgotPassword } from "@/lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
    try {
      const result: any = await forgotPassword(data.email);
      if (result) toast.success("A reset password link was sent to your email");
    } catch (e) {
      console.log("error from console", e);
      toast.error("Something went wrong");
    }
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
          type="submit"
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
