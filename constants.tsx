import React from 'react';
import { DocSection } from './types';
import { CodeBlock } from './components/CodeBlock';
import { Link } from 'react-router-dom';

// Animation styles
const pointerAnimationStyle = `
  @keyframes pointer-wave {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-3cm); }
  }
  .pointer-container {
    animation: pointer-wave 1s ease-in-out infinite;
  }
`;

// Helper to render section headers
const H2 = ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold text-brand-400 mt-8 mb-4 border-b border-gray-700 pb-2">{children}</h2>;
const H3 = ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">{children}</h3>;
const P = ({ children }: { children?: React.ReactNode }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>;
const UL = ({ children }: { children?: React.ReactNode }) => <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">{children}</ul>;
const OL = ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal pl-6 mb-4 text-gray-300 space-y-2" style={{listStyleType: 'decimal'}}>{children}</ol>;

export const DOC_DATA: DocSection[] = [
   {
    id: 'setup',
    title: 'Setting up the Development Environment',
    category: 'Getting Started',
    keywords: ['voltage', 'logic', '3.3v', 'terminology', 'setup', 'darklight.h'],
    content: (
      <>
        <H2>Installation</H2>
        <P>
           <H3>Setting Up the Darklight Development Environment</H3>
           The Darklight development environment is built on a collection of powerful professional software tools that provide everything needed to develop, debug, and deploy applications for the Darklight microcontrollers.
           To get started, you need to install the following software components on your development computer:
           <H3>Required Software</H3>
           <UL>
                <li>
                   <strong>Segger Embedded Studio</strong> – Integrated Development Environment (IDE) for writing and building applications.
                   {/*<img src="https://testech-elect.com/wp-content/uploads/2025/07/embedded-studio-monitor.png" alt="Embedded Studio Interface" style={{maxWidth: '400px', height: 'auto', margin: '20px 0', borderRadius: '12px'}} />*/}
                </li>
                <li>
                  <strong>SEGGER J-Link Software and Drivers (64-bit Windows)</strong> – Provides programming and debugging support for Darklight development boards.
                  {/*<img src="https://www.segger.com/fileadmin/_processed_/b/6/csm_J-Link-Windows-ARM_final_1c70d122d1.webp" alt="Embedded Studio Interface" style={{maxWidth: '400px', height: 'auto', margin: '20px 0', borderRadius: '12px'}} />*/}
                </li>
                <li>
                  <strong>Darklight USB Drivers</strong> – Enables communication between your computer and Darklight hardware.
                  {/*<img src="https://community.nxp.com/t5/image/serverpage/image-id/246010i02A8BA9A7F33D296/image-size/medium?v=v2&px=400" alt="Embedded Studio Interface" style={{maxWidth: '400px', height: 'auto', margin: '20px 0', borderRadius: '12px'}} />*/}
                </li>
                <li>
                  <strong>Darklight CPU Support Packages</strong> – Contains device definitions, startup files, libraries, and development resources for supported Darklight microcontrollers.
                  {/*<img src="https://kb.segger.com/images/b/b6/ES_ImportProject_TargetSelection.jpg" alt="Embedded Studio Interface" style={{maxWidth: '400px', height: 'auto', margin: '20px 0', borderRadius: '12px'}} />*/}
                  <br />
                </li>
              </UL>           
        </P>
        <P>
            {/*<div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 my-6">*/}
              <h3 className="text-white font-semibold mb-2">
                Downloads
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Visit the DarkLight Downloads Page to download the required installation packages.
              </p>
              <Link
                to="/downloads"
                className="text-brand-400 hover:text-brand-300 underline"
              >
                Go to Downloads Page
              </Link>
            {/*</div>*/}  
        </P>
        <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
                <h4 className="font-bold text-blue-400">Info</h4>
                  <p className="text-sm text-gray-300">
                   Watch the short video below for a step-by-step guide to installing and configuring the Darklight development environment.
                  </p>
        </div>

        <P>
          <div style={{margin: '20px 0', display: 'flex', justifyContent: 'center'}}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/fPyBSoZq-HU" // will be replaced with actual video link
            title="Digital Output Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        </P>  
   
      </>
    )
  },
   {
    id: 'intro',
    title: 'Introduction & Terminology',
    category: 'Getting Started',
    keywords: ['voltage', 'logic', '3.3v', 'terminology', 'setup', 'darklight.h'],
    content: (
      <>
        <H2>Platform Overview</H2>
        <P>
          DarkLight microcontrollers are high-performance embedded systems designed for modern IoT and robotics applications. 
          The core of the system operates on a <strong>3.3 Volt power rail</strong>. It is critical to ensure all interfaced sensors 
          and actuators are compatible with 3.3V logic levels to prevent hardware damage.
        </P>
        
        <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="font-bold text-yellow-500">Important:</p>
          <p className="text-yellow-200">Always include the core library header at the top of your main file:</p>
          <CodeBlock code='#include "DarkLight.h"' language="cpp" />
        </div>

        <H2>Digital Logic Terminology</H2>
        <P>
          Throughout this documentation and the API, we use specific terms to denote digital states. 
          Understanding these interchangeable terms is key to mastering the platform.
        </P>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-brand-300">
                <th className="p-3">State</th>
                <th className="p-3">Voltage</th>
                <th className="p-3">Common Terms</th>
                <th className="p-3">Boolean / Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-800/50">
                <td className="p-3 font-bold text-green-400">ON</td>
                <td className="p-3">3.3V</td>
                <td className="p-3">Closed, High, Set</td>
                <td className="p-3">True, Logic 1</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="p-3 font-bold text-red-400">OFF</td>
                <td className="p-3">0V</td>
                <td className="p-3">Open, Low, Clear</td>
                <td className="p-3">False, Logic 0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  {
    id: 'digital-io',
    title: 'Digital Output / Input',
    category: 'Hardware I/O',
    keywords: ['gpio', 'digitalout', 'digitalin', 'led', 'pins', '49'],
    content: (
      <>
        <H2>Pin Configuration</H2>
        <P>
          The DarkLight board features <strong>49 digital IO pins</strong>. Each pin can be individually configured as a 
          digital input or digital output via software. Additionally, the board includes an <strong>on-board LED</strong> 
          pre-configured on a specific pin for quick status indication.
        </P>
        <H2>Digital Outputs on the DarkLight Microcontroller</H2>
        <P>
          <H3>Introduction</H3>
          Digital inputs and outputs form the foundation of nearly all embedded systems. Whether you are switching on an LED, controlling a relay, enabling a motor driver, 
          or interfacing with higher‑power electronics through external circuitry, the concept is the same: the microcontroller drives a pin either LOW or HIGH.
          In this tutorial, we focus on digital outputs and, specifically, how to use the DigitalOut class on the DarkLight microcontroller development board. 
          By the end of this lesson, you will understand the electrical concept behind digital outputs, how DarkLight pins behave, and how to write and debug a complete program that blinks an LED.
        </P>

        <P>      
        <H3>What Is a Digital Output?</H3>
              A digital output pin is a microcontroller pin that can generate two distinct voltage levels:
              <UL>
                <li><strong>Logic 0 (LOW)</strong>: Approximately 0 V with respect to ground.</li>
                <li><strong>Logic 1 (HIGH)</strong>: Approximately 3.3 V with respect to ground.</li>
              </UL>
              On the DarkLight development board, the microcontroller is powered from a 3.3 V regulator. As a result:
              <UL>
                <li><strong>Logic 0 (LOW)</strong> → approximately 0 V with respect to ground</li>
                <li><strong>Logic 1 (HIGH)</strong> → approximately 3.3 V with respect to ground</li> 
              </UL>
                On the DarkLight development board, the microcontroller is powered from a 3.3 V regulator. As a result:
                
                <UL>
                  <li>0 V represents <strong>OFF</strong>, <strong>LOW</strong>, <strong>CLEAR</strong>, <strong>FALSE</strong>, or <strong>Logic 0</strong></li>
                  <li>3.3 V represents <strong>ON</strong>, <strong>HIGH</strong>, <strong>SET</strong>, <strong>TRUE</strong>, or <strong>Logic 1</strong></li>
                </UL>

                <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
                <h4 className="font-bold text-blue-400">Note</h4>
                   <p className="text-sm text-gray-300">
                      All of these terms are used interchangeably in embedded systems literature and practice
                   </p>
                </div>
                
              <H3>A Simple Digital Output Circuit</H3>
              Consider a basic circuit consisting of:
              <UL>
                <li>A DarkLight microcontroller</li>
                <li>Current‑limiting resistor</li>
                <li>An LED</li>
              </UL>
              
              <img src="https://lh3.googleusercontent.com/d/1mrTgFnfdBFI5h1BxITZat8cP_rK-DSTR" alt="LED Circuit Diagram" style={{maxWidth: '400px', height: 'auto', margin: '20px 0', borderRadius: '12px'}} />
             
            When the microcontroller pin is driven <strong>HIGH</strong> (3.3 V), a voltage potential exists across the LED and resistor, current flows, and the LED turns <strong>ON</strong>. 
            When the pin is driven <strong>LOW</strong> (0 V), the potential difference disappears, no current flows, and the LED turns <strong>OFF</strong>.
            If pin <strong>PTD2</strong>, for example, can generate both 0 V and 3.3 V, then <strong>PTD2</strong> is functioning as a digital output pin.
        </P>

        <P>
            <H3>Digital Output Pins on the DarkLight Board</H3>
                The DarkLight development board exposes microcontroller pins through multiple headers:
                <UL>
                  <li>J1, J2, J3, J4</li>
                  <li>J5, J6, J7</li>
                  <li>Debug header</li>
                </UL>

                <img src="https://lh3.googleusercontent.com/d/1qFN3aTKLaIjXNAYBg9TVFGIWkcxdrOVe" alt="DarkLight Pin Diagram" style={{height: 'auto', margin: '20px 0', borderRadius: '12px'}} />
                All pins labeled in violet colour on these headers can be configured as digital output pins except:
                <UL>
                  <li>PTA13</li>
                  <li>PTA14</li>
                </UL>

              <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
              <h4 className="font-bold text-red-400">CRITICAL</h4>
              <p className="text-gray-300">
                These two pins are reserved for debugging and should not be repurposed for general I/O.
                The DarkLight also has two on board LEDs which are attached to pins  <strong>PTA8</strong> for <strong>BoardLED1</strong> and pin <strong>PTB8</strong> attached to <strong>BoardLED2</strong>   
              </p>
        </div>
        </P>

        <H2>The DigitalOut Class (DigitalOut)</H2>
        <P>
              To configure and control a digital output pin in software, DarkLight provides the DigitalOut class defined in DarkLight.h library. This class abstracts away low‑level 
              register manipulation and provides a clean, readable interface.
              
              The DigitalOut class provides three essential functions:
          <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-brand-300">
                <th className="p-3"> Function Name</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-800/50">
                <td className="p-3">DigitalOut()</td>
                <td className="p-3">Configures a specified pin as a digital output pin</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="p-3">write()</td>
                <td className="p-3">Sets the output state of the pin (HIGH or LOW)</td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="p-3">read()</td>
                <td className="p-3">Returns the current logical state of the pin</td>
              </tr>
            </tbody>
          </table>
          </div>
            
          <H3>Declaring a Digital Output</H3>
          To configure a pin as a digital output pin, you declare a DigitalOut object by providing:
            <OL>
              <li>A descriptive variable name</li>
              <li>The physical pin name</li>
            </OL>
             
              Examples:
              <OL>
                <li>A light switch on <strong>PTB2</strong>:
                  <CodeBlock code={`DigitalOut lightSwitch(PTB2);`} language="cpp" />
                </li>
                <li>An AC control signal on <strong>PTD2</strong>:
                  <CodeBlock code={`DigitalOut ACcontrol(PTD2);`} language="cpp" />
                </li>
              </OL>

              <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
                <h4 className="font-bold text-blue-400">Note</h4>
                   <p className="text-sm text-gray-300">
                    The variable name should describe the function of the pin, not just the pin itself. This improves readability and maintainability.
                   </p>
              </div>
        </P>        
        <H3>Key Functions</H3>
        <UL>
          <li><code>DigitalOut(pin_name)</code>: Constructor to create the object.</li>
          <li><code>write(int value)</code>: Sets the pin state. 0 for Low, 1 for High.</li>
          <li><code>read()</code>: Returns the current output setting (0 or 1).</li>
        </UL>

        <H3>Example</H3>
        <CodeBlock code={`#include "DarkLight.h"

                    DigitalOut myLed(LED_BUILTIN); // Initialize on-board LED

                    int main() {
                        while(1) {
                            myLed.write(1); // Turn ON (3.3V)
                            wait_ms(500);
                            myLed.write(0); // Turn OFF (0V)
                            wait_ms(500);
                        }
                    }`} language="cpp" />

        <P>
            <H3>Practical Demonstration: Blinking an LED</H3>
            <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
                <h4 className="font-bold text-blue-400">Objective</h4>
                   <p className="text-sm text-gray-300">
                Write software to blink an on boardLED1 connected to PTA8 every 500 milliseconds.                   </p>
            </div>
            
            <H3>Setting Up the Project</H3>
            <OL>
              <li>Make a Copy of the DarkLight Template project Folder you have already downloaded to your computer.</li>
              <li>Create a new project by renaming the copy of the Template project folder as was shown in the section on getting started with Darklight.</li>
              <li>Navigate into the new project folder, locate the Template Project, rename it to any Name of your choice and Double click on it to  Open the SEGGER Embedded Studio IDE.</li>
              <li>Within the IDE project browser on the left, click on source file and double click on the main.cpp to open</li>
            </OL>
        </P>

        <P>
            <H3>Writing the Code</H3>
            <P>
              <H3>Including the DarkLight Libraries</H3>
              Every DarkLight project must begin by including the main board support header:
              <CodeBlock code={`#include "darklight.h"`} language="cpp" />
              This header pulls in all DarkLight‑specific libraries, including the DigitalOut class.
            </P>
        </P>


        <P>
          <H3>Declaring the LED Pin</H3>
            We configure PTA8 as a digital output and name it ledControl:
            <CodeBlock code={`DigitalOut ledControl(PTA8);`} language="cpp" />

            <H3>Main Loop Logic</H3>
            The program structure uses an infinite loop to repeatedly toggle the LED:
              
            <CodeBlock code={`#include "darklight.h"
              
                int main()
                {
                    while (true)
                    {
                        ledControl.write(1);   // Turn LED ON
                        wait_ms(500);

                        ledControl.write(0);   // Turn LED OFF
                        wait_ms(500);
                    }
                }`} language="cpp" />
              
            <H3>How It Works</H3>
            <UL>
            <li><code>write(1)</code> drives PTA8 HIGH, turning the LED ON.</li>
            <li>The program waits for 500 ms.</li>
            <li><code>write(0)</code> drives PTA8 LOW, turning the LED OFF.</li>
            <li>The program waits another 500 ms.</li>
            <li>The loop repeats indefinitely while the board is powered.</li>
            <strong>This results in a blinking LED with a 1‑second period.</strong>
            </UL>
        </P>

        <P> 
        <H3>Compiling and Flashing the Code</H3>
        <OL>
            <li>In SEGGER Embedded Studio, select: Build → Rebuild Project</li>
            <li>Connect the external debugger to your computer</li>
            <li>Go to: Target → Connect J‑Link</li>
            <li>When the connection completes successfully, proceed to debugging.</li>
        </OL>
        
        <H3>Running and Debugging</H3>
        <UL>
          <li><strong>Run:</strong> Click ▶️ to execute the program.</li>
          <li><strong>Pause:</strong> Temporarily halt execution.</li>
          <li><strong>Breakpoints:</strong> Breakpoints allow you to pause code execution at specific lines, enabling you to inspect variable values and program flow.
            Click in the margin on the left to insert a breakpoint.</li>
          <li><strong>Step Into:</strong> Press (F11) to Step Into a function call.</li>
        </UL>
        <UL>
          <li><strong>Step Over:</strong> Press (F10) on your keyboard to Step Over a function without entering it.</li>
          <li><strong>Stop:</strong> Terminates execution.</li>
          <li><strong>Continue:</strong> Resume execution after a pause or breakpoint.</li>
        </UL>
        <strong>Observe the onbaord LED1 on the DarkLight blinking once per second, confirming correct digital output operation.</strong>
        
        <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
          <h4 className="font-bold text-blue-400">Summary</h4>
            <p className="text-sm text-gray-300">
              In this tutorial, you learned:
              <UL>
                  <li>What a digital output is and how logic levels map to voltages</li>
                  <li>Which DarkLight pins can be used as digital outputs</li>
                  <li>How the DigitalOut class abstracts hardware control</li>
                  <li>How to write, flash, and debug a real digital output application</li>
              </UL>
              <strong>Digital outputs are the gateway to controlling the physical world. Mastering them is a critical first step toward more advanced embedded systems designs.</strong>
            </p>
        </div>
        
        <strong>You can also watch the video lecture on the tutorial on Digital Output:</strong>
        <div style={{margin: '20px 0', display: 'flex', justifyContent: 'center'}}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/fPyBSoZq-HU" // will be replaced with actual video link
            title="Digital Output Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        </P>
        
        <P>
          <H2>Digital Inputs on the DarkLight Microcontroller</H2>
          <H3>Introduction</H3>
            In the previous lesson, we explored digital outputs and how a microcontroller can actively drive a pin HIGH or LOW to control external hardware such as LEDs. 
            In this tutorial, we shift focus to the complementary concept: digital inputs.
            Digital inputs allow the microcontroller to observe the external world. Through digital input pins, the DarkLight board can detect user actions, sensor outputs, 
            and logic-level signals from other electronic systems. Common examples include push buttons, limit switches, PIR motion sensors, and logic outputs from other devices.
            This tutorial explains the electrical principles behind digital inputs, introduces the DigitalIn class, and walks through a complete hardware and software example using a push-button switch.
        </P>
        <P>
           <H3>What Is a Digital Input?</H3>
            A digital input pin reads one of two valid voltage levels:
            <UL>
               <li><strong>Logic 0 (LOW)</strong> → approximately 0 V</li>
               <li><strong>Logic 1 (HIGH)</strong> → approximately 3.3 V</li>
            </UL>
              
            Because the DarkLight microcontroller operates at 3.3 V, these voltages map directly to Boolean logic:
            <UL>
              <li><strong>0 V → OFF, LOW, CLEAR, FALSE, Logic 0</strong></li>
              <li><strong>3.3 V → ON, HIGH, SET, TRUE, Logic 1</strong></li>
            </UL>

            Unlike digital outputs, digital inputs do not drive a voltage. Instead, they sense the voltage applied to the pin by external circuitry.
            <H3>Practical Motivation: PIR Motion Sensors</H3>
            A common real-world example of a digital input device is a PIR (Passive Infrared) sensor.
            PIR sensors detect motion from objects that emit infrared radiation, such as humans or animals.The output of a PIR sensor is typically:
            <UL>
              <li>LOW (0 V) when no motion is detected</li>
              <li>HIGH (3.3 V or 5 V) when motion is detected</li>
            </UL>
            This type of output is a digital signal, making it ideal for direct connection to a microcontroller’s digital input pin. Using such inputs, a system can automatically 
            control lighting, air conditioning, alarms, or access control mechanisms.
            <br />
            <p>
            Further reading on PIR sensors can be found{' '}
            <a
              href="https://www.theengineeringprojects.com/2017/08/pir-sensor-arduino-interfacing.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 underline"
            >
              here
            </a>
          </p>
        </P>

        <P>
            <H3>Digital Input Pins on the DarkLight</H3>
            The DarkLight board provides 49 general-purpose digital I/O pins, all of which can be configured as either inputs or outputs.
            <br />
            <img src="https://lh3.googleusercontent.com/d/1qFN3aTKLaIjXNAYBg9TVFGIWkcxdrOVe" alt="DarkLight Pin Diagram" style={{height: 'auto', margin: '20px 0', borderRadius: '12px'}} />
            <br />
            The same electrical and terminology conventions apply to both. To read digital signals from switches or sensors, we configure selected pins as digital inputs using the DigitalIn class.
              
            The DarkLight software library provides the DigitalIn class to simplify digital input configuration and usage.   
          <br />  
          <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-brand-300">
                <th className="p-3"> Function Name</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-800/50">
                <td className="p-3">DigitalIn()</td>
                <td className="p-3">Configures a specified pin as a digital input pin</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="p-3">mode()</td>
                <td className="p-3">Configures the internal pin mode:Pull-up or Pull-down</td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="p-3">read()</td>
                <td className="p-3">Reads the current logical state of the pin:Returns 0 for LOW and 1 for HIGH</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
            Digital input pins must never be left floating. A floating pin can randomly read HIGH or LOW due to electrical noise.
            To ensure a stable default state, a resistor is used:
            <br />
              Pull-down resistor → forces the pin to 0 V when the switch is open.
            <br />
              Pull-up resistor → forces the pin to 3.3 V when the switch is open. 
            <br />
            <a href="https://www.circuitbread.com/ee-faq/why-are-pull-up-and-pull-down-resistors-used" target="_blank" rel="noopener noreferrer" 
               className="text-brand-400 hover:text-brand-300 underline"> Read more on Pull-up and Pull-down Resistors</a>
            <br />

              <H3>Example Program</H3>
              
              Push-Button Switch SW on the DarkLight Development Board as an Input to control the onboard leds.
              <br />
              <div style={{position: 'relative', display: 'inline-block', margin: '20px 0', width: '100%'}}>
                <style>{pointerAnimationStyle}</style>
                <img src="https://lh3.googleusercontent.com/d/1qFN3aTKLaIjXNAYBg9TVFGIWkcxdrOVe" alt="DarkLight Pin Diagram" style={{height: 'auto', borderRadius: '12px', width: '100%'}} />
                <div className="pointer-container" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
                  <div style={{position: 'absolute', top: 'calc(50% + 1cm)', left: 'calc(50% + 6cm)', fontSize: '48px', cursor: 'pointer', zIndex: 10, transform: 'translateY(-50%) rotate(-90deg)'}}>
                    👆
                  </div>
                  <div style={{position: 'absolute', top: 'calc(50% + 1cm)', left: 'calc(50% + 7.5cm)', fontSize: '14px', backgroundColor: 'rgba(59, 130, 246, 0.8)', color: 'white', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap', zIndex: 9, transform: 'translateY(-50%)', pointerEvents: 'auto'}}>
                    SW Push-Button
                  </div>
                </div>
              </div>
          <br />  
          <H3>Circuit Description</H3>
          The SW Push_Button switch is connected on the board to pin PTC8 and has a 10k Ohm external pull down resistor on it, as a result
          it is not strictly necessary to configure enable the internal pulldown resistor in the microcontroller. However for the sake of completeness in this
          tuitorial, we will still call the mode function to configure the pin in pull-down mode.
              
          The <strong>on_BOARDLED1</strong> and <strong>on_BOARDLED2</strong> are internally connected to pins  <strong>PTA8</strong> and <strong>PTB8</strong> and we will configure them as digital output pins.   
          <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
          <h4 className="font-bold text-blue-400">Application Objective</h4>
            <p className="text-sm text-gray-300">
              We will implement the following behavior:
              <br />
              When the switch is pressed :
              <br />
              The on-BoardLED1 blinks once per second
              <br />
              When the switch is released:
              <br />
              The on-boardLED2 blinks once per second
              <br />
              This behavior is implemented using conditional (if–else) logic.
            </p>
        </div>
              
              

          <CodeBlock code={`#include "DarkLight.h"
                                      
            DigitalOut LED1(PTA8);
            DigitalOut LED2(PTB8);
            DigitalIn  switchInput(PTC8);
                                      
            int main()
            {
              switchInput.mode(PullDown);              

              while (true)
              {
                  if (switchInput.read() == 1)
                  {
                      LED1.write(1);
                      LED2.write(0);
                      wait_ms(500);
                      LED1.write(0);
                      wait_ms(500);
                  }
                  else
                  {
                      LED2.write(1);
                      LED1.write(0);
                      wait_ms(500);
                      LED2.write(0);
                      wait_ms(500);
                  }
              }
            }`
            } language="cpp" />
        </P>
              
           <P>
              
            <H3>How the Program Works</H3>
            
            The input pin  is continuously read inside the loop.
            If the input is HIGH:
            The on-board LED1 blinks.
            If the input is LOW:
            The on-board LED2 blinks.
            The program runs indefinitely while the board is powered.
          </P>
          
          <P>

              <H3>Compiling and Debugging</H3>
              Build the project in SEGGER Embedded Studio.
              Connect the external debugger via USB.
              Select Target → Connect J-Link.
              Start execution by clicking Run.

              <H3>Observing the Result</H3>
              
              With the switch released, observe the on-board LED1 blinking once per second.
              Press and hold the push button.
              Observe the on-board LED2 blinking at the same rate.
              This confirms correct digital input detection and conditional logic execution.

          </P>

          <P>
              <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
              <h4 className="font-bold text-blue-400">Summary</h4>
              <p className="text-sm text-gray-300">
                In this tutorial, you learned:
                What digital inputs are and how they differ from outputs
                How logic levels map to voltage levels on DarkLight
                The purpose of pull-down resistors
                How to use the DigitalIn class
                How to combine digital inputs with digital outputs in a real application
              </p>
              </div>
            
            <strong>Digital inputs are essential for sensing user actions and environmental events. Combined with digital outputs,
            they form the foundation of interactive embedded systems. </strong>
            <br />
            Watch the video tutorial to learn more
            <div style={{margin: '20px 0', display: 'flex', justifyContent: 'center'}}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/fPyBSoZq-HU" // will be replaced with actual video link for youtube
                title="Digital Output Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
             https://drive.google.com/file/d/1F-ju0MVkZBotaWD9n7mZWWHlCiKo5nDn/view?usp=drive_link 
          </P>
              
        
      </>
    )
  },
  {
    id: 'analog',
    title: 'Analog Input (ADC)',
    category: 'Hardware I/O',
    keywords: ['adc', 'analogin', '12-bit', 'resolution', 'sampling', 'voltage'],
    content: (
      <>
        <H2>ADC Overview</H2>
        <P>
          DarkLight supports <strong>up to 16 Analog input pins</strong>. It utilizes a high-precision 
          <strong>12-bit Analog-to-Digital Converter (ADC)</strong>.
        </P>

        <H3>Resolution Calculation</H3>
        <P>
          Resolution determines the smallest change in voltage the system can detect. 
          With a system voltage of 3.3V and 12-bit depth ($2^{12} = 4096$ levels):
        </P>
        <div className="bg-gray-800 p-4 rounded mb-4 font-mono text-center text-brand-300">
          Resolution = 3.3V / 4096 ≈ 0.81 mV
        </div>

        <H2>AnalogIn Usage</H2>
        <P>
          The <code>AnalogIn</code> library abstracts the raw values. The <code>read()</code> function 
          returns a <strong>normalized float in the range [0.0, 1.0]</strong>, where 0.0 represents 0V 
          and 1.0 represents 3.3V.
        </P>

        <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
          <h4 className="font-bold text-blue-400">Note on Sampling Frequency</h4>
          <p className="text-sm text-gray-300">
            Ensure your sampling frequency is at least twice the highest frequency component of the signal (Nyquist theorem), 
            though 5x-10x is recommended for better reconstruction.
          </p>
        </div>

        <H3>Example</H3>
        <CodeBlock code={`#include "DarkLight.h"

AnalogIn sensor(PTB5); // Initialize Analog pin

int main() {
    while(1) {
        float normalized = sensor.read(); // 0.0 to 1.0
        float voltage = normalized * 3.3; // Convert to actual voltage
        
        printf("Voltage: %.2f V\\n", voltage);
        wait_ms(100);
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'pwm',
    title: 'Pulse Width Modulation (PWM)',
    category: 'Hardware I/O',
    keywords: ['pwm', 'pwmout', 'duty cycle', 'period', 'analog simulation'],
    content: (
      <>
        <H2>PWM Concept</H2>
        <P>
          PWM is a technique to generate an analog-like voltage using digital signals. By switching a pin ON (3.3V) and OFF (0V) 
          rapidly, the average voltage is determined by the <strong>duty cycle</strong> (the percentage of time the signal is high).
        </P>
        <P>DarkLight supports <strong>up to eighteen PWM outputs</strong>.</P>

        <H2>PwmOut Library</H2>
        <UL>
          <li><code>write(float value)</code>: Sets duty cycle as a normalized float (0.0 = 0%, 1.0 = 100%).</li>
          <li><code>period(float seconds)</code>: Sets the PWM period in seconds.</li>
          <li><code>read()</code>: Returns current duty cycle setting.</li>
        </UL>

        <H3>Example: Fading LED</H3>
        <CodeBlock code={`#include "DarkLight.h"

PwmOut led(PTC2);

int main() {
    led.period(0.020); // 20ms period (50Hz)
    
    while(1) {
        // Fade in
        for(float i=0.0; i<1.0; i+=0.1) {
            led.write(i);
            wait_ms(50);
        }
        // Fade out
        for(float i=1.0; i>0.0; i-=0.1) {
            led.write(i);
            wait_ms(50);
        }
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'interrupts',
    title: 'Interrupts & Debouncing',
    category: 'Advanced Control',
    keywords: ['interrupt', 'interruptin', 'isr', 'debounce', 'rise', 'fall'],
    content: (
      <>
        <H2>External Hardware Interrupts</H2>
        <P>
          Interrupts allow the DarkLight controller to pause its main program loop to immediately handle a time-critical 
          event (like a button press or sensor trigger) via an Interrupt Service Routine (ISR).
        </P>

        <H2>InterruptIn Library</H2>
        <UL>
          <li><code>rise(callback)</code>: Triggers ISR on Rising Edge (0V → 3.3V).</li>
          <li><code>fall(callback)</code>: Triggers ISR on Falling Edge (3.3V → 0V).</li>
          <li><code>rise_fall(callback)</code>: Triggers on both edges.</li>
        </UL>

        <H2>Switch Debouncing</H2>
        <P>
          Mechanical switches physically "bounce" when pressed, creating multiple electrical transitions in milliseconds. 
          Without debouncing, a single press might trigger the ISR dozens of times.
        </P>
        <P>
          <strong>Recommended Solution:</strong> Use software timestamping. Only process the interrupt if the time 
          difference from the last valid interrupt is greater than <strong>15ms</strong>.
        </P>

        <H3>Debounced Button Example</H3>
        <CodeBlock code={`#include "DarkLight.h"

InterruptIn button(PTD4);
DigitalOut led(LED1);
Timer debounce;

void toggle_led() {
    // Only toggle if >15ms has passed
    if (debounce.read_ms() > 15) {
        led = !led;
        debounce.reset(); // Reset timer for next press
    }
}

int main() {
    debounce.start();
    button.rise(&toggle_led); // Attach ISR
    
    while(1) {
        // Main loop is free to do other things
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'ticker',
    title: 'Task Scheduling (Ticker)',
    category: 'Advanced Control',
    keywords: ['ticker', 'scheduler', 'multitasking', 'non-blocking', 'attach'],
    content: (
      <>
        <H2>The Ticker Class</H2>
        <P>
          The <code>Ticker</code> class acts as a lightweight scheduler, allowing you to execute functions repeatedly 
          at a specific interval without using blocking delay loops.
        </P>

        <H2>Non-Blocking Requirement</H2>
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
          <h4 className="font-bold text-red-400">CRITICAL</h4>
          <p className="text-gray-300">
             Functions attached to a Ticker <strong>must be non-blocking</strong>. Do not use <code>wait_ms()</code> 
             or long synchronous operations inside a Ticker callback, as this will stall the entire system.
          </p>
        </div>

        <H3>Functions</H3>
        <UL>
          <li><code>attach(callback, float interval)</code>: Schedule function every <em>interval</em> seconds.</li>
          <li><code>detach()</code>: Stop the scheduler.</li>
        </UL>

        <H3>Example: Blinking LED without Wait</H3>
        <CodeBlock code={`#include "DarkLight.h"

Ticker flasher;
DigitalOut led(LED2);

void flash() {
    led = !led;
}

int main() {
    // Call 'flash' every 0.5 seconds
    flasher.attach(&flash, 0.5);
    
    while(1) {
        // Main loop is completely free
        printf("Doing other work...\\n");
        wait_ms(1000); 
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'comms',
    title: 'Communication (SPI & UART)',
    category: 'Communication',
    keywords: ['spi', 'uart', 'serial', 'baud', 'mosi', 'miso', 'async'],
    content: (
      <>
        <H2>SPI (Serial Peripheral Interface)</H2>
        <P>SPI is a high-speed, 4-wire, master/slave protocol (SCLK, MOSI, MISO, CS/SS).</P>
        
        <H3>Configuration</H3>
        <UL>
          <li><strong>Frequency:</strong> Up to 24 MHz (Default 1.5 MHz).</li>
          <li><strong>Data Width:</strong> 8 or 16 bits.</li>
          <li><strong>Mode:</strong> Clock polarity and phase (0-3).</li>
        </UL>

        <H3>Methods</H3>
        <UL>
          <li><code>write(int data)</code>: Blocking write/read exchange.</li>
          <li><code>asyncWrite(data, length)</code>: Non-blocking asynchronous transfer.</li>
        </UL>

        <hr className="border-gray-700 my-8" />

        <H2>UART (Serial)</H2>
        <P>
          Universal Asynchronous Receiver/Transmitter is a two-wire (Tx/Rx) protocol. DarkLight features 
          <strong>two independent UARTs</strong> (UART1, UART2).
        </P>

        <H3>Packet Structure & Config</H3>
        <P>Devices must match parameters exactly:</P>
        <UL>
          <li><strong>Baud Rate:</strong> Default 9600, supports up to 6,000,000 bps.</li>
          <li><strong>Data Bits:</strong> Typically 8.</li>
          <li><strong>Parity:</strong> None, Odd, Even, Forced1, Forced0.</li>
          <li><strong>Stop Bits:</strong> 1 or 2.</li>
        </UL>
      </>
    )
  }
];