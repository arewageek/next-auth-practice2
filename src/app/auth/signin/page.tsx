import SigninForm from "@/app/components/SigninForm";
import Link from "next/link";
import React from "react";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div className="p-5 md:p-12 flex flex-col items-center gap-5">
      <SigninForm callbackUrl={searchParams.callbackUrl} />
      <Link href={"/auth/forgot-password"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
