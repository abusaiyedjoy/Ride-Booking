import {
  Briefcase,
  Building2,
  Flag,
  HeartHandshake,
  Leaf,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const team = [
  {
    name: "Amina Rahman",
    role: "Founder & CEO",
    bio: "Product strategist with 10+ years in mobility and marketplaces.",
    avatar: "",
    initials: "AR",
    tags: ["Leadership", "Product", "Vision"],
  },
  {
    name: "Khalid Chowdhury",
    role: "CTO",
    bio: "Scales platforms from 0→1→100. Loves TypeScript, DX, & reliability.",
    avatar: "",
    initials: "KC",
    tags: ["Architecture", "Security", "DevOps"],
  },
  {
    name: "Sara Islam",
    role: "Head of Operations",
    bio: "Builds high‑trust ops teams. Obsessed with on‑time arrivals.",
    avatar: "",
    initials: "SI",
    tags: ["Process", "CX", "Logistics"],
  },
  {
    name: "Nayeem Hasan",
    role: "Design Lead",
    bio: "Design systems nerd. Shipped delightful experiences at scale.",
    avatar: "",
    initials: "NH",
    tags: ["UX", "Design System", "Accessibility"],
  },
];

const values = [
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: "Rider-first",
    desc: "We obsess over safety, comfort, and clarity in every trip.",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Sustainable",
    desc: "Optimized routes and greener partners to reduce footprint.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Craft",
    desc: "We sweat the details—from UI polish to driver onboarding.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Focus",
    desc: "Data‑informed bets, clear priorities, consistent delivery.",
    color: "bg-blue-500/10 text-blue-600",
  },
];

const stats = [
  { icon: <Users className="h-5 w-5" />, value: "100k+", label: "Rides completed" },
  { icon: <Flag className="h-5 w-5" />, value: "12+", label: "Cities covered" },
  { icon: <HeartHandshake className="h-5 w-5" />, value: "4.9★", label: "Average rating" },
  { icon: <TrendingUp className="h-5 w-5" />, value: "500+", label: "Active drivers" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 space-y-16">
        
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 " />
          <div className="flex flex-col items-center text-center gap-6 p-8 md:p-16">
            <Badge className="w-fit text-sm px-4 py-1.5" variant="secondary">
              <Building2 className="mr-2 h-4 w-4" /> About Us
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              We move people with care
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
              A mobility company on a mission to make city travel simple, safe, and delightfully predictable—for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="group">
                <Briefcase className="mr-2 h-5 w-5" /> 
                Join Our Team
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Partner with us
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="rounded-2xl border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="rounded-3xl border-2 h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-3xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2022, our team began with a simple observation: rides should be reliable, transparent, and respectful of your time. We built a platform that prioritizes clear pricing, verified drivers, and delightful UX.
              </p>
              <p>
                Today, we serve thousands of riders across multiple cities, partnering with local fleets and independent drivers. Our technology balances smart dispatching with human oversight to keep every trip smooth.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-2 h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-3xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Make every ride safe, fair, and pleasantly predictable. We invest in great driver tools, transparent pricing, and responsive support—because trust isn't a feature; it's the foundation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="rounded-2xl border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardContent className="p-6 space-y-4">
                  <div className={`inline-flex p-3 rounded-xl ${v.color}`}>
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8 mb-14">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Meet the Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A compact crew with outsized impact
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="rounded-2xl border-2 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <CardHeader className="items-center text-center pt-8">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-primary/10">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-xl">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 font-medium">
                    <Briefcase className="h-4 w-4" /> {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-6">
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Connect
                    </Button>
                    <Button size="sm" className="flex-1">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}