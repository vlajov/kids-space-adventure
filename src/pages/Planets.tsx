import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import PlanetQuiz from "@/components/PlanetQuiz";
import PlanetSizeComparison from "@/components/PlanetSizeComparison";

interface Planet {
  id: string;
  name: string;
  type: string;
  nickname: string;
  distanceFromSun: string;
  diameter: string;
  orbitalPeriod: string;
  description: string;
  kidFriendlyDescription: string;
  composition: string[];
  moons: number;
  gradient: string;
  size: string;
  facts: string[];
  kidFacts: string[];
  emoji: string;
  sound?: string;
  whatIfVisit: string;
  comparison: string;
}

const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    nickname: 'The Speedy Planet',
    type: 'Rocky Planet',
    distanceFromSun: 'Really close to the Sun!',
    diameter: 'Smaller than Earth',
    orbitalPeriod: '88 Earth days',
    description: 'The smallest planet and closest to the Sun, Mercury experiences extreme temperature variations.',
    kidFriendlyDescription: 'Mercury is the smallest planet and lives closest to the Sun! It\'s super fast and zooms around the Sun in just 88 days!',
    composition: ['Iron core', 'Thin atmosphere'],
    moons: 0,
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    size: 'w-16 h-16',
    facts: ['Surface temperatures range from -173°C to 427°C', 'No atmosphere to retain heat'],
    kidFacts: ['It\'s super hot during the day but freezing cold at night!', 'Mercury is the fastest planet - it races around the Sun!', 'It has no moons to keep it company'],
    emoji: '☿️',
    whatIfVisit: 'If you visited Mercury, you\'d need a super special spacesuit! During the day it\'s hot enough to melt lead, but at night it\'s colder than Antarctica!',
    comparison: 'Mercury is about as big as our Moon!'
  },
  {
    id: 'venus',
    name: 'Venus',
    nickname: 'Earth\'s Twin Sister',
    type: 'Rocky Planet',
    distanceFromSun: 'Second from the Sun',
    diameter: 'Almost as big as Earth',
    orbitalPeriod: '225 Earth days',
    description: 'Known as Earth\'s twin, Venus has a thick, toxic atmosphere and is the hottest planet.',
    kidFriendlyDescription: 'Venus is Earth\'s twin sister, but she\'s the hottest planet in our solar system! She spins backwards and is covered in thick, cloudy air.',
    composition: ['Dense CO2 atmosphere', 'Rocky surface'],
    moons: 0,
    gradient: 'from-orange-300 via-yellow-400 to-orange-500',
    size: 'w-20 h-20',
    facts: ['Hottest planet at 462°C surface temperature', 'Rotates backwards (retrograde)'],
    kidFacts: ['Venus spins backwards - the Sun rises in the west!', 'It\'s the hottest planet, even hotter than Mercury!', 'A day on Venus is longer than its whole year!'],
    emoji: '♀️',
    whatIfVisit: 'Venus would be like visiting a super hot, cloudy greenhouse! The air is so thick you couldn\'t breathe, and it\'s hot enough to melt a penny!',
    comparison: 'Venus is almost exactly the same size as Earth!'
  },
  {
    id: 'earth',
    name: 'Earth',
    nickname: 'Our Beautiful Home',
    type: 'Rocky Planet',
    distanceFromSun: 'Just the right distance!',
    diameter: 'Perfect size for us!',
    orbitalPeriod: '365.25 days (1 year)',
    description: 'The only known planet with life, featuring liquid water and a protective atmosphere.',
    kidFriendlyDescription: 'Earth is our amazing home! It\'s the only planet we know that has animals, plants, and people. It has water, air to breathe, and perfect weather for life!',
    composition: ['Nitrogen-oxygen atmosphere', 'Water oceans', 'Rocky crust'],
    moons: 1,
    gradient: 'from-blue-400 via-green-400 to-blue-600',
    size: 'w-20 h-20',
    facts: ['71% of surface covered by water', 'Only planet known to harbor life'],
    kidFacts: ['Earth is the only planet with animals and people!', 'Most of Earth is covered by oceans!', 'Our Moon helps make the ocean tides!'],
    emoji: '🌍',
    whatIfVisit: 'Earth is perfect for us! We have fresh air to breathe, water to drink, and it\'s not too hot or too cold. Plus, we have amazing animals and beautiful nature!',
    comparison: 'Earth is our home and the perfect size for life!'
  },
  {
    id: 'mars',
    name: 'Mars',
    nickname: 'The Red Planet',
    type: 'Rocky Planet',
    distanceFromSun: 'Fourth from the Sun',
    diameter: 'About half the size of Earth',
    orbitalPeriod: '687 Earth days',
    description: 'The red planet, featuring the largest volcano and canyon in the solar system.',
    kidFriendlyDescription: 'Mars is the red planet! It looks red because it\'s covered in rusty dirt. It has the biggest mountain and the longest canyon in our whole solar system!',
    composition: ['Iron oxide surface', 'Thin CO2 atmosphere'],
    moons: 2,
    gradient: 'from-red-400 via-orange-500 to-red-600',
    size: 'w-18 h-18',
    facts: ['Home to Olympus Mons, largest volcano in solar system', 'Has polar ice caps made of water and CO2'],
    kidFacts: ['Mars looks red because of rusty iron in the dirt!', 'It has the biggest volcano - 3 times taller than Mount Everest!', 'Mars has two tiny moons named Phobos and Deimos!'],
    emoji: '♂️',
    whatIfVisit: 'On Mars, you\'d see red dirt everywhere and amazing giant mountains! You\'d need a spacesuit because the air is too thin, and it\'s much colder than Earth!',
    comparison: 'Mars is about half the size of Earth - like a smaller sibling!'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    nickname: 'The Giant Planet',
    type: 'Gas Giant',
    distanceFromSun: 'Fifth from the Sun',
    diameter: 'HUGE! 11 times bigger than Earth',
    orbitalPeriod: '12 Earth years',
    description: 'The largest planet, a gas giant with a Great Red Spot storm larger than Earth.',
    kidFriendlyDescription: 'Jupiter is the BIGGEST planet in our solar system! It\'s like a giant ball of gas with colorful stripes and a huge storm that\'s been going for hundreds of years!',
    composition: ['Hydrogen', 'Helium', 'Metallic core'],
    moons: 95,
    gradient: 'from-yellow-600 via-orange-400 to-red-500',
    size: 'w-32 h-32',
    facts: ['Could fit all other planets inside it', 'Great Red Spot is a storm lasting 400+ years'],
    kidFacts: ['Jupiter is SO big that all other planets could fit inside it!', 'The Great Red Spot is a giant storm bigger than Earth!', 'Jupiter has 95 moons - that\'s a lot of friends!'],
    emoji: '♃',
    whatIfVisit: 'Jupiter is made of gas, so you couldn\'t land on it - you\'d fall right through! You\'d see amazing colorful clouds and the biggest storm in the solar system!',
    comparison: 'Jupiter is like 11 Earths put together - it\'s MASSIVE!'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    nickname: 'The Ring Planet',
    type: 'Gas Giant',
    distanceFromSun: 'Sixth from the Sun',
    diameter: '9 times bigger than Earth',
    orbitalPeriod: '29 Earth years',
    description: 'Famous for its spectacular ring system, Saturn is less dense than water.',
    kidFriendlyDescription: 'Saturn is the most beautiful planet with amazing rings around it! It\'s so light that if you had a bathtub big enough, Saturn would float in water!',
    composition: ['Hydrogen', 'Helium', 'Ice rings'],
    moons: 146,
    gradient: 'from-yellow-300 via-amber-400 to-yellow-600',
    size: 'w-28 h-28',
    facts: ['Less dense than water - it would float!', 'Rings are made of ice particles and rocky debris'],
    kidFacts: ['Saturn has the most beautiful rings made of ice and rocks!', 'It\'s so light it would float in water like a beach ball!', 'Saturn has 146 moons - the most in our solar system!'],
    emoji: '♄',
    whatIfVisit: 'Saturn\'s rings would look like a giant rainbow bridge around the planet! The rings are made of billions of ice chunks, some as small as snowballs!',
    comparison: 'Saturn is 9 times bigger than Earth but much lighter!'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    nickname: 'The Sideways Planet',
    type: 'Ice Giant',
    distanceFromSun: 'Seventh from the Sun',
    diameter: '4 times bigger than Earth',
    orbitalPeriod: '84 Earth years',
    description: 'An ice giant that rotates on its side, with faint rings and extreme seasons.',
    kidFriendlyDescription: 'Uranus is the funny planet that rolls on its side like a ball! It\'s made of ice and has very long seasons that last 21 years each!',
    composition: ['Water', 'Methane', 'Ammonia ices'],
    moons: 27,
    gradient: 'from-cyan-300 via-blue-400 to-teal-500',
    size: 'w-24 h-24',
    facts: ['Rotates on its side at 98° tilt', 'Coldest planetary atmosphere in solar system'],
    kidFacts: ['Uranus rolls on its side like a bowling ball!', 'Each season lasts 21 years - imagine winter for 21 years!', 'It\'s the coldest planet and looks blue-green!'],
    emoji: '♅',
    whatIfVisit: 'On Uranus, you\'d see a blue-green world where the Sun rises and sets from the side! It\'s super cold and windy, and you\'d need a very warm spacesuit!',
    comparison: 'Uranus is 4 times bigger than Earth and rolls sideways!'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    nickname: 'The Windy Planet',
    type: 'Ice Giant',
    distanceFromSun: 'Eighth and farthest from the Sun',
    diameter: '4 times bigger than Earth',
    orbitalPeriod: '165 Earth years',
    description: 'The windiest planet with supersonic winds and a deep blue color from methane.',
    kidFriendlyDescription: 'Neptune is the windiest planet in our solar system! It\'s beautiful and blue, but it has the strongest winds that blow faster than race cars!',
    composition: ['Water', 'Methane', 'Ammonia ices'],
    moons: 16,
    gradient: 'from-blue-500 via-indigo-600 to-blue-700',
    size: 'w-24 h-24',
    facts: ['Fastest winds up to 2,100 km/h', 'Takes 165 years to orbit the Sun once'],
    kidFacts: ['Neptune has the fastest winds - faster than any race car!', 'It takes 165 years to go around the Sun once!', 'It\'s beautiful and blue like a sapphire gem!'],
    emoji: '♆',
    whatIfVisit: 'Neptune would be like visiting a beautiful blue world with the strongest winds in the solar system! The winds blow so fast they could lift up cars!',
    comparison: 'Neptune is 4 times bigger than Earth and the farthest planet!'
  },
  {
    id: 'pluto',
    name: 'Pluto',
    nickname: 'The Little Friend',
    type: 'Dwarf Planet',
    distanceFromSun: 'Very, very far from the Sun!',
    diameter: 'Much smaller than Earth',
    orbitalPeriod: '248 Earth years',
    description: 'Once considered the 9th planet, Pluto is now classified as a dwarf planet in the Kuiper Belt.',
    kidFriendlyDescription: 'Pluto used to be called the 9th planet, but now it\'s a special "dwarf planet"! It\'s very small and lives really far away from the Sun with lots of other space rocks.',
    composition: ['Ice', 'Rock', 'Frozen nitrogen'],
    moons: 5,
    gradient: 'from-gray-300 via-brown-400 to-gray-500',
    size: 'w-12 h-12',
    facts: ['Reclassified as dwarf planet in 2006', 'Has a heart-shaped feature on its surface'],
    kidFacts: ['Pluto was discovered by a 24-year-old woman named Clyde Tombaugh!', 'It has a big heart-shaped spot that we can see from space!', 'Pluto is smaller than our Moon!', 'It takes 248 years to go around the Sun - that\'s a really long year!'],
    emoji: '🪐',
    whatIfVisit: 'Visiting Pluto would be like going to a frozen, faraway world! It\'s so cold that the air would be frozen solid, and the Sun would look like just a bright star in the sky!',
    comparison: 'Pluto is much smaller than Earth - it\'s even smaller than our Moon!'
  }
];

