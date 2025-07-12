import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title?: string;
  className?: string;
}

export function ImageGallery({ images, title, className = "" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`aspect-video bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <div className="w-12 h-12 mx-auto mb-2 bg-muted-foreground/20 rounded-full flex items-center justify-center">
            <ZoomIn className="w-6 h-6" />
          </div>
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const openGallery = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className={`space-y-2 ${className}`}>
        {/* Main Image */}
        <div className="aspect-video bg-muted rounded-lg relative overflow-hidden group">
          <img
            src={images[0]}
            alt={title || "Tool image"}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => openGallery(0)}
                className="bg-white/90 hover:bg-white"
              >
                View {images.length} Photos
              </Button>
            </div>
          )}
          {images.length === 1 && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => openGallery(0)}
                className="bg-white/90 hover:bg-white"
              >
                <ZoomIn className="w-4 h-4 mr-1" />
                View
              </Button>
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => openGallery(index)}
              >
                <img
                  src={image}
                  alt={`${title || 'Tool'} image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {images.length > 4 && (
              <div
                className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
                onClick={() => openGallery(4)}
              >
                <img
                  src={images[4]}
                  alt={`${title || 'Tool'} image 5`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold">+{images.length - 4}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full Screen Gallery */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-0">
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <div className="flex items-center justify-center min-h-[60vh]">
              {selectedImage !== null && (
                <img
                  src={images[selectedImage]}
                  alt={`${title || 'Tool'} image ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {selectedImage !== null ? selectedImage + 1 : 1} of {images.length}
              </div>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === index ? 'border-white' : 'border-transparent hover:border-white/50'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 