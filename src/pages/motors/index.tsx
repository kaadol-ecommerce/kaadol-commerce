import BrandName from "@/components/cards/BrandName";
import CarSpec from "@/components/cards/CarSpec/index";
import { fetchAPI } from "@/lib/fetchApi";
import { Motor } from "@/types";
import { GetServerSideProps } from "next";



export default function AllMotors({motors}:{motors: Motor[]}) {
    console.log({motors})
    const dummyBrands =[
        {
            id: 1,
            name: "Toyota",
            count: 220,
        },
        {
            id: 2,
            name: "Hyundai",
            count: 300,
        }, 
        {
            id: 3,
            name: "KN",
            count: 2000,
        },
        {
            id: 4,
            name: "Suzuki",
            count: 1000,
        },
        {
            id: 5,
            name: "Honda",
            count: 1000,
        },
        {
            id: 6,
            name: "BMW",
            count: 1000,
        },
        {
            id: 7,
            name: "Mercedes",
            count: 1000,
        },
        {
            id: 8,
            name: "Audi",
            count: 1000,
        },
        {
            id: 9,
            name: "Volkswagen",
            count: 1000,
        },
        {
            id: 10,
            name: "Volvo",
            count: 1000,
        },
        {
            id: 11,
            name: "Nissan",
            count: 1000,
        },
        {
            id: 12,
            name: "Mitsubishi",
            count: 1000,
        }
    ]
  return (
    <div>
      <div className="flex gap-4 flex-wrap my-5">
        {dummyBrands.map((brand) => (
          <BrandName key={brand.id} name={brand.name} count={brand.count} />
        ))}
      </div>
      <div className="my-10">
        <CarSpec />
        <CarSpec />
        <CarSpec />
        <CarSpec />
        <CarSpec />
        <CarSpec />
        <CarSpec />
        <CarSpec />
        <CarSpec />
        <CarSpec />
      </div>
    </div>
  )}


export const getServerSideProps = (async () => {
  try {
    const motors = await fetchAPI<Motor[]>("/motors");
    return { props: { motors } };
  } catch (error) {
    console.log(error);
    return { props: { motors: [] } };
  }
}) satisfies GetServerSideProps<{ motors: Motor[] | [] }>;
