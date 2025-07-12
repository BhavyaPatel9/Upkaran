import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { ImageGallery } from "@/components/ui/image-gallery";

interface Tool {
  id: string;
  title: string;
  description: string;
  price_per_day: number;
  security_deposit: number;
  images: string[];
  location: string;
  owner_name?: string;
  category?: {
    name: string;
  };
}

interface ToolCardProps {
  tool: Tool;
  onRent: (toolId: string) => void;
}

export const ToolCard = ({ tool, onRent }: ToolCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative">
          <ImageGallery 
            images={tool.images || []} 
            title={tool.title}
            className="rounded-t-lg"
          />
          {tool.category && (
            <Badge className="absolute top-2 left-2 z-10" variant="secondary">
              {tool.category.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{tool.title}</h3>
        {tool.owner_name && (
          <div className="text-xs text-muted-foreground mb-2">Owner: {tool.owner_name}</div>
        )}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {tool.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {tool.location}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              ₹{tool.price_per_day}/day
            </div>
            {tool.security_deposit > 0 && (
              <div className="text-sm text-muted-foreground">
                Deposit: ₹{tool.security_deposit}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onRent(tool.id)} 
          className="w-full"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Rent Now
        </Button>
      </CardFooter>
    </Card>
  );
};