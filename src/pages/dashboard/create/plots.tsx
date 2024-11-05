import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  price: z.string().min(1),
  longitude: z.string().min(1),
  latitude: z.string().min(1),
});

export default function CreateHouseForm() {
  const router = useRouter();
  const { subCategory } = router.query;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
      longitude: "",
      latitude: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = Cookies.get("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plots`,
        { ...values, subCategory: Number(subCategory) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/dashboard?tab=plots");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return router.replace("/");
      }
      throw error;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 container pb-10 mt-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter plot title" {...field} />
              </FormControl>
              <FormDescription>
                Provide a descriptive title for your plot listing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the plot"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of the plot.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter plot location" {...field} />
              </FormControl>
              <FormDescription>
                Specify the address or general location of the plot.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter price" {...field} />
              </FormControl>
              <FormDescription>Specify the price of the plot.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder="Enter longitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder="Enter latitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Create Plot</Button>
      </form>
    </Form>
  );
}
