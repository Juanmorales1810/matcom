import type { MotionValue } from 'framer-motion';
import { motion, useAnimationControls, useScroll, useTransform } from 'framer-motion';
import { Pause, Play, RotateCcw } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const getTextPositionClassName = (textPosition: 'left' | 'right' | 'top' | 'bottom') => {
    let textPositionClassName = '';

    switch (textPosition) {
        case 'left':
            textPositionClassName = 'md:left-10 md:top-1/3 md:-translate-y-1/3';
            break;
        case 'right':
            textPositionClassName = 'md:right-10 md:top-1/2 md:-translate-y-1/2';
            break;
        case 'top':
            textPositionClassName = 'md:top-10 md:left-1/2 md:-translate-x-1/2';
            break;
        case 'bottom':
            textPositionClassName = 'md:bottom-10 md:left-1/2 md:-translate-x-1/2';
            break;
        default:
            textPositionClassName = 'md:left-10 md:top-1/2 md:-translate-y-1/2';
            break;
    }

    return textPositionClassName;
};

const getCardPositions = (total: number, index: number) => {
    const scrollWidthPerCard = 1 / total;
    const scrollOffset = (scrollWidthPerCard / total) * (index + 1);

    const position = scrollWidthPerCard * index + scrollOffset;

    const prev = Math.max(0, scrollWidthPerCard * (index - 1) + scrollOffset);
    const next = Math.min(1, scrollWidthPerCard * (index + 1) + scrollOffset);

    const firstCardPosition = scrollWidthPerCard * 0 + scrollOffset;
    const lastCardPosition = scrollWidthPerCard * (total - 1) + scrollOffset;

    const range = [firstCardPosition, prev, position, next, lastCardPosition];

    return range;
};

const SCROLL_KEYFRAME_EPS = 1e-5;

/** Scroll keyframes from getCardPositions are not always ordered; WAAPI requires offsets in [0,1], non-decreasing. */
const normalizeScrollKeyframes = <T,>(
    inputs: number[],
    outputs: T[]
): { inputs: number[]; outputs: T[] } => {
    const pairs = inputs.map((input, i) => ({
        input: Math.min(1, Math.max(0, Number.isFinite(input) ? input : 0)),
        output: outputs[i],
    }));
    pairs.sort((a, b) => a.input - b.input);

    for (let pass = 0; pass < pairs.length + 2; pass++) {
        for (let i = 1; i < pairs.length; i++) {
            if (pairs[i].input <= pairs[i - 1].input) {
                pairs[i].input = Math.min(pairs[i - 1].input + SCROLL_KEYFRAME_EPS, 1);
            }
        }
        for (let i = pairs.length - 1; i > 0; i--) {
            if (pairs[i].input <= pairs[i - 1].input) {
                pairs[i - 1].input = Math.max(0, pairs[i].input - SCROLL_KEYFRAME_EPS);
            }
        }
    }

    return {
        inputs: pairs.map((p) => Math.min(1, Math.max(0, p.input))),
        outputs: pairs.map((p) => p.output),
    };
};

interface Visual {
    text: string;
    className: string;
    image: string;
    textPosition: 'left' | 'right' | 'top' | 'bottom';
}

interface VisualCardProps {
    visual: Visual;
    index: number;
    total: number;
    scrollXProgress: MotionValue<number>;
}

const VisualCard = ({ visual, index, total, scrollXProgress }: VisualCardProps) => {
    const textPositionClassName = getTextPositionClassName(visual.textPosition);

    const range = getCardPositions(total, index);

    const opacityKeyframes = normalizeScrollKeyframes(range, [0, 0, 1, 0, 0]);
    const xKeyframes = normalizeScrollKeyframes(range, ['100%', '100%', '0%', '-100%', '-100%']);

    const opacity = useTransform(
        scrollXProgress,
        opacityKeyframes.inputs,
        opacityKeyframes.outputs
    );
    const x = useTransform(scrollXProgress, xKeyframes.inputs, xKeyframes.outputs);

    return (
        <div
            className={cn(
                'relative h-[75vh] w-[70vw] shrink-0 snap-center overflow-hidden rounded-3xl',
                visual.className
            )}
            id={`visual-${index}`}>
            <img
                src={visual.image}
                alt={visual.text}
                className="absolute inset-0 z-0 h-full w-full object-cover"
            />

            <span className="pointer-events-none absolute inset-0 z-10 bg-black/5" />

            <motion.p
                style={{
                    opacity,
                    x,
                }}
                className={cn(
                    'absolute z-20 hidden text-xl font-semibold md:block md:max-w-sm lg:text-2xl',
                    textPositionClassName
                )}>
                {visual.text}
            </motion.p>
            <motion.p
                style={{
                    opacity,
                    x,
                }}
                className={cn(
                    'absolute z-20 text-xl font-semibold md:hidden md:max-w-sm lg:text-2xl',
                    'top-10 left-1/2 -translate-x-1/2'
                )}>
                {visual.text}
            </motion.p>
        </div>
    );
};

