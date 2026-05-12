"use client";

const videoCache = new Set<string>();

export function useVideoPreload() {
    const preloadVideo = (url?: string | null) => {
        if (!url) return;

        if (videoCache.has(url)) return;

        try {
            const video = document.createElement("video");

            video.src = url;
            video.preload = "auto";
            video.muted = true;
            video.playsInline = true;

            video.load();

            videoCache.add(url);
        } catch (err) {
            console.error("Video preload error:", err);
        }
    };

    return { preloadVideo };
}