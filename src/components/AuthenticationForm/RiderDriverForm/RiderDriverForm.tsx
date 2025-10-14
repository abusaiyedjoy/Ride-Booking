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
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import Logo from "@/assets/icons/Logo";
import { useCreateDriverMutation } from "@/redux/features/driver/driver.api";
import { useCreateRiderMutation } from "@/redux/features/rider/rider.api";

// Fixed Rider Schema - made type required with default
const riderProfileSchema = z.object({
  phone: z.string().min(8, "Phone number is required"),
  picture: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  paymentMethod: z.string().min(3, "Payment method is required"),
  location: z.object({
    type: z.literal("Point"),
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

// Fixed Driver Schema
const driverSchema = z.object({
  driverLicenseNumber: z.string().min(3, "License number is required"),
  vehicleInfo: z.object({
    type: z.string().min(1, "Vehicle type is required"),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    color: z.string().min(1, "Color is required"),
    modelYear: z
      .number({
        message: "Year must be a number",
      })
      .min(1900, "Enter valid year")
      .max(new Date().getFullYear() + 1, "Year cannot be in future"),
    licensePlate: z.string().min(2, "License plate is required"),
  }),
});

// Type definitions
type RiderProfileFormData = z.infer<typeof riderProfileSchema>;
type DriverFormData = z.infer<typeof driverSchema>;

export function RiderDriverForm() {
  const [activeTab, setActiveTab] = useState<"RIDER" | "DRIVER">("RIDER");
  const [createrider] = useCreateRiderMutation();
  const [createDriver] = useCreateDriverMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  const navigate = useNavigate();

  // Rider form setup with proper typing
  const riderProfileForm = useForm<RiderProfileFormData>({
    resolver: zodResolver(riderProfileSchema),
    defaultValues: {
      phone: "",
      picture: "",
      paymentMethod: "",
      location: {
        type: "Point" as const,
        coordinates: [90.4125, 23.8103],
        address: "",
      },
    },
  });

  // Driver form setup with proper typing
  const driverForm = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      driverLicenseNumber: "",
      vehicleInfo: {
        type: "",
        make: "",
        model: "",
        color: "",
        modelYear: new Date().getFullYear(),
        licensePlate: "",
      },
    },
  });

  // Rider Submit with proper typing
  const onSubmitRiderProfile = async (data: RiderProfileFormData) => {
    try {
      const submitData = {
        userId: userInfo?.data?._id,
        phone: data.phone,
        picture: data.picture || undefined,
        paymentMethod: data.paymentMethod,
        location: data.location,
      };

      const result = await createrider(submitData).unwrap();
      console.log(result);
      toast.success("Rider profile created successfully");
      navigate("/rider/profile");
    } catch (error: any) {
      console.error("Rider creation error:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to create rider profile"
      );
    }
  };

  // Driver Submit with proper typing
  const onSubmitDriver = async (data: DriverFormData) => {
    try {
      const submitData = {
        userId: userInfo?.data?._id,
        driverLicenseNumber: data.driverLicenseNumber,
        vehicleInfo: data.vehicleInfo,
      };

      const result = await createDriver(submitData).unwrap();
      console.log(result);
      toast.success("Driver profile created successfully");
      navigate("/driver/profile");
    } catch (error: any) {
      console.error("Driver creation error:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to create driver profile"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 my-3 items-center justify-center px-4">
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
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-foreground border-input hover:bg-accent"
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
                    <FormLabel>Phone Number</FormLabel>
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
                    <FormLabel>Picture URL (Optional)</FormLabel>
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
                    <FormLabel>Preferred Payment Method</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bkash, Nagad, Cash..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Section */}
              <div className="space-y-4 border p-4 rounded-md bg-muted/20">
                <h3 className="font-semibold text-sm">Location Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={riderProfileForm.control}
                    name="location.coordinates.0"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            placeholder="90.4125"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={riderProfileForm.control}
                    name="location.coordinates.1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            placeholder="23.8103"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={riderProfileForm.control}
                  name="location.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Dhaka, Bangladesh" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={riderProfileForm.formState.isSubmitting}
              >
                {riderProfileForm.formState.isSubmitting
                  ? "Creating..."
                  : "Create Rider Profile"}
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
                    <FormLabel>Driver License Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="DL12345678" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vehicle Information Section */}
              <div className="space-y-4 border p-4 rounded-md bg-muted/20">
                <h3 className="font-semibold text-sm">Vehicle Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={driverForm.control}
                    name="vehicleInfo.type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Car, Bike, Bus" />
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
                          <Input {...field} placeholder="Toyota, Honda, BMW" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={driverForm.control}
                    name="vehicleInfo.model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Corolla, Civic, X5" />
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
                          <Input {...field} placeholder="White, Black, Red" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={driverForm.control}
                    name="vehicleInfo.modelYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value) ||
                                  new Date().getFullYear()
                              )
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
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={driverForm.formState.isSubmitting}
              >
                {driverForm.formState.isSubmitting
                  ? "Registering..."
                  : "Register as Driver"}
              </Button>
            </form>
          </Form>
        )}

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
