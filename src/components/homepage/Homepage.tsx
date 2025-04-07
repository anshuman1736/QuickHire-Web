"use client"

import Features from "./Features";
import CTA from "./CTA";
import Footer from "./Footer";

import NavBar from "./Navbar";
import Hero from "../../components/homepage/Hero";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-sans bg-white">
      <NavBar/>
      {/* Hero Section with improved visual hierarchy and gradient accent */}
      <Hero/>

      {/* Stats Banner */}
      {/* <FeaturedJobs/> */}
      {/* Job Categories Section */}
      

      {/* Featured Jobs Section */}
      {/* Achievements Section */}

      <CTA />
      {/* <About /> */}
      <Features />
      <Footer />
    </div>
  );
};

export default Homepage;
