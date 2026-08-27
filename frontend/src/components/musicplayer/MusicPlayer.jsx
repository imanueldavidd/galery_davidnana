import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import usePlaylist from "../../hooks/usePlaylist";

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ autoPlay = true }) {
  const { playlist } = usePlaylist();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(
  () => typeof window !== "undefined" && window.innerWidth < 640
);
  const audioRef = useRef(null);

  const currentSong = playlist[currentIndex] || playlist[0];

  // Autoplay saat pertama kali muncul (browser bisa memblokir autoplay
  // dengan suara sebelum ada interaksi user — ini best effort)
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentIndex, autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed bottom-5 left-5 z-50 w-[240px] rounded-2xl bg-paper/90 backdrop-blur-md border border-gold-soft shadow-xl p-3"
    >
      <audio
        ref={audioRef}
        src={currentSong?.audio_url || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNext}
      />

      <div className="flex items-center gap-3">
        {/* Cover art */}
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-milk-brown-light flex-shrink-0">
          {currentSong?.cover_url ? (
            <img
              src={currentSong.cover_url}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gold text-lg">
              ♪
            </div>
          )}
        </div>

        {/* Title & artist */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ink truncate">
            {currentSong?.title || "Loading..."}
          </p>
          <p className="text-xs text-ink-soft truncate">
            {currentSong?.artist || ""}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[10px] text-ink-soft w-8 text-right">
          {formatTime(progress)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="flex-1 h-1 accent-gold cursor-pointer"
        />
        <span className="text-[10px] text-ink-soft w-8">
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="text-milk-brown-dark hover:text-gold transition-colors"
          aria-label="Lagu sebelumnya"
        >
          ⏮
        </button>
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gold text-cream flex items-center justify-center hover:bg-gold-light transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={handleNext}
          className="text-milk-brown-dark hover:text-gold transition-colors"
          aria-label="Lagu berikutnya"
        >
          ⏭
        </button>
      </div>
    </motion.div>
  );
}