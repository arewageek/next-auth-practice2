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

const SignupForm = () => {
  const [isVisiblePassword, setIsVisibilePassword] = useState(true);

  const toggleIsVisiblePass = () => setIsVisibilePassword((prev) => !prev);
  return (
    <form className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md">
      <Input label="First Name" startContent={<UserIcon className="w-4" />} />
      <Input label="Last Name" startContent={<UserIcon className="w-4" />} />
      <Input
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        label="Password"
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
        label="Confirm Password"
        type={isVisiblePassword ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        className="col-span-2"
      />

      <Checkbox className="col-span-2">
        I accept The <Link href="#">Terms</Link>
      </Checkbox>

      <div className="col-span-2 flex justify-center">
        <Button type="submit" className="w-48" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
