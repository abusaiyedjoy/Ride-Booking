import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { cn } from "@/lib/utils";
import Password from "../../ui/Password";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

// ✅ Rider Schema
const riderSchema = z
  .object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short" }),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.literal("RIDER"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

// ✅ Driver Schema
const driverSchema = z
  .object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short" }),
    phoneNumber: z.string(),
    driverLicenseNumber: z.string().min(5, "Driver License is required"),
    vehicleInfo: z.object({
      type: z.string(),
      make: z.string(),
      model: z.string(),
      licensePlate: z.string(),
    }),
    role: z.literal("DRIVER"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function RiderDriverForm() {
  const [activeTab, setActiveTab] = useState<"RIDER" | "DRIVER">("RIDER");
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const riderForm = useForm<z.infer<typeof riderSchema>>({
    resolver: zodResolver(riderSchema),
    defaultValues: { name: "", email: "", password: "", role: "RIDER" },
  });

  const driverForm = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "DRIVER",
      vehicleInfo: { type: "", make: "", model: "", licensePlate: "" },
    },
  });

  const onSubmitRider = async (data: z.infer<typeof riderSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    console.log(userInfo);
    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("Rider created successfully");
      navigate("/verify");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitDriver = async (data: z.infer<typeof driverSchema>) => {
    const driverInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      vehicleInfo: {
        type: data.vehicleInfo.type,
        make: data.vehicleInfo.make,
        model: data.vehicleInfo.model,
        licensePlate: data.vehicleInfo.licensePlate,
      },
    };
    console.log(driverInfo);
    try {
      const result = await register(driverInfo).unwrap();
      console.log(result);
      toast.success("Driver created successfully");
      navigate("/verify");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
          <Form {...riderForm}>
            <form
              onSubmit={riderForm.handleSubmit(onSubmitRider)}
              className="space-y-6"
            >
              <FormField
                control={riderForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={riderForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={riderForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={riderForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={riderForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+1234567890" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={riderForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123 Main St" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register as Rider
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Driver Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={driverForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="driver@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={driverForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={driverForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={driverForm.control}
                name="driverLicenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver License Number</FormLabel>
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
                        <Input {...field} placeholder="Car, Bike, etc." />
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
                  name="vehicleInfo.licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ABC-1234" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Register as Driver
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
