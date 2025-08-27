import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import softwareImage from "@/assets/internship-software.jpg";
import marketingImage from "@/assets/internship-marketing.jpg";
import dataImage from "@/assets/internship-data.jpg";
import designImage from "@/assets/internship-design.jpg";

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
  image?: string;
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

  const getInternshipImage = (department: string) => {
    switch (department.toLowerCase()) {
      case "software development":
        return softwareImage;
      case "marketing":
        return marketingImage;
      case "data science":
        return dataImage;
      case "design":
        return designImage;
      default:
        return softwareImage;
    }
  };

  const spotsLeft = internship.totalSpots - internship.spotsAvailable;

  return (
    <Card className="group h-full bg-gradient-card border border-border/50 hover:shadow-strong hover:border-primary/20 transition-all duration-500 hover:scale-[1.02] animate-fade-in overflow-hidden">
      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={internship.image || getInternshipImage(internship.department)}
          alt={`${internship.title} internship`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge 
          variant={getTypeVariant(internship.type)}
          className="absolute top-4 right-4 backdrop-blur-sm bg-background/80 transition-transform duration-300 group-hover:scale-105"
        >
          {internship.type}
        </Badge>
      </div>

      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {internship.title}
          </h3>
          <p className="text-primary font-medium">{internship.department}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 transition-transform duration-200 hover:translate-x-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center space-x-2 transition-transform duration-200 hover:translate-x-1">
            <Clock className="h-4 w-4 text-primary" />
            <span>{internship.duration}</span>
          </div>
          <div className="flex items-center space-x-2 transition-transform duration-200 hover:translate-x-1">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Deadline: {internship.applicationDeadline}</span>
          </div>
          <div className="flex items-center space-x-2 transition-transform duration-200 hover:translate-x-1">
            <Users className="h-4 w-4 text-primary" />
            <span>{spotsLeft} of {internship.totalSpots} spots left</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground">
          {internship.description}
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2 transition-colors duration-300 group-hover:text-primary">Key Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {internship.requirements.slice(0, 3).map((req, index) => (
                <li key={index} className="flex items-start space-x-2 transition-transform duration-200 hover:translate-x-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2 transition-colors duration-300 group-hover:text-primary">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {internship.benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <div className="flex gap-3 w-full">
          <Button asChild variant="outline" className="flex-1 transition-all duration-300 hover:scale-105 hover:shadow-medium">
            <Link to={`/internship/${internship.id}`}>
              View Details
            </Link>
          </Button>
          <Button asChild variant="hero" className="flex-1 transition-all duration-300 hover:scale-105 hover:shadow-primary group-hover:animate-pulse">
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