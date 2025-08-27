import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ✅ Zod validation schema
const formSchema = z.object({
  pickupLocation: z.string().min(3, "Pickup location is required"),
  destinationLocation: z.string().min(3, "Destination is required"),
  requestedAt: z.date({
    required_error: "Pickup time is required",
  }),
  fare: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), "Fare must be a number"),
});

export default function RideRequestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      destinationLocation: "",
      requestedAt: new Date(),
      fare: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Ride request:", values);
  };

  return (
    <div className="min-h-screen w-full place-content-center">
        <h2 className="text-2xl font-semibold mb-6 text-center">Request a Ride</h2>
      <div className="max-w-lg mx-auto p-6 rounded-2xl shadow-lg border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Pickup Location */}
            <FormField
              control={form.control}
              name="pickupLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pickup location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Destination Location */}
            <FormField
              control={form.control}
              name="destinationLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter destination location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Requested At */}
            <FormField
              control={form.control}
              name="requestedAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pickup Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP p")
                          ) : (
                            <span>Select date & time</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fare (optional) */}
            <FormField
              control={form.control}
              name="fare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fare (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fare amount" {...field} />
                  </FormControl>
                  <FormDescription>
                    If applicable, enter fare amount.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full">
              Submit Ride Request
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
