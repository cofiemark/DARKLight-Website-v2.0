import React, { useState } from 'react';
import { Download, ExternalLink, Code, Video, FileCode, Monitor, Play } from 'lucide-react';

export const Community: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDownload = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    alert(`Starting download for ${item}... (Demo)`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Community & Resources</h1>
        <p className="text-gray-400 text-lg mb-12">
          Download the latest libraries, view tutorials, and connect with other DarkLight developers.
        </p>

        {/* Downloads Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Download className="text-brand-500" /> Downloads
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">DarkLight SDK v2.1.0</h3>
                <p className="text-gray-400 text-sm">Includes header files, linker scripts, and standard libraries.</p>
                <div className="flex gap-2 mt-4">
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">Release: Oct 2023</span>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">Size: 45MB</span>
                </div>
              </div>
              <a
                href="https://www.DarkLightRT.com"
                target="_blank"
                rel="noreferrer"
                className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-brand-900/20"
              >
                Download Core <ExternalLink size={18} />
              </a>
            </div>
            <hr className="border-gray-800 my-6" />
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={(e) => handleDownload(e, "USB Drivers")}
                className="flex items-start gap-4 p-4 bg-gray-800/30 hover:bg-gray-800 rounded-lg border border-transparent hover:border-brand-500/30 transition-all text-left group"
              >
                <div className="p-2 bg-gray-800 rounded-lg text-gray-400 group-hover:text-brand-400 transition-colors">
                  <Monitor size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-200 group-hover:text-white">USB Driver (Windows)</div>
                  <div className="text-xs text-gray-500 mt-1">v1.4 - Installer executable</div>
                </div>
              </button>
              <button
                onClick={(e) => handleDownload(e, "VS Code Extension")}
                className="flex items-start gap-4 p-4 bg-gray-800/30 hover:bg-gray-800 rounded-lg border border-transparent hover:border-brand-500/30 transition-all text-left group"
              >
                <div className="p-2 bg-gray-800 rounded-lg text-gray-400 group-hover:text-brand-400 transition-colors">
                  <FileCode size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-200 group-hover:text-white">VS Code Extension</div>
                  <div className="text-xs text-gray-500 mt-1">Syntax highlighting & Intellesense</div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Tutorials Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Code className="text-brand-500" /> Example Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group cursor-pointer bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-brand-500/50 transition-all">
              <div className="overflow-hidden h-48 relative">
                <img
                  src="images/FJR4C12KR8CCQDL-1024x649.jpg"
                  alt="Neopixel Project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600/90 backdrop-blur-sm text-xs text-white px-2 py-1 rounded font-medium">Intermediate</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors mb-2">Bluetooth Controlled NeoPixel Stick</h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Learn how to interface with a BLE module via UART and control an addressable LED strip using high-speed digital output.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-brand-500/50 transition-all">
              <div className="overflow-hidden h-48 relative">
                <img
                  src="images/human_detection_robot_using_pir.webp"
                  alt="Ticker Project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-green-600/90 backdrop-blur-sm text-xs text-white px-2 py-1 rounded font-medium">Beginner</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors mb-2">Ticker Example 2: Multi-rate Scheduling</h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  A deep dive into the Ticker class. Create a system with 3 different tasks running at 10Hz, 50Hz, and 1Hz without blocking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Explainer Video Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Play className="text-brand-500" /> What is DarkLight?
          </h2>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl group">
            {isPlaying ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/TBgTCUJeZ5s?autoplay=1"
                title="DarkLight Explainer Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full cursor-pointer relative" onClick={() => setIsPlaying(true)}>
                <img
                  src="/images/mcubanner.jpg"
                  alt="DarkLight Explainer"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-brand-600/90 hover:bg-brand-500 rounded-full flex items-center justify-center text-white transition-all transform group-hover:scale-110 shadow-lg backdrop-blur-sm border border-brand-400/20">
                    <Play size={32} fill="currentColor" className="ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent pointer-events-none">
                  <h3 className="text-2xl font-bold text-white mb-2">The DarkLight Architecture Explained</h3>
                  <p className="text-gray-300">
                    Join our lead architect for a 2-minute overview of the 3.3V logic system, the 12-bit ADC, and how the non-blocking core revolutionizes embedded loops.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Video Tutorial Placeholder */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Video className="text-brand-500" /> Video Guides
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-400 group-hover:scale-110 transition-transform">
                <Video size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Visual Learner?</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Check out our official YouTube channel for getting started guides, soldering tips, and project showcases.
              </p>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full border border-gray-700 hover:border-brand-500/50 transition-all font-semibold"
              >
                Visit Channel
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};