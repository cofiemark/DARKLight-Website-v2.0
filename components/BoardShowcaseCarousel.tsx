import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, ChevronLeft, ChevronRight, Cpu, 
  ExternalLink, Sparkles, Layers, Radio, Play, Pause, ShieldCheck
} from 'lucide-react';
import { BOARDS } from './ImageCarousel';

// Tier metadata to enrich board presentation
interface BoardTierMeta {
  shortName: string;
  tierBadge: string;
  accentClass: string;
  badgeBg: string;
  badgeBorder: string;
  glowGradient: string;
  highlightTag: string;
}

const BOARD_TIERS: Record<number, BoardTierMeta> = {
  0: {
    shortName: 'Uhuru',
    tierBadge: 'Entry Tier • Learn & Prototype',
    accentClass: 'text-brand-400',
    badgeBg: 'bg-brand-500/10',
    badgeBorder: 'border-brand-500/30',
    glowGradient: 'from-brand-500/20 via-brand-600/5 to-transparent',
    highlightTag: 'Ideal for Education & Starters',
  },
  1: {
    shortName: 'Katana',
    tierBadge: 'Mid-Tier • Advanced Prototyping',
    accentClass: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    glowGradient: 'from-cyan-500/20 via-cyan-600/5 to-transparent',
    highlightTag: 'High-Density Peripherals',
  },
  2: {
    shortName: 'Bravo',
    tierBadge: 'Flagship • High Performance',
    accentClass: 'text-purple-400',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    glowGradient: 'from-purple-500/20 via-purple-600/5 to-transparent',
    highlightTag: 'Mission-Critical Reliability',
  },
  3: {
    shortName: 'Uhuru Connect',
    tierBadge: 'Connected • Wireless IoT Entry',
    accentClass: 'text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30',
    glowGradient: 'from-amber-500/20 via-amber-600/5 to-transparent',
    highlightTag: 'WiFi 6 & BLE 5.0 Combo',
  },
  4: {
    shortName: 'Katana Connect',
    tierBadge: 'Connected • Wireless IoT Mid-Tier',
    accentClass: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    glowGradient: 'from-emerald-500/20 via-emerald-600/5 to-transparent',
    highlightTag: 'Industrial Cloud Ready',
  },
};

const AUTO_SCROLL_DELAY = 6000; // 6 seconds per slide

interface BoardShowcaseCarouselProps {
  onOpenPinout: (boardIndex: number) => void;
  activeBoard?: number;
  onBoardChange?: (index: number) => void;
}

