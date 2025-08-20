import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Calendar, Building2, ExternalLink, IndianRupee } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  postedDate: string;
  applyUrl: string;
  isRemote: boolean;
  experienceLevel: string;
}

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:border-primary/20 bg-job-card hover:bg-job-card-hover">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-job-company mb-2">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1 px-3 py-1 bg-accent rounded-full">
              <IndianRupee className="h-4 w-4 text-job-salary" />
              <span className="font-semibold text-job-salary text-sm">{job.salary}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{job.postedDate}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant={job.isRemote ? "default" : "secondary"}>
            {job.isRemote ? "Remote" : "On-site"}
          </Badge>
          <Badge variant="outline">{job.type}</Badge>
          <Badge variant="outline">{job.experienceLevel}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {job.description}
        </p>
        
        <Button 
          variant="default" 
          className="w-full group-hover:bg-primary-hover transition-colors" 
          asChild
        >
          <a 
            href={job.applyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Apply Now
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};