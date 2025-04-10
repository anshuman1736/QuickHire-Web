interface IRegisterForm {
  email: string;
  password: string;
  phoneNo: string;
  completeProfile: boolean;
  categoryId: number;
  categoryName: string;
}

export interface IUserRegister extends IRegisterForm {
  fullName: string;
  resume?: string;
  majorIntrest: string;
  address: string;
  profile_pic?: string;
}

export interface ICompanyRegister extends IRegisterForm {
  profile_Pic?: string;
  companyName: string;
  cinNumber: number;
  cinCertificate: string;
  creationData: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryResponse {
  id: number;
  categoryName: string;
  categoryDescription: string;
}
