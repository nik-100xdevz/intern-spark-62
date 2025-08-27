import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import InternshipCard, { Internship } from "./InternshipCard";

// Sample data - in real app this would come from API
const sampleInternships: Internship[] = [
  {
    id: "1",
    title: "Frontend Development Intern",
    department: "Software Development",
    location: "Mumbai, India",
    duration: "3 months",
    type: "Full-time",
    description: "Join our frontend team and work on cutting-edge React applications. You'll collaborate with senior developers to build user interfaces for our web applications.",
    requirements: [
      "Basic knowledge of HTML, CSS, JavaScript",
      "Familiarity with React framework",
      "Understanding of responsive design",
      "Git version control basics"
    ],
    benefits: ["Certificate", "Stipend", "Mentorship", "LOR"],
    applicationDeadline: "Dec 30, 2024",
    spotsAvailable: 3,
    totalSpots: 5
  },
  {
    id: "2",
    title: "Digital Marketing Intern",
    department: "Marketing",
    location: "Delhi, India",
    duration: "6 weeks",
    type: "Remote",
    description: "Learn digital marketing strategies, content creation, and social media management. Work on real campaigns and analyze marketing metrics.",
    requirements: [
      "Interest in digital marketing",
      "Basic understanding of social media",
      "Good communication skills",
      "Creative mindset"
    ],
    benefits: ["Certificate", "Portfolio Projects", "Mentorship"],
    applicationDeadline: "Jan 15, 2025",
    spotsAvailable: 2,
    totalSpots: 4
  },
  {
    id: "3",
    title: "UI/UX Design Intern",
    department: "Design",
    location: "Bangalore, India",
    duration: "8 weeks",
    type: "Hybrid",
    description: "Create beautiful and functional user interfaces. Learn design thinking, prototyping, and user research methodologies.",
    requirements: [
      "Design portfolio or interest in design",
      "Basic knowledge of design tools",
      "Understanding of user experience",
      "Attention to detail"
    ],
    benefits: ["Certificate", "Design Portfolio", "Industry Exposure", "Networking"],
    applicationDeadline: "Jan 10, 2025",
    spotsAvailable: 1,
    totalSpots: 3
  },
  {
    id: "4",
    title: "Backend Development Intern",
    department: "Software Development",
    location: "Pune, India",
    duration: "4 months",
    type: "Full-time",
    description: "Work with our backend team on server-side applications, APIs, and database management. Learn modern backend technologies.",
    requirements: [
      "Programming knowledge (Python, Node.js, or Java)",
      "Database basics",
      "Understanding of APIs",
      "Problem-solving skills"
    ],
    benefits: ["Certificate", "Stipend", "Real Projects", "Tech Stack Training"],
    applicationDeadline: "Dec 25, 2024",
    spotsAvailable: 4,
    totalSpots: 6
  },
  {
    id: "5",
    title: "Data Science Intern",
    department: "Data Science",
    location: "Remote",
    duration: "6 weeks",
    type: "Part-time",
    description: "Work with data analytics, machine learning models, and data visualization. Learn data processing and analysis techniques.",
    requirements: [
      "Basic Python/R knowledge",
      "Statistics fundamentals",
      "Analytical thinking",
      "Interest in data science"
    ],
    benefits: ["Certificate", "Data Portfolio", "Industry Projects"],
    applicationDeadline: "Jan 20, 2025",
    spotsAvailable: 5,
    totalSpots: 8
  }
];

const departments = ["All", "Software Development", "Marketing", "Design", "Data Science"];
const types = ["All", "Full-time", "Part-time", "Remote", "Hybrid"];
const locations = ["All", "Mumbai", "Delhi", "Bangalore", "Pune", "Remote"];

const InternshipGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredInternships = sampleInternships.filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || internship.department === selectedDepartment;
    const matchesType = selectedType === "All" || internship.type === selectedType;
    const matchesLocation = selectedLocation === "All" || internship.location.includes(selectedLocation);

    return matchesSearch && matchesDepartment && matchesType && matchesLocation;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("All");
    setSelectedType("All");
    setSelectedLocation("All");
  };

  const activeFiltersCount = [selectedDepartment, selectedType, selectedLocation].filter(f => f !== "All").length;

  return (
    <section id="internships" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Available <span className="bg-gradient-hero bg-clip-text text-transparent">Internships</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exciting opportunities to kickstart your career. Filter by department, 
            location, and type to find the perfect match for your skills and interests.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search internships by title or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-base border-border/50 focus:border-primary shadow-soft"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="text-sm">
                Clear All
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-gradient-card rounded-lg p-6 border border-border/50 shadow-soft">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Internship Grid */}
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredInternships.map((internship, index) => (
              <div 
                key={internship.id} 
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <InternshipCard internship={internship} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No internships found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find more opportunities.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InternshipGrid;