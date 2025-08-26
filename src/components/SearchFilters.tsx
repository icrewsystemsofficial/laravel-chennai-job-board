import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, MapPin, Briefcase, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  locationFilter: string;
  onLocationChange: (value: string) => void;
  jobTypeFilter: string;
  onJobTypeChange: (value: string) => void;
  experienceFilter: string;
  onExperienceChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const SearchFilters = ({
  searchTerm,
  onSearchChange,
  locationFilter,
  onLocationChange,
  jobTypeFilter,
  onJobTypeChange,
  experienceFilter,
  onExperienceChange,
  onClearFilters,
  hasActiveFilters
}: SearchFiltersProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)] mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Laravel jobs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background focus:ring-primary"
          />
        </div>
        
        {/* Location Filter */}
        <Select value={locationFilter} onValueChange={onLocationChange}>
          <SelectTrigger className="bg-background">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Location" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi NCR</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Job Type Filter */}
        <Select value={jobTypeFilter} onValueChange={onJobTypeChange}>
          <SelectTrigger className="bg-background">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Job Type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-time">Full–time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Experience Level Filter */}
      <div className="mt-4">
        <Select value={experienceFilter} onValueChange={onExperienceChange}>
          <SelectTrigger className="w-full md:w-64 bg-background">
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Experience Levels</SelectItem>
            <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
            <SelectItem value="junior">Junior (1-3 years)</SelectItem>
            <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
            <SelectItem value="senior">Senior (5-8 years)</SelectItem>
            <SelectItem value="lead">Lead (8+ years)</SelectItem>
            <SelectItem value="architect">Architect/Principal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchTerm}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
              </Badge>
            )}
            {locationFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {locationFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onLocationChange("all")} />
              </Badge>
            )}
            {jobTypeFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {jobTypeFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onJobTypeChange("all")} />
              </Badge>
            )}
            {experienceFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {experienceFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onExperienceChange("all")} />
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};