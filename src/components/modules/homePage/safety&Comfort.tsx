import { Card } from "@/components/ui/card";
import { ShieldCheck, MapPin, AlertTriangle } from "lucide-react"; 

export default function SafetyComfort() {
  const features = [
    {
      title: "Driver Screening",
      description:
        "All drivers undergo strict background checks to ensure passenger safety.",
      image:
        "https://i.ibb.co.com/1f5h9XYx/mathieu-buquet-4-WBv-Cqe-Ma-DE-unsplash.jpg",
      icon: <ShieldCheck className="w-10 h-10 text-yellow-400 mb-3" />,
    },
    {
      title: "Live Ride Tracking",
      description: "Track your ride in real-time with built-in GPS tracking.",
      image:
        "https://i.ibb.co.com/1f5h9XYx/mathieu-buquet-4-WBv-Cqe-Ma-DE-unsplash.jpg",
      icon: <MapPin className="w-10 h-10 text-green-400 mb-3" />,
    },
    {
      title: "Emergency Button",
      description:
        "Instantly alert authorities with one tap in case of emergencies.",
      image:
        "https://i.ibb.co.com/1f5h9XYx/mathieu-buquet-4-WBv-Cqe-Ma-DE-unsplash.jpg",
      icon: <AlertTriangle className="w-10 h-10 text-red-400 mb-3" />,
    },
  ];

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Safety & Comfort, Wherever you go
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="relative w-72 h-72 rounded-full overflow-hidden shadow-lg border-4 border-primary hover:scale-105 transition-transform duration-300"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${feature.image})` }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 text-white">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
