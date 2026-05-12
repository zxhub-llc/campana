"use client";

import { AboutSection } from "@/lib/wordpress.d";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { Volume2, VolumeX } from "lucide-react";
import { useVideoPreload } from "@/hooks/useVideoPreload";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AboutUsProps {
    id?: string;
    about: AboutSection;
}

export function AboutUsSection({ id, about }: AboutUsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgLayerRef = useRef<HTMLDivElement>(null);
    const introTextRef = useRef<HTMLDivElement>(null);
    const scrollOverlayRef = useRef<HTMLDivElement>(null);
    const textGroupRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    // --- ESTADOS PARA EL REPRODUCTOR ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isPinned, setIsPinned] = useState(true);

    const introSrc = about.background_desktop;

    const introWords = (introSrc || "")
        .trim()
        .replace(/,/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 2500);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!isPlaying) {
            setShowControls(true);
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        } else {
            handleMouseMove();
        }
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, [isPlaying]);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1024px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const selectedPlaybackId = isMobile
        ? about.mux_playback_mobile_id || about.mux_playback_id
        : about.mux_playback_id || about.mux_playback_mobile_id;

    const { preloadVideo } = useVideoPreload();

    useEffect(() => {
        if (!selectedPlaybackId) return;

        preloadVideo(selectedPlaybackId);
    }, [selectedPlaybackId]);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const isMobileSize = window.innerWidth <= 1024;

            // --- SETEOS INICIALES DIFERENCIADOS ---
            gsap.set(bgLayerRef.current, { opacity: isMobileSize ? 0.5 : 0 });

            // En mobile el IntroText nace muerto (oculto)
            gsap.set(introTextRef.current, {
                opacity: isMobileSize ? 0 : 1,
                display: isMobileSize ? "none" : "flex",
                pointerEvents: isMobileSize ? "none" : "auto"
            });

            gsap.set(textGroupRef.current, { opacity: 0, y: 0 });
            gsap.set(videoContainerRef.current, { height: 0, overflow: "hidden" });
            gsap.set(contentRef.current, { opacity: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: isMobileSize ? "+=100%" : "+=300%",
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    refreshPriority: 0,
                    onLeave: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                        setIsPinned(false);
                    },
                    onLeaveBack: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                        setIsPinned(true);
                    },
                    onEnterBack: () => {
                        setIsPinned(true);
                    }
                },
            });

            // --- FASES DE LA ANIMACIÓN ---

            // PHASE 1 & 2: Solo tienen duración en Desktop
            tl.to(bgLayerRef.current, {
                opacity: 0.5,
                duration: isMobileSize ? 0.1 : 1
            });

            tl.to(introTextRef.current, {
                opacity: 0,
                duration: isMobileSize ? 0 : 1, // Desaparece instantáneo en mobile
                ease: "power2.inOut",
            }, isMobileSize ? 0 : "-=0.4");

            // PHASE 3: Logo Fade In (Aparece rápido en mobile)
            tl.to(textGroupRef.current, {
                opacity: 1,
                duration: isMobileSize ? 0.5 : 1,
                ease: "power2.out",
            });

            // PHASE 4: Video Reveal (Se mantiene igual, es el core del content)
            tl.to(videoContainerRef.current, {
                height: "auto",
                duration: isMobileSize ? 1 : 1.5,
                ease: "power2.inOut",
                onReverseComplete: () => {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            }, "+=0.2");

            // PHASE 5: Content Final Opacity
            tl.to(contentRef.current, {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
            }, "<");

            // Espacio final de respiro
            tl.to({}, { duration: isMobileSize ? 1 : 2 });

        }, sectionRef);

        return () => ctx.revert();
    }, [selectedPlaybackId, introSrc]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`relative w-full min-h-screen flex items-center overflow-hidden bg-campana-bg-about z-50`}
        >
            {/* BACKGROUND OVERLAY - Nivel base */}
            <div
                ref={bgLayerRef}
                className="absolute inset-0 bg-campana-bg-about backdrop-blur-sm z-[1]"
            />

            <div className="h-full w-full relative overflow-hidden flex items-center justify-center">

                {/* INTRO TEXT - Z-INDEX ALTO y habilitamos interacción */}
                {introSrc && (
                    <div
                        ref={introTextRef}
                        className="absolute inset-0 z-40 flex flex-col justify-center gap-2 pointer-events-auto"
                    >
                        {introWords.map((word, index) => (
                            <div key={index} className="w-[80vw] max-w-[900px] h-[120px] md:h-64 -mb-10">
                                <TextHoverEffect text={word} />
                            </div>
                        ))}
                    </div>
                )}

                {/* OVERLAY - Bloqueamos interacción para que pase al texto */}
                <div
                    ref={scrollOverlayRef}
                    className="absolute inset-0 z-30 pointer-events-none bg-campana-bg-about backdrop-blur-sm"
                />

                {/* CONTENT - Aquí está el truco: pointer-events-none en el contenedor */}
                <div
                    ref={contentRef}
                    className="relative z-50 flex flex-col items-center justify-center w-full max-w-8xl mx-auto h-full gap-4 pointer-events-none"
                >
                    {/* LOGO */}
                    <div ref={textGroupRef} className="flex flex-col items-center w-full text-center">
                        <div className="relative w-[300px] md:w-[500px] h-[150px]">
                            <Image src="/assets/logo.svg" alt="Logo" fill className="invert" />
                        </div>
                    </div>

                    {/* VIDEO CONTAINER - Reactivamos interacción solo aquí */}
                    {selectedPlaybackId && (
                        <div
                            ref={videoContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => isPlaying && setShowControls(false)}
                            className="relative h-full md:w-full aspect-none md:aspect-2430/1080 shadow-2xl overflow-hidden group pointer-events-auto"
                        >
                            <video
                                ref={videoRef}
                                src={selectedPlaybackId}
                                loop
                                muted={isMuted}
                                playsInline
                                className="w-full object-contain"
                            />

                            {/* BOTÓN PLAY */}
                            <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${(showControls || !isPlaying) ? "opacity-100" : "opacity-0"}`}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!videoRef.current) return;
                                        isPlaying ? videoRef.current.pause() : videoRef.current.play();
                                        setIsPlaying(!isPlaying);
                                    }}
                                    className="h-20 w-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer pointer-events-auto"
                                >
                                    {isPlaying ? (
                                        <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor">
                                            <rect x="2" y="1" width="4" height="12" rx="1" />
                                            <rect x="8" y="1" width="4" height="12" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor">
                                            <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}