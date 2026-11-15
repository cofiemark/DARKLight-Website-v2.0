import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Wrench,
  Cpu,
  FileText,
  Library,
  Download,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  ShieldCheck,
  Terminal,
  FileArchive,
  Code2,
  Check,
  X,
  Radio,
  Zap,
  HardDrive,
  SlidersHorizontal,
  ArrowUpRight,
  Usb,
  Bug,
} from 'lucide-react';
import { BOARDS } from '../components/ImageCarousel';

type CategoryFilter = 'all' | 'tools' | 'sdk' | 'templates' | 'docs' | 'libraries';

interface DownloadItem {
  id: string;
  title: string;
  type: 'IDE' | 'Debugger' | 'Driver' | 'Library' | 'SDK' | 'Documentation' | 'Template' | 'Examples';
  category: CategoryFilter;
  description: string;
  actionText: string;
  link: string;
  version: string;
  sizeOrPlatform: string;
  formatBadge: string;
  isExternal?: boolean;
  highlight?: string;
}

interface BoardTierTheme {
  id: string;
  shortName: string;
  tierBadge: string;
  tagline: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  glowGradient: string;
  buttonAccent: string;
  partNumber: string;
  hasWireless?: boolean;
}

const BOARD_THEMES: BoardTierTheme[] = [
  {
    id: 'uhuru',
    shortName: 'Uhuru',
    tierBadge: 'Entry Tier • Learn & Prototype',
    tagline: ' Ideal for Education & Rapid Embedded Prototyping',
    accentText: 'text-brand-400',
    accentBg: 'bg-brand-500/10',
    accentBorder: 'border-brand-500/30',
    glowGradient: 'from-brand-500/20 via-brand-600/5 to-transparent',
    buttonAccent: 'bg-brand-600 hover:bg-brand-500 shadow-brand-600/20',
    partNumber: 'DL-UHU-M0-48',
  },
  {
    id: 'katana',
    shortName: 'Katana',
    tierBadge: 'Mid-Tier • Advanced Prototyping',
    tagline: 'High-Density Peripherals & Real-Time Control',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    glowGradient: 'from-cyan-500/20 via-cyan-600/5 to-transparent',
    buttonAccent: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/20',
    partNumber: 'DL-KAT-M0-48',
  },
  {
    id: 'bravo',
    shortName: 'Bravo',
    tierBadge: 'Flagship • High Performance',
    tagline: 'Mission-Critical Determinism & Full DMA Matrix',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    glowGradient: 'from-purple-500/20 via-purple-600/5 to-transparent',
    buttonAccent: 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/20',
    partNumber: 'DL-BRV-M0-48',
  },
  {
    id: 'uhuru-connect',
    shortName: 'Uhuru Connect',
    tierBadge: 'Connected • Wireless IoT Entry',
    tagline: 'Integrated WiFi 6 & BLE 5.0 Co-Processor Stack',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    glowGradient: 'from-amber-500/20 via-amber-600/5 to-transparent',
    buttonAccent: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20',
    partNumber: 'DL-UHU-W6-48',
    hasWireless: true,
  },
  {
    id: 'katana-connect',
    shortName: 'Katana Connect',
    tierBadge: 'Connected • Wireless IoT Mid-Tier',
    tagline: 'Industrial Telemetry & Edge Cloud Connectivity',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    glowGradient: 'from-emerald-500/20 via-emerald-600/5 to-transparent',
    buttonAccent: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20',
    partNumber: 'DL-KAT-W6-48',
    hasWireless: true,
  },
];

