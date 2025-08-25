import { useState, useMemo, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SearchFilters } from "@/components/SearchFilters";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowUpDown, Github, MessageCircle } from "lucide-react";

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch jobs from n8n webhook
  useEffect(() => {
    fetch("https://n8n.srv833787.hstgr.cloud/webhook/15b29d24-3c89-41a9-9c4c-3d7c3b1d3cc2")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          location: job.location,
          type: job.employment_type || "Full Time",
          salary: job.salary || "Not disclosed",
          description: job.description,
          postedDate: job.posted_at,
          applyUrl: job.apply_link,
          isRemote: job.location?.toLowerCase().includes("remote") || false,
          experienceLevel: job.description?.toLowerCase().includes("junior")
            ? "Junior (0-2 years)"
            : job.description?.toLowerCase().includes("senior")
            ? "Senior (5-8 years)"
            : "Mid (2-5 years)"
        }));
        setJobs(formatted);
      })
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationFilter === "all" || 
                             (locationFilter === "chennai" && job.location.toLowerCase().includes("chennai")) ||
                             (locationFilter === "remote" && job.isRemote);
      
      const matchesJobType = jobTypeFilter === "all" || 
                            job.type.toLowerCase().replace(/\s+/g, "-") === jobTypeFilter;
      
      const matchesExperience = experienceFilter === "all" || 
                               job.experienceLevel.toLowerCase().includes(experienceFilter);

      return matchesSearch && matchesLocation && matchesJobType && matchesExperience;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      }
      if (sortBy === "salary-high") {
        // try to extract number from salary string
        const getSalaryValue = (salary) => {
          if (!salary) return 0;
          const num = salary.match(/\d+/g);
          return num ? parseInt(num[0]) : 0;
        };
        return getSalaryValue(b.salary) - getSalaryValue(a.salary);
      }
      if (sortBy === "company") {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });

    return filtered;
  }, [jobs, searchTerm, locationFilter, jobTypeFilter, experienceFilter, sortBy]);

  const hasActiveFilters = Boolean(searchTerm) || locationFilter !== "all" || jobTypeFilter !== "all" || experienceFilter !== "all";

  const clearAllFilters = () => {
    setSearchTerm("");
    setLocationFilter("all");
    setJobTypeFilter("all");
    setExperienceFilter("all");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* Search & Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          jobTypeFilter={jobTypeFilter}
          onJobTypeChange={setJobTypeFilter}
          experienceFilter={experienceFilter}
          onExperienceChange={setExperienceFilter}
          onClearFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Results Header */}
        <div id="viewjobs" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {filteredJobs.length} Laravel Jobs Found
            </h2>
            <p className="text-muted-foreground">
              Updated twice daily from trusted sources
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="salary-high">Highest Salary</SelectItem>
                <SelectItem value="company">Company A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
              <Button onClick={clearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Community Section */}
        <Separator className="my-12" />
        
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Join the Laravel Chennai Community</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with fellow Laravel developers, attend meetups, and stay updated with the latest opportunities and trends in the Laravel ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Join WhatsApp Group
            </Button> */}
            <a href="https://github.com/laravelchennai">
              <Button variant="outline" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button></a>
            <a href="https://discord.gg/jfybWcG2" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.14 96.36"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.53,0a72.06,72.06,0,0,0-3.36,6.91,97.68,97.68,0,0,0-29.2,0A72.37,72.37,0,0,0,45.61,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21A105.73,105.73,0,0,0,31.9,96.36a77.7,77.7,0,0,0,6.57-10.7,68.42,68.42,0,0,1-10.36-5c.87-.63,1.73-1.29,2.55-1.96A70.48,70.48,0,0,0,64,84.46a70.48,70.48,0,0,0,33.34-5.76c.83.68,1.69,1.33,2.55,1.96a68.93,68.93,0,0,1-10.38,5,77,77,0,0,0,6.58,10.7A105.63,105.63,0,0,0,126.6,80.2C129.24,53.16,122.09,29,107.7,8.07ZM42.45,65.69c-6.31,0-11.48-5.79-11.48-12.93s5.08-12.94,11.48-12.94S53.93,45.62,53.93,52.76,48.76,65.69,42.45,65.69Zm42.24,0c-6.31,0-11.48-5.79-11.48-12.93s5.08-12.94,11.48-12.94,11.48,5.79,11.48,12.94S91,65.69,84.69,65.69Z"/>
                </svg>
                Join Discord
              </Button>
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="secondary">Monthly Meetups</Badge>
            <Badge variant="secondary">Code Reviews</Badge>
            <Badge variant="secondary">Career Guidance</Badge>
            <Badge variant="secondary">Open Source</Badge>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;