import { Button } from "../ui/button";

export default function BrandName({name, count}:{name:string, count: number}) {
  return (
    <Button variant="outline">
      <span className="flex items-center gap-2 font-semibold">
        <span className="">{name}</span>
        <span className="text-accent">{count}</span>
      </span>
    </Button>
  );
}