const Planets = () => {
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [currentTab, setCurrentTab] = useState('planets');

  // Create a reference for the detailed view section
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleLearnMore = (planet: Planet, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event
    setSelectedPlanet(planet);

    // Wait for the state to update and the component to render
    setTimeout(() => {
      // Scroll to the details section
      detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-foreground overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Home Button */}
      <div className="fixed top-4 left-4 z-20">
        <Button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-lg flex items-center gap-2 px-4 py-2"
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </Button>
      </div>

      {/* Space Guide removed */}

      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="text-center mb-6 md:mb-8 px-2">
          <div className="text-4xl md:text-6xl mb-3 md:mb-4">🚀</div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Space Adventure Time!
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed px-2">
            Hi Space Explorer! Let's discover 8 amazing planets plus our special friend Pluto, take fun quizzes, and compare planet sizes together!
          </p>
        </div>

        {/* Navigation Tabs - Mobile Responsive */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 bg-black/30 backdrop-blur-sm h-auto p-1">
            <TabsTrigger
              value="planets"
              className="text-xs sm:text-sm md:text-lg font-bold py-2 px-1 sm:px-2 md:px-4 flex flex-col sm:flex-row items-center gap-1 h-auto min-h-[3rem] sm:min-h-[2.5rem]"
            >
              <span className="text-base sm:text-lg md:text-xl">🪐</span>
              <span className="text-center leading-tight">
                <span className="block sm:hidden">Explore</span>
                <span className="hidden sm:inline">Explore Planets</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="quiz"
              className="text-xs sm:text-sm md:text-lg font-bold py-2 px-1 sm:px-2 md:px-4 flex flex-col sm:flex-row items-center gap-1 h-auto min-h-[3rem] sm:min-h-[2.5rem]"
            >
              <span className="text-base sm:text-lg md:text-xl">🧠</span>
              <span className="text-center leading-tight">
                <span className="block sm:hidden">Quiz</span>
                <span className="hidden sm:inline">Space Quiz</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="compare"
              className="text-xs sm:text-sm md:text-lg font-bold py-2 px-1 sm:px-2 md:px-4 flex flex-col sm:flex-row items-center gap-1 h-auto min-h-[3rem] sm:min-h-[2.5rem]"
            >
              <span className="text-base sm:text-lg md:text-xl">📏</span>
              <span className="text-center leading-tight">
                <span className="block sm:hidden">Compare</span>
                <span className="hidden sm:inline">Size Compare</span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planets" className="space-y-8">

            {/* Mobile-Friendly Solar System Overview */}
            <div className="p-6 rounded-3xl bg-black/20 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl text-white font-bold text-center mb-6">Our Solar System</h2>

              {/* Sun */}
              <div className="flex justify-center mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto shadow-lg shadow-yellow-500/50 animate-pulse" />
                  <span className="text-lg text-yellow-300 font-bold block mt-2">☀️ Sun</span>
                </div>
              </div>

              {/* The 8 Main Planets */}
              <div className="pb-4">
                <h3 className="text-xl text-white font-bold text-center mb-4">The 8 Main Planets</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-4">
                  {/* Show only the 8 main planets (not Pluto) */}
                  {planets.filter(planet => planet.id !== 'pluto').map((planet) => (
                    <div key={planet.id} className="flex flex-col items-center">
                      {/* Planet name and description above the planet */}
                      <span className="text-sm sm:text-base text-white font-medium mb-1 text-center">
                        {planet.emoji} {planet.name}
                      </span>
                      <span className="text-xs text-yellow-300 mb-2 text-center h-8 overflow-hidden">
                        {planet.nickname}
                      </span>

                      {/* Planet image - real images */}
                      <img
                        src={`/images/planets/${planet.id}.svg`}
                        alt={planet.name}
                        className="w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110"
                      />

                      {/* Learn More button - smaller on mobile */}
                      <Button
                        onClick={(e) => handleLearnMore(planet, e)}
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-2 py-0 text-xs rounded-full mt-2"
                      >
                        Learn More!
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Section for Pluto */}
              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-300/30">
                <h3 className="text-xl text-white font-bold text-center mb-4">🌟 Special Friend: Pluto! 🌟</h3>
                <p className="text-sm text-center text-blue-200 mb-4 px-2">
                  Pluto used to be called the 9th planet, but now it's a special "dwarf planet"! Let's learn about our little space friend!
                </p>

                <div className="flex justify-center">
                  {planets.filter(planet => planet.id === 'pluto').map((planet) => (
                    <div key={planet.id} className="flex flex-col items-center">
                      <span className="text-sm sm:text-base text-white font-medium mb-1 text-center">
                        {planet.emoji} {planet.name}
                      </span>
                      <span className="text-xs text-yellow-300 mb-2 text-center">
                        {planet.nickname}
                      </span>

                      <img
                        src={`/images/planets/${planet.id}.svg`}
                        alt={planet.name}
                        className="w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110"
                      />

                      <Button
                        onClick={(e) => handleLearnMore(planet, e)}
                        size="sm"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-2 py-0 text-xs rounded-full mt-2"
                      >
                        Learn About Pluto!
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Planet View */}
            {selectedPlanet && (
              <Card ref={detailsRef} className="max-w-5xl mx-auto bg-black/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center gap-6">
                    <img
                      src={`/images/planets/${selectedPlanet.id}.svg`}
                      alt={selectedPlanet.name}
                      className="w-32 h-32 animate-pulse"
                    />
                    <div className="flex-1">
                      <div className="text-5xl mb-2">{selectedPlanet.emoji}</div>
                      <CardTitle className="text-4xl text-white mb-2">{selectedPlanet.name}</CardTitle>
                      <CardDescription className="text-xl text-yellow-300 font-bold">{selectedPlanet.nickname}</CardDescription>
                      <div className="mt-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm inline-block">{selectedPlanet.type}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-white/10">
                    <p className="text-xl leading-relaxed text-white">{selectedPlanet.kidFriendlyDescription}</p>
                  </div>

                  {/* Special explanation for Pluto */}
                  {selectedPlanet.id === 'pluto' && (
                    <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-2xl p-6 border border-pink-300/30">
                      <h3 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                        💫 Why is Pluto Special?
                      </h3>
                      <div className="space-y-4 text-white text-lg leading-relaxed">
                        <p>
                          <strong>🤔 Why isn't Pluto a planet anymore?</strong><br />
                          A long time ago, scientists thought Pluto was the 9th planet. But then they learned more about space and found lots of other small objects like Pluto! So in 2006, they made new rules about what makes something a "planet."
                        </p>
                        <p>
                          <strong>📏 The Three Planet Rules:</strong><br />
                          1. It must go around the Sun ✅ (Pluto does this!)<br />
                          2. It must be round like a ball ✅ (Pluto is round!)<br />
                          3. It must be the biggest thing in its space neighborhood ❌ (Pluto shares its space with lots of other rocks)
                        </p>
                        <p>
                          <strong>🌟 Pluto is still amazing!</strong><br />
                          Even though Pluto isn't called a "planet" anymore, it's still super cool! It's now called a "dwarf planet" and it's still part of our solar system family. Many people still love Pluto and think it's special!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-black/30 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                          📊 Cool Facts About {selectedPlanet.name}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-blue-200 font-medium">Distance from Sun:</span>
                            <p className="text-white text-lg">{selectedPlanet.distanceFromSun}</p>
                          </div>
                          <div>
                            <span className="text-blue-200 font-medium">Size:</span>
                            <p className="text-white text-lg">{selectedPlanet.diameter}</p>
                          </div>
                          <div>
                            <span className="text-blue-200 font-medium">One Year Takes:</span>
                            <p className="text-white text-lg">{selectedPlanet.orbitalPeriod}</p>
                          </div>
                          <div>
                            <span className="text-blue-200 font-medium">Number of Moons:</span>
                            <p className="text-white text-lg">{selectedPlanet.moons} {selectedPlanet.moons === 0 ? '(No moons!)' : selectedPlanet.moons === 1 ? '(Just like us!)' : '(Wow, so many!)'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/30 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
                          📏 Size Comparison
                        </h3>
                        <p className="text-white text-lg leading-relaxed">{selectedPlanet.comparison}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-black/30 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                          🚀 What if you visited {selectedPlanet.name}?
                        </h3>
                        <p className="text-white text-lg leading-relaxed">{selectedPlanet.whatIfVisit}</p>
                      </div>

                      <div className="bg-black/30 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-2">
                          ⭐ Amazing Facts!
                        </h3>
                        <ul className="space-y-3">
                          {selectedPlanet.kidFacts.map((fact, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-yellow-400 text-xl mt-1">•</span>
                              <span className="text-white text-lg leading-relaxed">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={() => setSelectedPlanet(null)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-bold rounded-full"
                    >
                      🌟 Explore More Planets! 🌟
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quiz">
            <div className="max-w-4xl mx-auto">
              <PlanetQuiz />
            </div>
          </TabsContent>

          <TabsContent value="compare">
            <PlanetSizeComparison />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Planets;