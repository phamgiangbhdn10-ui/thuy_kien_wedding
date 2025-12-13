'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Song {
  id: number
  name: string
  file: string
}

export default function MusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [introCompleted, setIntroCompleted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Listen for intro completion (user interaction)
  useEffect(() => {
    const handleUserInteraction = () => {
      setIntroCompleted(true)
    }
    
    // Listen for any user interaction
    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true })
    
    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [])

  // Load songs from API
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await fetch('/api/sounds')
        const data = await response.json()
        if (data.songs && data.songs.length > 0) {
          setSongs(data.songs)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error loading songs:', error)
        setIsLoading(false)
      }
    }
    loadSongs()
  }, [])

  const handleSongEnd = () => {
    if (selectedSongId === null) {
      // Auto play next song if no specific song selected
      setCurrentSongIndex((prev) => (prev + 1) % songs.length)
    } else {
      // If specific song selected, replay it
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(console.error)
      }
    }
  }

  // Initialize audio event listener
  useEffect(() => {
    const handleEnd = () => {
      if (selectedSongId === null) {
        // Auto play next song if no specific song selected
        setCurrentSongIndex((prev) => (prev + 1) % songs.length)
      } else {
        // If specific song selected, replay it
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(console.error)
        }
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnd)
      return () => {
        audioRef.current?.removeEventListener('ended', handleEnd)
      }
    }
  }, [songs.length, selectedSongId])

  // Auto play first song when songs are loaded and user has interacted
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  useEffect(() => {
    if (audioRef.current && songs.length > 0 && !hasAutoPlayed && introCompleted) {
      // Set source and load
      audioRef.current.src = songs[0].file
      audioRef.current.load()
      
      // Try to play after user interaction
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started
            setIsPlaying(true)
            setHasAutoPlayed(true)
          })
          .catch((error) => {
            // Still blocked somehow
            console.log('Play error:', error)
            setIsPlaying(false)
            setHasAutoPlayed(true)
          })
      }
    }
  }, [songs.length, hasAutoPlayed, introCompleted])

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && songs.length > 0) {
      const songIndex = selectedSongId !== null 
        ? songs.findIndex(s => s.id === selectedSongId)
        : currentSongIndex
      
      if (songIndex >= 0 && songIndex < songs.length) {
        audioRef.current.src = songs[songIndex].file
        audioRef.current.load() // Reload audio source
        if (isPlaying) {
          audioRef.current.play().catch(console.error)
        }
      }
    }
  }, [currentSongIndex, selectedSongId, songs, isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const selectSong = (songId: number) => {
    setSelectedSongId(songId)
    const songIndex = songs.findIndex(s => s.id === songId)
    if (songIndex >= 0) {
      setCurrentSongIndex(songIndex)
      if (audioRef.current) {
        audioRef.current.src = songs[songIndex].file
        audioRef.current.play().catch(console.error)
        setIsPlaying(true)
      }
    }
    // Keep playlist open when selecting a song
  }

  const getCurrentSong = () => {
    const songIndex = selectedSongId !== null 
      ? songs.findIndex(s => s.id === selectedSongId)
      : currentSongIndex
    return songs[songIndex] || songs[0]
  }

  return (
    <>
      <audio ref={audioRef} preload="auto" />
      
      {/* Music Control Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent text-white shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-none"
        style={{
          boxShadow: isPlaying 
            ? '0 0 20px rgba(212, 175, 55, 0.6), 0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
        aria-label="Music Player"
      >
        {/* Pulsing rings when playing */}
        {isPlaying && !isPlaylistOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/40"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3
              }}
            />
          </>
        )}
        
        {/* Music icon with wave animation when playing */}
        {isPlaying && !isPlaylistOpen ? (
          <div className="relative z-10 flex items-center justify-center gap-0.5">
            <motion.div
              className="w-1 bg-white rounded-full"
              animate={{ height: [8, 16, 8] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-1 bg-white rounded-full"
              animate={{ height: [12, 20, 12] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-1 bg-white rounded-full"
              animate={{ height: [10, 18, 10] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
            <motion.div
              className="w-1 bg-white rounded-full"
              animate={{ height: [14, 22, 14] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
            />
          </div>
        ) : (
          <motion.svg
            className="w-6 h-6 relative z-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            animate={{
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </motion.svg>
        )}
      </motion.button>

      {/* Playlist Panel */}
      <AnimatePresence>
        {isPlaylistOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlaylistOpen(false)}
              className="fixed inset-0 bg-black/50 z-30"
            />

            {/* Playlist */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)',
                boxShadow: '0 25px 50px rgba(25, 47, 74, 0.25), 0 0 0 1px rgba(25, 47, 74, 0.08)'
              }}
            >
              {/* Header */}
              <div className="p-4 border-b border-[#D4AF37]/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-xl text-navy font-semibold">
                    Danh Sách Nhạc
                  </h3>
                  <button
                    onClick={() => setIsPlaylistOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-navy/10 flex items-center justify-center transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-none"
                  >
                    {/* <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg> */}
                  </button>
                </div>
              </div>

              {/* Song List */}
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <p className="font-montserrat text-sm text-navy/60">Đang tải danh sách nhạc...</p>
                  </div>
                ) : songs.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="font-montserrat text-sm text-navy/60">Không có bài nhạc nào</p>
                  </div>
                ) : (
                  songs.map((song, index) => {
                  const isCurrent = (selectedSongId !== null ? song.id === selectedSongId : index === currentSongIndex)
                  return (
                    <motion.button
                      key={song.id}
                      onClick={() => selectSong(song.id)}
                      className={`w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                        isCurrent ? 'bg-[#D4AF37]/10' : ''
                      }`}
                      whileTap={{ scale: 0.98 }}
                      style={{ border: 'none', borderBottom: 'none' }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Play Icon or Number */}
                        <div className="w-8 h-8 flex items-center justify-center">
                          {isCurrent ? (
                            isPlaying ? (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </motion.div>
                            ) : (
                              <motion.div
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                </svg>
                              </motion.div>
                            )
                          ) : (
                            <span className="text-navy/40 font-montserrat text-sm">{index + 1}</span>
                          )}
                        </div>
                        
                        {/* Song Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-montserrat text-sm font-medium truncate ${
                            isCurrent ? 'text-[#D4AF37]' : 'text-navy'
                          }`}>
                            {song.name}
                          </p>
                          {isCurrent && (
                            <p className="font-montserrat text-xs text-navy/60 mt-1">
                              Đang phát
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  )
                }))}
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-[#D4AF37]/20 bg-cream/50">
                <div className="flex items-center justify-between gap-4">
                  {/* Current Song Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-montserrat text-xs text-navy/60 truncate">
                      {getCurrentSong().name}
                    </p>
                  </div>

                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-none"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

