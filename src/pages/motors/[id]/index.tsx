import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/fetchApi";
import { Motor } from "@/types";
import Image from "next/image";

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

export default function SingleMotor({ motor }: { motor: Motor }) {
  return (
    <div className="mx-auto max-w-7xl px-4 mt-6">
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
          <Button>Show phone number</Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  const motor = await fetchAPI<Motor>(`/motors/${id}`);
  return { props: { motor } };
};
