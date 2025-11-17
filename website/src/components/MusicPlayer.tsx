import { useState, useEffect, useRef } from 'react';
import '../styles/music-player.css';

interface Song {
  url: string;
  name: string;
  probability: number;
  isRare: boolean;
}

const songs: Song[] = [
  // Common songs - 18% each
  { url: 'https://soundcloud.com/thejackluo/015-memory-v3-part-1', name: 'Memory V3 Part 1', probability: 0.18, isRare: false },
  { url: 'https://soundcloud.com/thejackluo/011-mom', name: 'Mom', probability: 0.18, isRare: false },
  { url: 'https://soundcloud.com/thejackluo/007-mirrox', name: 'Mirrox', probability: 0.18, isRare: false },
  { url: 'https://soundcloud.com/thejackluo/005-reunion', name: 'Reunion', probability: 0.18, isRare: false },
  { url: 'https://soundcloud.com/thejackluo/001-title', name: 'Title', probability: 0.18, isRare: false },
  // Rare songs - 5% each
  { url: 'https://soundcloud.com/thejackluo/memories-v2', name: 'Memories V2', probability: 0.05, isRare: true },
  { url: 'https://soundcloud.com/thejackluo/intersection', name: 'Intersection', probability: 0.05, isRare: true },
];

export default function MusicPlayer() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showRareMessage, setShowRareMessage] = useState(false);
  const widgetRef = useRef<HTMLIFrameElement>(null);
  const widgetInstanceRef = useRef<any>(null);

  // Weighted random song selection
  const selectRandomSong = (): Song => {
    const random = Math.random();
    let cumulative = 0;

    for (const song of songs) {
      cumulative += song.probability;
      if (random <= cumulative) {
        return song;
      }
    }

    return songs[0]; // Fallback
  };

  const handleClick = () => {
    if (!isPlaying) {
      const selectedSong = selectRandomSong();
      setCurrentSong(selectedSong);
      setIsPlaying(true);

      if (selectedSong.isRare) {
        setShowRareMessage(true);
        setTimeout(() => setShowRareMessage(false), 5000); // Hide after 5 seconds
      }

      // Load and play the SoundCloud widget
      loadSoundCloudWidget(selectedSong.url);
    }
  };

  const loadSoundCloudWidget = (url: string) => {
    if (widgetInstanceRef.current) {
      widgetInstanceRef.current.load(url, {
        auto_play: true,
        visual: false,
      });
    }
  };

  const togglePlayPause = () => {
    if (widgetInstanceRef.current) {
      if (isPlaying) {
        widgetInstanceRef.current.pause();
        setIsPlaying(false);
      } else {
        widgetInstanceRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const stopMusic = () => {
    if (widgetInstanceRef.current) {
      widgetInstanceRef.current.pause();
      widgetInstanceRef.current.seekTo(0);
      setIsPlaying(false);
      setCurrentSong(null);
    }
  };

  useEffect(() => {
    // Initialize SoundCloud Widget API
    if (typeof window !== 'undefined' && (window as any).SC) {
      const SC = (window as any).SC;
      if (widgetRef.current) {
        widgetInstanceRef.current = SC.Widget(widgetRef.current);

        // Listen for when the track finishes
        widgetInstanceRef.current.bind(SC.Widget.Events.FINISH, () => {
          setIsPlaying(false);
          setCurrentSong(null);
        });
      }
    }
  }, []);

  return (
    <div className="music-player-container">
      <div
        className={`music-disc ${isPlaying ? 'spinning' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Music disc vinyl effect */}
        <div className="vinyl-disc">
          <img
            className="disc-image"
            src="/assets/images/jack/main.jpg"
            alt="Portrait of Jack Luo"
          />
          <div className="disc-center"></div>
          <div className="disc-rings"></div>
        </div>

        {/* Hover overlay */}
        {isHovered && !isPlaying && (
          <div className="hover-overlay">
            <div className="hover-content">
              <svg className="music-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <p>Want some music?</p>
            </div>
          </div>
        )}
      </div>

      {/* Now Playing Display */}
      {currentSong && (
        <div className="now-playing">
          <p className="now-playing-text">
            Now playing: <span className="song-name">{currentSong.name}</span>
          </p>
          <div className="controls">
            <button onClick={togglePlayPause} className="control-btn">
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button onClick={stopMusic} className="control-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Rare Song Message */}
      {showRareMessage && (
        <div className="rare-message">
          <div className="rare-content">
            <span className="sparkle">✨</span>
            <p>Whoa! You got a rare track!</p>
            <span className="sparkle">✨</span>
          </div>
        </div>
      )}

      {/* Hidden SoundCloud Widget */}
      <iframe
        ref={widgetRef}
        width="0"
        height="0"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(songs[0].url)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`}
        style={{ display: 'none' }}
      ></iframe>
    </div>
  );
}
