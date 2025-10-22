import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Smartphone, 
  Car, 
  Shield, 
  MapPin, 
  CreditCard, 
  MessageCircle, 
  TrendingUp,
  Clock,
  BarChart3,
  Zap,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      id: "rider",
      title: "Rider Features",
      icon: <Smartphone className="w-8 h-8" />, 
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20 hover:border-blue-500/50",
      textColor: "text-blue-600",
      capabilities: [
        { 
          icon: <MapPin className="w-5 h-5" />,
          title: "Real-time Tracking",
          desc: "Easy ride booking with live GPS tracking and ETA updates"
        },
        { 
          icon: <CreditCard className="w-5 h-5" />,
          title: "Flexible Payments",
          desc: "Multiple payment options including cash, card, and digital wallet"
        },
        { 
          icon: <Clock className="w-5 h-5" />,
          title: "Ride History",
          desc: "Complete trip history with digital receipts and expense tracking"
        },
        { 
          icon: <MessageCircle className="w-5 h-5" />,
          title: "24/7 Support",
          desc: "In-app chat and dedicated support team available anytime"
        },
        { 
          icon: <Shield className="w-5 h-5" />,
          title: "Safety First",
          desc: "SOS button, ride sharing, and driver verification for peace of mind"
        }
      ]
    },
    {
      id: "driver",
      title: "Driver Features",
      icon: <Car className="w-8 h-8" />, 
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20 hover:border-green-500/50",
      textColor: "text-green-600",
      capabilities: [
        { 
          icon: <Zap className="w-5 h-5" />,
          title: "Smart Requests",
          desc: "Accept and manage ride requests with intelligent matching"
        },
        { 
          icon: <MapPin className="w-5 h-5" />,
          title: "Route Optimization",
          desc: "Built-in navigation with optimized routes and traffic updates"
        },
        { 
          icon: <TrendingUp className="w-5 h-5" />,
          title: "Earnings Dashboard",
          desc: "Real-time earnings tracking with detailed trip history"
        },
        { 
          icon: <Clock className="w-5 h-5" />,
          title: "Flexible Schedule",
          desc: "Work on your own terms with complete schedule flexibility"
        },
        { 
          icon: <MessageCircle className="w-5 h-5" />,
          title: "Driver Support",
          desc: "Dedicated support team and transparent rating system"
        }
      ]
    },
    {
      id: "admin",
      title: "Admin Features",
      icon: <Shield className="w-8 h-8" />, 
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20 hover:border-purple-500/50",
      textColor: "text-purple-600",
      capabilities: [
        { 
          icon: <Shield className="w-5 h-5" />,
          title: "User Management",
          desc: "Comprehensive user and driver management with verification tools"
        },
        { 
          icon: <BarChart3 className="w-5 h-5" />,
          title: "Analytics Dashboard",
          desc: "Real-time ride monitoring with advanced analytics and insights"
        },
        { 
          icon: <CreditCard className="w-5 h-5" />,
          title: "Payment Tracking",
          desc: "Automated payment processing and commission management"
        },
        { 
          icon: <TrendingUp className="w-5 h-5" />,
          title: "Promotion Tools",
          desc: "Create and manage promotions, discounts, and referral programs"
        },
        { 
          icon: <Shield className="w-5 h-5" />,
          title: "Security & Fraud",
          desc: "Advanced reporting tools with fraud detection and prevention"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">
            <Zap className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need in one platform
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Powerful tools and seamless experiences designed specifically for riders, drivers, and administrators
          </p>
        </div>


        {/* All Features Overview Grid */}
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`rounded-3xl border-2 ${feature.borderColor} transition-all hover:shadow-xl group overflow-hidden`}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <CardHeader className="flex flex-col items-center pt-8 pb-6">
                  <div className={`inline-flex p-4 rounded-2xl ${feature.bgColor} ${feature.textColor} mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-8">
                  {feature.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`${feature.textColor} mt-0.5`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="font-medium text-sm leading-tight">
                          {cap.title}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {cap.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}