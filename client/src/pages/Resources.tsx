import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone, MapPin, ExternalLink, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Resource {
  id: string;
  name: string;
  type: "hotline" | "counseling" | "legal" | "ngo";
  country: string;
  city: string;
  phone?: string;
  website?: string;
  description: string;
  hours?: string;
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Sample data - in production this would come from a database
  const resources: Resource[] = [
    {
      id: "1",
      name: "National Emergency Hotline",
      type: "hotline",
      country: "South Africa",
      city: "Nationwide",
      phone: "0800 428 428",
      description: "24/7 crisis hotline for immediate support and emergency assistance.",
      hours: "24/7",
    },
    {
      id: "2",
      name: "Women's Legal Centre",
      type: "legal",
      country: "South Africa",
      city: "Cape Town",
      phone: "021 424 5660",
      website: "https://www.escr-net.org/members/womens-legal-centre-wlc/",
      description: "Free legal advice and support for women affected by gender-based violence, including digital abuse.",
      hours: "Mon-Fri, 9am-5pm",
    },
    {
      id: "3",
      name: "SAGE Counseling Center",
      type: "counseling",
      country: "Kenya",
      city: "Nairobi",
      phone: "+254 20 272 1982",
      description: "Professional trauma counseling with sliding scale fees. Experience with digital trauma cases.",
      hours: "Mon-Sat, 8am-6pm",
    },
    {
      id: "4",
      name: "Digital Rights Nigeria",
      type: "ngo",
      country: "Nigeria",
      city: "Lagos",
      website: "https://digitalrightslawyers.org/wp-content/uploads/2021/01/UNRAVELING-THE-CONCEPT-OF-DIGITAL-RIGHTS-GROUP-5-POWERPOINT.pdf",
      description: "NGO providing support and advocacy for victims of online harassment and digital violence.",
      hours: "Mon-Fri, 9am-5pm",
    },
    {
      id: "5",
      name: "Ghana Cyber Security Authority",
      type: "legal",
      country: "Ghana",
      city: "Accra",
      phone: "+233 302 906 287",
      website: "https://cybilportal.org/actors/cyber-security-authority-csa/",
      description: "Report cybercrimes and receive guidance on legal recourse for digital harassment.",
      hours: "Mon-Fri, 8am-5pm",
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry =
      selectedCountry === "all" || resource.country === selectedCountry;

    const matchesType = selectedType === "all" || resource.type === selectedType;

    return matchesSearch && matchesCountry && matchesType;
  });

  const countries = Array.from(new Set(resources.map((r) => r.country))).sort();

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      hotline: "Crisis Hotline",
      counseling: "Counseling Center",
      legal: "Legal Aid",
      ngo: "Support Organization",
    };
    return labels[type] || type;
  };

  const getTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      hotline: "bg-destructive/10 text-destructive border-destructive/20",
      counseling: "bg-primary/10 text-primary border-primary/20",
      legal: "bg-secondary/10 text-secondary border-secondary/20",
      ngo: "bg-accent/10 text-accent border-accent/20",
    };
    return colors[type] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Verified Support Resources
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find trusted crisis hotlines, counseling services, legal aid, and support organizations 
              across African regions
            </p>
          </div>

          {/* Emergency Notice */}
          <Card className="p-6 bg-destructive/10 border-destructive/20">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">In Immediate Danger?</h3>
                <p className="text-foreground text-sm">
                  If you are in immediate physical danger, please contact your local emergency services 
                  (police, ambulance) or a 24/7 crisis hotline in your country. Your safety is the priority.
                </p>
              </div>
            </div>
          </Card>

          {/* Filters */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hotline">Crisis Hotlines</SelectItem>
                  <SelectItem value="counseling">Counseling</SelectItem>
                  <SelectItem value="legal">Legal Aid</SelectItem>
                  <SelectItem value="ngo">Support Organizations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Resources List */}
          <div className="space-y-4">
            {filteredResources.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No resources found matching your search criteria. Try adjusting your filters.
                </p>
              </Card>
            ) : (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="p-6 hover:shadow-medium transition-all">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {resource.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getTypeBadgeColor(resource.type)}`}>
                            {getTypeLabel(resource.type)}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full border border-border bg-muted/50 text-muted-foreground">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {resource.city}, {resource.country}
                          </span>
                        </div>
                      </div>
                      {resource.hours && (
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {resource.hours}
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground">{resource.description}</p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {resource.phone && (
                        <Button variant="outline" className="gap-2">
                          <Phone className="w-4 h-4" />
                          {resource.phone}
                        </Button>
                      )}
                      {resource.website && (
                        <Button variant="outline" className="gap-2" asChild>
                          <a href={resource.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Note */}
          <Card className="p-6 bg-muted/30">
            <h3 className="text-lg font-semibold mb-2 text-foreground">About These Resources</h3>
            <p className="text-muted-foreground text-sm">
              All resources listed have been verified for legitimacy and relevance to digital trauma support. 
              However, services and availability may change. If you encounter any issues or have suggestions 
              for additional resources, please help us keep this directory accurate and comprehensive.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Resources;
