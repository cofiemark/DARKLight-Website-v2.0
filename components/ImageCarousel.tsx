import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BOARDS = [
  {
    title: 'DarkLight Uhuru',
    description:
      "Uhuru is the entry board in the DarkLight development board lineup. Designed for learning, rapid prototyping, and professional embedded development.",
    specs: [
      '48MHz Arm Cortex M0 CPU',
      '256 Kbytes Flash',
      '32 Kbytes SRAM',
      '48 Multiplexed I/O',
      '2 SPI, 2 UART, 2 I2C',
      '16 Channel ADC',
      'Advanced PWM Timer',
      '2 Independent Watchdog Timers',
      'DMA',
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      title: 'DarkLight Uhuru',
      desc: 'Entry-level professional embedded development board.',
    },
    pinoutImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'DarkLight Katana',
    description:
      "Katana is the mid-tier board in the DarkLight development board lineup. Designed for advanced learning, complex prototyping, and professional embedded development.",
    specs: [
     '48MHz Arm Cortex M0 CPU',
      '256 Kbytes Flash',
      '32 Kbytes SRAM',
      '48 Multiplexed I/O',
      '2 SPI, 2 UART, 2 I2C',
      '16 Channel ADC',
      'Advanced PWM Timer',
      '2 Independent Watchdog Timers',
      'DMA',
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      title: 'DarkLight Katana',
      desc: 'Mid-tier development board for advanced applications.',
    },
    pinoutImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'DarkLight Bravo',
    description:
      'Bravo is the flagship board in the DarkLight development board lineup. Designed for professional embedded development, complex applications, and high-performance prototyping.',
    specs: [
       '48MHz Arm Cortex M0 CPU',
      '256 Kbytes Flash',
      '32 Kbytes SRAM',
      '48 Multiplexed I/O',
      '2 SPI, 2 UART, 2 I2C',
      '16 Channel ADC',
      'Advanced PWM Timer',
      '2 Independent Watchdog Timers',
      'DMA',
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      title: 'DarkLight Bravo',
      desc: 'Flagship development board for professional applications.',
    },
    pinoutImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'DarkLight Uhuru Connect',
    description:
      'Uhuru Connect is the entry board in the DarkLight development board lineup with add-on wireless connectivity. Designed for learning, rapid prototyping, and professional embedded development.',
    specs: [
       '48MHz Arm Cortex M0 CPU',
      '256 Kbytes Flash',
      '32 Kbytes SRAM',
      '48 Multiplexed I/O',
      '2 SPI, 2 UART, 2 I2C',
      '16 Channel ADC',
      'Advanced PWM Timer',
      '2 Independent Watchdog Timers',
      'DMA',
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      title: 'DarkLight Uhuru Connect',
      desc: 'Entry-level board with wireless connectivity.',
    },
    pinoutImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'DarkLight Katana Connect',
    description:
      'Katana Connect is the mid-tier board in the DarkLight development board lineup with add-on wireless connectivity. Designed for advanced learning, complex prototyping, and professional embedded development.',
    specs: [
       '48MHz Arm Cortex M0 CPU',
      '256 Kbytes Flash',
      '32 Kbytes SRAM',
      '48 Multiplexed I/O',
      '2 SPI, 2 UART, 2 I2C',
      '16 Channel ADC',
      'Advanced PWM Timer',
      '2 Independent Watchdog Timers',
      'DMA',
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      title: 'DarkLight Katana Connect',
      desc: 'Mid-tier board with wireless connectivity.',
    },
    pinoutImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
];

interface ImageCarouselProps {
  onSlideChange?: (index: number) => void;
  isPaused?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  onSlideChange,
  isPaused = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BOARDS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BOARDS.length) % BOARDS.length);
  }, []);

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  useEffect(() => {
    if (isHovering || isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isHovering, isPaused]);

  return (
    <div
      className="relative w-full h-full group overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {BOARDS.map((board, index) => {
        const isActive = index === currentIndex;
        const slideClass = isActive
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-105 pointer-events-none';

        return (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${slideClass}`}
        >
          <img
            src={board.image.url}
            alt={board.image.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-60 transition-all duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <h3 className="text-xl font-bold text-white mb-1">
              {board.image.title}
            </h3>
            <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {board.image.desc}
            </p>
          </div>
        </div>
        );
      })}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-brand-600 hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-brand-600 hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};