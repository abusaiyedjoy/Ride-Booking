import { 
  Mail, 
  MapPin, 
  MessageCircle, 
  Phone, 
  CheckCircle2,
  Clock,
  Headphones,
  Send,
  ArrowRight,
  Sparkles,
  Shield,
  Zap
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email Support",
      description: "24h response time",
      value: "hello@company.com",
      link: "mailto:hello@company.com",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Call Us",
      description: "Mon-Fri, 9am-6pm",
      value: "+880 1234-567890",
      link: "tel:+8801234567890",
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Visit Office",
      description: "Come say hello",
      value: "Agrabad, Chattogram",
      link: "#",
      gradient: "from-green-500 via-green-600 to-emerald-500",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Live Chat",
      description: "Instant support",
      value: "Start chatting now",
      link: "#",
      gradient: "from-orange-500 via-orange-600 to-red-500",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Average response under 2 hours"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your data is encrypted and safe"
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Expert Team",
      description: "Dedicated support specialists"
    }
  ];

  return (
      <div className="min-h-screen">

        <section className="pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-4 sm:space-y-6">
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 bg-[#527750]/10 dark:bg-[#527750]/20 border-[#527750]/20 dark:border-[#527750]/30 text-[#527750] dark:text-[#6b9d67]">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">We're here to help</span>
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#527750] to-slate-900 dark:from-slate-100 dark:via-[#6b9d67] dark:to-slate-100">
                Get in Touch
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {contactMethods.map((method, idx) => (
                <a key={idx} href={method.link} className="group">
                  <Card className="h-full border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    <CardContent className="p-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <div className="relative space-y-4">
                        <div className={`inline-flex p-3 rounded-xl ${method.iconBg} text-white shadow-lg`}>
                          {method.icon}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">
                            {method.label}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {method.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#527750] dark:group-hover:text-[#6b9d67] transition-colors">
                          <span className="truncate">{method.value}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
              
              <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">
                      Why Contact Us?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br from-[#527750] to-[#3d5a3b] text-white shadow-lg group-hover:shadow-xl transition-shadow">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-xl text-white bg-gradient-to-br from-[#527750] to-[#3d5a3b] border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Clock className="w-6 h-6" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span className="text-white/90 text-sm sm:text-base">Monday - Friday</span>
                      <span className="font-semibold text-sm sm:text-base">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span className="text-white/90 text-sm sm:text-base">Saturday</span>
                      <span className="font-semibold text-sm sm:text-base">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 text-sm sm:text-base">Sunday</span>
                      <span className="font-semibold text-sm sm:text-base">Closed</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className=" border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <strong className="text-slate-900 dark:text-slate-100">Need immediate assistance?</strong><br />
                      Call our hotline or use the live chat for instant support during business hours.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3 order-1 lg:order-2">
                <Card className="shadow-2xl border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-[#527750] via-[#6b9d67] to-[#527750]"></div>
                  
                  <CardContent className="p-6 sm:p-8 lg:p-10">
                    {submitted ? (
                      <div className="py-12 sm:py-16 text-center space-y-6">
                        <div className="inline-flex p-5 rounded-full bg-gradient-to-br from-[#527750] to-[#3d5a3b] text-white shadow-2xl mb-4">
                          <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-base sm:text-lg px-4">
                          Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                        </p>
                        <Button
                          onClick={() => setSubmitted(false)}
                          variant="secondary"
                          className="mt-4"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-center mb-8 sm:mb-10">
                          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                            Send us a Message
                          </h2>
                          <p className="text-slate-600 dark:text-slate-400">
                            Fill out the form and we'll be in touch soon
                          </p>
                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                                Full Name *
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className=" border-slate-200 dark:border-slate-700 focus-visible:ring-[#527750] dark:focus-visible:ring-[#6b9d67]"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                                Email Address *
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className=" border-slate-200 dark:border-slate-700 focus-visible:ring-[#527750] dark:focus-visible:ring-[#6b9d67]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject" className="text-slate-700 dark:text-slate-300">
                              Subject *
                            </Label>
                            <Input
                              id="subject"
                              name="subject"
                              type="text"
                              value={formData.subject}
                              onChange={handleChange}
                              placeholder="How can we help you?"
                              className=" border-slate-200 dark:border-slate-700 focus-visible:ring-[#527750] dark:focus-visible:ring-[#6b9d67]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                              Message *
                            </Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell us more about your inquiry..."
                              className="min-h-[150px]  border-slate-200 dark:border-slate-700 focus-visible:ring-[#527750] dark:focus-visible:ring-[#6b9d67] resize-none"
                            />
                          </div>

                          <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#527750] to-[#6b9d67] hover:from-[#3d5a3b] hover:to-[#527750] text-white shadow-lg hover:shadow-xl transition-all"
                            size="lg"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="w-5 h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Contact;