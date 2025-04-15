import { z } from "zod";

export const userRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNo: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  categoryId: z.number().min(1, "Category is required"),
  profile_pic: z.string().optional(),
  resume: z.string().optional(),
  majorIntrest: z.string().min(1, "Major interest is required"),
});

export const companyRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNo: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  categoryId: z.number().min(1, "Category is required"),
  profile_pic: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  cinNumber: z.number().min(1, "CIN number is required"),
  cinCertificate: z.string().min(1, "CIN certificate is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const emailVerify = z.object({
  email: z.string().email("Invalid email format"),
});

export const jobPostSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  jobAddress: z.string().min(1, "Job address is required"),
  jobLocation: z.string().min(1, "Job location is required"),
  salary: z.string().min(1, "Salary is required"),
  jobType: z.enum(["Remote", "Onsite", "Hybrid"]),
  categoryId: z.number().min(1, "Category is required"),
});
