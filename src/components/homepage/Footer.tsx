"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ExternalLink,
  ChevronRight,
  Star,
  HeartHandshake,
  ArrowUpCircle,
  Zap,
  Globe,
  Cloud,
  Layers,
  Briefcase,
  
  
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      icon: Layers,
      title: "Sections",
      links: ["Landing Page", "Contact Us", "Home", "Job Seekers", "Employers"],
      gradient: "from-pink-500 via-red-500 to-yellow-500",
      iconColor: "text-pink-500",
    },
    {
      icon: Briefcase,
      title: "Job Portal",
      links: ["Find Jobs", "Post Jobs", "Career Advice", "Help"],
      gradient: "from-purple-500 via-indigo-500 to-blue-500",
      iconColor: "text-purple-500",
    },
    {
      icon: Star,
      title: "Services",
      links: [
        "Resume Builder",
        "Interview Prep",
        "Privacy Policy",
        "Terms & Conditions",
        "Support",
      ],
      gradient: "from-green-400 via-teal-500 to-cyan-600",
      iconColor: "text-teal-500",
    },
    {
      icon: HeartHandshake,
      title: "Company",
      links: ["About Us", "Careers", "FAQs", "Teams", "Contact Us"],
      gradient: "from-orange-400 via-red-500 to-pink-500",
      iconColor: "text-orange-500",
    },
  ];

  // Social media icons with hover animations
  const socialIcons = [
    { Icon: Github, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Mail, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-8 overflow-hidden relative">
      {/* Decorative elements similar to SkillsCategory */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-100 blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full border-2 border-dashed border-amber-200 opacity-20 transform -translate-x-1/2 -translate-y-1/2"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-2/5"
          >
            <div className="font-bold text-3xl mb-3 flex items-center">
              <span className="text-amber-500">Job</span>Pro
              <motion.span
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="ml-2 inline-flex items-center justify-center h-6 w-6 bg-amber-500/20 rounded-full text-amber-500 text-xs"
              >
                <Zap className="w-3 h-3" />
              </motion.span>
            </div>
            <p className="mb-5 text-lg text-gray-800">
              Connecting Talent with Opportunity
            </p>
            <p className="text-gray-600 mb-6 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-amber-500" />
              JobPro - Your Career Journey Starts Here
            </p>
            <motion.a
              href="/#contact"
              className="bg-white border border-amber-500 px-5 py-2 rounded-full text-sm hover:bg-amber-500 hover:text-white transition-all inline-flex items-center shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With Us
              <ExternalLink className="w-4 h-4 ml-2" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-2/5"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white rounded-2xl p-6 relative overflow-hidden border border-gray-200/50 shadow-lg"
            >
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-amber-500/10 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <Cloud className="w-5 h-5 mr-2 text-amber-500" />
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest job opportunities and career
                insights.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-50 rounded-l-full px-4 py-2 flex-grow outline-none focus:ring-1 focus:ring-amber-500 border border-gray-200"
                />
                <motion.button
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-5 py-2 rounded-r-full hover:shadow-lg transition-all flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                  <Zap className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-gray-200 pt-10">
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <motion.h4
                className="font-bold mb-5 text-lg flex items-center text-gray-800"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-white shadow-md ${section.iconColor}`}
                >
                  <section.icon className={`w-4 h-4 ${section.iconColor}`} />
                </motion.div>
                {section.title}
              </motion.h4>
              <ul className="space-y-3 text-gray-600">
                {section.links.map((link, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <a
                      href="#"
                      className="hover:text-amber-500 transition-all flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mt-16 pt-6 border-t border-gray-200"
        >
          <div className="text-gray-600 mb-6 md:mb-0">
            Follow us
            <div className="inline-flex gap-3 ml-3">
              {socialIcons.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-5 py-2 rounded-full text-sm hover:shadow-lg transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
              <ArrowUpCircle className="w-4 h-4 ml-1" />
            </motion.button>
            <motion.button
              className="bg-white text-gray-700 border border-gray-200 px-5 py-2 rounded-full text-sm hover:bg-gray-50 transition-all shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm mt-16"
        >
          <div className="flex items-center">
            © {currentYear} JobPro. All rights reserved.
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                color: ["#9CA3AF", "#F59E0B", "#9CA3AF"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              ♦
            </motion.span>
          </div>

          <motion.a
            href="#top"
            className="flex items-center bg-white p-2 rounded-full hover:bg-amber-500 hover:text-white transition-all mt-6 md:mt-0 shadow-md"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUpCircle className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
