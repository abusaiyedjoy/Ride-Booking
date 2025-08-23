import {
  Briefcase,
  Building2,
  Flag,
  HeartHandshake,
  Leaf,
  Users,
  Target,
  Sparkles,
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
import { Separator } from "@/components/ui/separator";

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
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Rider-first",
    desc: "We obsess over safety, comfort, and clarity in every trip.",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Sustainable",
    desc: "Optimized routes and greener partners to reduce footprint.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Craft",
    desc: "We sweat the details—from UI polish to driver onboarding.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Focus",
    desc: "Data‑informed bets, clear priorities, consistent delivery.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Origins",
    detail: "Validated demand with a pilot across 3 neighborhoods.",
  },
  {
    year: "2023",
    title: "Launch",
    detail: "Released v1 with verified drivers and transparent pricing.",
  },
  {
    year: "2024",
    title: "Scale",
    detail: "Expanded to intercity routes and enterprise partners.",
  },
  {
    year: "2025",
    title: "Today",
    detail: "Building the most trusted mobility platform in Bangladesh.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-br from-muted/40 to-background p-6 md:p-10">
        <Badge className="w-fit" variant="secondary">
          <Building2 className="mr-1 h-4 w-4" /> About Us
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          We move people with care
        </h1>
        <p className="max-w-3xl text-muted-foreground md:text-lg">
          We’re a mobility company on a mission to make city travel simple,
          safe, and delightfully predictable— for everyone. From daily commutes
          to intercity journeys, we connect riders and drivers with trust at the
          core.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button size="sm">
            <Briefcase className="mr-2 h-4 w-4" /> Careers
          </Button>
          <Button size="sm" variant="outline">
            Partner with us
          </Button>
        </div>
      </div>

      {/* Company Background */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Building2 className="h-6 w-6" /> Company Background
          </CardTitle>
          <CardDescription>
            How we started, what we’ve learned, and where we’re headed.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-sm md:text-base">
            <p>
              Founded in 2022, our team began with a simple observation: rides
              should be reliable, transparent, and respectful of your time. We
              built a platform that prioritizes clear pricing, verified drivers,
              and delightful UX.
            </p>
            <p>
              Today, we serve thousands of riders across multiple cities,
              partnering with local fleets and independent drivers. Our
              technology balances smart dispatching with human oversight to keep
              every trip smooth.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 font-medium">
                <Users className="h-4 w-4" /> 100k+ rides completed
              </div>
              <p className="text-sm text-muted-foreground">
                And counting—thanks to our rider community and partners.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 font-medium">
                <Flag className="h-4 w-4" /> Operating in major cities
              </div>
              <p className="text-sm text-muted-foreground">
                Rolling out thoughtfully, one service area at a time.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 font-medium">
                <HeartHandshake className="h-4 w-4" /> 4.9★ average rating
              </div>
              <p className="text-sm text-muted-foreground">
                Trust built via safety checks, training, and support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission & Values */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target className="h-6 w-6" /> Our Mission
          </CardTitle>
          <CardDescription>
            Make every ride safe, fair, and pleasantly predictable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-6">
              <h3 className="mb-2 text-lg font-semibold">What this means</h3>
              <p className="text-muted-foreground">
                We invest in great driver tools, transparent pricing, and
                responsive support—because trust isn’t a feature; it’s the
                foundation.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h3 className="mb-4 text-lg font-semibold">Our values</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <div className="mt-0.5">{v.icon}</div>
                    <div>
                      <div className="font-medium leading-none">{v.title}</div>
                      <p className="text-sm text-muted-foreground">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Building2 className="h-6 w-6" /> Journey
          </CardTitle>
          <CardDescription>Milestones that shaped our path.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="relative ml-3 border-l pl-6">
            {timeline.map((t) => (
              <li key={t.year} className="mb-8">
                <div className="absolute -left-3 mt-1 h-6 w-6 rounded-full border bg-background shadow" />
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  {t.year} • {t.title}
                </div>
                <div className="text-base">{t.detail}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="h-6 w-6" /> Meet the Team
          </CardTitle>
          <CardDescription>
            A compact crew with outsized impact.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full rounded-2xl">
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-2 text-lg">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="rounded-full"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                      <Button size="sm">Message</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
