
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  description?: string;
  items?: FaqItem[];
}

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I register as a Rider or Driver?",
    answer:
      "Go to the Register page and select your role (Rider or Driver). Fill in the required information including name, email, password, and for drivers, vehicle details and license number.",
  },
  {
    id: "faq-2",
    question: "What happens if my account is suspended?",
    answer:
      "If your account is suspended or blocked, you will be redirected to a status page explaining the reason and how to contact support to resolve the issue.",
  },
  {
    id: "faq-3",
    question: "How can a Driver go online or offline?",
    answer:
      "Drivers can toggle their availability from their dashboard. When offline, they will not receive ride requests until they switch back online.",
  },
  {
    id: "faq-4",
    question: "Can Riders estimate the fare before booking?",
    answer:
      "Yes. The ride request form includes a fare estimation feature before you confirm your booking.",
  },
  {
    id: "faq-5",
    question: "How do I view my ride history?",
    answer:
      "Both Riders and Drivers can access their Ride History from the dashboard, with options to filter and search past rides by date, fare, or status.",
  },
  {
    id: "faq-6",
    question: "What payment methods are supported?",
    answer:
      "We currently support cash and card payments. Additional digital wallet integrations will be available soon.",
  },
  {
    id: "faq-7",
    question: "What is the SOS button and how does it work?",
    answer:
      "During an active ride, Riders and Drivers can access a floating SOS button. It provides options to call the police, notify emergency contacts, and share live location instantly.",
  },
  {
    id: "faq-8",
    question: "What can Admins do?",
    answer:
      "Admins manage users (Riders & Drivers), oversee rides, block/unblock accounts, and view analytics dashboards for ride trends and revenues.",
  },
];

const FAQ = ({
  heading = "Frequently Asked Questions",
  description = "Get quick answers about using our Ride Management System as a Rider, Driver, or Admin.",
  items = faqItems,
}: FaqProps) => {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-24 lg:py-32 bg-white/90 dark:bg-transparent">
      <div className="container space-y-16">
        {/* Heading */}
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>

        {/* Search Input */}
        <div className="mx-auto w-full max-w-2xl">
          <Input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-8 border border-gray-400"
          />
        </div>

        {/* Accordion */}
        {filteredItems.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full lg:max-w-3xl"
          >
            {filteredItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-70">
                  <span className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="sm:mb-1 lg:mb-2">
                  <p className="text-muted-foreground lg:text-lg">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground">
            No matching questions found. Try another keyword.
          </p>
        )}
      </div>
    </section>
  );
};

export default FAQ;