export const BoardShowcaseCarousel: React.FC<BoardShowcaseCarouselProps> = ({
  onOpenPinout,
  activeBoard = 0,
  onBoardChange,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(activeBoard);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

  // Auto-scroll states adhering to Web Interface Guidelines
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Sync with external activeBoard if passed
  useEffect(() => {
    if (activeBoard !== currentIndex) {
      setCurrentIndex(activeBoard);
    }
  }, [activeBoard, currentIndex]);

  // Honor prefers-reduced-motion changes dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsAutoPlaying(false);
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Update scroll hints (affordance hints)
  const updateScrollAffordances = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
  }, []);

  // Smooth scroll to slide
  const scrollToSlide = useCallback((index: number) => {
    const target = slideRefs.current[index];
    const scroller = scrollerRef.current;
    if (!target || !scroller) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Calculate center offset
    const scrollerRect = scroller.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetLeft = scroller.scrollLeft + (targetRect.left - scrollerRect.left) - (scrollerRect.width - targetRect.width) / 2;

    scroller.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    setCurrentIndex(index);
    onBoardChange?.(index);
  }, [onBoardChange]);

  const handlePrev = useCallback(() => {
    const nextIdx = (currentIndex - 1 + BOARDS.length) % BOARDS.length;
    scrollToSlide(nextIdx);
  }, [currentIndex, scrollToSlide]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % BOARDS.length;
    scrollToSlide(nextIdx);
  }, [currentIndex, scrollToSlide]);

  // Smooth auto-scroll timer: pauses on hover, focus, or drag
  useEffect(() => {
    if (!isAutoPlaying || isHovered || isFocused || isPointerDown) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SCROLL_DELAY);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, isFocused, isPointerDown, handleNext]);

  // IntersectionObserver to detect snapped slide
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setCurrentIndex(index);
              onBoardChange?.(index);
            }
          }
        });
      },
      {
        root: scroller,
        threshold: 0.6,
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [onBoardChange]);

  // Scroll listener for affordances
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateScrollAffordances();
    scroller.addEventListener('scroll', updateScrollAffordances, { passive: true });
    window.addEventListener('resize', updateScrollAffordances);

    return () => {
      scroller.removeEventListener('scroll', updateScrollAffordances);
      window.removeEventListener('resize', updateScrollAffordances);
    };
  }, [updateScrollAffordances]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Drag-to-scroll implementation
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a, input')) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    setIsPointerDown(true);
    setDragStartX(e.clientX);
    setScrollStartLeft(scroller.scrollLeft);
    scroller.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const walk = (e.clientX - dragStartX) * 1.5;
    scroller.scrollLeft = scrollStartLeft - walk;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown) return;
    setIsPointerDown(false);
    const scroller = scrollerRef.current;
    if (scroller) {
      try {
        scroller.releasePointerCapture(e.pointerId);
      } catch {
        // no-op if already released
      }
    }
  };

  const isPaused = !isAutoPlaying || isHovered || isFocused || isPointerDown;

  return (
    <section 
      className="py-16 md:py-20 bg-gray-950 border-y border-gray-900 relative overflow-hidden select-none"
      aria-roledescription="carousel"
      aria-label="DarkLight Hardware Lineup"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Screen Reader Live Region for Slide Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Active slide: {BOARDS[currentIndex].title}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-300 mb-3 tracking-wide uppercase">
              <Cpu size={14} className="text-brand-400" aria-hidden="true" />
              <span>Hardware Lineup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance">
              Explore the DarkLight Series
            </h2>
            <p className="mt-2 text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed text-pretty">
              Deterministic performance, non-blocking DMA peripherals, and modular architectures engineered for mission-critical embedded control.
            </p>
          </div>

          {/* Controls: Counter, Play/Pause Toggle & Prev/Next Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            {/* Slide Index Counter */}
            <div className="px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 font-mono text-xs sm:text-sm font-medium tracking-wider tabular-nums flex items-center gap-1.5">
              <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-gray-600">/</span>
              <span>{String(BOARDS.length).padStart(2, '0')}</span>
              {isAutoPlaying && (
                <span 
                  className={`w-1.5 h-1.5 rounded-full ml-1 transition-[background-color] duration-300 ${
                    isPaused ? 'bg-amber-400' : 'bg-brand-400 animate-pulse'
                  }`} 
                  title={isPaused ? 'Auto-scroll paused' : 'Auto-scroll running'}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'Pause carousel auto-scroll' : 'Resume carousel auto-scroll'}
              aria-pressed={isAutoPlaying}
              className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-700 active:scale-95 transition-[transform,opacity,background-color,border-color] duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shadow-lg"
            >
              {isAutoPlaying ? (
                <Pause 
                  size={16} 
                  aria-hidden="true" 
                  className={isPaused ? 'text-amber-400' : 'text-brand-400'} 
                />
              ) : (
                <Play 
                  size={16} 
                  aria-hidden="true" 
                  className="text-gray-400 ml-0.5" 
                />
              )}
            </button>

            {/* Direction Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous board"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-700 active:scale-95 transition-[transform,opacity,background-color,border-color] duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shadow-lg"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next board"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-700 active:scale-95 transition-[transform,opacity,background-color,border-color] duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shadow-lg"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Board Category Quick-Pills */}
        <div 
          role="tablist" 
          aria-label="Select board"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2"
        >
          {BOARDS.map((board, idx) => {
            const meta = BOARD_TIERS[idx] || BOARD_TIERS[0];
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                role="tab"
                aria-selected={isActive}
                onClick={() => scrollToSlide(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-300 whitespace-nowrap flex items-center gap-2 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isActive
                    ? 'bg-gray-900 text-white border-brand-500/60 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/40'
                    : 'bg-gray-900/60 text-gray-400 border-gray-800/80 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                    isActive ? 'bg-brand-400 scale-125 animate-pulse' : 'bg-gray-600'
                  }`}
                  aria-hidden="true"
                />
                <span>{meta.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Carousel Wrapper with Affordance Edge Hints */}
      <div className="relative w-full">
        {/* Left Scroll Gradient Affordance */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Right Scroll Gradient Affordance */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4 px-4 sm:px-8 lg:px-12 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {BOARDS.map((board, index) => {
            const meta = BOARD_TIERS[index] || BOARD_TIERS[0];
            const isActive = index === currentIndex;

            return (
              <div
                key={index}
                ref={(el) => (slideRefs.current[index] = el)}
                data-index={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${BOARDS.length}: ${board.title}`}
                className={`snap-center shrink-0 w-[88vw] sm:w-[82vw] md:w-[740px] lg:w-[960px] xl:w-[1080px] rounded-3xl bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-950/95 border transition-[border-color,opacity,box-shadow] duration-500 relative overflow-hidden backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-2xl group ${
                  isActive
                    ? 'border-gray-700/80 shadow-brand-500/5 ring-1 ring-white/5'
                    : 'border-gray-800/80 opacity-85 hover:opacity-100'
                }`}
              >
                {/* Background Ambient Glow */}
                <div 
                  className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${meta.glowGradient} rounded-full blur-[90px] pointer-events-none`} 
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Left Column: Board Details & Specs */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Tier Chip & Meta */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.badgeBg} ${meta.accentClass} border ${meta.badgeBorder}`}>
                          <Sparkles size={13} aria-hidden="true" />
                          {meta.tierBadge}
                        </span>
                        <span className="text-xs text-gray-500 font-mono tracking-wide">
                          {meta.highlightTag}
                        </span>
                      </div>

                      {/* Board Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight group-hover:text-brand-300 transition-colors duration-200">
                        {board.title}
                      </h3>

                      {/* Board Description */}
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                        {board.description}
                      </p>

                      {/* Specifications Grid */}
                      <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                          <Layers size={13} className="text-brand-400" aria-hidden="true" />
                          Key Hardware Architecture
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {board.specs.map((spec, specIdx) => (
                            <li 
                              key={specIdx} 
                              className={`flex items-center gap-2.5 text-xs sm:text-sm text-gray-300 bg-gray-950/60 border border-gray-800/80 rounded-xl px-3 py-2 transition-[border-color] duration-200 hover:border-gray-700 ${
                                specIdx === board.specs.length - 1 && board.specs.length % 2 !== 0
                                  ? 'sm:col-span-2'
                                  : ''
                              }`}
                            >
                              <div className="w-4 h-4 rounded-full bg-brand-500/20 border border-brand-500/50 flex items-center justify-center shrink-0">
                                <Check size={10} className="text-brand-400" aria-hidden="true" />
                              </div>
                              <span className="font-medium leading-snug">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-800/80">
                      <button
                        onClick={() => onOpenPinout(index)}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm sm:text-base transition-[transform,background-color,box-shadow] duration-200 flex items-center justify-center gap-2 group/btn shadow-lg shadow-brand-600/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <Cpu size={18} aria-hidden="true" />
                        <span>View Technical Pinout</span>
                        <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>

                      <Link
                        to="/learn"
                        className="px-5 py-3 bg-gray-800/80 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-700/80 rounded-xl font-semibold text-sm sm:text-base transition-[transform,background-color,color] duration-200 flex items-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <span>Start Learning</span>
                        <ExternalLink size={15} aria-hidden="true" className="text-gray-400" />
                      </Link>

                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 ml-auto font-mono">
                        <ShieldCheck size={14} aria-hidden="true" className="text-brand-400" />
                        <span>3.3V Logic Safe</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Board Presentation */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 shadow-2xl h-[280px] sm:h-[340px] lg:h-[420px] group/img">
                      {/* Board Photography with Smooth Zoom */}
                      <img
                        src={board.image.url}
                        alt={`${board.image.title} development board hardware showcase`}
                        width={1200}
                        height={800}
                        className="w-full h-full object-cover opacity-85 group-hover/img:opacity-95 group-hover/img:scale-105 transition-[transform,opacity] duration-700 ease-out"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />

                      {/* Top Badges Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gray-200 flex items-center gap-1.5 shadow-lg">
                          <Radio size={12} aria-hidden="true" className={meta.accentClass} />
                          <span>DarkLight Silicon v1.2</span>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-brand-500/20 backdrop-blur-md border border-brand-500/40 text-[11px] font-bold text-brand-300 font-mono shadow-lg">
                          48-PIN
                        </div>
                      </div>

                      {/* Bottom Info Gradient */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold text-white tracking-wide">
                            {board.image.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                          {board.image.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Progress Bar & Indicator Dots */}
      <div className="container mx-auto px-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Progress Bar & Status Pill */}
        <div className="flex items-center gap-3 w-full sm:max-w-sm">
          <div className="flex-1 h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800/80 relative">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full transition-[width] duration-500"
              style={{
                width: `${((currentIndex + 1) / BOARDS.length) * 100}%`,
              }}
            />
          </div>
          {/* Status Label */}
          <span className="text-[11px] font-mono text-gray-500 tabular-nums shrink-0 flex items-center gap-1">
            {isAutoPlaying ? (
              isPaused ? (
                <span className="text-amber-400/90 font-medium">Paused</span>
              ) : (
                <span className="text-brand-400/90 font-medium">Auto-scroll</span>
              )
            ) : (
              <span>Manual</span>
            )}
          </span>
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center gap-2">
          {BOARDS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToSlide(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                dotIdx === currentIndex
                  ? 'w-8 bg-brand-500 shadow-md shadow-brand-500/30'
                  : 'w-2 bg-gray-800 hover:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
