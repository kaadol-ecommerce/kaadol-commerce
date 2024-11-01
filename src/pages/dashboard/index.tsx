import MyAd from "@/components/cards/MyAd";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { Motor } from "@/types";
import { TabsContent } from "@radix-ui/react-tabs";
import { useRouter } from "next/router";

export default function Dashboard({
  motors,
  houses,
  plots,
}: {
  motors: Motor[];
  houses: Motor[];
  plots: Motor[];
}) {
  const router = useRouter();
  const query = router.query;
  const tab = query.tab as string;
  return (
    <div className="container mx-auto p-4 space-y-4 pb-10">
      <h1 className="text-2xl font-semibold">My Ads</h1>

      <Tabs defaultValue={tab ?? 'motors'} className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger
            value="motors"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Motors Ads ({motors.length})
          </TabsTrigger>
          <TabsTrigger
            value="houses"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Houses Ads ({houses.length})
          </TabsTrigger>
          <TabsTrigger
            value="plots"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Plots Ads ({plots.length})
          </TabsTrigger>

          <TabsTrigger
            value="expired"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Expired (0)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="motors">
          {" "}
          <h2 className="font-medium mb-4">motors ({motors.length})</h2>
          <div>
            {motors.map((motor) => (
              <MyAd
                key={motor.id}
                status={"draft"}
                title={motor.title}
                price={`${motor.price}rwf`}
                expiresIn="29 days"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="houses">
          <h2 className="font-medium mb-4">houses ({houses.length})</h2>
          <div>
            {houses.map((house) => (
              <MyAd
                key={house.id}
                status={"draft"}
                title={house.title}
                price={`${house.price}rwf`}
                expiresIn="29 days"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="plots">
          <h2 className="font-medium mb-4">plots ({plots.length})</h2>
          <div>
            {plots.map((plot) => (
              <MyAd
                key={plot.id}
                status={"draft"}
                title={plot.title}
                price={`${plot.price}rwf`}
                expiresIn="29 days"
              />
            ))}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parse(context.req.headers.cookie || "");

  try {
    const motorsPromise = axios
      .get<{ motors: Motor[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/motors/owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data.motors);
    const housesPromise = axios
      .get<{ houses: Motor[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/houses/owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data.houses);

    const plotsPromise = axios
      .get<{ plots: Motor[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plots/owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data.plots);

    const [motors, houses, plots] = await Promise.all([
      motorsPromise,
      housesPromise,
      plotsPromise,
    ]);
    return { props: { motors, houses, plots } };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }
    return { props: {} };
  }
};
