import React from 'react';
import { CarSpec } from '../types/car';
import { Car, Fuel, Zap, Gauge, Cog, Ruler, Users } from 'lucide-react';

interface CarDetailsProps {
  specs: CarSpec;
  isLoading: boolean;
}

const CarDetails: React.FC<CarDetailsProps> = ({ specs, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const {
    make,
    model,
    year,
    fuelType,
    transmission,
    engine,
    horsepower,
    torque,
    drivetrain,
    cylinders,
    displacement,
    bodyStyle,
    mpgCity,
    mpgHighway,
    doors
  } = specs;

  const getBadgeColor = (category: string) => {
    switch(category) {
      case 'Gasoline':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'Diesel':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
      case 'Electric':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Hybrid':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100';
      case 'AWD':
      case '4WD':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'FWD':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'RWD':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getDetailItem = (
    icon: React.ReactNode,
    label: string,
    value: string | number | undefined,
    isBadge: boolean = false
  ) => {
    if (!value) return null;
    
    return (
      <div className="flex items-center space-x-3">
        <div className="text-gray-500 dark:text-gray-400">{icon}</div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          {isBadge ? (
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(value.toString())}`}>
              {value}
            </span>
          ) : (
            <p className="font-medium text-gray-900 dark:text-gray-100">{value}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {make} {model} {year && `(${year})`}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getDetailItem(<Car size={18} />, 'Body Style', bodyStyle, true)}
        {getDetailItem(<Fuel size={18} />, 'Fuel Type', fuelType, true)}
        {getDetailItem(<Cog size={18} />, 'Transmission', transmission)}
        {getDetailItem(<Zap size={18} />, 'Horsepower', horsepower ? `${horsepower} hp` : undefined)}
        {getDetailItem(<Gauge size={18} />, 'Engine', engine)}
        {getDetailItem(<Gauge size={18} />, 'Displacement', displacement ? `${displacement}L` : undefined)}
        {getDetailItem(<Cog size={18} />, 'Drivetrain', drivetrain, true)}
        {getDetailItem(<Cog size={18} />, 'Cylinders', cylinders)}
        {getDetailItem(<Zap size={18} />, 'Torque', torque)}
        {getDetailItem(<Ruler size={18} />, 'MPG City', mpgCity)}
        {getDetailItem(<Ruler size={18} />, 'MPG Highway', mpgHighway)}
        {getDetailItem(<Users size={18} />, 'Doors', doors)}
      </div>
    </div>
  );
};

export default CarDetails;