"use client";

import { createContext, useContext, useEffect } from "react";

interface VideoPreloadContextProps {
    preloadVideo: (url: string) => void;
}

const VideoPreloadContext = createContext<VideoPreloadContextProps>({
    preloadVideo: () => { },
});

export function VideoPreloadProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const preloadVideo = (url: string) => {
        if (!url) return;

        const video = document.createElement("video");

        video.src = url;
        video.preload = "auto";
        video.muted = true;

        video.load();
    };

    useEffect(() => {
        const urls = [
            "https://d12uzar9rhxbes.cloudfront.net/GBM_HD_LOW.mp4",
            "https://d12uzar9rhxbes.cloudfront.net/herosection/ProyectosCuadrado.mp4",
            "https://d12uzar9rhxbes.cloudfront.net/herosection/Pablo-Desktop.mp4",
            "https://d12uzar9rhxbes.cloudfront.net/aboutsection/AboutDesktop.mp4",
            "https://d12uzar9rhxbes.cloudfront.net/aboutsection/AboutMobile.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/AllFields.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Bell.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/BellFactor.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/CasadeMarita.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Deco.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Ecuinvest.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Mechanical.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Mia.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Millenium.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Millerent.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/MMH.mp4",
            // "https://d12uzar9rhxbes.cloudfront.net/businessunits/Seguros.mp4",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/AllFields.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Bell+Ec.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Casa+de+Marita.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Deco.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/FundacionCampana.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Invest.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Mechanical.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Mia.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Millenium.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Millerent.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/MMH.png",
            "https://d12uzar9rhxbes.cloudfront.net/businessunits/Fotos/Seguros.png",
        ];

        urls.forEach(preloadVideo);
    }, []);

    return (
        <VideoPreloadContext.Provider value={{ preloadVideo }}>
            {children}
        </VideoPreloadContext.Provider>
    );
}

export const useVideoPreload = () => useContext(VideoPreloadContext);