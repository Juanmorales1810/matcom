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
        question: '¿MATCOM realiza construcción de viviendas completas?',
        answer: 'Sí. Realizamos construcción general, ampliaciones y soluciones habitacionales según las necesidades del cliente.',
    },
    {
        question: '¿Realizan remodelaciones de casas?',
        answer: 'Sí. Trabajamos en remodelaciones interiores, exteriores, cocinas, baños, quinchos y mejoras generales.',
    },
    {
        question: '¿Puedo solicitar una cotización por WhatsApp?',
        answer: 'Sí. Puedes contactarnos directamente por WhatsApp para explicar tu proyecto y coordinar una evaluación.',
    },
    {
        question: '¿Trabajan en La Serena y Coquimbo?',
        answer: 'Sí. Prestamos servicios en La Serena, Coquimbo y sectores cercanos de la Región de Coquimbo.',
    },
    {
        question: '¿MATCOM realiza carpintería fina?',
        answer: 'Sí. La carpintería fina y las terminaciones son uno de los principales diferenciales de la empresa.',
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
                                        src="https://i.pravatar.cc/150?img=12"
                                        alt="Sarah Johnson"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="mb-1 text-lg leading-tight font-semibold sm:text-xl">
                                        John Doe
                                    </h2>
                                    <p className="text-sm sm:text-base">Atención al cliente</p>
                                </div>
                            </div>

                            <div className="space-y-4 lg:space-y-6">
                                <h3 className="text-lg leading-tight font-semibold sm:text-xl">
                                    ¿Aún tienes preguntas?
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                                    ¿No encuentras lo que estás buscando? ¡Nuestro equipo está aquí
                                    para ayudarte! Ya sea que necesites aclaraciones, tengas una
                                    pregunta específica o quieras aprender más sobre nuestros
                                    servicios, nos encantaría saber de ti. Estamos aquí para
                                    proporcionarte las respuestas que necesitas.
                                </p>
                            </div>
                        </div>
                        <div className="py-4">
                            <div className="group flex h-auto p-0 text-start text-base font-medium hover:bg-transparent sm:text-xl">
                                <span className="border-border border-b-2 pb-0.5 transition-colors">
                                    Contáctanos
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
