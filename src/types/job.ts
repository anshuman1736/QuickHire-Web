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
  phoneNo: string | null;
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
