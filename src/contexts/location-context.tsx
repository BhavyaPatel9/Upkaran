import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import LocationService, { Location } from '@/lib/location-service';

interface LocationContextType {
  currentLocation: Location | null;
  setLocation: (location: Location | null) => void;
  isLoading: boolean;
  error: string | null;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocation = async () => {
      const locationService = LocationService.getInstance();
      const location = await locationService.getCurrentLocation();
      setCurrentLocation(location);
    };
    loadLocation();
  }, []);

  const setLocation = (location: Location | null) => {
    setCurrentLocation(location);
    setError(null);
  };

  const clearLocation = () => {
    const locationService = LocationService.getInstance();
    locationService.clearLocation();
    setCurrentLocation(null);
    setError(null);
  };

  const value: LocationContextType = {
    currentLocation,
    setLocation,
    isLoading,
    error,
    clearLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}; 