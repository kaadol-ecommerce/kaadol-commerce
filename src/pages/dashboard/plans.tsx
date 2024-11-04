import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plan } from "@/types";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const plans: Plan[] = [
  {
    id: 2,
    name: "Basic",
    description: "Active with high exposure for 30 days",
    price: 669,
    duration: 30,
  },
];

export default function Plans({ plans }: { plans: Plan[] }) {
  const router = useRouter();
  const { itemId, itemType } = router.query;
  async function handleSelectPlan(planId: number) {
    const token = Cookies.get("token");
    const paymentLink = await axios.post<{ link: string }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/link`,
      {
        planId,
        itemId: Number(itemId),
        itemType,
        redirectLink: `${window.location.origin}/dashboard/${itemType}s/${itemId}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.replace(paymentLink.data.link);
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">
          Select a bundle that is right for you
        </h1>
      </div>

      <div className="flex justify-center gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative`}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="">USD</span>
              </div>

              <Button className="w-full" variant={"default"} onClick={() => handleSelectPlan(plan.id)}>
                Select {plan.name}
              </Button>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active for</span>
                  <span className="font-medium">{plan.duration} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemTypes = ["motor", "house", "plot"];
  try {
    const itemId = context.query.itemId;
    const itemType = context.query.itemType;
    if (!itemTypes.includes(itemType as string) || !itemId) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: true,
        },
      };
    }
    const res = await axios.get<{ plans: Plan[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans`
    );
    return {
      props: {
        plans: res.data.plans,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }
    throw error;
  }
};
