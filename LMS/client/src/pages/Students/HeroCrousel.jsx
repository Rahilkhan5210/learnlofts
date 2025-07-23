
// import { Button } from "@/components/ui/button";
// import { carouselData } from "../Students/CrouselData";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Users,
//   Star,
//   Award,
//   BookOpen,
//   Trophy,
//   CheckCircle,
//   Clock,
//   Hammer,
//   Shield,
//   Database,
//   BarChart2,
//   Cpu,
//   Cloud,
//   Briefcase,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";

// // Custom Arrows
// function NextArrow({ onClick }) {
//   return (
//     <div
//       className="absolute right-6 top-1/2 z-3 transform -translate-y-1/2 cursor-pointer text-white bg-black/40 p-2 rounded-full"
//       onClick={onClick}
//     >
//       <ArrowRight size={24} />
//     </div>
//   );
// }

// function PrevArrow({ onClick }) {
//   return (
//     <div
//       className="absolute left-6 top-1/2 z-3 transform -translate-y-1/2 cursor-pointer text-white bg-black/40 p-2 rounded-full"
//       onClick={onClick}
//     >
//       <ArrowLeft size={24} />
//     </div>
//   );
// }

// // Icons
// const statIcons = {
//   students: <Users className="w-5 h-5 text-blue-400" />,
//   courses: <BookOpen className="w-5 h-5 text-purple-400" />,
//   rating: <Star className="w-5 h-5 text-yellow-400" />,
//   experts: <Award className="w-5 h-5 text-green-400" />,
//   projects: <Trophy className="w-5 h-5 text-yellow-400" />,
//   hours: <Clock className="w-5 h-5 text-pink-400" />,
//   certification: <CheckCircle className="w-5 h-5 text-green-400" />,
//   jobReady: <Briefcase className="w-5 h-5 text-blue-500" />,
//   tools: <Hammer className="w-5 h-5 text-indigo-400" />,
//   datasets: <Database className="w-5 h-5 text-orange-400" />,
//   aiProjects: <Cpu className="w-5 h-5 text-red-400" />,
//   platforms: <Cloud className="w-5 h-5 text-cyan-400" />,
//   labs: <Shield className="w-5 h-5 text-rose-400" />,
//   scenarios: <BarChart2 className="w-5 h-5 text-lime-400" />,
// };

// function HeroCarousel() {
//   const navigate = useNavigate();
//   const sliderRef = useRef(null);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 7000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     beforeChange: (_, next) => {
//       const slides = document.querySelectorAll(".hero-carousel .slick-slide");
//       slides.forEach((slide, index) => {
//         slide.toggleAttribute("inert", index !== next);
//       });
//     },
//   };

//   useEffect(() => {
//     return () => {
//       const slides = document.querySelectorAll(".hero-carousel .slick-slide");
//       slides.forEach((slide) => slide.removeAttribute("inert"));
//     };
//   }, []);

//   return (
//     <div className="mt-0 relative text-center">
//       {/* Top Stats Bar */}
//       <div className="absolute top-0 left-0 right-0 bg-white/90 z-10 py-4 shadow-md">
//         <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
//           <div className="flex items-center justify-center gap-2">
//             <Users className="w-5 h-5 text-blue-600" />
//             <div>
//               <p className="font-bold text-lg">50K+</p>
//               <p className="text-gray-600">Active Learners</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-center gap-2">
//             <Star className="w-5 h-5 text-yellow-500" />
//             <div>
//               <p className="font-bold text-lg">4.8/5</p>
//               <p className="text-gray-600">Course Rating</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-center gap-2">
//             <Award className="w-5 h-5 text-green-600" />
//             <div>
//               <p className="font-bold text-lg">100+</p>
//               <p className="text-gray-600">Expert Instructors</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-center gap-2">
//             <BookOpen className="w-5 h-5 text-purple-600" />
//             <div>
//               <p className="font-bold text-lg">500+</p>
//               <p className="text-gray-600">Courses Available</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Carousel */}
//       <div className="hero-carousel">
//         <Slider ref={sliderRef} {...settings}>
//           {carouselData.map((item) => (
//             <div key={item.id} className="relative h-[650px] w-full">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover absolute top-0 left-0 z-0 brightness-[.4]"
//               />
//               <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20 z-10 text-white text-center">
//                 <div className="bg-white/20 px-4 py-1 rounded-full mb-3 text-sm font-semibold uppercase tracking-widest">
//                   {item.highlight}
//                 </div>
//                 <h2 className="text-3xl md:text-5xl font-bold mb-3">{item.title}</h2>
//                 <p className="text-lg md:text-xl mb-4 max-w-3xl text-white/90">{item.tagline}</p>
//                 <p className="text-sm md:text-base max-w-3xl text-white/80 mb-5">
//                   {item.description}
//                 </p>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mb-4">
//                   {item.stats &&
//                     Object.entries(item.stats).map(([key, value]) => (
//                       <div
//                         key={key}
//                         className="flex items-center justify-center gap-2 bg-white/10 px-3 py-2 rounded-md text-sm"
//                       >
//                         {statIcons[key]}
//                         <span>{value}</span>
//                       </div>
//                     ))}
//                 </div>

//                 {/* Info */}
//                 {item.moneyBack && (
//                   <p className="text-white font-medium italic mb-1">{item.moneyBack}</p>
//                 )}
//                 {(item.level || item.duration) && (
//                   <p className="text-sm mb-2 text-white/80">
//                     {item.level && <span className="mr-4">📘 {item.level}</span>}
//                     {item.duration && <span>⏳ {item.duration}</span>}
//                   </p>
//                 )}

