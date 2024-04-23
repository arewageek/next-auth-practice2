import { activateUser } from "@/lib/actions/authActions";

interface Props {
  params: { jwt: string };
}
const ActivationPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === "userNotExist" ? (
        <p className="text-2xl text-red-500">This account does not exist!</p>
      ) : result === "alreadyActivated" ? (
        <p className="text-2xl text-red-500">
          This account is already activated
        </p>
      ) : result === "success" ? (
        <p className="text-2xl text-green-500">
          Success! your account is now activated
        </p>
      ) : (
        <p className="text-2xl text-yellow-500">Oops! something went wrong</p>
      )}
    </div>
  );
};

export default ActivationPage;
