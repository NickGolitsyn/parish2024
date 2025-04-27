"use client";

import { useState, useRef, useEffect } from "react";
import { VolumeX, Volume2, Play, LoaderCircle } from "lucide-react";

export function VideoSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling play/pause when clicking mute button
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle loading states
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => setIsLoading(true);
    
    const handleCanPlay = () => {
      setIsLoading(false);
      // Only auto-play if user hasn't manually paused
      if (isPlaying) {
        video.play().catch(err => {
          console.log("Auto-play was prevented:", err);
          // If autoplay is blocked by browser, update UI state
          setIsPlaying(false);
        });
      }
    };
    
    const handleWaiting = () => setIsLoading(true);
    
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    // Clean up event listeners
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src="https://evwxovg0nb.ufs.sh/f/IKbgtLf8GHrleuzgC4hhQmZpE3tvyxbLNsrIXUfdT0lSGwBC"
        className="w-full h-full object-cover cursor-pointer rounded-md"
        autoPlay
        muted
        loop
        playsInline
        poster="https://evwxovg0nb.ufs.sh/f/IKbgtLf8GHrlgsxMFq08u3jS9GFfhbHrEXVOotL6Z0qlxCzA"
        onClick={togglePlayPause}
        onCanPlay={() => setIsLoading(false)}
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-md">
          <div className="bg-black/40 p-4 rounded-full">
            <LoaderCircle className="size-8 text-white animate-spin" />
          </div>
        </div>
      )}

      {/* Play/Pause indicator (shows briefly when toggling) */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/30 p-3 rounded-full backdrop-blur-xs">
            <Play className="size-6 text-white" />
          </div>
        </div>
      )}

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors backdrop-blur-xs"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="size-5 text-white" />
        ) : (
          <Volume2 className="size-5 text-white" />
        )}
      </button>
    </div>
  );
}