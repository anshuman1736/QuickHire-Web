export interface Companyprofile {
    id: number;
    companyName: string;
    cinNumber: string;
    cinCertificate: string;
    email: string;
    phoneNo: string;
    profile_Pic: string;
    majorIntrest: string;
    completeProfile: boolean;
    creationDate:number,
    categoryId: number;
    categoryName: string;
  }

  export interface IUpdateCompanyRequest {
    id?: number;
    companyName?: string;
    cinNumber?: string;
    cinCertificate?: string;
    email?: string;
    phoneNo?: string;
    profile_Pic?: string;
    majorIntrest?: string;
    completeProfile?: boolean;
    creationDate?:number,
    categoryId?: number;
    categoryName?: string;
  }