interface Props {
  params: { id: string };
}
const ActivationPage = ({ params }: Props) => {
  return params.id;
};

export default ActivationPage;
