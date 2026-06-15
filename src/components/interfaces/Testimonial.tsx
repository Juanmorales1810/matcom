import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const Testimonial = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-semibold tracking-tight uppercase md:text-4xl lg:text-5xl">
                        Clientes que confían en MATCOM
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg font-medium">
                        La confianza se construye con trabajos bien hechos. Nuestro objetivo es que
                        cada cliente quede conforme con la ejecución, la atención y el resultado
                        final.
                    </p>
                    <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 lg:grid-cols-3 lg:gap-4">
                        <img
                            src="/images/MATCOM Review.webp"
                            alt="Cliente satisfecho con proyecto de construcción"
                            className="h-72 w-full rounded-md object-cover lg:h-auto"
                        />
                        <Card className="col-span-2 flex items-center justify-center p-6">
                            <div className="flex flex-col gap-4">
                                <q className="text-xl font-medium lg:text-3xl">
                                    Trabajo responsable, buenas terminaciones y atención directa
                                    durante todo el proceso.
                                </q>
                                <div className="flex flex-col items-start">
                                    <p>Juan Pérez</p>
                                    <p className="text-muted-foreground">
                                        Cliente satisfecho, La Serena
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <Card>
                            <CardContent className="text-foreground/70 px-6 pt-6 leading-7">
                                <q>
                                    MATCOM nos ayudó a remodelar nuestro espacio con seriedad y
                                    compromiso.
                                </q>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4 leading-5">
                                    <Avatar className="ring-input size-9 rounded-full ring-1">
                                        <AvatarImage
                                            src="https://i.pravatar.cc/150?img=5"
                                            alt="María González"
                                        />
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="font-medium">María González</p>
                                        <p className="text-muted-foreground">
                                            Cliente satisfecha, Santiago
                                        </p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardContent className="text-foreground/70 px-6 pt-6 leading-7">
                                <q>Muy buena calidad en los detalles y terminaciones.</q>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4 leading-5">
                                    <Avatar className="ring-input size-9 rounded-full ring-1">
                                        <AvatarImage
                                            src="https://i.pravatar.cc/150?img=3"
                                            alt="Carlos Ramírez"
                                        />
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="font-medium">Carlos Ramírez</p>
                                        <p className="text-muted-foreground">
                                            Cliente satisfecho, Coquimbo
                                        </p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardContent className="text-foreground/70 px-6 pt-6 leading-7">
                                <q>Excelente atención y profesionalismo en todo momento.</q>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4 leading-5">
                                    <Avatar className="ring-input size-9 rounded-full ring-1">
                                        <AvatarImage
                                            src="https://i.pravatar.cc/150?img=9"
                                            alt="Ana López"
                                        />
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="font-medium">Ana López</p>
                                        <p className="text-muted-foreground">
                                            Cliente satisfecha, Santiago
                                        </p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Testimonial };
