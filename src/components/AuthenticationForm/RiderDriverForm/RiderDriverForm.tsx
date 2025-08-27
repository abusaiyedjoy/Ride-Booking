import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Password from "../../ui/Password";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icons/Logo";
import { useCreateDriverMutation } from "@/redux/features/driver/driver.api";
import { useCreateriderMutation } from "@/redux/features/rider/rider.api";

// ✅ Rider Schema
const riderProfileSchema = z.object({
  phone: z.string().min(8, "Phone number is required"),
  picture: z.string().url("Must be a valid URL").optional(),
  paymentMethod: z.string().min(3, "Payment method is required"),
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .tuple([z.number(), z.number()])
      .refine(
        ([lng, lat]) => lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
        {
          message: "Coordinates must be valid longitude and latitude",
        }
      ),
    address: z.string().min(3, "Address is required"),
  }),
});

// ✅ Driver Schema (based on backend model)
const driverSchema = z.object({
  driverLicenseNumber: z.string().min(3, "License number is required"),
  vehicleInfo: z.object({
    type: z.string().min(1, "Vehicle type is required"),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    color: z.string().min(1, "Color is required"),
    modelYear: z
      .number({ invalid_type_error: "Year must be a number" })
      .min(1900, "Enter valid year")
      .max(new Date().getFullYear() + 1, "Year cannot be in future"),
    licensePlate: z.string().min(2, "License plate is required"),
  }),
});

export function RiderDriverForm() {
  const [activeTab, setActiveTab] = useState<"RIDER" | "DRIVER">("RIDER");
  const [createrider] = useCreateriderMutation();
  const [createDriver] = useCreateDriverMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  const navigate = useNavigate();

  // Form setup
  const riderProfileForm = useForm<z.infer<typeof riderProfileSchema>>({
    resolver: zodResolver(riderProfileSchema),
    defaultValues: {
      phone: "",
      picture: "",
      paymentMethod: "",
      location: { type: "Point", coordinates: [0, 0], address: "" },
    },
  });

  // Driver form setup
  const driverForm = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      driverLicenseNumber: "",
      vehicleInfo: {
        type: "",
        make: "",
        model: "",
        color: "",
        modelYear: undefined,
        licensePlate: "",
      },
    },
  });

  // Rider Submit
  const onSubmitRiderProfile = async (
    data: z.infer<typeof riderProfileSchema>
  ) => {
    try {
      const result = await createrider({
        userId: userInfo?.data?._id,
        phone: data.phone,
        picture: data.picture,
        paymentMethod: data.paymentMethod,
        location: data.location,
      });
      console.log(result);
      toast.success("Rider profile created successfully");
      navigate("/rider/profile");
    } catch (error: any) {
      toast.error(error.message || "Failed to create rider profile");
    }
  };

  // Driver Submit
  const onSubmitDriver = async (data: z.infer<typeof driverSchema>) => {
    if (!data) return;
    try {
      const result = await createDriver({
        userId: userInfo?.data?._id,
        driverLicenseNumber: data.driverLicenseNumber,
        vehicleInfo: data.vehicleInfo,
      }).unwrap();
      console.log(result);
      toast.success("Driver profile created successfully");
      navigate("/driver/profile");
    } catch (error) {
      toast.error("Failed to create driver profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 my-3 items-center justify-center px-4">
      <div className="flex justify-center gap-2 md:justify-start">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <Logo />
        </Link>
      </div>

      <div className="w-full max-w-lg rounded-xl border shadow-md bg-background p-6">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {["RIDER", "DRIVER"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "RIDER" | "DRIVER")}
              className={cn(
                "px-6 py-2 rounded-md border transition-all font-medium",
                activeTab === tab
                  ? "bg-primary text-foreground border-primary"
                  : "text-foreground border"
              )}
            >
              {tab === "RIDER" ? "As a Rider" : "As a Driver"}
            </button>
          ))}
        </div>

        {/* Rider Form */}
        {activeTab === "RIDER" && (
          <Form {...riderProfileForm}>
            <form
              onSubmit={riderProfileForm.handleSubmit(onSubmitRiderProfile)}
              className="space-y-6"
            >
              <FormField
                control={riderProfileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+8801712345678" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={riderProfileForm.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Picture URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com/rider.jpg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={riderProfileForm.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bkash, Nagad, Cash..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location: Longitude */}
              <FormField
                control={riderProfileForm.control}
                name="location.coordinates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        value={field.value[0]}
                        onChange={(e) =>
                          field.onChange([
                            parseFloat(e.target.value),
                            field.value[1],
                          ])
                        }
                        placeholder="91.7832"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location: Latitude */}
              <FormField
                control={riderProfileForm.control}
                name="location.coordinates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        value={field.value[1]}
                        onChange={(e) =>
                          field.onChange([
                            field.value[0],
                            parseFloat(e.target.value),
                          ])
                        }
                        placeholder="22.3569"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location: Address */}
              <FormField
                control={riderProfileForm.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Chattogram, Bangladesh" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Rider Profile
              </Button>
            </form>
          </Form>
        )}

        {/* Driver Form */}
        {activeTab === "DRIVER" && (
          <Form {...driverForm}>
            <form
              onSubmit={driverForm.handleSubmit(onSubmitDriver)}
              className="space-y-6"
            >
              <FormField
                control={driverForm.control}
                name="driverLicenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="DL12345" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vehicle Info */}
              <div className="space-y-2 border p-4 rounded-md">
                <h3 className="font-semibold text-sm">Vehicle Info</h3>
                <FormField
                  control={driverForm.control}
                  name="vehicleInfo.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Car" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="vehicleInfo.make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Toyota" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="vehicleInfo.model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Corolla" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="vehicleInfo.color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="White" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="vehicleInfo.modelYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          placeholder="2020"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="vehicleInfo.licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="DHK-1234" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Register Driver
              </Button>
            </form>
          </Form>
        )}

        <div className="text-center mt-2 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
