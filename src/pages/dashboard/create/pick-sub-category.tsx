import { SubCategory } from "@/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const categories = ["motors", "houses", "plots"];
export default function PickSubCategory({
  subCategories,
}: {
  subCategories: SubCategory[];
}) {
  const router = useRouter();
  const category = router.query.category;

  const categories = [
    { name: "Cars", href: "/motors/cars" },
    { name: "Motorcycles", href: "/motors/motorcycles" },
    { name: "Auto Accessories & Parts", href: "/motors/accessories" },
    { name: "Heavy Vehicles", href: "/motors/heavy-vehicles" },
    { name: "Boats", href: "/motors/boats" },
    { name: "Number Plates", href: "/motors/number-plates" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard/create/pick-category" className="hover:text-foreground">
          <Home className="w-4 h-4" />
        </Link>
        <span>/</span>
        <Link href="#" className="hover:text-foreground">
          {category}
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-center mb-8">
        Now choose the right category for your ad:
      </h1>

      <nav>
        <ul className="rounded-lg border bg-card">
          {subCategories.map((subCategory, index) => (
            <li key={subCategory.name}>
              <Link
                href={`/dashboard/create/${category}?subCategory=${subCategory.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
              >
                <span className="font-medium">{subCategory.name}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              {index < categories.length - 1 && <Separator />}
            </li>
          ))}
        </ul>
      </nav>
    </div>)

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.query.category;
  if (!categories.includes(category as string)) {
    return {
      redirect: {
        destination: "/dashboard/create/pick-category",
        permanent: false,
      },
    };
  }
  const subCategories = await axios.get<{ subCategories: SubCategory[] }>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub-categories`
  );

  return {
    props: {
      subCategories: subCategories.data.subCategories.filter(
        (subCategory) => subCategory.category === category
      ),
    },
  };
};
