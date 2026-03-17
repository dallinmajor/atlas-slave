import { useRef, useState, useEffect, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { musicItems } from '../assets/music';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './SectionTitle';

type Track = (typeof musicItems)[number] & {
  id: number;
};

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="block w-6 h-6 shrink-0" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M7.7 10.4c2.8-1 6-0.9 8.7 0.5" />
    <path d="M8.4 13.1c2.2-0.7 4.6-0.6 6.8 0.5" />
    <path d="M9.2 15.6c1.6-0.5 3.3-0.4 4.9 0.4" />
  </svg>
);

const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="block w-6 h-6 shrink-0 -translate-y-0.5 -translate-x-0.5" aria-hidden="true">
    <path d="M14.88 3.2a3.2 3.2 0 0 0-2.18 1.09 3.06 3.06 0 0 0-.78 2.3c.83.08 1.69-.27 2.23-.92a3.1 3.1 0 0 0 .73-2.47ZM18.6 13.86c-.04-2.2 1.8-3.25 1.88-3.3-1.03-1.5-2.63-1.7-3.2-1.72-1.36-.14-2.66.8-3.35.8-.7 0-1.76-.78-2.9-.76-1.5.02-2.86.87-3.63 2.2-1.57 2.72-.4 6.75 1.11 8.94.74 1.07 1.62 2.26 2.78 2.22 1.12-.05 1.54-.72 2.9-.72 1.34 0 1.72.72 2.92.69 1.21-.02 1.98-1.1 2.72-2.17.85-1.24 1.2-2.45 1.22-2.52-.03-.01-2.34-.9-2.45-3.66Z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="block w-6 h-6 shrink-0" aria-hidden="true">
    <path d="M21.6 7.2a2.86 2.86 0 0 0-2.01-2.01C17.82 4.7 12 4.7 12 4.7s-5.82 0-7.59.49A2.86 2.86 0 0 0 2.4 7.2 29.5 29.5 0 0 0 1.9 12c0 1.63.17 3.23.5 4.8a2.86 2.86 0 0 0 2.01 2.01c1.77.49 7.59.49 7.59.49s5.82 0 7.59-.49a2.86 2.86 0 0 0 2.01-2.01c.33-1.57.5-3.17.5-4.8 0-1.63-.17-3.23-.5-4.8ZM9.86 14.8V9.2l4.92 2.8-4.92 2.8Z" />
  </svg>
);

