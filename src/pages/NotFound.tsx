import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
      
      <div className="text-center relative z-10 bg-black/30 backdrop-blur-sm p-12 rounded-3xl border border-white/10 max-w-md">
        <div className="text-6xl mb-6 animate-float">🛸</div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Oops! Lost in Space
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          This planet doesn't exist in our solar system!
        </p>
        <Button 
          onClick={() => navigate('/')}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-xl font-bold transition-all duration-300 hover:scale-105 rounded-full"
        >
          🚀 Return to Mission Control
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
