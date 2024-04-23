import ResetPasswordForm from "@/app/components/ResetPasswordForm";

interface Props {
  params: {
    jwt: string;
  };
}

export default async function ResetPassPage({ params }: Props) {
  //   console.log({ id: params.jwt });

  return (
    <div className="p-10 md:p-20">
      <ResetPasswordForm jwtUserId={params.jwt} />
    </div>
  );
}
