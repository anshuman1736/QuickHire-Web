export interface IJobPost {
  jobTitle: string;
  jobDescription: string;
  jobAddress: string;
  jobLocation: string;
  salary: string;
  jobType: string;
  categoryId: number;
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

export interface MatchJobResponse {
  user_id: number;
  matched_jobs: MatchedJob[];
}
