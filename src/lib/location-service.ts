export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

class LocationService {
  private static instance: LocationService;
  private currentLocation: Location | null = null;

  private constructor() {
    this.loadLocationFromStorage();
  }

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  private loadLocationFromStorage(): void {
    const stored = localStorage.getItem('userLocation');
    if (stored) {
      try {
        this.currentLocation = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading location from storage:', error);
      }
    }
  }

  private saveLocationToStorage(location: Location): void {
    localStorage.setItem('userLocation', JSON.stringify(location));
  }

  async getCurrentLocation(): Promise<Location | null> {
    return this.currentLocation;
  }

  async detectLocation(): Promise<Location | null> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          
          this.currentLocation = location;
          this.saveLocationToStorage(location);
          resolve(location);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }

  async setManualLocation(location: Location): Promise<void> {
    this.currentLocation = location;
    this.saveLocationToStorage(location);
  }

  async getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.display_name) {
        return data.display_name;
      }
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error('Error getting address:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  }

  async getCoordinatesFromAddress(address: string): Promise<Location | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const result = data[0];
        return {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          address: result.display_name,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting coordinates:', error);
      return null;
    }
  }

  clearLocation(): void {
    this.currentLocation = null;
    localStorage.removeItem('userLocation');
  }
}

export default LocationService; 