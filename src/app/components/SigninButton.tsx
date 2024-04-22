"use client";

import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();

  console.log({ session });

  return (
    <div className="flex items-center gap-2 pr-3">
      {session && session.user ? (
        <>
          <p>{`${session.user.firstName} ${session.user.lastName}`}</p>{" "}
          <Link
            className="text-sky-500 hover:text-sky-600 transition-colors"
            href={"/api/auth/signout"}
          >
            Sig Out
          </Link>
        </>
      ) : (
        <div className="flex gap-5 items-center">
          <Button
            type="button"
            className="bg-transparent"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
          <Button as={Link} color="primary" href={"/auth/signup"}>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default SigninButton;
