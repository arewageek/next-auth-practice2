import { cn } from "@nextui-org/react";

interface Props {
  passStrength: number;
}

const PasswordStrength = ({ passStrength }: Props) => {
  return (
    <div className={cn("flex gap-2 col-span-2")}>
      {Array.from({ length: passStrength + 1 }).map((i, index) => (
        <div
          key={index}
          className={cn("h-2 w-32 rounded-md", {
            "bg-red-500": passStrength === 0,
            "bg-orange-500": passStrength === 1,
            "bg-yellow-500": passStrength === 2,
            "bg-green-500": passStrength === 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
