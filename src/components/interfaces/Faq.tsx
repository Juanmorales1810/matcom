import { ArrowUpRight } from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const items = [
    {
        question: 'What services do you offer?',
        answer: 'We provide a comprehensive range of services tailored to meet your needs. From consultation and planning to implementation and ongoing support, our team is equipped to handle projects of all sizes. Contact us for a detailed overview of our offerings.',
    },
    {
        question: 'How do I get started?',
        answer: "Getting started is easy! Simply reach out to us through our contact form or give us a call. We'll schedule a consultation to discuss your needs, answer any questions, and create a customized plan that works best for you and your timeline.",
    },
    {
        question: 'What are your pricing options?',
        answer: "Our pricing is flexible and depends on the scope of your project and specific requirements. We offer various packages to accommodate different budgets and needs. We're happy to provide a detailed quote after understanding your project requirements.",
    },
    {
        question: 'Do you offer support after completion?',
        answer: 'Absolutely! We believe in building long-term relationships with our clients. We provide ongoing support, maintenance, and are always available to help with any questions or additional needs that may arise after project completion.',
    },
    {
        question: 'What makes you different from competitors?',
        answer: 'We pride ourselves on our personalized approach, attention to detail, and commitment to customer satisfaction. Our experienced team combines expertise with creativity to deliver exceptional results. We focus on understanding your unique needs and exceeding your expectations.',
    },
];

const Faq = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12 xl:grid-cols-12 xl:gap-16">
                    <div className="flex flex-col justify-between lg:col-span-2 xl:col-span-4">
                        <div>
                            <div className="mb-8 flex items-start gap-3 sm:gap-4 lg:mb-12">
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16">
                                    <img
                                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"
                                        alt="Sarah Johnson"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="mb-1 text-lg leading-tight font-semibold sm:text-xl">
                                        Sarah Johnson
                                    </h2>
                                    <p className="text-sm sm:text-base">Customer Support Lead</p>
                                </div>
                            </div>

                            <div className="space-y-4 lg:space-y-6">
                                <h3 className="text-lg leading-tight font-semibold sm:text-xl">
                                    Still have questions?
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                                    Can't find what you're looking for? Our team is here to help!
                                    Whether you need clarification, have a specific question, or
                                    want to learn more about our services, we'd love to hear from
                                    you. Let's get you the answers you need.
                                </p>
                            </div>
                        </div>
                        <div className="py-4">
                            <div className="group flex h-auto p-0 text-start text-base font-medium hover:bg-transparent sm:text-xl">
                                <span className="border-border border-b-2 pb-0.5 transition-colors">
                                    Contact us
                                </span>
                                <ArrowUpRight className="ml-1 h-6 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 xl:col-span-8">
                        <div className="mb-8 md:text-center lg:mb-16 lg:text-left">
                            <h1 className="text-4xl leading-none font-medium tracking-tight sm:text-6xl">
                                FAQ
                            </h1>
                        </div>
                        <div className="max-w-none">
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="item-0"
                                className="space-y-0">
                                {items.map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className={cn(
                                            'border-0',
                                            index !== items.length - 1 && 'border-border border-b'
                                        )}>
                                        <AccordionTrigger className="justify-between py-6 text-left text-lg font-semibold hover:no-underline sm:text-xl lg:py-8 lg:text-xl">
                                            <span className="pr-4">{item.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground pt-0 pr-8 pb-6 text-sm leading-relaxed sm:text-base lg:pb-8">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Faq };
