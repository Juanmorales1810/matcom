import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Group } from 'lucide-react';
import type { ReactNode } from 'react';

import { ShineBorder } from '@/components/ui/shine-border';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeatureProps {
    className?: string;
}

const Feature = ({ className }: FeatureProps) => {
    return (
        <section className={cn('bg-background relative py-32', className)}>
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'radial-gradient(125% 125% at 50% 10%, var(--color-background) 40%, var(--color-primary) 100%)',
                }}
            />
            <div className="relative z-10 container mx-auto flex flex-col items-center gap-10 md:gap-0">
                <Button
                    variant="outline"
                    className="text-muted-foreground flex items-center justify-center gap-5 rounded-full px-5! py-5 text-sm font-medium">
                    <Group />
                    Built with Matcom
                    <ArrowUpRight />
                </Button>
                <BracketedBorder>
                    <div className="mb-7 flex items-center justify-center gap-5 tracking-tight">
                        <div className="relative flex items-center justify-center">
                            <span className="bg-secondary absolute inline-block size-2 rounded-full"></span>
                            <span className="bg-secondary absolute inline-block size-3 animate-ping rounded-full"></span>
                        </div>
                        <p className="font-medium text-white">Construcción de alta calidad</p>
                    </div>
                    <h1 className="max-w-3xl px-4 text-center text-4xl font-bold tracking-tighter text-pretty text-white md:text-6xl md:leading-22">
                        Empresa de Construcción y Remodelaciones en La Serena y Coquimbo.
                    </h1>
                </BracketedBorder>
                <h2 className="text-foreground text-3xl font-medium tracking-tighter">
                    Bienvenido a MATCOM{' '}
                </h2>
                <p className="max-w-2xl px-10 text-center font-medium sm:mt-5 lg:text-xl">
                    Construimos, remodelamos y desarrollamos proyectos con calidad, confianza y
                    terminaciones profesionales. Más de 20 años de experiencia en construcción
                    general, carpintería fina, quinchos, viviendas y venta de materiales.
                </p>
                <div className="flex flex-col gap-4 sm:mt-8 md:flex-row">
                    <Button className="h-11 w-full rounded-xl sm:w-auto">
                        Solicita tu cotización por WhatsApp
                    </Button>
                    <Button variant="secondary" className="h-11 w-full rounded-xl sm:w-auto">
                        Ver servicios de construcción
                        <ArrowRight className="size-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

const BracketedBorder = ({ children }: { children: ReactNode }) => (
    <motion.div
        initial={{ width: 0, opacity: 0 }}
        className="relative flex h-96 flex-col items-center justify-center sm:my-10 md:h-125 md:overflow-hidden"
        whileInView={{ width: '65vw', opacity: 1 }}
        viewport={{ once: true }}
        transition={{
            width: {
                type: 'spring',
                stiffness: 50,
                damping: 20,
                mass: 1,
            },
            opacity: { duration: 0.5 },
        }}>
        <div className="border-foreground/10 absolute inset-0 hidden border md:block">
            <ShineBorder
                duration={10}
                borderWidth={2}
                shineColor={['oklch(96.01% 0.21350135952705568 112.64399092012694)']}
                className="relative z-10"
            />
            <Vector className="absolute top-1 left-1 z-10 rotate-90" />
            <Vector className="absolute top-1 right-1 z-10 -rotate-180" />
            <Vector className="absolute bottom-1 left-1 z-10" />
            <Vector className="absolute right-1 bottom-1 z-10 -rotate-90" />
        </div>
        <div className="bg-primary relative flex h-full w-full flex-col items-center justify-center">
            <div
                className="absolute inset-0 z-0 opacity-55"
                style={{
                    backgroundImage: `
                    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
                `,
                    backgroundSize: '20px 20px',
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
            {children}
        </div>
    </motion.div>
);

export { Feature };

const Vector = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="12"
        height="12"
        viewBox="0 0 21 21"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.7718 20.3821L0.771792 0.265381C3.72131 0.262685 6.1138 2.65299 6.1138 5.6025V15.1587H15.5512C18.436 15.1587 20.7746 17.4973 20.7746 20.3821H0.7718Z"
            fill="#ffffff"
        />
    </svg>
);
