import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/fetchApi";
import { Motor, Purchase } from "@/types";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { parse } from "cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function SmallField({ label, value }: { label: string; value: string }) {
  return (
    <div className="shadow-md rounded-lg aspect-square flex flex-col justify-center items-center flex-1 border border-opacity-5">
      <span className="text-gray-500">{label}</span>
      <span className="text-primary">{value}</span>
    </div>
  );
}

function AdditionalFields({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-2 px-6 py-4  ${
        isLast ? "" : "border-b-[rgb(238, 240, 241)] border-b-[1px]"
      }`}
    >
      <span>{label}</span>
      <span className="text-gray-500">{value}</span>
    </div>
  );
}

export default function SingleMotor({
  motor,
  purchase,
}: {
  motor: Motor;
  purchase: Purchase;
}) {

  const router = useRouter();
  const { status } = router.query as { status: string };
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status === 'successful') {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        const cleanPath = router.pathname.replace(/\[.*?\]/g, (match) => {
          const paramName = match.slice(1, -1);
          return router.query[paramName] as string;
        });
        async function reload() {
          await router.replace(cleanPath, undefined, { scroll: false });
          router.reload();
        }
        
        reload()

      }, 5000)

      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [status])
  if (isVisible) {
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-4 bg-white rounded-lg shadow-md">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-lg font-medium text-gray-700">Verifying your payment..</p>
        <p className="text-sm text-gray-500">Please do not close this window</p>
      </div>
    )
  }
  return (
    <div className="mx-auto container mt-6">
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl">{motor.title}</h2>
        <h3 className="text-primary text-3xl font-semibold">
          {motor.price} RWF
        </h3>
      </div>

      <div className="flex gap-10">
        <div className="w-full">
          <div>
            <div className="relative aspect-video">
              <Image
                src="/wagon.jpg"
                alt="car"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex-1 relative aspect-square">
                  <Image
                    src="/wagon.jpg"
                    alt="car"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-xl font-medium mb-3">Item overview</h3>
            <div className="flex gap-2">
              <SmallField label="Year" value={motor.year.toString()} />
              <SmallField
                label="Kilometers"
                value={motor.kilometers.toString()}
              />
              <SmallField label="Steering side" value={motor.steelingSide} />
              <SmallField
                label="Seating capacity"
                value={motor.seatingCapacity.toString()}
              />
              <SmallField label="Exterior color" value={motor.exteriorColor} />
            </div>
          </div>
          <div className="mt-14 border-b-[rgb(238, 240, 241)] border-b-[1px] pb-5">
            <h3 className="text-xl font-medium mb-3">Additional Details</h3>
            <div className="">
              {motor.doors && (
                <AdditionalFields
                  label="Doors"
                  value={motor.doors.toString()}
                />
              )}
              {motor.bodyType && (
                <AdditionalFields label="Body Type" value={motor.bodyType} />
              )}
              {motor.sellerType && (
                <AdditionalFields
                  label="Seller Type"
                  value={motor.sellerType}
                />
              )}
              {motor.location && (
                <AdditionalFields label="Location" value={motor.location} />
              )}
              {/* {motor.features && motor.features.length > 0 && (
                <li className="text-gray-700">
                  <span className="font-semibold">Features: </span>
                  <span>{motor.features.join(", ")}</span>
                </li>
              )} */}

              {motor.fuelType && (
                <AdditionalFields
                  isLast
                  label="Fuel Type"
                  value={motor.fuelType}
                />
              )}
            </div>
          </div>

          <div className="border-b-[rgb(238, 240, 241)] border-b-[1px] pb-5">
            <h3 className="text-xl font-medium mt-6 mb-2">Description</h3>
            <p>
              The car is in perfect conditions Low milages untouched spare tire.
              without any issues urgent sale. Only serious buyer can knock..
            </p>
          </div>
        </div>
        <div>
          {purchase?.status === "completed" ? (
            <Button>Show phone number</Button>
          ) : (
            <Button asChild>
              <Link href={`/dashboard/plans?itemType=motor&itemId=${motor.id}`}>Pay Your ad</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params as { id: string };
    const { token } = parse(context.req.headers.cookie || "");
    const { data } = await axios.get<{ motor: Motor }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/motors/${id}/owner`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const purchase = await axios.get<{ purchase: Purchase | null }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/motors/${id}/purchase`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      props: {
        motor: data.motor,
        purchase: purchase.data.purchase,
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
