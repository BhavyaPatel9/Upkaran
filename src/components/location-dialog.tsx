import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Navigation, Loader2, CheckCircle, XCircle, Edit3, Save } from "lucide-react";
import LocationService, { Location } from "@/lib/location-service";

interface LocationDialogProps {
  children: React.ReactNode;
  onLocationChange?: (location: Location) => void;
}

export const LocationDialog = ({ children, onLocationChange }: LocationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Address fields
  const [addressFields, setAddressFields] = useState({
    houseNumber: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const locationService = LocationService.getInstance();

  useEffect(() => {
    loadCurrentLocation();
  }, []);

  const loadCurrentLocation = async () => {
    const location = await locationService.getCurrentLocation();
    if (location) {
      setCurrentLocation(location);
      // Parse address into fields if available
      if (location.address) {
        parseAddressIntoFields(location.address);
      }
    }
  };

  const parseAddressIntoFields = (address: string) => {
    // Simple parsing - you can enhance this with more sophisticated parsing
    const parts = address.split(',').map(part => part.trim());
    
    // Try to extract different parts
    const fields = {
      houseNumber: parts[0] || "",
      area: parts[1] || "",
      city: parts[2] || "",
      state: parts[3] || "",
      pincode: parts[4] || "",
      country: parts[5] || "India",
    };
    
    setAddressFields(fields);
  };

  const buildAddressFromFields = () => {
    const parts = [
      addressFields.houseNumber,
      addressFields.area,
      addressFields.city,
      addressFields.state,
      addressFields.pincode,
      addressFields.country,
    ].filter(part => part.trim());
    
    return parts.join(', ');
  };

  const handleGPSLocation = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const location = await locationService.detectLocation();
      if (location) {
        const address = await locationService.getAddressFromCoordinates(
          location.latitude,
          location.longitude
        );
        const locationWithAddress = { ...location, address };
        setCurrentLocation(locationWithAddress);
        parseAddressIntoFields(address);
        setSuccess("Location detected successfully!");
        onLocationChange?.(locationWithAddress);
      }
    } catch (err) {
      setError("Failed to detect location. Please try again or enter manually.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualLocation = async () => {
    if (!addressFields.city.trim() || !addressFields.state.trim()) {
      setError("Please enter at least city and state");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const fullAddress = buildAddressFromFields();
      const location = await locationService.getCoordinatesFromAddress(fullAddress);
      if (location) {
        const locationWithAddress = { ...location, address: fullAddress };
        await locationService.setManualLocation(locationWithAddress);
        setCurrentLocation(locationWithAddress);
        setSuccess("Location set successfully!");
        onLocationChange?.(locationWithAddress);
      } else {
        // If geocoding fails, create a location with just the address
        const manualLocation: Location = {
          latitude: 0,
          longitude: 0,
          address: fullAddress,
        };
        await locationService.setManualLocation(manualLocation);
        setCurrentLocation(manualLocation);
        setSuccess("Location set successfully!");
        onLocationChange?.(manualLocation);
      }
    } catch (err) {
      setError("Failed to set location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLocation = () => {
    locationService.clearLocation();
    setCurrentLocation(null);
    setAddressFields({
      houseNumber: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
    setSuccess("Location cleared");
    onLocationChange?.({ latitude: 0, longitude: 0 });
  };

  const handleSaveAddress = async () => {
    if (!currentLocation) return;
    
    const fullAddress = buildAddressFromFields();
    const updatedLocation = {
      ...currentLocation,
      address: fullAddress,
    };
    
    await locationService.setManualLocation(updatedLocation);
    setCurrentLocation(updatedLocation);
    setIsEditing(false);
    setSuccess("Address updated successfully!");
    onLocationChange?.(updatedLocation);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Set Your Location
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Location Display */}
          {currentLocation && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-green-800">Current Location</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-green-700 hover:text-green-800"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {!isEditing ? (
                  <div className="space-y-2">
                    <p className="text-sm text-green-700">
                      {currentLocation.address || `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearLocation}
                        className="text-red-600 hover:text-red-700"
                      >
                        Clear Location
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="houseNumber" className="text-xs">House/Flat Number</Label>
                        <Input
                          id="houseNumber"
                          value={addressFields.houseNumber}
                          onChange={(e) => setAddressFields(prev => ({ ...prev, houseNumber: e.target.value }))}
                          placeholder="123, Flat 4A"
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="area" className="text-xs">Area/Locality</Label>
                        <Input
                          id="area"
                          value={addressFields.area}
                          onChange={(e) => setAddressFields(prev => ({ ...prev, area: e.target.value }))}
                          placeholder="Andheri West"
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="city" className="text-xs">City</Label>
                        <Input
                          id="city"
                          value={addressFields.city}
                          onChange={(e) => setAddressFields(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="Mumbai"
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-xs">State</Label>
                        <Input
                          id="state"
                          value={addressFields.state}
                          onChange={(e) => setAddressFields(prev => ({ ...prev, state: e.target.value }))}
                          placeholder="Maharashtra"
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="pincode" className="text-xs">Pincode</Label>
                        <Input
                          id="pincode"
                          value={addressFields.pincode}
                          onChange={(e) => setAddressFields(prev => ({ ...prev, pincode: e.target.value }))}
                          placeholder="400058"
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-xs">Country</Label>
                        <Input
                          id="country"
                          value={addressFields.country}
                          onChange={(e) => setAddressFields(prev => ({ ...prev, country: e.target.value }))}
                          placeholder="India"
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSaveAddress}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save Address
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* GPS Location */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Use GPS Location
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                onClick={handleGPSLocation}
                disabled={isLoading}
                className="w-full"
                variant="outline"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Detect My Location
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Manual Location */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Enter Address Manually</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="manualHouseNumber" className="text-xs">House/Flat Number</Label>
                    <Input
                      id="manualHouseNumber"
                      placeholder="123, Flat 4A"
                      value={addressFields.houseNumber}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, houseNumber: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manualArea" className="text-xs">Area/Locality</Label>
                    <Input
                      id="manualArea"
                      placeholder="Andheri West"
                      value={addressFields.area}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, area: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="manualCity" className="text-xs">City</Label>
                    <Input
                      id="manualCity"
                      placeholder="Mumbai"
                      value={addressFields.city}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, city: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manualState" className="text-xs">State</Label>
                    <Input
                      id="manualState"
                      placeholder="Maharashtra"
                      value={addressFields.state}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, state: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="manualPincode" className="text-xs">Pincode</Label>
                    <Input
                      id="manualPincode"
                      placeholder="400058"
                      value={addressFields.pincode}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, pincode: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manualCountry" className="text-xs">Country</Label>
                    <Input
                      id="manualCountry"
                      placeholder="India"
                      value={addressFields.country}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, country: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={handleManualLocation}
                disabled={isLoading || !addressFields.city.trim() || !addressFields.state.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting...
                  </>
                ) : (
                  "Set Location"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Status Messages */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 