import React, { useState, useEffect, useRef } from "react";
import { FaLinkedin } from "react-icons/fa";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const testimonials = [
  {
    name: "Aakash Raymond Datt",
    title: "Cybersecurity Analyst Level -2, Wipro",
    companyLogo: "/src/assets/frontend_assets/wipro_logo.png", // Use your local Wipro logo or a placeholder
    userImage: "https://randomuser.me/api/portraits/men/31.jpg", // Sample image
    linkedin: "#",
    testimonialMain: '"Capstone projects boosted my skills & confidence. Got promoted with 40% pay rise."',
    testimonialSub: "The course was comprehensive, suited for all experience levels, and perfectly paced. The capstone projects aligned with my work, especially one on malware protection and network monitoring, which are crucial to my role. Three months after completing the course, I was promoted to Cybersecurity Analyst Level-2 with a 40% increase in my salary.",
  },
  {
    name: "Umar Mohammed",
    title: "Lead Software Engineer, Altimetrik",
    companyLogo: "/src/assets/frontend_assets/altimetrik_logo.png", // Use your local Altimetrik logo or a placeholder
    userImage: "https://randomuser.me/api/portraits/men/34.jpg", // Sample image
    linkedin: "#",
    testimonialMain: '"The course helped me get a promoted as Lead Software Engineer with a 50% pay raise.”',
    testimonialSub: "Before this course, I worked as a Software Developer specializing in Java. The program equipped me with Python, Machine Learning, Data Science & AI skills. After completing it, I was assigned to data and machine learning projects, earning a promotion to Lead Software Engineer with a 50% pay raise.",
  },

  {
    name: "Aakash Raymond Datt",
    title: "Cybersecurity Analyst Level -2, Wipro",
    companyLogo: "/src/assets/frontend_assets/wipro_logo.png", // Use your local Wipro logo or a placeholder
    userImage: "https://randomuser.me/api/portraits/men/31.jpg", // Sample image
    linkedin: "#",
    testimonialMain: '"Capstone projects boosted my skills & confidence. Got promoted with 40% pay rise."',
    testimonialSub: "The course was comprehensive, suited for all experience levels, and perfectly paced. The capstone projects aligned with my work, especially one on malware protection and network monitoring, which are crucial to my role. Three months after completing the course, I was promoted to Cybersecurity Analyst Level-2 with a 40% increase in my salary.",
  },
  {
    name: "Umar Mohammed",
    title: "Lead Software Engineer, Altimetrik",
    companyLogo: "/src/assets/frontend_assets/altimetrik_logo.png", // Use your local Altimetrik logo or a placeholder
    userImage: "https://randomuser.me/api/portraits/men/34.jpg", // Sample image
    linkedin: "#",
    testimonialMain: '"The course helped me get a promoted as Lead Software Engineer with a 50% pay raise.”',
    testimonialSub: "Before this course, I worked as a Software Developer specializing in Java. The program equipped me with Python, Machine Learning, Data Science & AI skills. After completing it, I was assigned to data and machine learning projects, earning a promotion to Lead Software Engineer with a 50% pay raise.",
  },
];

function useCardsToShow() {
  const [cardsToShow, setCardsToShow] = useState(window.innerWidth < 768 ? 1 : 2);
  useEffect(() => {
    const handleResize = () => setCardsToShow(window.innerWidth < 768 ? 1 : 2);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return cardsToShow;
}

const Testimonial = () => {
  const cardsToShow = useCardsToShow();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const maxIdx = testimonials.length - cardsToShow;
  const intervalRef = useRef(null);

  // Auto-slide
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev >= maxIdx ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, cardsToShow, maxIdx]);

  // Manual navigation
  const handlePrev = () => setCurrent((prev) => (prev <= 0 ? maxIdx : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev >= maxIdx ? 0 : prev + 1));

  // Only render the visible window
  const visibleTestimonials = testimonials.slice(current, current + cardsToShow);

  // For smooth sliding
  const slideStyle = {
    display: 'flex',
    transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
    transform: `translateX(0)` // always 0, since we only render the visible window
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-10 px-2 sm:px-4 md:py-10 md:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 md:mb-10 text-center">
        What Our Learners Say
      </h2>
      <div
        className="relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cards */}
        <div className="overflow-hidden w-full flex justify-center items-center p-2 sm:p-6 md:p-10">
          <div style={slideStyle} className="w-full flex justify-center">
            {visibleTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col mx-2 sm:mx-4 transition-transform duration-300 border border-gray-100 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl min-h-[420px]"
              >
                <div className="flex items-center p-4 sm:p-6 pb-2 bg-[#f5f5f5] w-full">
                  <div className="relative">
                    <img
                      src={item.userImage}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-white shadow-md"
                    />
                    <a
                      // href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-0.5 -right-0.5 "
                      style={{ zIndex: 2 }}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white shadow border border-gray-200">
                        <FaLinkedin className="text-blue-600 text-base sm:text-lg md:text-xl" />
                      </span>
                    </a>
                  </div>
                  <div className="ml-3 sm:ml-4 flex-1">
                    <span className="font-bold text-base sm:text-lg md:text-xl text-gray-900 block leading-tight">{item.name}</span>
                    <span className="text-gray-700 text-xs sm:text-sm md:text-base block leading-tight">{item.title}</span>
                    <div className="mt-2 mb-1 flex items-center">
                      <img
                        src={item.companyLogo}
                        alt={item.companyLogo ? "Company Logo" : ""}
                        className="h-6 sm:h-8 object-contain"
                        onError={e => e.target.style.display='none'}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 flex flex-col justify-center">
                  <blockquote className="text-gray-700 text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 leading-snug">
                    {item.testimonialMain}
                  </blockquote>
                  <p className="text-gray-600 text-xs sm:text-base leading-relaxed text-justify font-medium font-sans font-serif ">
                    {item.testimonialSub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Dots for navigation */}
      </div>
      <div className="flex justify-center mt-4 sm:mt-6 gap-2">
        {Array.from({ length: testimonials.length - cardsToShow + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${current === idx ? "bg-blue-600" : "bg-gray-300"} transition-colors cursor-pointer`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
