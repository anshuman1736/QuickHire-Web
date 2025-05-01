export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNo: string;
  resume: string;
  address: string;
  profile_pic: string;
  role: string;
  majorIntrest: string;
  completeProfile: boolean;
  categoryId: number;
  categoryName: string;
}


export interface IUpdateUserRequest {
  id?: number;
  fullName?: string;
  email?: string;
  phoneNo?: string;
  resume?: string;
  address?: string;
  profile_pic?: string;
  majorIntrest?: string;
  completeProfile?: boolean;
  categoryId?: number;
  categoryName?: string;
}

export enum Role {
  ROLE_COMPANY = "ROLE_COMPANY",
  ROLE_USER = "ROLE_USER",
}