import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ArrowRight } from "lucide-react";

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      name: "John Smith",
      role: "Software Engineer",
      image: "/Userpng.png",
      quote:
        "TestPro transformed my job search! The skill assessments were comprehensive and the personalized recommendations matched me with opportunities I wouldn't have found otherwise.",
      company: "TechCorp Inc.",
      accent: "#4F46E5",
    },
    {
      name: "Angela Banks",
      role: "HR Director",
      image: "/Userpng.png",

      quote:
        "As a hiring manager, TestPro has streamlined our entire recruitment process. The quality of candidates has improved dramatically and our time-to-hire decreased by 45%.",
      company: "Global Solutions",
      accent: "#EC4899",
    },
    {
      name: "Kendal Lamar",
      role: "Senior UX Designer",
      image: "/Userpng.png",

      quote:
        "The nuanced assessment of my design skills helped me showcase my strengths to employers. TestPro's platform is intuitive and the feedback was invaluable for my career growth.",
      company: "CreativeMinds",
      accent: "#10B981",
    },
    {
      name: "Rebecca White",
      role: "Product Manager",
      image: "/Userpng.png",

      quote:
        "TestPro's comprehensive testing framework identified top-tier talent that traditional interviews missed. It's now an integral part of our hiring strategy across all departments.",
      company: "InnovateTech",
      accent: "#F59E0B",
    },
    {
      name: "Alycia Clark",
      role: "Lead Data Scientist",
      image: "/Userpng.png",

      quote:
        "The technical assessments perfectly balanced theoretical knowledge with practical application. I received three job offers within two weeks of completing my TestPro profile!",
      company: "DataDrive Analytics",
      accent: "#8B5CF6",
    },
  ];

  // Calculate position for each card in carousel
  const getCardPosition = (index) => {
    const totalCards = testimonials.length;
    // Calculate angle in radians
    const angle = (index - activeIndex) * ((2 * Math.PI) / totalCards);

    // Make the carousel more elliptical for better visibility
    const radiusX = 250; // horizontal radius
    const radiusY = 50; // vertical radius

    // Calculate x and y position
    const x = Math.sin(angle) * radiusX;
    const y = -Math.cos(angle) * radiusY;
    const z = -Math.cos(angle) * 100; // Add depth

    // Calculate scale and opacity based on position
    // Items in front are larger and more visible
    const scale = 0.85 + Math.cos(angle) * 0.15;
    const opacity = Math.cos(angle) * 0.2;

    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(opacity * 10),
    };
  };

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []); // Remove dependency on activeIndex

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating]);

  // Handle swipe gestures
  useEffect(() => {
    const carousel = carouselRef.current;
    let touchStartX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          nextSlide(); // Swipe left, go next
        } else {
          prevSlide(); // Swipe right, go prev
        }
      }
    };

    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      carousel.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isAnimating]);

  // Custom CSS
  const customStyles = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes shine {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    
    .testimonial-heading {
      font-family: 'Playfair Display', serif;
      background: linear-gradient(90deg, #FFBF2F, #FF8F00, #FFBF2F);
      background-size: 200% auto;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 8s linear infinite;
      letter-spacing: -0.02em;
    }
    
    .carousel-container {
      perspective: 1200px;
      transform-style: preserve-3d;
      height: 400px;
    }
    
    .carousel-stage {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
    }
    
    .carousel-item {
      position: absolute;
      width: 300px;
      height: 380px;
      left: 50%;
      top: 50%;
      margin-left: -150px;
      margin-top: -190px;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      cursor: pointer;
      backface-visibility: hidden;
    }
    
    .carousel-content {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      backface-visibility: hidden;
      color: black;
    }
    
    .carousel-item:hover .carousel-content {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);
    }
    
    .active-item {
      z-index: 10;
      transform: translate3d(0, 0, 100px) !important;
      opacity: 1 !important;
    } 
    
    .quote-text {
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: 'Merriweather', serif;
      color: black
    }
    
    .indicator-dot {
      transition: all 0.3s ease-out;
    }
    
    .indicator-dot.active {
      transform: scale(1.5);
    }
    
    .btn-glow {
      box-shadow: 0 0 10px rgba(255, 191, 47, 0.3);
      transition: all 0.3s ease;
    }
    
    .btn-glow:hover {
      box-shadow: 0 0 15px rgba(255, 191, 47, 0.5);
    }
    
    .carousel-nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .carousel-nav-button:hover {
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    .carousel-nav-button.prev {
      left: 5%;
    }
    
    .carousel-nav-button.next {
      right: 5%;
    }
    
    @media (max-width: 768px) {
      .carousel-item {
        width: 260px;
        height: 350px;
        margin-left: -130px;
        margin-top: -175px;
      }
      
      .carousel-nav-button.prev {
        left: 2%;
      }
      
      .carousel-nav-button.next {
        right: 2%;
      }
    }
  `;

  return (
    <section className="relative px-4 pb-24 overflow-hidden bg-white text-gray-800">
      <style>{customStyles}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="mb-2">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-[#FFBF2F] opacity-10 rounded-lg blur-sm"></div>
              <span className="relative px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gray-100 rounded-lg inline-block">
                Voices of Success
              </span>
            </div>
          </div>

          <h2 className="testimonial-heading text-4xl font-black mb-3">
            Success Stories
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">
            Discover how TestPro has transformed careers and businesses
          </p>

          {/* Decorative line */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#FFBF2F] to-transparent mx-auto mt-3"></div>
        </div>

        {/* Carousel */}
        <div className="carousel-container" ref={carouselRef}>
          <div className="carousel-stage">
            {testimonials.map((testimonial, index) => {
              const position = getCardPosition(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className={`carousel-item ${isActive ? "active-item" : ""}`}
                  style={position}
                  onClick={() => goToSlide(index)}
                >
                  <div
                    className="carousel-content p-6 flex flex-col h-full"
                    style={{ border: `3px solid ${testimonial.accent}` }}
                  >
                    {/* Profile section */}
                    <div className="flex items-center mb-4">
                      <div
                        className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2"
                        style={{ borderColor: testimonial.accent }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h4
                          className="font-bold text-base"
                          style={{ color: testimonial.accent }}
                        >
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-800 text-sm">
                          {testimonial.role}
                        </p>
                        <p className="text-xs font-semibold">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Rating stars */}
                    <div className="flex mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-[#FFBF2F] fill-[#FFBF2F]"
                          />
                        ))}
                    </div>

                    {/* Quote */}
                    <div className="relative flex-grow">
                      <Quote className="absolute -top-1 -left-1 w-5 h-5 text-[#FFBF2F] opacity-20" />
                      <p className="quote-text text-gray-700 text-sm leading-relaxed pl-4 pr-2">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Corner accents */}
                    <div
                      className="absolute top-0 left-0 w-8 h-8 rounded-br-lg"
                      style={{ background: testimonial.accent, opacity: 0.1 }}
                    ></div>
                    <div
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-lg"
                      style={{ background: testimonial.accent, opacity: 0.1 }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <button
            className="carousel-nav-button prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="carousel-nav-button next"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Navigation indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="focus:outline-none"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div
                className={`indicator-dot w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "active bg-[#FFBF2F]" : "bg-gray-300"
                }`}
              ></div>
            </button>
          ))}
        </div>

        {/* View All Button */}

        {/* Counter */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white shadow-sm px-3 py-1 rounded-full">
            <span className="text-[#FFBF2F] font-bold">{activeIndex + 1}</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-gray-400">{testimonials.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
