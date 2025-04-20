import React from 'react';
import { Lightbulb } from 'lucide-react';

interface FunFactBoxProps {
  make: string;
}

const FunFactBox: React.FC<FunFactBoxProps> = ({ make }) => {
  const [fact, setFact] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!make) return;
    
    setIsLoading(true);
    // Instead of calling an API, we'll use a predefined list of facts
    const carFacts = getCarFacts(make);
    
    // Simulate API call
    setTimeout(() => {
      const randomFact = carFacts[Math.floor(Math.random() * carFacts.length)];
      setFact(randomFact);
      setIsLoading(false);
    }, 1000);
  }, [make]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!fact) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb size={20} className="text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fun Fact</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic">{fact}</p>
    </div>
  );
};

// Helper function to get car facts based on make
const getCarFacts = (make: string): string[] => {
  const generalFacts = [
    "The average car has about 30,000 parts, counting every part down to the smallest screws.",
    "The first car accident occurred in 1891, in Ohio.",
    "The average American spends about 600 hours per year in their car.",
    "The world's first speeding ticket was issued in 1902 at 45 mph!",
    "The first cars did not have steering wheels. Drivers steered with a lever."
  ];
  
  const makeSpecificFacts: Record<string, string[]> = {
    "Toyota": [
      "Toyota produces more than 10 million vehicles per year.",
      "The Toyota Corolla is the best-selling car model of all time.",
      "Toyota was originally founded as a loom manufacturing company.",
      "The Toyota Land Cruiser is the longest-running car series in Toyota's history."
    ],
    "Ford": [
      "Henry Ford did not invent the automobile or the assembly line, but he was the first to manufacture cars using assembly lines.",
      "The Ford F-Series has been America's best-selling vehicle for over 40 years.",
      "In 1914, Ford introduced the $5 workday, which was double the average wage at the time.",
      "The Model T came in any color the customer wanted, as long as it was black."
    ],
    "Honda": [
      "Honda began as a motorcycle manufacturer before expanding to cars.",
      "The Honda Accord was the first Japanese car manufactured in the United States.",
      "Honda's ASIMO is one of the world's most advanced humanoid robots.",
      "The founder, Soichiro Honda, was a race car driver before starting the company."
    ],
    "BMW": [
      "BMW started as an aircraft engine manufacturer in 1916.",
      "The BMW logo represents a spinning airplane propeller, reflecting the company's aviation roots.",
      "BMW's headquarters in Munich is designed to look like four engine cylinders.",
      "BMW stands for Bayerische Motoren Werke (Bavarian Motor Works)."
    ],
    "Mercedes-Benz": [
      "Mercedes-Benz invented the first petrol-powered car in 1886.",
      "The three-pointed star in the Mercedes-Benz logo represents domination of land, sea, and air.",
      "Mercedes-Benz introduced many safety innovations, including the crumple zone and ABS brakes.",
      "The brand name came from Mercedes Jellinek, the daughter of one of the company's important clients."
    ],
    "Chevrolet": [
      "Chevrolet was co-founded by Louis Chevrolet, a Swiss race car driver.",
      "The Chevrolet bowtie logo was apparently inspired by wallpaper in a Paris hotel.",
      "The 1963 Corvette Sting Ray is one of the most iconic American cars ever made.",
      "Chevrolet produced its 100 millionth vehicle in 1967, only 55 years after its founding."
    ]
  };
  
  // Try to find make-specific facts first
  const foundMake = Object.keys(makeSpecificFacts).find(
    key => make.toLowerCase().includes(key.toLowerCase())
  );
  
  // Return make-specific facts or general facts if not found
  return foundMake ? makeSpecificFacts[foundMake] : generalFacts;
};

export default FunFactBox;