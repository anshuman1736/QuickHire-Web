"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  Building,
  User,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Building2,
  Star,
  ArrowRight,
} from "lucide-react";
import AvailableJobs from "../availableJobs/availableJobs";

function Hero() {
  const [activeTab, setActiveTab] = useState("jobseeker");
  const [isVisible, setIsVisible] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    skills: "",
    companyName: "",
    jobAddress: "",
  });

  const featuredCompanies = [
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Meta",
    "Netflix",
  ];

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleSearch = () => {
    console.log("Searching with params:", searchParams);
    setHasSearched(true);
  };

  const handleInputChange = (field: keyof typeof searchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-amber-50 to-white">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-amber-200 blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-amber-100 blur-3xl opacity-30"></div>
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-amber-300 blur-3xl opacity-10"></div>

        <motion.div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-amber-200 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full border border-amber-300 opacity-15"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-amber-100 blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          <motion.div
            className="w-full lg:w-1/2 lg:pr-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center">
              <div className="mr-3 p-2 bg-amber-100 rounded-full shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm font-medium px-4 py-1.5 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full text-amber-800 border border-amber-200 shadow-sm">
                #1 Job Platform in the Industry
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                Dream Career
              </span>
              <br />
              Take the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                Next Step
              </span>
            </h1>

            <motion.p
              className="text-gray-700 text-lg mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Connect with{" "}
              <span className="font-semibold text-amber-700">10,000+</span>{" "}
              employers and discover opportunities that match your skills,
              experience, and career aspirations with our AI-powered matching
              system.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mr-3 shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">2.4M+</p>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mr-3 shadow-md">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">75K+</p>
                  <p className="text-sm text-gray-600">Companies</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mr-3 shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">8.5M+</p>
                  <p className="text-sm text-gray-600">Job Seekers</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-5/12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white shadow-2xl rounded-3xl border border-amber-100 overflow-hidden relative">
              <div className="flex">
                <button
                  className={`flex-1 py-5 font-medium text-center relative transition-colors ${
                    activeTab === "jobseeker"
                      ? "text-amber-700 bg-amber-50"
                      : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                  onClick={() => setActiveTab("jobseeker")}
                >
                  <span className="flex items-center justify-center">
                    <User
                      className={`w-5 h-5 mr-2 ${
                        activeTab === "jobseeker"
                          ? "text-amber-600"
                          : "text-gray-500"
                      }`}
                    />
                    Job Seeker
                  </span>
                  {activeTab === "jobseeker" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700"
                      layoutId="activeTab"
                    />
                  )}
                </button>

                <button
                  className={`flex-1 py-5 font-medium text-center relative transition-colors ${
                    activeTab === "employer"
                      ? "text-amber-700 bg-amber-50"
                      : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                  onClick={() => setActiveTab("employer")}
                >
                  <span className="flex items-center justify-center">
                    <Building
                      className={`w-5 h-5 mr-2 ${
                        activeTab === "employer"
                          ? "text-amber-600"
                          : "text-gray-500"
                      }`}
                    />
                    Employer
                  </span>
                  {activeTab === "employer" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              </div>

              <div className="p-7">
                <AnimatePresence mode="wait">
                  {activeTab === "jobseeker" ? (
                    <motion.div
                      key="jobseeker"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-52"
                    >
                      <h3 className="text-xl font-semibold mb-6 text-gray-900">
                        Find Your Next Opportunity
                      </h3>

                      <div className="mb-4 relative">
                        <div
                          className={`flex items-center border-2 ${
                            focusedField === "jobTitle"
                              ? "border-amber-500 shadow-md"
                              : "border-gray-200"
                          } rounded-xl px-4 py-3 bg-white transition-all`}
                        >
                          <Briefcase
                            className={`w-5 h-5 ${
                              focusedField === "jobTitle"
                                ? "text-amber-600"
                                : "text-gray-400"
                            } mr-3`}
                          />
                          <input
                            type="text"
                            placeholder="Job title or keywords (optional)"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            value={searchParams.jobTitle}
                            onChange={(e) =>
                              handleInputChange("jobTitle", e.target.value)
                            }
                            onFocus={() => setFocusedField("jobTitle")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>

                      <div className="mb-4 relative">
                        <div
                          className={`flex items-center border-2 ${
                            focusedField === "skills"
                              ? "border-amber-500 shadow-md"
                              : "border-gray-200"
                          } rounded-xl px-4 py-3 bg-white transition-all`}
                        >
                          <BookOpen
                            className={`w-5 h-5 ${
                              focusedField === "skills"
                                ? "text-amber-600"
                                : "text-gray-400"
                            } mr-3`}
                          />
                          <input
                            type="text"
                            placeholder="Skills (optional)"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            value={searchParams.skills}
                            onChange={(e) =>
                              handleInputChange("skills", e.target.value)
                            }
                            onFocus={() => setFocusedField("skills")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>

                      <div className="mb-4 relative">
                        <div
                          className={`flex items-center border-2 ${
                            focusedField === "companyName"
                              ? "border-amber-500 shadow-md"
                              : "border-gray-200"
                          } rounded-xl px-4 py-3 bg-white transition-all`}
                        >
                          <Building2
                            className={`w-5 h-5 ${
                              focusedField === "companyName"
                                ? "text-amber-600"
                                : "text-gray-400"
                            } mr-3`}
                          />
                          <input
                            type="text"
                            placeholder="Company name (optional)"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            value={searchParams.companyName}
                            onChange={(e) =>
                              handleInputChange("companyName", e.target.value)
                            }
                            onFocus={() => setFocusedField("companyName")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>

                      <div className="mb-6 relative">
                        <div
                          className={`flex items-center border-2 ${
                            focusedField === "jobAddress"
                              ? "border-amber-500 shadow-md"
                              : "border-gray-200"
                          } rounded-xl px-4 py-3 bg-white transition-all`}
                        >
                          <MapPin
                            className={`w-5 h-5 ${
                              focusedField === "jobAddress"
                                ? "text-amber-600"
                                : "text-gray-400"
                            } mr-3`}
                          />
                          <input
                            type="text"
                            placeholder="Location (optional)"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            value={searchParams.jobAddress}
                            onChange={(e) =>
                              handleInputChange("jobAddress", e.target.value)
                            }
                            onFocus={() => setFocusedField("jobAddress")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>

                      <motion.button
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white rounded-xl font-medium flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSearch}
                      >
                        <Search className="w-5 h-5 mr-2" />
                        Search Jobs
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="employer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-52"
                    >
                      <h3 className="text-xl font-semibold mb-6 text-gray-900">
                        Find Perfect Candidates
                      </h3>

                      <div className="space-y-4 mb-7">
                        {[
                          "Post unlimited job listings",
                          "Browse qualified candidate profiles",
                          "AI-powered talent matching",
                          "Detailed analytics and insights",
                        ].map((feature, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <div className="p-1 bg-green-100 rounded-full mr-3 flex-shrink-0">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-gray-700">{feature}</p>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white rounded-xl font-medium flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Building className="w-5 h-5 mr-2" />
                        Post a Job
                      </motion.button>

                      <div className="mt-5 flex items-center justify-center">
                        <span className="text-gray-500">Or</span>
                        <button className="ml-2 font-medium text-amber-700 hover:text-amber-800 flex items-center">
                          Contact our recruiting team
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
            {hasSearched && (
              <motion.div
                className="w-full max-w-screen mx-auto mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AvailableJobs
                  jobTitle={searchParams.jobTitle}
                  skills={searchParams.skills}
                  companyName={searchParams.companyName}
                  jobAddress={searchParams.jobAddress}
                />
              </motion.div>
            )}
        <motion.div
          className="mt-20 text-center max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          >
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-amber-300 mr-4"></div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-800">
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <div className="h-px w-16 bg-amber-300 ml-4"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {featuredCompanies.map((company, i) => (
              <motion.div
              key={i}
              className="flex items-center text-lg font-bold text-gray-400 hover:text-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                transition: { delay: 0.9 + i * 0.1 },
              }}
              >
                <Star className="w-4 h-4 mr-2 text-amber-400" />
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
    </section>
  );
}

export default Hero;
