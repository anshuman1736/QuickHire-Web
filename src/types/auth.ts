interface IRegisterForm {
  fullName: string;
  email: string;
  password: string;
  phoneNo: string;
  profile_pic?: string;
  completeProfile: boolean;
  categoryId: number;
  categoryName: string;
}

export interface IUserRegister extends IRegisterForm {
  resume?: string;
  majorIntrest: string;
  address: string;
}

export interface ICompanyRegister extends IRegisterForm {
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
  