import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SpaceGuide from "@/components/SpaceGuide";
import "@/components/MobileSpaceFix.css";

const Index = () => {
  const navigate = useNavigate();
  const [currentFact, setCurrentFact] = useState(0);

  const funFacts = [
    "🌟 Did you know? You could fit 1 million Earths inside the Sun!",
    "🪐 Saturn is so light it could float in a giant bathtub!",
    "🌍 A day on Venus is longer than its whole year!",
    "🔴 Mars has the biggest volcano in our solar system!",
    "⭐ There are more stars in space than grains of sand on all beaches!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev: number) => (prev + 1) % funFacts.length);
    }, 5000); // Rotation speed of the planet fact on the bottom
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-0">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 pt-0 mt-0 space-container">
        <div className="space-y-5 mb-40">
          <div className="mb-5 mt-0">
            <div className="text-4xl md:text-6xl mb-1 mt-0">🚀</div>
            <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Space Adventure!
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto leading-relaxed px-4">
              Hey you, Space Explorer! Are you ready to learn fascinating things about our solar system?
            </p>
          </div>

          {/* Start Button Section - now appears first */}
          <div className="space-y-4 relative z-20">
            <Button
              onClick={() => navigate('/planets')}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 md:px-12 py-6 text-xl md:text-2xl font-bold transition-all duration-300 hover:scale-110 rounded-full shadow-lg relative z-20"
            >
              🌟 Start My Space Journey! 🌟
            </Button>
          </div>
        </div>

        {/* Animated solar system preview - responsive sizing */}
        <div className="flex justify-center items-center mt-16 mb-16">
          <div className="relative">
            {/* Sun - responsive size */}
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50 relative z-10" />

            {/* Orbiting planets - responsive sizing */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="w-24 h-24 md:w-32 md:h-32 border border-white/20 rounded-full relative">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-full absolute -top-1.5 md:-top-2 left-1/2 transform -translate-x-1/2" />
              </div>
            </div>

            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
              <div className="w-36 h-36 md:w-48 md:h-48 border border-white/10 rounded-full relative">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-400 to-orange-500 rounded-full absolute -top-2 md:-top-2.5 left-1/2 transform -translate-x-1/2" />
              </div>
            </div>

            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '40s' }}>
              <div className="w-48 h-48 md:w-64 md:h-64 border border-white/10 rounded-full relative">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-600 to-red-500 rounded-full absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Space Guide - responsive sizing */}
        <div className="max-w-sm md:max-w-md mx-auto mb-3 px-2 mt-16">
          <p className="text-base md:text-lg text-blue-200 mb-1 text-center">
            Meet Cosmo and explore 8 amazing planets!
          </p>
          <SpaceGuide />
        </div>

        {/* Fun fact carousel - moved to bottom */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 md:p-3 max-w-sm md:max-w-2xl mx-auto border border-white/30">
          <div className="text-base md:text-xl text-yellow-300 font-medium transition-all duration-500 text-center">
            {funFacts[currentFact]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
