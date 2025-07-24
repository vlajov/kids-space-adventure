import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GuideMessage {
  text: string;
  type: 'welcome' | 'fact' | 'hint' | 'question';
}

const GUIDE_MESSAGES: Record<string, GuideMessage[]> = {
  welcome: [
    { text: "Hi there, space explorer! I'm Captain Nina, your guide to the amazing solar system!", type: 'welcome' },
    { text: "Click on any planet to learn cool things about it!", type: 'welcome' },
    { text: "Did you know that all planets orbit around the Sun?", type: 'fact' }
  ],
  mercury: [
    { text: "Mercury is the closest planet to the Sun!", type: 'fact' },
    { text: "It's super hot during the day and super cold at night!", type: 'fact' },
    { text: "Mercury is smaller than Earth. It's about the size of the Moon!", type: 'fact' }
  ],
  venus: [
    { text: "Venus is the hottest planet! It's even hotter than Mercury!", type: 'fact' },
    { text: "A day on Venus is longer than a year on Venus! Isn't that weird?", type: 'fact' },
    { text: "Venus spins the opposite way compared to most planets!", type: 'fact' }
  ],
  earth: [
    { text: "Earth is our home planet! It's the only planet we know that has life!", type: 'fact' },
    { text: "Earth is covered mostly by water - that's why it looks blue from space!", type: 'fact' },
    { text: "Our planet has one moon that we just call 'the Moon'!", type: 'fact' }
  ],
  mars: [
    { text: "Mars is called the Red Planet because it looks red!", type: 'fact' },
    { text: "Mars has the biggest volcano in the whole solar system!", type: 'fact' },
    { text: "Would you like to be the first kid to visit Mars someday?", type: 'question' }
  ],
  jupiter: [
    { text: "Jupiter is the biggest planet! More than 1,000 Earths could fit inside it!", type: 'fact' },
    { text: "The big red spot on Jupiter is actually a giant storm!", type: 'fact' },
    { text: "Jupiter has at least 95 moons! That's a lot of moons!", type: 'fact' }
  ],
  saturn: [
    { text: "Saturn has beautiful rings made of ice and rocks!", type: 'fact' },
    { text: "Saturn is so light it could float in water if there was a bathtub big enough!", type: 'fact' },
    { text: "Can you imagine what it would be like to fly through Saturn's rings?", type: 'question' }
  ],
  uranus: [
    { text: "Uranus rolls like a ball as it orbits the Sun!", type: 'fact' },
    { text: "Uranus is very cold and has rings too, but they're harder to see than Saturn's!", type: 'fact' },
    { text: "Uranus is named after an ancient Greek god of the sky!", type: 'fact' }
  ],
  neptune: [
    { text: "Neptune has the strongest winds in the solar system!", type: 'fact' },
    { text: "It takes Neptune 165 Earth years to go around the Sun once!", type: 'fact' },
    { text: "Neptune looks blue because it has a gas called methane in its atmosphere!", type: 'fact' }
  ]
};

interface SpaceGuideProps {
  planetId?: string;
  showNext?: boolean;
}