const SOFTWARE_TOOLS: DownloadItem[] = [
  {
    id: 'segger-ses',
    title: 'SEGGER Embedded Studio',
    type: 'IDE',
    category: 'tools',
    description:
      'Complete C/C++ IDE, project manager, and Clang/GCC toolchain tailored for DarkLight Arm Cortex-M0 microcontrollers.',
    actionText: 'Visit SEGGER',
    link: 'https://www.segger.com/downloads/embedded-studio/',
    version: 'v8.16a',
    sizeOrPlatform: 'Win • macOS • Linux',
    formatBadge: 'IDE SUITE',
    isExternal: true,
    highlight: 'Official Recommended IDE',
  },
  {
    id: 'segger-jlink',
    title: 'J-Link Software & Documentation Pack',
    type: 'Debugger',
    category: 'tools',
    description:
      'High-speed SWD/JTAG flash programming, GDB server, RTT viewer, and real-time instruction trace utilities.',
    actionText: 'Visit SEGGER',
    link: 'https://www.segger.com/downloads/jlink/',
    version: 'v7.96h',
    sizeOrPlatform: 'Win • macOS • Linux',
    formatBadge: 'DEBUGGER',
    isExternal: true,
    highlight: 'SWD + Real-Time Trace',
  },
  {
    id: 'usb-driver',
    title: 'DarkLight USB CDC & DFU Driver Package',
    type: 'Driver',
    category: 'tools',
    description:
      'Signed USB virtual COM port (CDC-ACM) and direct firmware upgrade (DFU) drivers for all DarkLight development boards.',
    actionText: 'Download Driver',
    link: '#',
    version: 'v2.1.4',
    sizeOrPlatform: '14.8 MB • Installer',
    formatBadge: 'DRIVER (.ZIP)',
    isExternal: false,
    highlight: 'WHQL & macOS Notarized',
  },
];

const LIBRARIES: (DownloadItem & {
  headerFile: string;
  protocol: string;
  waveformType: 'nzr' | 'spi';
})[] = [
    {
      id: 'lib-ws2812b',
      title: 'lib_ws2812b',
      type: 'Library',
      category: 'libraries',
      description:
        'Zero-CPU-overhead WS2812B addressable RGB LED driver leveraging hardware PWM + DMA circular buffers for deterministic 800kHz timing.',
      actionText: 'Download ZIP',
      link: '#',
      version: 'v1.4.2',
      sizeOrPlatform: '420 KB • C99 Source',
      formatBadge: 'DMA LIBRARY',
      headerFile: '#include "dl_ws2812b_dma.h"',
      protocol: '800 kHz Single-Wire NZR + DMA',
      waveformType: 'nzr',
    },
    {
      id: 'lib-apa102',
      title: 'lib_apa102',
      type: 'Library',
      category: 'libraries',
      description:
        'High-refresh APA102 (DotStar) addressable RGB LED driver utilizing hardware SPI master + DMA channels up to 24 MHz clock rates.',
      actionText: 'Download ZIP',
      link: '#',
      version: 'v1.3.0',
      sizeOrPlatform: '385 KB • C99 Source',
      formatBadge: 'SPI LIBRARY',
      headerFile: '#include "dl_apa102_spi.h"',
      protocol: '24 MHz Dual-Wire SPI + DMA',
      waveformType: 'spi',
    },
  ];

const getBoardDownloads = (boardTitle: string, shortName: string, hasWireless?: boolean): DownloadItem[] => [
  {
    id: `${shortName}-bsp`,
    title: 'CPU & Board Support Package (BSP)',
    type: 'SDK',
    category: 'sdk',
    description: `CMSIS-Core device headers, memory linker scripts, startup assembly, and peripheral HAL drivers for ${boardTitle}.`,
    actionText: 'Download SDK',
    link: '#',
    version: 'v2.4.0',
    sizeOrPlatform: hasWireless ? '28.4 MB • Pack' : '19.2 MB • Pack',
    formatBadge: 'BSP / SDK',
    highlight: hasWireless ? 'Includes WiFi 6 / BLE Stack' : 'Register + HAL Drivers',
  },
  {
    id: `${shortName}-datasheet`,
    title: `${shortName} Technical Datasheet & RM`,
    type: 'Documentation',
    category: 'docs',
    description: `Complete electrical characteristics, register map, clock tree architecture, and mechanical footprint for ${boardTitle}.`,
    actionText: 'View PDF',
    link: '#',
    version: 'Rev 1.8',
    sizeOrPlatform: '6.4 MB • 248 Pages',
    formatBadge: 'PDF DOC',
    highlight: 'Pin Mux & Timing Specs',
  },
  {
    id: `${shortName}-freertos`,
    title: 'FreeRTOS Starter Template',
    type: 'Template',
    category: 'templates',
    description: `Pre-configured SEGGER Embedded Studio workspace with FreeRTOS kernel v10.6, SysTick tickless idle, and task notifications.`,
    actionText: 'Download ZIP',
    link: '#',
    version: 'v10.6.1',
    sizeOrPlatform: '4.1 MB • SES Project',
    formatBadge: 'FREERTOS (.ZIP)',
    highlight: 'Deterministic Scheduler',
  },
  {
    id: `${shortName}-embos`,
    title: 'SEGGER EmbOS Template',
    type: 'Template',
    category: 'templates',
    description: `Zero-interrupt-latency RTOS starter project pre-integrated with SEGGER SystemView real-time task trace instrumentation.`,
    actionText: 'Download ZIP',
    link: '#',
    version: 'v5.18',
    sizeOrPlatform: '5.3 MB • SES Project',
    formatBadge: 'EMBOS (.ZIP)',
    highlight: 'SystemView Ready',
  },
  {
    id: `${shortName}-baremetal`,
    title: 'Baremetal Superloop Template',
    type: 'Template',
    category: 'templates',
    description: `Ultra-lean C99 firmware skeleton with direct register/DMA setup, zero RTOS overhead, and sub-microsecond ISR response.`,
    actionText: 'Download ZIP',
    link: '#',
    version: 'v2.4.0',
    sizeOrPlatform: '1.2 MB • SES Project',
    formatBadge: 'BAREMETAL (.ZIP)',
    highlight: '< 4 KB Flash Footprint',
  },
  {
    id: `${shortName}-examples`,
    title: 'Peripheral & DMA Example Suite',
    type: 'Examples',
    category: 'sdk',
    description: `25+ verified reference projects covering non-blocking SPI/I2C/UART DMA transfers, 16-ch ADC scan, PWM motor control${hasWireless ? ', and MQTT telemetry' : ''
      }.`,
    actionText: 'View Projects',
    link: '#',
    version: 'v2.4.0',
    sizeOrPlatform: '16.8 MB • 25+ Projects',
    formatBadge: 'EXAMPLES',
    highlight: 'Copy-Paste Reference Code',
  },
];

