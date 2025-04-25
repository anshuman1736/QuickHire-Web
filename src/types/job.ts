export interface IJobPost {
  jobTitle: string;
  jobDescription: string;
  jobAddress: string;
  jobLocation: string;
  salary: string;
  jobType: string;
  categoryId: number;
  skills: string;
  experience: string;
  jobEligibility: string;
}
export interface IUpdateJob {
  jobTitle: string;
  jobAddress:string;
  jobDescription: string;
  jobLocation: string;
  salary: string;
  jobType: string;
  categoryId: number;
  skills: string;
  experience: string;
  jobEligibility: string;
}
export interface Iupdateprofile {
  fullName: string;
    email: string;
    phoneNo: string;
    jobTitle: string;
    location: string;
    bio: string;
    majorIntrest: string[];
    experienceLevel: string;
    workType: string[];
    website: string;
    linkedin: string;
    github: string;
    twitter: string;
    resume: string ;
    portfolio: File | null;
    token:string ;
    id:number;
    profile_pic: string ;
}


export interface JobPosting {
  id: number;
  jobTitle: string;
  jobDescription: string;
  jobAddress: string;
  jobLocation: string;
  salary: string;
  jobType: string;
  skills: string;
  experience: string;
  jobEligibility: string;
  enabled: boolean;
  categoryId: number;
  creationDate: number;
  companyDTO: CompanyDTO;
  categoryDTO: CategoryDTO;
}

interface CompanyDTO {
  id: number;
  companyName: string;
  cinNumber: string;
  cinCertificate: string;
  email: string;
  phoneNo: string;
  creationDate: number;
  profile_Pic: string;
  completeProfile: boolean;
  categoryId: number;
  categoryName: string;
}

interface CategoryDTO {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

export interface MatchedJob {
  id: number;
  creation_date: string;
  enabled: number;
  job_address: string;
  job_description: string;
  job_location: string;
  job_title: string;
  job_type: string;
  salary: string;
  category_id: number;
  company_id: number;
  job_experience: string;
  department: string;
  industry_type: string;
  job_skills: string;
}

export interface userDTO {
  id: number;
  fullName: string;
  email: string;
  phoneNo: string;
  resume: string;
  address: string;
  profile_pic: string;
  majorIntrest: string;
  completeProfile: boolean;
  categoryId: number;
  categoryName: string;
}

export interface JobApplication {
  id: number;
  jobId: number;
  userId: number;
  applicationDate: number;
  applicationScore: number;
  enabled: boolean;
  status: boolean;
  jobDTO: JobPosting;
  userDTO: userDTO;
}

export interface MatchJobResponse {
  user_id: number;
  matched_jobs: MatchedJob[];
}
