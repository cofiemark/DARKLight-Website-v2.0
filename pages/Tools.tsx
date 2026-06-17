import React, { useEffect } from 'react';
import { PinoutDiagram } from '../components/PinoutDiagram';
import { CodeGenerator } from '../components/CodeGenerator';
import { Cpu, Download, Terminal, Package } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Tools: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(
        location.hash.replace('#', '')
      );

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive Tools
          </h1>
          <p className="text-xl text-gray-400">
            Visualize hardware configurations and generate boilerplate code
            instantly.
          </p>
        </div>

        {/* Pinout Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-brand-900/30 rounded-lg text-brand-400">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Interactive Pinout
              </h2>
              <p className="text-gray-400 text-sm">
                Explore the 49 Digital I/O pins and their multiplexed
                capabilities.
              </p>
            </div>
          </div>

          <PinoutDiagram />
        </section>

        {/* Code Generator Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
              <Terminal size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Code Generator
              </h2>
              <p className="text-gray-400 text-sm">
                Configure peripherals and generate C++ boilerplate code.
              </p>
            </div>
          </div>

          <CodeGenerator />
        </section>
      </div>
    </div>
  );
};