//                 {/* Testimonial */}
//                 {item.testimonial && (
//                   <blockquote className="italic text-white/70 mb-6 max-w-2xl">
//                     “{item.testimonial}”
//                   </blockquote>
//                 )}

//                 <Button
//                   variant="default"
//                   className="text-md md:text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700"
//                   onClick={() => navigate(item.link)}
//                 >
//                   {item.buttonText}
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

// export default HeroCarousel;





import { Button } from "@/components/ui/button";
import { carouselData } from "../Students/CrouselData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Star,
  Award,
  BookOpen,
  Trophy,
  CheckCircle,
  Clock,
  Hammer,
  Shield,
  Database,
  BarChart2,
  Cpu,
  Cloud,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

// Custom Arrows - Made larger for mobile
function NextArrow({ onClick }) {
  return (
    <div
      className="absolute right-2 md:right-6 top-1/2 z-3 transform -translate-y-1/2 cursor-pointer text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ArrowRight size={20} className="md:w-6 md:h-6" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute left-2 md:left-6 top-1/2 z-3 transform -translate-y-1/2 cursor-pointer text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ArrowLeft size={20} className="md:w-6 md:h-6" />
    </div>
  );
}

// Icons
const statIcons = {
  students: <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />,
  courses: <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />,
  rating: <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />,
  experts: <Award className="w-4 h-4 md:w-5 md:h-5 text-green-400" />,
  projects: <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />,
  hours: <Clock className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />,
  certification: <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />,
  jobReady: <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />,
  tools: <Hammer className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />,
  datasets: <Database className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />,
  aiProjects: <Cpu className="w-4 h-4 md:w-5 md:h-5 text-red-400" />,
  platforms: <Cloud className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />,
  labs: <Shield className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />,
  scenarios: <BarChart2 className="w-4 h-4 md:w-5 md:h-5 text-lime-400" />,
};

function HeroCarousel() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots !bottom-4", // Position dots higher on mobile
    customPaging: () => (
      <div className="w-2 h-2 bg-white/50 rounded-full transition-all duration-300" />
    ),
    beforeChange: (_, next) => {
      const slides = document.querySelectorAll(".hero-carousel .slick-slide");
      slides.forEach((slide, index) => {
        slide.toggleAttribute("inert", index !== next);
      });
    },
  };

  useEffect(() => {
    return () => {
      const slides = document.querySelectorAll(".hero-carousel .slick-slide");
      slides.forEach((slide) => slide.removeAttribute("inert"));
    };
  }, []);

  return (
    <div className="mt-0 relative text-center">
      {/* Top Stats Bar - Simplified for mobile */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 z-10 py-2 md:py-4 shadow-md">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center text-xs md:text-sm">
          <div className="flex items-center justify-center gap-1 md:gap-2">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <div>
              <p className="font-bold text-sm md:text-lg">50K+</p>
              <p className="text-gray-600 text-xs md:text-sm">Learners</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 md:gap-2">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            <div>
              <p className="font-bold text-sm md:text-lg">4.8/5</p>
              <p className="text-gray-600 text-xs md:text-sm">Rating</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 md:gap-2">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            <div>
              <p className="font-bold text-sm md:text-lg">100+</p>
              <p className="text-gray-600 text-xs md:text-sm">Experts</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 md:gap-2">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            <div>
              <p className="font-bold text-sm md:text-lg">500+</p>
              <p className="text-gray-600 text-xs md:text-sm">Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="hero-carousel">
        <Slider ref={sliderRef} {...settings}>
          {carouselData.map((item) => (
            <div key={item.id} className="relative h-[500px] md:h-[650px] w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover absolute top-0 left-0 z-0 brightness-[.4]"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20 z-10 text-white text-center">
                <div className="bg-white/20 px-3 py-1 rounded-full mb-2 md:mb-3 text-xs md:text-sm font-semibold uppercase tracking-widest">
                  {item.highlight}
                </div>
                <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-3 leading-tight">
                  {item.title}
                </h2>
                <p className="text-base md:text-xl mb-3 md:mb-4 max-w-3xl text-white/90 leading-snug">
                  {item.tagline}
                </p>
                <p className="text-xs md:text-base max-w-3xl text-white/80 mb-4 md:mb-5">
                  {item.description}
                </p>

                {/* Stats - Simplified for mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mb-3 md:mb-4">
                  {item.stats &&
                    Object.entries(item.stats).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-center gap-1 md:gap-2 bg-white/10 px-2 py-1 md:px-3 md:py-2 rounded-md text-xs md:text-sm"
                      >
                        {statIcons[key]}
                        <span>{value}</span>
                      </div>
                    ))}
                </div>

                {/* Info */}
                {item.moneyBack && (
                  <p className="text-white font-medium italic text-sm mb-1">
                    {item.moneyBack}
                  </p>
                )}
                {(item.level || item.duration) && (
                  <p className="text-xs md:text-sm mb-2 text-white/80">
                    {item.level && <span className="mr-2 md:mr-4">📘 {item.level}</span>}
                    {item.duration && <span>⏳ {item.duration}</span>}
                  </p>
                )}

                {/* Testimonial - Hidden on mobile if space is tight */}
                {item.testimonial && (
                  <blockquote className="hidden md:block italic text-white/70 mb-6 max-w-2xl">
                    “{item.testimonial}”
                  </blockquote>
                )}

                <Button
                  variant="default"
                  className="text-sm md:text-lg px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate(item.link)}
                >
                  {item.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default HeroCarousel;