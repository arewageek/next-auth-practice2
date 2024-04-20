"use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <p>{session.user.email}</p>{" "}
          <Link
            className="text-sky-500 hover:text-sky-600 transition-colors"
            href={"/api/auth/signout"}
          >
            Sig Out
          </Link>
        </>
      ) : (
        <Button
          as={Link}
          color="primary"
          variant="flat"
          href={"/api/auth/signin"}
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default SigninButton;
