import { Card, CardContent } from "@/components/ui/card"
import { CarFront, House, Grid2x2XIcon } from "lucide-react"
import Link from "next/link"

export default function PickCategory() {
  const categories = [
    {
      title: "Motors",
      icon: CarFront,
      href: "pick-sub-category",
      type: "motors",
    },
    {
      title: "Houses",
      icon: House,
      href: "pick-sub-category",
      type: "houses",
    },
    {
      title: "Property for Sale",
      icon: Grid2x2XIcon,
      href: "pick-sub-category",
      type: "plots",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2">Hello, what are you listing today?</h1>
        <p className="text-muted-foreground">Select the area that best suits your ad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link key={category.title} href={`${category.href}?category=${category.type}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[160px]">
                <category.icon className="w-12 h-12 mb-4 text-red-500" strokeWidth={1.5} />
                <h2 className="font-medium text-lg">{category.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