const SpaceGuide = ({ planetId = 'welcome', showNext = false }: SpaceGuideProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = GUIDE_MESSAGES[planetId || 'welcome'] || GUIDE_MESSAGES.welcome;
  const currentMessage = messages[messageIndex % messages.length];

  const nextMessage = () => {
    setMessageIndex((prev: number) => (prev + 1) % messages.length);
  };

  return (
    <Card className="relative p-4 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 border-2 border-indigo-300 rounded-xl shadow-lg">
      <div className="flex items-center gap-4">
        {/* Captain Nina - Female Astronaut Guide Character */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center relative mr-2">
          <div className="relative w-24 h-28 animate-float" style={{ animationDuration: '3s' }}>
            {/* Full body astronaut SVG based on the image */}
            <svg width="100" height="120" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
              {/* Helmet */}
              <circle cx="50" cy="30" r="25" fill="#9999ff" stroke="#ffffff" strokeWidth="3" />
              <circle cx="50" cy="30" r="20" fill="#6666cc" />
              
              {/* Helmet reflection */}
              <ellipse cx="40" cy="20" rx="5" ry="7" fill="#ffffff" opacity="0.6" transform="rotate(-10 40 20)" />
              
              {/* Girl's face with more hair */}
              <circle cx="50" cy="30" r="15" fill="#ffccaa" /> {/* Face */}
              
              {/* More hair - visible inside helmet */}
              <path d="M35 20 Q50 10 65 20" fill="#8B4513" /> {/* Hair on top */}
              <path d="M35 20 Q30 25 35 35" fill="#8B4513" /> {/* Upper left side hair */}
              <path d="M65 20 Q70 25 65 35" fill="#8B4513" /> {/* Upper right side hair */}
              <path d="M35 35 Q38 40 40 45" fill="#8B4513" /> {/* Lower left side hair */}
              <path d="M65 35 Q62 40 60 45" fill="#8B4513" /> {/* Lower right side hair */}
              <path d="M40 15 Q50 10 60 15" fill="#8B4513" /> {/* Hair bangs */}
              <path d="M40 15 L35 20" fill="#8B4513" /> {/* Left hair connection */}
              <path d="M60 15 L65 20" fill="#8B4513" /> {/* Right hair connection */}
              <path d="M35 20 Q40 22 45 20" fill="#8B4513" /> {/* Left hair detail */}
              <path d="M65 20 Q60 22 55 20" fill="#8B4513" /> {/* Right hair detail */}
              
              {/* Eyes */}
              <circle cx="45" cy="27" r="2" fill="#663300" /> {/* Left eye */}
              <circle cx="55" cy="27" r="2" fill="#663300" /> {/* Right eye */}
              
              {/* Smile */}
              <path d="M45 35 Q50 38 55 35" stroke="#ff6699" strokeWidth="1.5" fill="none" />
              
              {/* Rosy cheeks */}
              <circle cx="43" cy="32" r="3" fill="#ffaaaa" opacity="0.5" />
              <circle cx="57" cy="32" r="3" fill="#ffaaaa" opacity="0.5" />
              
              {/* Spacesuit body */}
              <rect x="40" y="50" width="20" height="30" fill="#ffffff" rx="10" stroke="#ccccff" strokeWidth="2" />
              
              {/* Belt */}
              <rect x="38" y="65" width="24" height="5" fill="#ccccff" rx="2" />
              <circle cx="50" cy="67.5" r="2" fill="#6666cc" />
              
              {/* Arms - outstretched like in the image */}
              <path d="M40 55 L15 50" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
              <path d="M60 55 L85 50" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
              
              {/* Gloves */}
              <circle cx="15" cy="50" r="5" fill="#ffffff" stroke="#ccccff" strokeWidth="1" />
              <circle cx="85" cy="50" r="5" fill="#ffffff" stroke="#ccccff" strokeWidth="1" />
              
              {/* Legs - slightly bent */}
              <path d="M45 80 Q40 95 35 110" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
              <path d="M55 80 Q60 95 65 110" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
              
              {/* Boots */}
              <ellipse cx="35" cy="110" rx="7" ry="5" fill="#ffffff" stroke="#ccccff" strokeWidth="1" />
              <ellipse cx="65" cy="110" rx="7" ry="5" fill="#ffffff" stroke="#ccccff" strokeWidth="1" />
              
              {/* NASA logo on chest */}
              <circle cx="50" cy="60" r="5" fill="#0B3D91" />
              <text x="50" y="62" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">NASA</text>
            </svg>
            
            {/* Animated stars around astronaut */}
            <div className="absolute top-0 right-0 text-white text-lg">✦</div>
            <div className="absolute top-1/4 left-0 text-white text-sm animate-pulse" style={{ animationDelay: '0.7s' }}>✦</div>
            <div className="absolute top-1/2 right-0 text-white text-xs animate-pulse" style={{ animationDelay: '1.3s' }}>✦</div>
            <div className="absolute bottom-1/4 left-0 text-white text-lg animate-pulse" style={{ animationDelay: '0.9s' }}>✦</div>
            <div className="absolute bottom-0 right-1/4 text-white text-sm">✦</div>
            <div className="absolute top-1/3 right-1/4 text-white text-xs animate-pulse" style={{ animationDelay: '1.5s' }}>✦</div>
          </div>
          
          {/* Name tag */}
          <div className="text-xs font-bold text-white bg-pink-600 px-2 py-0.5 rounded-md mt-1">
            CAPTAIN NINA
          </div>
        </div>

        {/* Message Bubble */}
        <div className="flex-1 bg-white/90 p-3 rounded-lg rounded-tl-none">
          <p className="text-sm md:text-base font-medium text-purple-900">
            {currentMessage.text}
          </p>
          <div className="flex justify-center w-full mt-2">
            <Button
              variant="default"
              size="sm"
              onClick={nextMessage}
              className="text-sm bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full px-4 py-1 shadow-md flex items-center gap-1 transition-transform hover:scale-105"
            >
              {showNext ? "Next →" : "Tell me more! 🚀"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpaceGuide;