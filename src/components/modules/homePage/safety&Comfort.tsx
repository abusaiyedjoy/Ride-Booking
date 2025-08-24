import { Card } from "@/components/ui/card";

export default function SafetyComfort() {
  const features = [
    {
      title: "Driver Screening",
      description: "All drivers undergo strict background checks to ensure passenger safety.",
      image: "https://i.ibb.co.com/1f5h9XYx/mathieu-buquet-4-WBv-Cqe-Ma-DE-unsplash.jpg", 
    },
    {
      title: "Live Ride Tracking",
      description: "Track your ride in real-time with built-in GPS tracking.",
      image: "https://i.ibb.co.com/1f5h9XYx/mathieu-buquet-4-WBv-Cqe-Ma-DE-unsplash.jpg",
    },
    {
      title: "Emergency Button",
      description: "Instantly alert authorities with one tap in case of emergencies.",
      image: "https://i.ibb.co.com/1f5h9XYx/mathieu-buquet-4-WBv-Cqe-Ma-DE-unsplash.jpg",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Safety & Comfort, Wherever you go
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="relative h-64 w-full rounded-full overflow-hidden shadow-lg"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${feature.image})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 text-white">
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
