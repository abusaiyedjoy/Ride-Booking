import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Smartphone, Car, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Rider Features",
      icon: <Smartphone className="w-8 h-8 text-blue-500" />, 
      capabilities: [
        "Easy ride booking with real-time tracking",
        "Multiple payment options (cash, card, wallet)",
        "Ride history and receipts",
        "In-app chat & support",
        "Safety features like SOS and ride sharing"
      ]
    },
    {
      title: "Driver Features",
      icon: <Car className="w-8 h-8 text-green-500" />, 
      capabilities: [
        "Accept & manage ride requests",
        "Navigation with optimized routes",
        "Earnings dashboard & trip history",
        "Flexible working hours",
        "In-app support & rating system"
      ]
    },
    {
      title: "Admin Features",
      icon: <Shield className="w-8 h-8 text-purple-500" />, 
      capabilities: [
        "User & driver management",
        "Ride monitoring & analytics dashboard",
        "Payment and commission tracking",
        "Promotions & discount management",
        "Advanced reporting & fraud detection"
      ]
    }
  ];

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our ride-sharing platform is designed to benefit riders, drivers, and administrators with powerful tools and seamless experiences.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
            <Card key={index} className="shadow-lg rounded-2xl border border-gray-200">
              <CardHeader className="flex flex-col items-center">
                {feature.icon}
                <CardTitle className="mt-4 text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feature.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
        ))}
      </div>
    </section>
  );
}
