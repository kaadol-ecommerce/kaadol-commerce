import { Motor } from "@/types";

export default function SingleMotor({ data }: { data: Motor}) {
  return (<h1>hello world</h1>);
}



export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/motors/${id}`);
  const data = await res.json();
  console.log(data, '===')
  return { props: { data } };
}