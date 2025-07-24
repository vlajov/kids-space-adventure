import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Planet {
  id: string;
  name: string;
  diameter: string;
  relativeSize: number; // Size relative to Earth (Earth = 1)
}

const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    diameter: '4,879 km',
    relativeSize: 0.38, // 0.38 times the size of Earth
  },
  {
    id: 'venus',
    name: 'Venus',
    diameter: '12,104 km',
    relativeSize: 0.95, // 0.95 times the size of Earth
  },
  {
    id: 'earth',
    name: 'Earth',
    diameter: '12,756 km',
    relativeSize: 1, // Earth is our reference
  },
  {
    id: 'mars',
    name: 'Mars',
    diameter: '6,792 km',
    relativeSize: 0.53, // 0.53 times the size of Earth
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    diameter: '142,984 km',
    relativeSize: 11.2, // 11.2 times the size of Earth
  },
  {
    id: 'saturn',
    name: 'Saturn',
    diameter: '120,536 km',
    relativeSize: 9.45, // 9.45 times the size of Earth
  },
  {
    id: 'uranus',
    name: 'Uranus',
    diameter: '51,118 km',
    relativeSize: 4.01, // 4.01 times the size of Earth
  },
  {
    id: 'neptune',
    name: 'Neptune',
    diameter: '49,528 km',
    relativeSize: 3.88, // 3.88 times the size of Earth
  }
];

const PlanetSizeComparison = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(planets.find(p => p.id === 'earth') || null);
  const [comparePlanet, setComparePlanet] = useState<Planet | null>(planets.find(p => p.id === 'jupiter') || null);

  // Base size for Earth in pixels - responsive for different screen sizes
  const getBaseSize = () => {
    // Check if window is defined (for SSR compatibility)
    if (typeof window !== 'undefined') {
      // Adjust base size based on screen width
      if (window.innerWidth < 640) {
        return 30; // Smaller base size for mobile
      } else if (window.innerWidth < 768) {
        return 40; // Medium base size for tablets
      }
    }
    return 50; // Default base size for desktop
  };
  
  const [baseSize, setBaseSize] = useState(getBaseSize());
  
  // Update base size on window resize
  useEffect(() => {
    const handleResize = () => {
      setBaseSize(getBaseSize());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-white">Planet Size Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          {/* Comparison Visualization - Responsive Layout */}
          <div className="relative h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px] w-full">
            {selectedPlanet && comparePlanet && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 py-8">
                {/* First Planet */}
                <div className="flex flex-col items-center mb-4 sm:mb-0">
                  <img 
                    src={`/images/planets/${selectedPlanet.id}.svg`}
                    alt={selectedPlanet.name}
                    className="shadow-lg transition-all duration-300"
                    style={{ 
                      width: `${baseSize * selectedPlanet.relativeSize}px`, 
                      height: `${baseSize * selectedPlanet.relativeSize}px`,
                      maxWidth: '150px',
                      maxHeight: '150px',
                      minWidth: '20px',
                      minHeight: '20px'
                    }}
                  />
                  <p className="mt-2 text-sm font-medium text-white">{selectedPlanet.name}</p>
                </div>
                
                {/* VS indicator */}
                <div className="text-white text-lg font-bold hidden sm:block">VS</div>
                
                {/* Second Planet */}
                <div className="flex flex-col items-center">
                  <img 
                    src={`/images/planets/${comparePlanet.id}.svg`}
                    alt={comparePlanet.name}
                    className="shadow-lg transition-all duration-300"
                    style={{ 
                      width: `${baseSize * comparePlanet.relativeSize}px`, 
                      height: `${baseSize * comparePlanet.relativeSize}px`,
                      maxWidth: '150px',
                      maxHeight: '150px',
                      minWidth: '20px',
                      minHeight: '20px'
                    }}
                  />
                  <p className="mt-2 text-sm font-medium text-white">{comparePlanet.name}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Fun Fact - More Mobile Friendly */}
          {selectedPlanet && comparePlanet && (
            <div className="text-center p-3 sm:p-4 bg-white/10 rounded-lg mx-2 sm:mx-0">
              <p className="text-sm md:text-base text-white font-medium">
                {comparePlanet.relativeSize > selectedPlanet.relativeSize ? (
                  <><span className="text-yellow-300">{comparePlanet.name}</span> is <span className="text-green-300 font-bold">{(comparePlanet.relativeSize / selectedPlanet.relativeSize).toFixed(1)} times</span> bigger than <span className="text-yellow-300">{selectedPlanet.name}</span>!</>
                ) : (
                  <><span className="text-yellow-300">{selectedPlanet.name}</span> is <span className="text-green-300 font-bold">{(selectedPlanet.relativeSize / comparePlanet.relativeSize).toFixed(1)} times</span> bigger than <span className="text-yellow-300">{comparePlanet.name}</span>!</>
                )}
              </p>
              
              {/* Fun comparisons for kids */}
              {selectedPlanet.id === 'earth' && comparePlanet.id === 'mercury' && (
                <p className="text-sm text-blue-300 mt-2">That's like comparing you to a small puppy!</p>
              )}
              {selectedPlanet.id === 'jupiter' && comparePlanet.id === 'earth' && (
                <p className="text-sm text-blue-300 mt-2">You could fit more than 1,300 Earths inside Jupiter!</p>
              )}
              {selectedPlanet.id === 'saturn' && comparePlanet.id === 'earth' && (
                <p className="text-sm text-blue-300 mt-2">Saturn's rings would stretch halfway from Earth to the Moon!</p>
              )}
            </div>
          )}
          
          {/* Planet Selection - More Mobile Friendly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 w-full">
            <div>
              <p className="text-center mb-2 text-blue-200 font-medium">First Planet</p>
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                {planets.map((planet) => (
                  <Button
                    key={`select-${planet.id}`}
                    variant={selectedPlanet?.id === planet.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlanet(planet)}
                    className="text-xs px-2 py-1 h-auto min-h-[1.75rem]"
                  >
                    {planet.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mt-2 sm:mt-0">
              <p className="text-center mb-2 text-blue-200 font-medium">Second Planet</p>
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                {planets.map((planet) => (
                  <Button
                    key={`compare-${planet.id}`}
                    variant={comparePlanet?.id === planet.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setComparePlanet(planet)}
                    className="text-xs px-2 py-1 h-auto min-h-[1.75rem]"
                  >
                    {planet.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanetSizeComparison;