"use client";

import { useRef, useState } from "react";

type MusicPlayerProps = {
  src?: string;
  title?: string;
};

export default function MusicPlayer({
  src = "/music/birthday-song.mp3",
  title = "Birthday Music",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Music play error:", error);
      alert("Please tap again to play the music.");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        type="button"
        onClick={toggleMusic}
        className="flex items-center gap-3 rounded-full border border-white/20 bg-black/50 px-5 py-4 text-sm font-black text-white shadow-2xl backdrop-blur-xl transition hover:scale-105 hover:bg-black/70"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-xl text-black">
          {isPlaying ? "⏸️" : "🎵"}
        </span>

        <span className="hidden sm:block">
          {isPlaying ? "Pause" : "Play"} {title}
        </span>
      </button>
    </div>
  );
}