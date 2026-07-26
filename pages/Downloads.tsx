import React from 'react';
import {
  BookOpen,
  Wrench,
  Cpu,
  FileText,
  Library,
} from 'lucide-react';

export const Downloads: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  type DownloadItem = {
    title: string;
    type: string;
    description: string;
    actionText: string;
    link: string;
  };

  const DownloadTable = ({
    items,
  }: {
    items: DownloadItem[];
  }) => (
    <div className="overflow-x-auto border border-slate-800">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-900 border-b border-slate-800">
            <th className="px-5 py-3 text-left text-sm font-semibold text-white">
              Resource
            </th>

            <th className="px-5 py-3 text-left text-sm font-semibold text-white">
              Description
            </th>

            <th className="px-5 py-3 text-left text-sm font-semibold text-white w-40">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.title}
              className={`border-b border-slate-800 hover:bg-slate-900/40 transition-colors ${
                index === items.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <td className="px-5 py-4 font-medium text-white">
                {item.title}
              </td>

              <td className="px-5 py-4 text-gray-400">
                {item.description}
              </td>

              <td className="px-5 py-4">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-brand-300 underline"
                >
                  {item.actionText}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const softwareTools: DownloadItem[] = [
    {
      title: 'SEGGER Embedded Studio',
      type: 'IDE',
      description:
        'Development environment used to build, and debug embedded system applications.',
      actionText: 'Visit SEGGER',
      link: 'https://www.segger.com/downloads/embedded-studio/',
    },
    {
      title: 'J-Link Software Pack',
      type: 'Debugger',
      description:
        'Software tool to program, debug and trace embedded microcontrollers.',
      actionText: 'Visit SEGGER',
      link: 'https://www.segger.com/downloads/jlink/',
    },
    {
      title: 'USB Driver Package',
      type: 'Driver',
      description:
        'USB communication drivers required for supported DarkLight hardware.',
      actionText: 'Download',
      link: '#',
    },
  ];

  const libraries: DownloadItem[] = [
    {
      title: 'lib_ws2812b',
      type: 'Library',
      description: 'WS2812B addressable RGB LED driver library.',
      actionText: 'Download ZIP',
      link: '#',
    },
    {
      title: 'lib_apa102',
      type: 'Library',
      description: 'APA102 addressable RGB LED driver library.',
      actionText: 'Download ZIP',
      link: '#',
    },
  ];

  const uhuruDownloads: DownloadItem[] = [
    {
      title: 'CPU Support Package',
      type: 'SDK',
      description: 'Device definitions, startup files and toolchain support packages.',
      actionText: 'Download',
      link: '#',
    },
    {
      title: 'Datasheet',
      type: 'Documentation',
      description:
        'Hardware specifications and electrical characteristics.',
      actionText: 'View PDF',
      link: '#',
    },
    {
      title: 'FreeRTOS Template',
      type: 'Template',
      description: 'Starter project configured with FreeRTOS.',
      actionText: 'Download ZIP',
      link: '#',
    },
    {
      title: 'EmbOS Template',
      type: 'Template',
      description: 'Starter project configured with SEGGER EmbOS.',
      actionText: 'Download ZIP',
      link: '#',
    },
    {
      title: 'Baremetal Template',
      type: 'Template',
      description: 'Minimal firmware template without RTOS.',
      actionText: 'Download ZIP',
      link: '#',
    },
    {
      title: 'Example Projects',
      type: 'Examples',
      description:
        'Collection of firmware examples demonstrating peripheral usage.',
      actionText: 'View Projects',
      link: '#',
    },
  ];

  const katanaDownloads: DownloadItem[] = [
    {
      title: 'CPU Support Package',
      type: 'SDK',
      description: 'Device definitions, startup files and toolchain support packages.',
      actionText: 'Download',
      link: '#',
    },
    {
      title: 'Datasheet',
      type: 'Documentation',
      description:
        'Hardware specifications and electrical characteristics.',
      actionText: 'View PDF',
      link: '#',
    },
    {
      title: 'FreeRTOS Template',
      type: 'Template',
      description: 'Starter project configured with FreeRTOS.',
      actionText: 'Download ZIP',
      link: '#',
    },
    {
      title: 'EmbOS Template',
      type: 'Template',
      description: 'Starter project configured with SEGGER EmbOS.',
      actionText: 'Download ZIP',
      link: '#',
    },
    {
      title: 'Baremetal Template',
      type: 'Template',
      description: 'Minimal firmware template without RTOS.',
      actionText: 'Download ZIP',
      link: '#',
    },
    {
      title: 'Example Projects',
      type: 'Examples',
      description:
        'Collection of firmware examples demonstrating peripheral usage.',
      actionText: 'View Projects',
      link: '#',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-1">
      {/* Sidebar */}
      <aside className="lg:w-44 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          <div>
            <h5 className="font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-brand-500" />
              Downloads
            </h5>

            <ul className="space-y-1 border-l border-gray-800 ml-1">
              <li>
                <button
                  onClick={() => scrollToSection('software-tools')}
                  className="w-full text-left pl-4 py-1 text-sm border-l-2 border-transparent text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  Software Tools
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection('libraries')}
                  className="w-full text-left pl-4 py-1 text-sm border-l-2 border-transparent text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  Libraries
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection('uhuru')}
                  className="w-full text-left pl-4 py-1 text-sm border-l-2 border-transparent text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  DarkLight Uhuru
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection('katana')}
                  className="w-full text-left pl-4 py-1 text-sm border-l-2 border-transparent text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  DarkLight Katana
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-white mb-5">
            Downloads
          </h1>

          <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
            Download SDKs, software tools, libraries, templates,
            datasheets and development resources for the DarkLight ecosystem.
          </p>

          <section id="software-tools" className="scroll-mt-24 mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="text-brand-500" />
              <h2 className="text-2xl font-bold text-white">
                Software Tools
              </h2>
            </div>
            <DownloadTable items={softwareTools} />
          </section>

          <section id="libraries" className="scroll-mt-24 mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Library className="text-brand-500" />
              <h2 className="text-2xl font-bold text-white">
                Libraries
              </h2>
            </div>
            <DownloadTable items={libraries} />
          </section>

          <section id="uhuru" className="scroll-mt-24 mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Cpu className="text-brand-500" />
              <h2 className="text-2xl font-bold text-white">
                DarkLight Uhuru Downloadables
              </h2>
            </div>
            <DownloadTable items={uhuruDownloads} />
          </section>

          <section id="katana" className="scroll-mt-24 mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Cpu className="text-brand-500" />
              <h2 className="text-2xl font-bold text-white">
                DarkLight Katana Downloadables
              </h2>
            </div>
            <DownloadTable items={katanaDownloads} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Downloads;