const GalleryPaginationDot = ({
    index,
    scrollXProgress,
    total,
    isPlaying,
    currentVisualIndex,
}: {
    index: number;
    scrollXProgress: MotionValue<number>;
    total: number;
    isPlaying: boolean;
    currentVisualIndex: number;
}) => {
    const range = getCardPositions(total, index);

    const controls = useAnimationControls();

    const widthKeyframes = normalizeScrollKeyframes(range, [8, 8, 50, 8, 8]);
    const width = useTransform(scrollXProgress, widthKeyframes.inputs, widthKeyframes.outputs);

    useEffect(() => {
        if (isPlaying && currentVisualIndex === index) {
            controls.set({
                width: 0,
            });
            controls.start({
                width: '100%',
            });
        }
    }, [currentVisualIndex, isPlaying, index, controls]);

    const handleClick = (index: number) => {
        document.getElementById(`visual-${index}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    };
    return (
        <motion.button
            style={{
                width,
            }}
            onClick={() => handleClick(index)}
            className="bg-foreground/50 hover:bg-foreground/70 relative inline-block h-2 rounded-full">
            {isPlaying && currentVisualIndex === index && (
                <motion.span
                    animate={controls}
                    transition={{ duration: 2, ease: 'linear' }}
                    className="bg-foreground absolute top-0 left-0 z-10 h-full rounded-full"
                />
            )}
        </motion.button>
    );
};

const visuals = [
    {
        text: 'Modern design principles create intuitive interfaces that users love and trust.',
        className: 'bg-blue-100 dark:bg-blue-900',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png',
        textPosition: 'left',
    },

    {
        text: 'Creative process drives innovation through iterative design and user feedback.',
        className: 'bg-green-100 dark:bg-green-900',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg',
        textPosition: 'top',
    },
    {
        text: 'Artistic vision transforms complex ideas into beautiful, engaging visual experiences.',
        className: 'bg-purple-100 dark:bg-purple-900',
        // image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-xOLhD-qfoRI-unsplash.jpg",
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg',
        textPosition: 'bottom',
    },
    {
        text: 'Digital art combines traditional aesthetics with modern interactive capabilities.',
        className: 'bg-pink-100 dark:bg-pink-900',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw15.jpeg',
        textPosition: 'top',
    },
    {
        text: 'Innovation hub brings together cutting-edge technology with human-centered design.',
        className: 'bg-orange-100 dark:bg-orange-900',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img23.jpeg',
        textPosition: 'left',
    },
    {
        text: 'Visual storytelling connects audiences through compelling narratives and imagery.',
        className: 'bg-indigo-100 dark:bg-indigo-900',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg',
        textPosition: 'top',
    },
] as const satisfies readonly Visual[];
const Gallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVisualIndex, setCurrentVisualIndex] = useState(0);

    const { scrollXProgress } = useScroll({
        container: containerRef,
    });

    useEffect(() => {
        const unsubscribe = scrollXProgress.on('change', (progress) => {
            if (isPlaying) return;

            let closestIndex = 0;
            let minDistance = Infinity;

            visuals.forEach((_, index) => {
                const range = getCardPositions(visuals.length, index);
                const visualPosition = range[2];
                const distance = Math.abs(progress - visualPosition);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            setCurrentVisualIndex(closestIndex);
        });

        return () => unsubscribe();
    }, [scrollXProgress, visuals.length, isPlaying, visuals]);

    useEffect(() => {
        if (!isPlaying) return;

        const intervalId = setInterval(() => {
            if (currentVisualIndex === visuals.length - 1) {
                setIsPlaying(false);
                return currentVisualIndex;
            }

            const nextIndex = currentVisualIndex + 1;

            document.getElementById(`visual-${nextIndex}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });

            setCurrentVisualIndex(nextIndex);
        }, 2000);

        return () => clearInterval(intervalId);
    }, [isPlaying, visuals.length, currentVisualIndex]);

    const restartAnimation = () => {
        setCurrentVisualIndex(0);
        document.getElementById(`visual-0`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
        setIsPlaying(true);
    };

    return (
        <section className="py-32">
            <div className="container mx-auto overflow-visible">
                <div className="flex flex-col gap-14">
                    <h3 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                        Our Creative Gallery
                    </h3>

                    <div className="relative space-y-10">
                        <div
                            ref={containerRef}
                            className="no-scrollbar flex snap-x snap-mandatory flex-nowrap items-center gap-10 overflow-x-auto overflow-y-hidden scroll-smooth px-4"
                            style={{
                                scrollSnapType: 'x mandatory',
                                scrollBehavior: 'smooth',
                                WebkitOverflowScrolling: 'touch',
                            }}>
                            {visuals.map((visual, index) => {
                                return (
                                    <VisualCard
                                        key={`visual-${index}`}
                                        visual={visual}
                                        index={index}
                                        total={visuals.length}
                                        scrollXProgress={scrollXProgress}
                                    />
                                );
                            })}
                        </div>
                        <div className="sticky bottom-20 z-20 flex justify-center">
                            <div className="flex h-14 items-center gap-2 overflow-hidden">
                                <div className="bg-muted/50 flex h-full items-center gap-3 rounded-full px-6 backdrop-blur-xl">
                                    {visuals.map((_, index) => {
                                        return (
                                            <GalleryPaginationDot
                                                key={`visual-${index}`}
                                                index={index}
                                                scrollXProgress={scrollXProgress}
                                                total={visuals.length}
                                                isPlaying={isPlaying}
                                                currentVisualIndex={currentVisualIndex}
                                            />
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={
                                        currentVisualIndex === visuals.length - 1 && !isPlaying
                                            ? restartAnimation
                                            : () => setIsPlaying(!isPlaying)
                                    }
                                    className="bg-muted/50 [&>svg]:fill-foreground/50 [&>svg]:stroke-foreground/10 flex h-full items-center justify-center rounded-full px-6 backdrop-blur-xl">
                                    {currentVisualIndex === visuals.length - 1 && !isPlaying ? (
                                        <RotateCcw
                                            strokeWidth={2.2}
                                            className="stroke-foreground/50! fill-none!"
                                        />
                                    ) : isPlaying ? (
                                        <Pause />
                                    ) : (
                                        <Play />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Gallery };
