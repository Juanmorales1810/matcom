'use client';

import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface HeaderProps {
    className?: string;
}

const Header = ({ className }: HeaderProps) => {
    const [currentTime, setCurrentTime] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-CL', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            setCurrentTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#inicio' },
        { name: 'Servicios', href: '#servicios' },
        { name: 'Proyectos', href: '#proyectos' },
        { name: 'Nosotros', href: '#nosotros' },
        { name: 'Contacto', href: '#contacto' },
    ];

    return (
        <header className={cn('bg fixed inset-x-0 z-50', className)}>
            <div className="container mx-auto px-4">
                <nav className="w-full">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/logo-header.svg"
                                    className="max-h-4 lg:max-h-6"
                                    alt="Matcon"
                                />
                                <span className="text-lg font-semibold tracking-tighter text-white lg:text-2xl">
                                    Matcon
                                </span>
                            </div>
                            <div className="hidden items-center space-x-8 md:flex">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="group relative inline-block h-8 overflow-hidden text-lg font-medium text-white hover:text-white/80 lg:text-2xl">
                                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                                            {link.name}
                                        </span>
                                        <span className="border-border absolute left-0 block w-full transition-transform duration-300 group-hover:-translate-y-full group-hover:border-b">
                                            {link.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                            <div className="hidden items-center space-x-2 text-lg text-white lg:flex lg:text-2xl">
                                <span className="font-medium">La Serena</span>
                                <span className="text-white/80">/</span>

                                <span className="font-medium">
                                    {currentTime ? currentTime : 'Loading'}
                                </span>
                            </div>
                            <div className="md:hidden">
                                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="text-muted-foreground hover:bg-muted hover:text-foreground">
                                            <Menu className="h-5 w-5" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="top" className="h-screen">
                                        <SheetTitle></SheetTitle>
                                        <div className="m-4 flex flex-col space-y-6">
                                            <div className="ml-3">
                                                <a
                                                    href="/"
                                                    className="text-foreground flex items-center justify-start gap-2 text-2xl font-bold"
                                                    onClick={() => setIsOpen(false)}>
                                                    <img
                                                        src="/logo-header.svg"
                                                        className="max-h-12"
                                                        alt="Matcon"
                                                    />
                                                    <span className="text-lg font-semibold tracking-tighter">
                                                        Matcon
                                                    </span>
                                                </a>
                                            </div>
                                            <div className="flex flex-col space-y-4">
                                                {navLinks.map((link) => (
                                                    <a
                                                        key={link.name}
                                                        href={link.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-4 py-2 text-lg font-medium transition-colors">
                                                        {link.name}
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="border-border border-t pt-6">
                                                <div className="text-muted-foreground text-center text-sm">
                                                    <div className="font-medium">La Serena</div>
                                                    <div className="mt-1">
                                                        {currentTime ? currentTime : 'Loading'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export { Header };