const formatTime = (time: number): string => {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const WAVEFORM_HEIGHT = 50;
const BAR_HEIGHT = .75;

interface TrackPlayerProps {
  track: Track;
  isActive: boolean;
  onActivate: (id: number) => void;
}

const TrackPlayer = ({ track, isActive, onActivate }: TrackPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const onActivateRef = useRef(onActivate);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullDuration, setFullDuration] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const clipStart = track.start ?? 0;
  const hasClipEnd = typeof track.end === 'number';
  const clipEnd = hasClipEnd ? track.end : undefined;

  // keep callback ref fresh without recreating WaveSurfer
  onActivateRef.current = onActivate;

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: 'rgba(94, 234, 212, 0.75)',
      progressColor: 'rgb(255, 255, 255)',
      cursorColor: 'rgba(255, 255, 255, 0.85)',
      cursorWidth: 2,
      barWidth: 1.5,
      barGap: 1,
      barRadius: 1.5,
      height: WAVEFORM_HEIGHT,
      barHeight: BAR_HEIGHT,
      url: track.src,
      interact: true,
      fetchParams: {
        mode: 'cors',
      },
    });

    ws.on('ready', () => {
      ws.setOptions({ height: WAVEFORM_HEIGHT });

      const trackDuration = ws.getDuration();
      const normalizedStart = Math.min(Math.max(clipStart, 0), trackDuration);
      const normalizedEnd = Math.min(
        Math.max(clipEnd ?? trackDuration, normalizedStart),
        trackDuration
      );

      setIsReady(true);
      setHasError(false);
      setFullDuration(trackDuration);
      setDuration(normalizedEnd - normalizedStart);
      setCurrentTime(normalizedStart);

      if (normalizedStart > 0) {
        ws.setTime(normalizedStart);
      }
    });
    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => {
      setIsPlaying(false);
      const normalizedStart = Math.min(Math.max(clipStart, 0), ws.getDuration());
      ws.setTime(normalizedStart);
      setCurrentTime(normalizedStart);
    });
    ws.on('timeupdate', (t) => {
      const normalizedStart = Math.min(Math.max(clipStart, 0), ws.getDuration());
      const normalizedEnd = Math.min(
        Math.max(clipEnd ?? ws.getDuration(), normalizedStart),
        ws.getDuration()
      );
      setCurrentTime(t);

      if (Number.isFinite(normalizedEnd) && normalizedEnd > 0 && t >= normalizedEnd) {
        ws.pause();
        ws.setTime(normalizedStart);
        setCurrentTime(normalizedStart);
      }
    });
    ws.on('error', () => setHasError(true));

    // clicking waveform seeks, but clip mode keeps playback inside start/end window
    ws.on('interaction', () => {
      const current = ws.getCurrentTime();
      const normalizedStart = Math.min(Math.max(clipStart, 0), ws.getDuration());
      const normalizedEnd = Math.min(Math.max(clipEnd ?? ws.getDuration(), normalizedStart), ws.getDuration());

      if (current < normalizedStart) {
        ws.setTime(normalizedStart);
      }
      if (current > normalizedEnd) {
        ws.setTime(normalizedEnd);
      }

      onActivateRef.current(track.id);
      ws.play();
    });

    wsRef.current = ws;
    return () => {
      ws.destroy();
      wsRef.current = null;
    };
  }, [track.src, track.id, clipStart, clipEnd]);

  // stop this track when another becomes active
  useEffect(() => {
    if (!isActive && wsRef.current) {
      const ws = wsRef.current;
      const normalizedStart = Math.min(Math.max(clipStart, 0), ws.getDuration() || Number.MAX_SAFE_INTEGER);

      if (ws.isPlaying()) {
        ws.pause();
      }
      ws.setTime(normalizedStart);
      setCurrentTime(normalizedStart);
    }
  }, [isActive, clipStart]);

  const handlePlay = () => {
    if (!wsRef.current || !isReady) return;
    const ws = wsRef.current;
    const normalizedStart = Math.min(Math.max(clipStart, 0), ws.getDuration());
    const normalizedEnd = Math.min(Math.max(clipEnd ?? ws.getDuration(), normalizedStart), ws.getDuration());

    onActivate(track.id);

    const needsSeek = ws.getCurrentTime() < normalizedStart || ws.getCurrentTime() >= normalizedEnd;
    if (needsSeek) {
      ws.setTime(normalizedStart);
      setCurrentTime(normalizedStart);
      // On mobile, media.currentTime seeks are asynchronous — calling play()
      // immediately after setTime() causes playback to start from 0 before the
      // seek completes. Wait for the native seeked event before playing.
      ws.getMediaElement().addEventListener('seeked', () => ws.play(), { once: true });
    } else {
      ws.play();
    }
  };

  const handleStop = () => {
    if (!wsRef.current) return;
    const ws = wsRef.current;
    const normalizedStart = Math.min(Math.max(clipStart, 0), ws.getDuration() || Number.MAX_SAFE_INTEGER);

    ws.pause();
    ws.setTime(normalizedStart);
    setCurrentTime(normalizedStart);
  };

  const normalizedClipStart = fullDuration > 0 ? Math.min(Math.max(clipStart, 0), fullDuration) : 0;
  const normalizedClipEnd = fullDuration > 0
    ? Math.min(Math.max(clipEnd ?? fullDuration, normalizedClipStart), fullDuration)
    : 0;
  const hasVisualClipMask = fullDuration > 0 && (normalizedClipStart > 0 || normalizedClipEnd < fullDuration);
  const leftMaskWidth = fullDuration > 0 ? (normalizedClipStart / fullDuration) * 100 : 0;
  const rightMaskWidth = fullDuration > 0 ? ((fullDuration - normalizedClipEnd) / fullDuration) * 100 : 0;
  const clipWindowWidth = Math.max(100 - leftMaskWidth - rightMaskWidth, 0);
  const clipRelativeCurrent = Math.max(currentTime - normalizedClipStart, 0);
  const clipLengthLabel = isReady ? formatTime(duration) : '--:--';

  return (
    <div
      className={`relative overflow-hidden border rounded-xl px-4 sm:px-5 py-3 transition-all duration-300 shadow-2xl ${
        isPlaying
          ? 'bg-black/80 border-teal-300/70 shadow-[0_0_30px_rgba(45,212,191,0.22)]'
          : 'bg-black/72 border-teal-500/25 hover:border-teal-400/55 hover:shadow-[0_0_26px_rgba(45,212,191,0.14)]'
      }`}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(45,212,191,0.10)_0%,rgba(0,0,0,0)_42%)]" />

      {/* Header row: controls + title + meta + links in one compact line */}
      <div className="relative z-10 mb-2 flex items-center justify-between gap-2">
        <div className="min-w-0 flex items-center gap-2 flex-1">
          <button
            onClick={handlePlay}
            disabled={!isReady || isPlaying}
            aria-label="Play"
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 shrink-0 ${
              isPlaying
                ? 'bg-teal-500 border-teal-300 text-black cursor-default'
                : isReady
                ? 'bg-black/35 border-teal-500/55 text-teal-300 hover:bg-teal-500/20 hover:border-teal-300'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <button
            onClick={handleStop}
            disabled={!isPlaying}
            aria-label="Stop"
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 shrink-0 ${
              isPlaying
                ? 'bg-black/35 border-teal-500/55 text-teal-300 hover:bg-teal-500/20 hover:border-teal-300'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
          </button>

          <span
            className={`block truncate text-lg sm:text-xl font-black uppercase tracking-tight transition-colors duration-300 ${
              isPlaying ? 'text-teal-200' : 'text-white'
            }`}
            style={{ fontWeight: 900, letterSpacing: '-0.015em' }}
          >
            {track.title}
          </span>

          {isPlaying && (
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.16em] text-teal-200 font-black shrink-0">Now Playing</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.16em] text-teal-200/80 font-bold border border-teal-400/35 rounded-full px-2 py-0.5">
            Clip {clipLengthLabel}
          </span>
          {track.spotifyLink && (
            <a
              href={track.spotifyLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`${track.title} on Spotify`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center leading-none text-teal-300/90 hover:text-teal-100 transition-colors duration-200"
            >
              <SpotifyIcon />
            </a>
          )}
          {track.appleMusicLink && (
            <a
              href={track.appleMusicLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`${track.title} on Apple Music`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center leading-none text-teal-300/90 hover:text-teal-100 transition-colors duration-200"
            >
              <AppleMusicIcon />
            </a>
          )}
          {track.youtubeLink && (
            <a
              href={track.youtubeLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`${track.title} on YouTube`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center leading-none text-teal-300/90 hover:text-teal-100 transition-colors duration-200"
            >
              <YouTubeIcon />
            </a>
          )}
        </div>
      </div>

      {/* Waveform */}
      {hasError ? (
        <p className="relative z-10 text-xs text-gray-500 italic py-5 text-center">
          Audio file could not load. Check src URL/path and CORS settings.
        </p>
      ) : (
        <div className="relative z-10 w-full rounded-lg overflow-hidden bg-black/45 border border-teal-500/20" style={{ height: `${WAVEFORM_HEIGHT}px`, minHeight: `${WAVEFORM_HEIGHT}px` }}>
          <div ref={containerRef} className="w-full" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(94,234,212,0.07)_0%,rgba(0,0,0,0.14)_62%,rgba(0,0,0,0.32)_100%)]" />
          {hasVisualClipMask && (
            <>
              <div
                className="absolute inset-y-0 z-20 left-0 pointer-events-none"
                style={{ width: `${leftMaskWidth}%`, background: 'linear-gradient(to right, rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.68) 84%, rgba(0,0,0,0.44) 100%)' }}
              />
              <div
                className="absolute inset-y-0 z-20 right-0 pointer-events-none"
                style={{ width: `${rightMaskWidth}%`, background: 'linear-gradient(to left, rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.68) 84%, rgba(0,0,0,0.44) 100%)' }}
              />
              {/* Bright lift on the clip window itself */}
              <div
                className="absolute inset-y-0 z-20 pointer-events-none"
                style={{
                  left: `${leftMaskWidth}%`,
                  width: `${clipWindowWidth}%`,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.11) 0%, rgba(94,234,212,0.18) 50%, rgba(255,255,255,0.11) 100%)',
                }}
              />
              {/* Glowing border frame */}
              <div
                className={`absolute inset-y-0 z-20 pointer-events-none border-l border-r border-teal-100 ${
                  isPlaying
                    ? 'shadow-[0_0_0_1px_rgba(45,212,191,0.72),0_0_30px_rgba(45,212,191,0.52),inset_0_0_20px_rgba(45,212,191,0.2)]'
                    : 'shadow-[0_0_0_1px_rgba(45,212,191,0.42),0_0_18px_rgba(45,212,191,0.32),inset_0_0_14px_rgba(45,212,191,0.14)]'
                }`}
                style={{ left: `${leftMaskWidth}%`, width: `${clipWindowWidth}%` }}
              />
            </>
          )}
        </div>
      )}

      {/* Time display */}
      {!hasError && (
        <div className="relative z-10 flex justify-between mt-1.5 text-xs text-gray-400 font-mono">
          <span>{formatTime(clipRelativeCurrent)}</span>
          <span>{isReady ? formatTime(duration) : '--:--'}</span>
        </div>
      )}


    </div>
  );
};

const MusicSection = () => {
  const [sectionRef, opacity, translateY] = useScrollAnimation();
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleActivate = useCallback((id: number) => setActiveId(id), []);

  return (
    <section
      ref={sectionRef}
      id="music"
      className="py-10 sm:py-12 md:py-14 relative z-10"
      style={{
        fontFamily: '"Barlow Condensed", system-ui, sans-serif',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle>Music</SectionTitle>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -inset-x-2 -top-3 h-28 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.18)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

          <p className="relative text-lg sm:text-xl md:text-2xl text-gray-100 text-center mb-6 sm:mb-8 font-light uppercase tracking-[0.12em]">
            Featured Clips - Loud, Fast, and Unapologetic
          </p>

          <div className="relative flex flex-col gap-3">
            {musicItems.map((item, index) => (
              <TrackPlayer
                key={item.title}
                track={{ ...item, id: index + 1 }}
                isActive={activeId === index + 1}
                onActivate={handleActivate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;

