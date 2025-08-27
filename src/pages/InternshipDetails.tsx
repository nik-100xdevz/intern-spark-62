import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle, 
  Award,
  Building,
  Mail,
  Phone
} from "lucide-react";

// This would typically come from an API call using the internship ID
const getInternshipDetails = (id: string) => {
  const internships = {
    "1": {
      id: "1",
      title: "Frontend Development Intern",
      department: "Technology",
      location: "Mumbai, India",
      duration: "3 months",
      type: "Full-time",
      description: "Join our frontend team and work on cutting-edge React applications. You'll collaborate with senior developers to build user interfaces for our web applications using modern technologies and best practices.",
      requirements: [
        "Basic knowledge of HTML, CSS, JavaScript",
        "Familiarity with React framework and hooks",
        "Understanding of responsive design principles",
        "Git version control basics",
        "Knowledge of TypeScript is a plus",
        "Experience with Tailwind CSS preferred"
      ],
      responsibilities: [
        "Develop and maintain React-based web applications",
        "Collaborate with the design team to implement UI/UX designs",
        "Write clean, maintainable, and well-documented code",
        "Participate in code reviews and team meetings",
        "Learn and implement best practices for frontend development",
        "Work on real client projects with measurable impact"
      ],
      benefits: [
        "Certificate of Completion",
        "Monthly Stipend of ₹25,000",
        "One-on-one Mentorship",
        "Letter of Recommendation",
        "Portfolio Development",
        "Industry Networking"
      ],
      applicationDeadline: "December 30, 2024",
      spotsAvailable: 3,
      totalSpots: 5,
      company: {
        name: "InternHub Technologies",
        description: "A leading technology company specializing in modern web applications and digital solutions.",
        website: "https://internhub.com",
        email: "internships@internhub.com",
        phone: "+91 98765 43210"
      },
      mentor: {
        name: "Rajesh Kumar",
        title: "Senior Frontend Developer",
        experience: "8+ years in React development"
      }
    }
    // Add more internships as needed
  };
  
  return internships[id as keyof typeof internships];
};

const InternshipDetails = () => {
  const { id } = useParams<{ id: string }>();
  const internship = getInternshipDetails(id || "");

  if (!internship) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Internship Not Found</h1>
            <p className="text-muted-foreground mb-6">The internship you're looking for doesn't exist.</p>
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const spotsLeft = internship.totalSpots - internship.spotsAvailable;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Internships
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="bg-gradient-card rounded-lg p-8 border border-border/50 shadow-medium mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{internship.type}</Badge>
                  <Badge variant={spotsLeft < 2 ? "destructive" : "secondary"}>
                    {spotsLeft} of {internship.totalSpots} spots left
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold">{internship.title}</h1>
                <p className="text-xl text-primary font-medium">{internship.department}</p>
                
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{internship.company.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {internship.applicationDeadline}</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-3">
                <Button asChild variant="hero" size="lg" className="w-full lg:w-auto">
                  <Link to={`/internship/${internship.id}/apply`}>
                    Apply Now
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  Quick application process
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Internship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {internship.description}
                  </p>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {internship.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {internship.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {internship.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mentor Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Mentor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">{internship.mentor.name}</h4>
                    <p className="text-sm text-primary">{internship.mentor.title}</p>
                    <p className="text-sm text-muted-foreground">{internship.mentor.experience}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>About the Company</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {internship.company.description}
                  </p>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4" />
                      <span>{internship.company.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{internship.company.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Apply Button (Sticky on mobile) */}
              <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
                <Button asChild variant="hero" size="lg" className="w-full shadow-strong">
                  <Link to={`/internship/${internship.id}/apply`}>
                    Apply Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;