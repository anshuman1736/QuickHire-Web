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
  job_experience: string | null;
  department: string | null;
  industry_type: string | null;
  job_eligibility: string | null;
  job_role: string | null;
  job_skills: string | null;
  job_vacancies: string | null;
}

  // const jobs = useMemo<MatchedJob[]>(
  //   () => [
  //     {
  //       id: 1,
  //       job_title: "Senior Frontend Developer",
  //       job_experience: "5+ years",
  //       job_vacancies: "48",
  //       job_description:
  //         "Lead the development of modern web applications using React and Next.js",
  //       salary: "$90K - $120K",
  //       category_id: 1, // development
  //       job_location: "San Francisco, CA",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 2 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 2 days ago
  //       job_address: "TechCorp Solutions HQ, San Francisco",
  //       enabled: 1,
  //       company_id: 101,
  //       department: "Engineering",
  //       industry_type: "Technology",
  //       job_eligibility: "Bachelor's degree in Computer Science",
  //       job_role: "Senior Developer",
  //       job_skills: "React, Next.js, TypeScript",
  //     },
  //     {
  //       id: 2,
  //       job_title: "Data Scientist",
  //       job_experience: "3-5 years",
  //       job_vacancies: "36",
  //       job_description:
  //         "Analyze complex datasets and build predictive models for business intelligence",
  //       salary: "$85K - $110K",
  //       category_id: 2, // datascience
  //       job_location: "Remote",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 1 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 1 day ago
  //       job_address: "Analytics Pro Headquarters",
  //       enabled: 1,
  //       company_id: 102,
  //       department: "Data Science",
  //       industry_type: "Analytics",
  //       job_eligibility: "Master's degree in Data Science or related field",
  //       job_role: "Data Scientist",
  //       job_skills: "Python, R, Machine Learning",
  //     },
  //     {
  //       id: 3,
  //       job_title: "UX/UI Designer",
  //       job_experience: "1-3 years",
  //       job_vacancies: "64",
  //       job_description:
  //         "Create user-centered designs and prototypes for web and mobile applications",
  //       salary: "$65K - $85K",
  //       category_id: 3, // design
  //       job_location: "New York, NY",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 5 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 5 days ago
  //       job_address: "Creative Studio Office, New York",
  //       enabled: 1,
  //       company_id: 103,
  //       department: "Design",
  //       industry_type: "Creative",
  //       job_eligibility: "Bachelor's degree in Design or related field",
  //       job_role: "UI/UX Designer",
  //       job_skills: "Figma, Adobe XD, Sketch",
  //     },
  //     {
  //       id: 4,
  //       job_title: "DevOps Engineer",
  //       job_experience: "5+ years",
  //       job_vacancies: "29",
  //       job_description:
  //         "Manage CI/CD pipelines and cloud infrastructure on AWS and Azure",
  //       salary: "$100K - $130K",
  //       category_id: 1, // development
  //       job_location: "Austin, TX",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 3 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 3 days ago
  //       job_address: "Cloud Systems Inc., Austin",
  //       enabled: 1,
  //       company_id: 104,
  //       department: "Operations",
  //       industry_type: "Technology",
  //       job_eligibility:
  //         "Bachelor's degree in Computer Science or related field",
  //       job_role: "DevOps Engineer",
  //       job_skills: "AWS, Azure, Docker, Kubernetes",
  //     },
  //     {
  //       id: 5,
  //       job_title: "Machine Learning Engineer",
  //       job_experience: "4+ years",
  //       job_vacancies: "42",
  //       job_description:
  //         "Develop and deploy machine learning models for real-world applications",
  //       salary: "$110K - $150K",
  //       category_id: 2, // datascience
  //       job_location: "Seattle, WA",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 7 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 1 week ago
  //       job_address: "AI Innovations HQ, Seattle",
  //       enabled: 1,
  //       company_id: 105,
  //       department: "Machine Learning",
  //       industry_type: "Artificial Intelligence",
  //       job_eligibility:
  //         "Master's or PhD in Computer Science, Machine Learning",
  //       job_role: "ML Engineer",
  //       job_skills: "TensorFlow, PyTorch, Python",
  //     },
  //     {
  //       id: 6,
  //       job_title: "Marketing Specialist",
  //       job_experience: "2-4 years",
  //       job_vacancies: "53",
  //       job_description:
  //         "Plan and execute digital marketing campaigns and analyze performance metrics",
  //       salary: "$60K - $80K",
  //       category_id: 4, // marketing
  //       job_location: "Chicago, IL",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 4 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 4 days ago
  //       job_address: "Growth Tactics Office, Chicago",
  //       enabled: 1,
  //       company_id: 106,
  //       department: "Marketing",
  //       industry_type: "Digital Marketing",
  //       job_eligibility: "Bachelor's degree in Marketing or related field",
  //       job_role: "Marketing Specialist",
  //       job_skills: "SEO, SEM, Social Media Marketing",
  //     },
  //     {
  //       id: 7,
  //       job_title: "Cybersecurity Analyst",
  //       job_experience: "5+ years",
  //       job_vacancies: "31",
  //       job_description:
  //         "Monitor and protect systems from cyber threats and implement security protocols",
  //       salary: "$95K - $125K",
  //       category_id: 5, // security
  //       job_location: "Washington, DC",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 3 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 3 days ago
  //       job_address: "SecureNet Defense HQ, Washington DC",
  //       enabled: 1,
  //       company_id: 107,
  //       department: "Security",
  //       industry_type: "Cybersecurity",
  //       job_eligibility: "Bachelor's degree in Cybersecurity or related field",
  //       job_role: "Security Analyst",
  //       job_skills: "Network Security, Penetration Testing, Risk Assessment",
  //     },
  //     {
  //       id: 8,
  //       job_title: "Product Manager",
  //       job_experience: "4+ years",
  //       job_vacancies: "47",
  //       job_description:
  //         "Lead product development from concept to launch and manage the roadmap",
  //       salary: "$100K - $130K",
  //       category_id: 6, // management
  //       job_location: "Boston, MA",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 7 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 1 week ago
  //       job_address: "Innovate Products HQ, Boston",
  //       enabled: 1,
  //       company_id: 108,
  //       department: "Product",
  //       industry_type: "Software",
  //       job_eligibility:
  //         "Bachelor's degree in Business, Computer Science, or related field",
  //       job_role: "Product Manager",
  //       job_skills: "Agile, Scrum, Product Development",
  //     },
  //     {
  //       id: 9,
  //       job_title: "Backend Developer",
  //       job_experience: "3-5 years",
  //       job_vacancies: "39",
  //       job_description:
  //         "Build scalable APIs and microservices using Node.js and Python",
  //       salary: "$80K - $100K",
  //       category_id: 1, // development
  //       job_location: "Denver, CO",
  //       job_type: "Remote",
  //       creation_date: new Date(
  //         Date.now() - 6 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 6 days ago
  //       job_address: "ServerTech Solutions HQ, Denver",
  //       enabled: 1,
  //       company_id: 109,
  //       department: "Engineering",
  //       industry_type: "Technology",
  //       job_eligibility:
  //         "Bachelor's degree in Computer Science or related field",
  //       job_role: "Backend Developer",
  //       job_skills: "Node.js, Python, MongoDB, MySQL",
  //     },
  //     {
  //       id: 10,
  //       job_title: "Financial Analyst",
  //       job_experience: "1-3 years",
  //       job_vacancies: "58",
  //       job_description:
  //         "Analyze financial data and prepare reports to guide business decisions",
  //       salary: "$55K - $75K",
  //       category_id: 7, // finance
  //       job_location: "Miami, FL",
  //       job_type: "Full-time",
  //       creation_date: new Date(
  //         Date.now() - 2 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 2 days ago
  //       job_address: "Global Finance Corp HQ, Miami",
  //       enabled: 1,
  //       company_id: 110,
  //       department: "Finance",
  //       industry_type: "Financial Services",
  //       job_eligibility:
  //         "Bachelor's degree in Finance, Accounting, or related field",
  //       job_role: "Financial Analyst",
  //       job_skills: "Financial Modeling, Excel, Data Analysis",
  //     },
  //   ],
  //   []
  // );

  // const jobMetadata = useMemo(() => {
  //   return {
  //     1: {
  //       level: "Senior",
  //       badge: "Urgent",
  //       companyLogo: "TC",
  //       company: "TechCorp Solutions",
  //     },
  //     2: {
  //       level: "Mid-Level",
  //       badge: "New",
  //       companyLogo: "AP",
  //       company: "Analytics Pro",
  //     },
  //     3: {
  //       level: "Junior",
  //       badge: "",
  //       companyLogo: "CS",
  //       company: "Creative Studio",
  //     },
  //     4: {
  //       level: "Senior",
  //       badge: "",
  //       companyLogo: "CS",
  //       company: "Cloud Systems Inc.",
  //     },
  //     5: {
  //       level: "Senior",
  //       badge: "Featured",
  //       companyLogo: "AI",
  //       company: "AI Innovations",
  //     },
  //     6: {
  //       level: "Mid-Level",
  //       badge: "",
  //       companyLogo: "GT",
  //       company: "Growth Tactics",
  //     },
  //     7: {
  //       level: "Senior",
  //       badge: "Urgent",
  //       companyLogo: "SN",
  //       company: "SecureNet Defense",
  //     },
  //     8: {
  //       level: "Senior",
  //       badge: "",
  //       companyLogo: "IP",
  //       company: "Innovate Products",
  //     },
  //     9: {
  //       level: "Mid-Level",
  //       badge: "",
  //       companyLogo: "ST",
  //       company: "ServerTech Solutions",
  //     },
  //     10: {
  //       level: "Junior",
  //       badge: "New",
  //       companyLogo: "GF",
  //       company: "Global Finance Corp",
  //     },
  //   };
  // }, []);
