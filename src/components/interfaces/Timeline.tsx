'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const sections = [
    {
        subTitle: 'Contacto inicial',
        title: 'Contacto inicial y evaluación de necesidades',
        description: 'Recibimos tu solicitud por WhatsApp, teléfono o formulario web.',
        image: '/images/timeline/MATCON Terraza Premium La Serena.webp',
    },
    {
        subTitle: 'Evaluación del proyecto',
        title: 'Evaluación del proyecto y planificación',
        description:
            'Analizamos el tipo de trabajo, ubicación, medidas, materiales y necesidades específicas.',
        image: '/images/timeline/MATCON Vista Aerea Parcelas La Serena.webp',
    },
    {
        subTitle: 'Cotización',
        title: 'Cotización y propuesta personalizada',
        description: 'Preparamos una propuesta según el requerimiento del cliente.',
        image: '/images/timeline/MATCOM Cotizacion.webp',
    },
    {
        subTitle: 'Planificación',
        title: 'Planificación y ejecución del proyecto',
        description: 'Organizamos etapas, materiales y tiempos de ejecución.',
        image: '/images/timeline/MATCON Equipo en Terreno (1).webp',
    },
    {
        subTitle: 'Ejecución',
        title: 'Ejecución del proyecto',
        description:
            'Llevamos a cabo el proyecto según lo planificado, asegurando calidad y cumplimiento de plazos.',
        image: '/images/timeline/MATCON Ampliacion Segundo Piso.webp',
    },
    {
        subTitle: 'Entrega final',
        title: 'Entrega final del proyecto',
        description:
            'Realizamos la entrega final del proyecto, asegurando que todo esté conforme a lo planificado y cumpla con los estándares de calidad.',
        image: '/images/timeline/MATCON Entrega Proyecto Familia.webp',
    },
];

interface TimelineProps {
    className?: string;
}

const Timeline = ({ className }: TimelineProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            const viewportCenter = viewportHeight / 2;

            let closestSection = 0;
            let closestDistance = Infinity;

            sectionRefs.current.forEach((section, index) => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(sectionCenter - viewportCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = index;
                    }
                }
            });

            setActiveIndex(closestSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="cronograma" className={cn('relative py-32', className)}>
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 0 0',
                    maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
      `,
                    WebkitMaskImage: `
  repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
      `,
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                }}
            />
            <div className="relative z-10 container mx-auto max-w-7xl px-4">
                <h2 className="mb-14 max-w-2xl text-4xl font-semibold text-balance md:text-5xl">
                    Cómo trabajamos
                </h2>
                <p className="text-muted-foreground mb-20 max-w-3xl text-lg">
                    Nuestro proceso está diseñado para entregar claridad desde el primer contacto
                    hasta la finalización del proyecto.
                </p>
                <div className="flex justify-between gap-20">
                    <div className="flex flex-col gap-16 md:w-1/2">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    sectionRefs.current[index] = el;
                                }}
                                className="flex flex-col gap-4 md:h-[50vh]">
                                <div className="bg-muted block rounded-2xl border p-4 md:hidden">
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="h-full max-h-full w-full max-w-full rounded-2xl object-cover"
                                    />
                                </div>
                                <p className="text-muted-foreground text-sm font-semibold md:text-base">
                                    {section.subTitle}
                                </p>
                                <h3 className="text-2xl font-semibold md:text-4xl">
                                    {section.title}
                                </h3>
                                <p className="text-muted-foreground">{section.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="sticky top-56 right-0 hidden h-fit w-full items-center justify-center md:flex">
                        <img
                            src={sections[sections.length - 1].image}
                            alt={sections[sections.length - 1].title}
                            className="invisible h-full max-h-137.5 w-full max-w-full object-cover"
                        />

                        {sections.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'bg-muted absolute inset-0 flex h-full items-center justify-center rounded-2xl border p-4 transition-opacity duration-200',
                                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                                )}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full max-h-full w-full max-w-full rounded-2xl border object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Timeline };
