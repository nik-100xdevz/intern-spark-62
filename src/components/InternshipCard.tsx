import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export interface Internship {
  id: string;
  title: string;
  department: string;
  location: string;
  duration: string;
  type: "Full-time" | "Part-time" | "Remote" | "Hybrid";
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  spotsAvailable: number;
  totalSpots: number;
}

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard = ({ internship }: InternshipCardProps) => {
  const getTypeVariant = (type: string) => {
    switch (type) {
      case "Full-time":
        return "default";
      case "Part-time":
        return "secondary";
      case "Remote":
        return "outline";
      case "Hybrid":
        return "secondary";
      default:
        return "default";
    }
  };

  const spotsLeft = internship.totalSpots - internship.spotsAvailable;

  return (
    <Card className="group h-full bg-gradient-card border border-border/50 hover:shadow-strong hover:border-primary/20 transition-all duration-300">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {internship.title}
            </h3>
            <p className="text-primary font-medium">{internship.department}</p>
          </div>
          <Badge variant={getTypeVariant(internship.type)}>
            {internship.type}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{internship.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {internship.applicationDeadline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{spotsLeft} of {internship.totalSpots} spots left</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {internship.description}
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">Key Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {internship.requirements.slice(0, 3).map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {internship.benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <div className="flex gap-3 w-full">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/internship/${internship.id}`}>
              View Details
            </Link>
          </Button>
          <Button asChild variant="hero" className="flex-1">
            <Link to={`/internship/${internship.id}/apply`}>
              Apply Now
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InternshipCard;