export const Downloads: React.FC = () => {
  const [selectedBoardIdx, setSelectedBoardIdx] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPinoutModalOpen, setIsPinoutModalOpen] = useState<boolean>(false);

  const activeBoard = BOARDS[selectedBoardIdx] || BOARDS[0];
  const activeTheme = BOARD_THEMES[selectedBoardIdx] || BOARD_THEMES[0];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleSelectBoardAndScroll = (index: number) => {
    setSelectedBoardIdx(index);
    scrollToSection('board-hub');
  };

  const boardResources = useMemo(
    () => getBoardDownloads(activeBoard.title, activeTheme.shortName, activeTheme.hasWireless),
    [activeBoard.title, activeTheme.shortName, activeTheme.hasWireless]
  );

  const matchesFilter = (item: { title: string; description: string; type: string; category: CategoryFilter }) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;
    return (
      matchesCategory &&
      (item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query))
    );
  };

  const filteredTools = useMemo(() => SOFTWARE_TOOLS.filter(matchesFilter), [activeCategory, searchQuery]);
  const filteredBoardResources = useMemo(() => boardResources.filter(matchesFilter), [boardResources, activeCategory, searchQuery]);
  const filteredLibraries = useMemo(() => LIBRARIES.filter(matchesFilter), [activeCategory, searchQuery]);

  const totalMatchingCount =
    filteredTools.length + filteredBoardResources.length + filteredLibraries.length;

  const getTypeIcon = (type: DownloadItem['type']) => {
    switch (type) {
      case 'IDE':
        return <Terminal size={20} className="text-brand-400" />;
      case 'Debugger':
        return <Bug size={20} className="text-cyan-400" />;
      case 'Driver':
        return <Usb size={20} className="text-purple-400" />;
      case 'SDK':
        return <Cpu size={20} className="text-brand-400" />;
      case 'Documentation':
        return <FileText size={20} className="text-amber-400" />;
      case 'Template':
        return <FileArchive size={20} className="text-emerald-400" />;
      case 'Examples':
        return <Code2 size={20} className="text-cyan-400" />;
      case 'Library':
        return <Library size={20} className="text-brand-400" />;
    }
  };

  const getTypeBadgeStyle = (type: DownloadItem['type']) => {
    switch (type) {
      case 'IDE':
        return 'bg-brand-500/10 text-brand-300 border-brand-500/30';
      case 'Debugger':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'Driver':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'SDK':
        return 'bg-brand-500/10 text-brand-300 border-brand-500/30';
      case 'Documentation':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Template':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Examples':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'Library':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Technical Pinout Modal */}
      {isPinoutModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsPinoutModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
              <div className="flex items-center gap-2.5">
                <Cpu className="text-brand-400" size={20} />
                <h3 className="text-white font-bold">{activeBoard.title} — Technical Pinout Diagram</h3>
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700">
                  {activeTheme.partNumber}
                </span>
              </div>
              <button
                onClick={() => setIsPinoutModalOpen(false)}
                aria-label="Close pinout modal"
                className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X size={22} />
              </button>
            </div>
            <div className="p-3 md:p-8 bg-gray-900 flex items-center justify-center min-h-[380px]">
              <img
                src={activeBoard.pinoutImage ?? activeBoard.image.url}
                alt={`${activeBoard.title} pinout`}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg border border-gray-800"
              />
            </div>
            <div className="p-4 bg-gray-950 border-t border-gray-800 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 font-mono">
              <span>{activeBoard.title} • 48 Multiplexed GPIO • 3.3V Logic Levels Required</span>
              <span className="text-brand-400">Rev 1.8 Hardware Reference</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        {/* HERO BANNER WITH CUSTOM SVG HARDWARE TOOLCHAIN GRAPHIC */}
        <div className="relative rounded-3xl border border-gray-800/90 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-gray-950 p-6 sm:p-8 lg:p-10 mb-10 overflow-hidden shadow-2xl">
          {/* Decorative Circuit Grid Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern id="dl-circuit-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-400" />
                <circle cx="36" cy="36" r="1.5" fill="currentColor" className="text-brand-400" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dl-circuit-grid)" />
          </svg>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Title, Copy & Ecosystem Metrics */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-300 tracking-wide uppercase">
                <Sparkles size={13} className="text-brand-400" />
                <span>DarkLight Developer Resource Center • SDK v2.4</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Hardware SDKs, Toolchains &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-400 to-blue-500">
                  Silicon Resources
                </span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Download production-grade Board Support Packages (BSP), RTOS starter templates, non-blocking DMA driver libraries, and technical datasheets for the entire DarkLight lineup.
              </p>

              {/* Quick Ecosystem Pill Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <div className="px-3 py-1.5 rounded-xl bg-gray-950/80 border border-gray-800 text-xs font-mono text-gray-300 flex items-center gap-2">
                  <Cpu size={14} className="text-brand-400" />
                  <span>5 Hardware Targets</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-gray-950/80 border border-gray-800 text-xs font-mono text-gray-300 flex items-center gap-2">
                  <Zap size={14} className="text-cyan-400" />
                  <span>Zero-CPU DMA Drivers</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-gray-950/80 border border-gray-800 text-xs font-mono text-gray-300 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>CMSIS & MISRA-C Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Column: Custom SVG Hardware Toolchain Pipeline Illustration */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-gray-950/90 border border-gray-800/90 p-4 sm:p-5 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Toolchain Architecture Pipeline
                  </span>
                  <span className="text-[11px] font-mono text-brand-400">SWD @ 20 MHz</span>
                </div>

                {/* Custom SVG Schematic Graphic */}
                <svg
                  viewBox="0 0 420 165"
                  className="w-full h-auto"
                  role="img"
                  aria-label="DarkLight development pipeline from SEGGER IDE through J-Link Probe to DarkLight Cortex-M0 MCU"
                >
                  <defs>
                    <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Background PCB Traces */}
                  <path
                    d="M 20 30 H 110 L 130 50 H 290 L 310 30 H 400"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 20 135 H 95 L 115 115 H 305 L 325 135 H 400"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />

                  {/* Animated Signal Bus Lines */}
                  <line x1="118" y1="74" x2="162" y2="74" stroke="url(#traceGrad)" strokeWidth="2.5" strokeDasharray="4 3" />
                  <line x1="118" y1="90" x2="162" y2="90" stroke="#334155" strokeWidth="1.5" />
                  <line x1="258" y1="74" x2="302" y2="74" stroke="url(#traceGrad)" strokeWidth="2.5" strokeDasharray="4 3" />
                  <line x1="258" y1="90" x2="302" y2="90" stroke="#334155" strokeWidth="1.5" />

                  {/* Node 1: SEGGER Studio + BSP */}
                  <g transform="translate(14, 38)">
                    <rect width="104" height="88" rx="12" fill="url(#chipGrad)" stroke="#334155" strokeWidth="1.5" />
                    <rect x="10" y="10" width="84" height="16" rx="4" fill="#0f172a" stroke="#1e293b" />
                    <circle cx="18" cy="18" r="2.5" fill="#f87171" />
                    <circle cx="26" cy="18" r="2.5" fill="#fbbf24" />
                    <circle cx="34" cy="18" r="2.5" fill="#34d399" />
                    <text x="52" y="44" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      SEGGER IDE
                    </text>
                    <text x="52" y="58" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">
                      BSP + FreeRTOS
                    </text>
                    <rect x="20" y="67" width="64" height="11" rx="3" fill="#0284c7" fillOpacity="0.2" />
                    <text x="52" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="7.5" fontFamily="monospace">
                      C99 / CMSIS
                    </text>
                  </g>

                  {/* Node 2: J-Link Probe / USB Driver */}
                  <g transform="translate(162, 43)">
                    <rect width="96" height="78" rx="12" fill="url(#chipGrad)" stroke="#0891b2" strokeWidth="1.5" />
                    <path d="M 32 18 H 64 M 26 28 H 70" stroke="#164e63" strokeWidth="2" strokeLinecap="round" />
                    <text x="48" y="42" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      J-Link / USB
                    </text>
                    <text x="48" y="55" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace">
                      SWDIO • SWCLK
                    </text>
                    <text x="48" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
                      RTT & Trace
                    </text>
                  </g>

                  {/* Node 3: DarkLight 48-Pin QFP Silicon Graphic */}
                  <g transform="translate(302, 30)">
                    {/* QFP IC Pins Top/Bottom/Left/Right */}
                    {[0, 1, 2, 3, 4, 5].map((pin) => (
                      <g key={pin} fill="#64748b">
                        <rect x={22 + pin * 10} y="2" width="4" height="8" rx="1" />
                        <rect x={22 + pin * 10} y="94" width="4" height="8" rx="1" />
                        <rect x="4" y={20 + pin * 10} width="8" height="4" rx="1" />
                        <rect x="92" y={20 + pin * 10} width="8" height="4" rx="1" />
                      </g>
                    ))}
                    {/* IC Body */}
                    <rect x="12" y="10" width="80" height="84" rx="8" fill="#090d16" stroke="#38bdf8" strokeWidth="1.8" />
                    <circle cx="22" cy="20" r="3" fill="#38bdf8" fillOpacity="0.6" />
                    <text x="52" y="42" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                      DARKLIGHT
                    </text>
                    <text x="52" y="54" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
                      Cortex-M0
                    </text>
                    <text x="52" y="66" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
                      48MHz • DMA
                    </text>
                    <rect x="24" y="73" width="56" height="11" rx="3" fill="#10b981" fillOpacity="0.15" />
                    <text x="52" y="81" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">
                      48-PIN QFP
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Interactive Search & Category Filter Bar */}
          <div className="relative z-10 mt-8 pt-6 border-t border-gray-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SDKs, FreeRTOS, datasheets, WS2812B..."
                aria-label="Search downloadable resources"
                className="w-full pl-10 pr-9 py-2.5 bg-gray-950/90 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-1"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <span className="text-xs text-gray-500 font-mono mr-1 hidden xl:inline-flex items-center gap-1">
                <SlidersHorizontal size={12} />
                Filter:
              </span>
              {(
                [
                  { id: 'all', label: 'All Resources' },
                  { id: 'tools', label: 'IDE & Drivers' },
                  { id: 'sdk', label: 'BSP & Examples' },
                  { id: 'templates', label: 'RTOS Templates' },
                  { id: 'docs', label: 'Datasheets' },
                  { id: 'libraries', label: 'Libraries' },
                ] as { id: CategoryFilter; label: string }[]
              ).map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${isActive
                        ? 'bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-600/20'
                        : 'bg-gray-950/70 text-gray-400 border-gray-800 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN BODY: STICKY SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-60 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl border border-gray-800/90 bg-gray-900/50 backdrop-blur-md p-5 space-y-6">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <BookOpen size={14} className="text-brand-400" />
                  <span>Resource Sections</span>
                </h5>

                <ul className="space-y-1.5">
                  <li>
                    <button
                      onClick={() => scrollToSection('software-tools')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Wrench size={15} className="text-brand-400" />
                        Software Tools
                      </span>
                      <span className="text-[11px] font-mono text-gray-500 group-hover:text-gray-300">
                        {SOFTWARE_TOOLS.length}
                      </span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => scrollToSection('board-hub')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Cpu size={15} className="text-cyan-400" />
                        Board SDKs & Docs
                      </span>
                      <span className="text-[11px] font-mono text-gray-500 group-hover:text-gray-300">
                        5 Boards
                      </span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => scrollToSection('libraries')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Library size={15} className="text-purple-400" />
                        DMA Libraries
                      </span>
                      <span className="text-[11px] font-mono text-gray-500 group-hover:text-gray-300">
                        {LIBRARIES.length}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Quick Hardware Target Jump */}
              <div className="pt-5 border-t border-gray-800/80">
                <h6 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <HardDrive size={14} className="text-brand-400" />
                  <span>Select Target Board</span>
                </h6>
                <ul className="space-y-1">
                  {BOARD_THEMES.map((board, idx) => {
                    const isSelected = idx === selectedBoardIdx;
                    return (
                      <li key={board.id}>
                        <button
                          onClick={() => handleSelectBoardAndScroll(idx)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${isSelected
                              ? 'bg-gray-800 text-white border border-gray-700 shadow-sm'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                            }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span
                              className={`w-2 h-2 rounded-full ${isSelected ? 'bg-brand-400 animate-pulse' : 'bg-gray-600'
                                }`}
                            />
                            <span className="truncate">DarkLight {board.shortName}</span>
                          </span>
                          {board.hasWireless && (
                            <Radio size={12} className="text-amber-400 shrink-0" title="Wireless IoT" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Quick Checksum / Verification Note */}
              <div className="rounded-xl bg-gray-950/90 border border-gray-800/80 p-3.5 text-xs text-gray-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Verified Packages</span>
                </div>
                <p className="text-[11px] leading-relaxed text-gray-400">
                  All DarkLight SDK archives and drivers are SHA-256 signed and tested with SEGGER Embedded Studio.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content Column */}
          <main className="flex-1 min-w-0 space-y-16">
            {totalMatchingCount === 0 && (
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-12 text-center space-y-3">
                <Search size={32} className="mx-auto text-gray-500" />
                <h3 className="text-lg font-bold text-white">No matching downloads found</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  No resources matched &ldquo;{searchQuery}&rdquo; in the selected category. Try clearing your filter or searching for another term.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* SECTION 1: SOFTWARE TOOLS & DRIVERS */}
            {filteredTools.length > 0 && (
              <section id="software-tools" className="scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
                        <Wrench size={18} className="text-brand-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        Software Tools & Host Drivers
                      </h2>
                    </div>
                    <p className="text-sm text-gray-400 mt-1.5">
                      Core development environment, J-Link debug probes, and USB communication drivers.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-gray-500">
                    Windows 10/11 • macOS (Universal) • Ubuntu/Debian
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="group relative rounded-2xl border border-gray-800/90 bg-gradient-to-b from-gray-900/90 to-gray-950 p-6 flex flex-col justify-between hover:border-brand-500/50 transition-all duration-300 shadow-lg hover:shadow-brand-500/5 overflow-hidden"
                    >
                      {/* Decorative Corner Schematic Accent */}
                      <div className="absolute -right-8 -top-8 w-28 h-28 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/15 transition-colors pointer-events-none" />

                      <div>
                        {/* Top Icon + Format Pill */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="w-11 h-11 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center shadow-inner group-hover:border-gray-700 transition-colors">
                            {getTypeIcon(tool.type)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-gray-950 border border-gray-800 text-[11px] font-mono text-gray-300">
                              {tool.version}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${getTypeBadgeStyle(
                                tool.type
                              )}`}
                            >
                              {tool.formatBadge}
                            </span>
                          </div>
                        </div>

                        {/* Highlight Tag */}
                        {tool.highlight && (
                          <div className="text-[11px] font-mono text-brand-400 mb-1 flex items-center gap-1">
                            <Sparkles size={11} />
                            <span>{tool.highlight}</span>
                          </div>
                        )}

                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                          {tool.title}
                        </h3>

                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                          {tool.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-3">
                        <span className="text-xs font-mono text-gray-500">
                          {tool.sizeOrPlatform}
                        </span>

                        <a
                          href={tool.link}
                          target={tool.isExternal ? '_blank' : undefined}
                          rel={tool.isExternal ? 'noopener noreferrer' : undefined}
                          className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-brand-600 text-white text-xs font-semibold border border-gray-700 hover:border-brand-500 transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>{tool.actionText}</span>
                          {tool.isExternal ? (
                            <ExternalLink size={13} />
                          ) : (
                            <Download size={13} />
                          )}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 2: INTERACTIVE 5-BOARD HARDWARE HUB */}
            {filteredBoardResources.length > 0 && (
              <section id="board-hub" className="scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <Cpu size={18} className="text-cyan-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        Board Support Packages, Templates & Datasheets
                      </h2>
                    </div>
                    <p className="text-sm text-gray-400 mt-1.5">
                      Select your DarkLight development board below to view its tailored SDKs, RTOS templates, and hardware documentation.
                    </p>
                  </div>
                </div>

                {/* Interactive 5-Board Selector Pills */}
                <div
                  role="tablist"
                  aria-label="Select DarkLight hardware board"
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-5"
                >
                  {BOARD_THEMES.map((theme, idx) => {
                    const isActive = idx === selectedBoardIdx;
                    return (
                      <button
                        key={theme.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedBoardIdx(idx)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${isActive
                            ? 'bg-gray-900 text-white border-brand-500/60 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/30'
                            : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:bg-gray-800 hover:text-gray-200'
                          }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${isActive ? 'bg-brand-400 scale-125 animate-pulse' : 'bg-gray-600'
                            }`}
                        />
                        <span>DarkLight {theme.shortName}</span>
                        {theme.hasWireless && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                            WiFi 6
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Board Visual Showcase Banner Card */}
                <div className="relative rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-gray-950 p-5 sm:p-6 lg:p-7 mb-6 overflow-hidden shadow-xl">
                  {/* Dynamic Tier Glow */}
                  <div
                    className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${activeTheme.glowGradient} rounded-full blur-[80px] pointer-events-none`}
                  />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Board Image Preview */}
                    <div className="lg:col-span-5">
                      <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-gray-950 h-48 sm:h-56 group">
                        <img
                          src={activeBoard.image.url}
                          alt={activeBoard.title}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gray-200 flex items-center gap-1.5">
                            <Radio size={11} className={activeTheme.accentText} />
                            {activeTheme.partNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-brand-500/20 backdrop-blur-md border border-brand-500/40 text-[10px] font-bold text-brand-300 font-mono">
                            48-PIN QFP
                          </span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">
                            {activeBoard.image.title}
                          </span>
                          <button
                            onClick={() => setIsPinoutModalOpen(true)}
                            className="px-2.5 py-1 rounded-lg bg-brand-600/90 hover:bg-brand-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-md transition-colors"
                          >
                            <Cpu size={12} />
                            <span>View Pinout</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Board Details & Specs Summary */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${activeTheme.accentBg} ${activeTheme.accentText} ${activeTheme.accentBorder}`}
                          >
                            <Sparkles size={11} />
                            {activeTheme.tierBadge}
                          </span>
                          <span className="text-xs font-mono text-gray-500">
                            {activeTheme.tagline}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                          {activeBoard.title} Downloads
                        </h3>

                        <p className="text-sm text-gray-400 leading-relaxed">
                          {activeBoard.description}
                        </p>
                      </div>

                      {/* Key Hardware Architecture Pills */}
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                          <Layers size={12} className="text-brand-400" />
                          <span>Target Silicon Specifications</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeBoard.specs.slice(0, 6).map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-lg bg-gray-950/80 border border-gray-800 text-xs text-gray-300 flex items-center gap-1.5"
                            >
                              <Check size={11} className="text-brand-400" />
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6-Card Grid for Selected Board Resources */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBoardResources.map((item) => (
                    <div
                      key={item.id}
                      className="group rounded-2xl border border-gray-800/90 bg-gray-900/60 hover:bg-gray-900/90 p-5 flex flex-col justify-between hover:border-gray-700 transition-all duration-200 shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <div className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center">
                            {getTypeIcon(item.type)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-gray-950 border border-gray-800 text-[11px] font-mono text-gray-400">
                              {item.version}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getTypeBadgeStyle(
                                item.type
                              )}`}
                            >
                              {item.formatBadge}
                            </span>
                          </div>
                        </div>

                        {item.highlight && (
                          <span className="inline-block text-[11px] font-mono text-brand-400 mb-1">
                            {item.highlight}
                          </span>
                        )}

                        <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-300 transition-colors">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3.5 border-t border-gray-800/80 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-gray-500">
                          {item.sizeOrPlatform}
                        </span>

                        <a
                          href={item.link}
                          className="px-3.5 py-1.5 rounded-xl bg-brand-600/15 hover:bg-brand-600 text-brand-300 hover:text-white border border-brand-500/30 hover:border-brand-500 text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <span>{item.actionText}</span>
                          {item.formatBadge.includes('PDF') || item.type === 'Examples' ? (
                            <ArrowUpRight size={13} />
                          ) : (
                            <Download size={13} />
                          )}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 3: HARDWARE PERIPHERAL LIBRARIES WITH WAVEFORM GRAPHICS */}
            {filteredLibraries.length > 0 && (
              <section id="libraries" className="scroll-mt-24 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                        <Library size={18} className="text-purple-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        Non-Blocking DMA Peripheral Libraries
                      </h2>
                    </div>
                    <p className="text-sm text-gray-400 mt-1.5">
                      Production C libraries engineered around DarkLight&apos;s DMA controller for zero-jitter waveform generation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLibraries.map((lib) => (
                    <div
                      key={lib.id}
                      className="group rounded-2xl border border-gray-800/90 bg-gradient-to-b from-gray-900/90 to-gray-950 p-6 flex flex-col justify-between hover:border-brand-500/50 transition-all shadow-lg"
                    >
                      <div>
                        {/* Header row */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center">
                              {getTypeIcon(lib.type)}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white font-mono group-hover:text-brand-300 transition-colors">
                                {lib.title}
                              </h3>
                              <span className="text-xs font-mono text-brand-400">
                                {lib.protocol}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded bg-gray-950 border border-gray-800 text-xs font-mono text-gray-300">
                              {lib.version}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${getTypeBadgeStyle(
                                lib.type
                              )}`}
                            >
                              {lib.formatBadge}
                            </span>
                          </div>
                        </div>

                        {/* Custom SVG Digital Logic Waveform Graphic */}
                        <div className="rounded-xl bg-gray-950 border border-gray-800/90 p-3.5 mb-4">
                          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-2">
                            <span className="text-gray-300">{lib.headerFile}</span>
                            <span className="text-emerald-400">0% CPU Load (DMA Ch.1)</span>
                          </div>

                          {lib.waveformType === 'nzr' ? (
                            <svg
                              viewBox="0 0 360 44"
                              className="w-full h-11"
                              aria-label="WS2812B 800kHz NZR PWM DMA waveform diagram"
                            >
                              <text x="4" y="14" fill="#64748b" fontSize="8" fontFamily="monospace">
                                PWM_OUT
                              </text>
                              {/* 800kHz Bit-1 and Bit-0 duty cycle pulses */}
                              <path
                                d="M 55 34 V 10 H 85 V 34 H 105 V 10 H 120 V 34 H 150 V 10 H 180 V 34 H 200 V 10 H 230 V 34 H 250 V 10 H 265 V 34 H 295 V 10 H 325 V 34 H 350"
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="2"
                              />
                              <text x="63" y="25" fill="#7dd3fc" fontSize="7.5" fontFamily="monospace">
                                T1H
                              </text>
                              <text x="108" y="25" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
                                T0H
                              </text>
                              <text x="158" y="25" fill="#7dd3fc" fontSize="7.5" fontFamily="monospace">
                                T1H
                              </text>
                              <text x="208" y="25" fill="#7dd3fc" fontSize="7.5" fontFamily="monospace">
                                T1H
                              </text>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 360 44"
                              className="w-full h-11"
                              aria-label="APA102 Synchronous SPI Clock and Data waveform diagram"
                            >
                              <text x="4" y="15" fill="#64748b" fontSize="8" fontFamily="monospace">
                                SPI_SCK
                              </text>
                              <text x="4" y="36" fill="#64748b" fontSize="8" fontFamily="monospace">
                                SPI_MOSI
                              </text>
                              {/* Clock train */}
                              <path
                                d="M 55 18 V 6 H 70 V 18 H 85 V 6 H 100 V 18 H 115 V 6 H 130 V 18 H 145 V 6 H 160 V 18 H 175 V 6 H 190 V 18 H 205 V 6 H 220 V 18 H 235 V 6 H 250 V 18 H 265 V 6 H 280 V 18 H 295 V 6 H 310 V 18 H 345"
                                fill="none"
                                stroke="#22d3ee"
                                strokeWidth="1.6"
                              />
                              {/* Data line */}
                              <path
                                d="M 55 38 L 62 26 H 110 L 116 38 H 168 L 174 26 H 242 L 248 38 H 290 L 296 26 H 345"
                                fill="none"
                                stroke="#a855f7"
                                strokeWidth="1.8"
                              />
                            </svg>
                          )}
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                          {lib.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-3">
                        <span className="text-xs font-mono text-gray-500">
                          {lib.sizeOrPlatform}
                        </span>

                        <a
                          href={lib.link}
                          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-brand-600/20"
                        >
                          <Download size={14} />
                          <span>{lib.actionText}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
