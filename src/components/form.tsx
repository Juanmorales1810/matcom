import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

interface ContactFormDetailsProps {
    successMessage: string;
    submitLabel: string;
    submittingLabel: string;
    className?: string;
}

interface ContactProps extends ContactFormDetailsProps {
    onSubmit?: (data: ContactFormData) => Promise<void>;
}
type Props = Partial<ContactProps>;

const contactFormSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    company: z.string().optional(),
    employees: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = (props: Props) => {
    const { onSubmit } = {
        ...props,
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            fullName: '',
            email: '',
            company: '',
            employees: '',
            message: '',
        },
    });

    const handleFormSubmit = async (data: ContactFormData) => {
        try {
            if (onSubmit) {
                await onSubmit(data);
            } else {
                console.log('Form submitted:', data);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            setIsSubmitted(true);
            setShowSuccess(true);
            form.reset();
            setTimeout(() => setShowSuccess(false), 4500);
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch {
            form.setError('root', {
                message: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <>
            {isSubmitted && (
                <div
                    className={cn(
                        'mt-5 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500',
                        showSuccess ? 'opacity-100' : 'opacity-0'
                    )}>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Thanks — we will get back to you shortly.
                    </p>
                </div>
            )}

            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="mt-5">
                <FieldGroup className="gap-6">
                    <Controller
                        control={form.control}
                        name="fullName"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Full name <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Jordan Rivera"
                                    className="bg-background"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Work email address <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="you@company.com"
                                    className="bg-background"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>Company name</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    placeholder="Optional"
                                    className="bg-background"
                                />
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="employees"
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>Number of employees</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    placeholder="e.g. 10–50"
                                    className="bg-background"
                                />
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="message"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Your message <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Tell us what you are building…"
                                    className="bg-background min-h-30 resize-none"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {form.formState.errors.root && (
                        <p className="text-destructive text-sm">
                            {form.formState.errors.root.message}
                        </p>
                    )}

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <LoaderIcon className="size-4 animate-spin" aria-hidden />
                            ) : null}
                            {form.formState.isSubmitting ? 'Sending…' : 'Send message'}
                        </Button>
                    </div>
                </FieldGroup>
            </form>
        </>
    );
};

export { Contact };
