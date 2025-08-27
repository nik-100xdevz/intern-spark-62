import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Upload, CheckCircle, AlertCircle, User, FileText, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InternshipApplication = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    year: "",
    resume: null as File | null,
    portfolioUrl: "",
    coverLetter: "",
    availability: "",
    experience: "",
    motivation: ""
  });

  // This would typically come from an API call
  const internshipTitle = "Frontend Development Intern";

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return agreedToTerms;
      case 2:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 3:
        return formData.college && formData.degree && formData.year && formData.resume;
      case 4:
        return formData.coverLetter && formData.motivation;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all the required information before proceeding.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const submitApplication = async () => {
    if (!validateStep(4)) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all the required information before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you within 5-7 business days.",
      });
      
      navigate("/application-success");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
  };

  const steps = [
    { number: 1, title: "Terms & Conditions", icon: FileText },
    { number: 2, title: "Personal Information", icon: User },
    { number: 3, title: "Academic Details", icon: FileText },
    { number: 4, title: "Application Details", icon: Mail }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
              <div className="bg-muted/50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-3 text-sm">
                <p><strong>Internship Program Terms:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• This is an educational internship program designed to provide practical experience</li>
                  <li>• Duration: 3 months with possibility of extension based on performance</li>
                  <li>• Commitment: Minimum 25 hours per week during business hours</li>
                  <li>• Performance evaluation will be conducted monthly</li>
                  <li>• Certificate will be provided upon successful completion</li>
                </ul>
                
                <p><strong>Responsibilities:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Maintain confidentiality of company information</li>
                  <li>• Complete assigned projects within deadlines</li>
                  <li>• Attend all scheduled meetings and training sessions</li>
                  <li>• Follow company policies and guidelines</li>
                </ul>
                
                <p><strong>Benefits:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Monthly stipend as mentioned in the internship details</li>
                  <li>• Professional mentorship and career guidance</li>
                  <li>• Certificate of completion and letter of recommendation</li>
                  <li>• Networking opportunities within the industry</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions of this internship program
              </Label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Academic Details</h3>
            
            <div>
              <Label htmlFor="college">College/University *</Label>
              <Input
                id="college"
                value={formData.college}
                onChange={(e) => handleInputChange("college", e.target.value)}
                placeholder="Enter your college or university name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="degree">Degree/Course *</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => handleInputChange("degree", e.target.value)}
                  placeholder="e.g., B.Tech Computer Science"
                />
              </div>
              
              <div>
                <Label htmlFor="year">Current Year *</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="final">Final Year</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="resume">Resume/CV * (PDF, max 5MB)</Label>
              <div className="mt-2">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {formData.resume && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    {formData.resume.name}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="portfolioUrl">Portfolio/LinkedIn URL (Optional)</Label>
              <Input
                id="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                placeholder="https://yourportfolio.com or LinkedIn profile"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Application Details</h3>
            
            <div>
              <Label htmlFor="availability">When can you start? *</Label>
              <Select value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="1week">Within 1 week</SelectItem>
                  <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                  <SelectItem value="1month">Within 1 month</SelectItem>
                  <SelectItem value="specific">Specific date (mention in cover letter)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="experience">Relevant Experience (Optional)</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Describe any relevant projects, internships, or experience..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                placeholder="Tell us about yourself, your skills, and relevant experience..."
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="motivation">Why do you want this internship? *</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                placeholder="What motivates you to apply for this internship? How does it align with your career goals?"
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="gap-2">
              <Link to={`/internship/${id}`}>
                <ArrowLeft className="h-4 w-4" />
                Back to Details
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Apply for Internship</h1>
            <p className="text-xl text-primary font-medium">{internshipTitle}</p>
            <Badge variant="outline" className="mt-2">Application ID: #{id}</Badge>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.number 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-border text-muted-foreground'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-0.5 mx-4 transition-colors ${
                      currentStep > step.number ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <div key={step.number} className="text-xs text-center min-w-0 flex-1">
                  <p className={currentStep >= step.number ? 'text-primary font-medium' : 'text-muted-foreground'}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < steps.length ? (
              <Button 
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                variant="hero"
              >
                Next Step
              </Button>
            ) : (
              <Button 
                onClick={submitApplication}
                disabled={!validateStep(currentStep)}
                variant="success"
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Submit Application
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{" "}
              <a href="mailto:internships@internhub.com" className="text-primary hover:underline">
                internships@internhub.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipApplication;