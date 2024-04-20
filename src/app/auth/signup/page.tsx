import SignupForm from "@/app/components/SignupForm";
import { Image, Link } from "@nextui-org/react";
import React from "react";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center px-5 md:px-20">
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2">Already signed up?</p>
        <Link className="" href="/auth/signin">
          Sign In
        </Link>
      </div>

      <SignupForm />
      <Image src="/login.png" alt="Login Form" width={500} height={500} />
    </div>
  );
};

export default SignupPage;
