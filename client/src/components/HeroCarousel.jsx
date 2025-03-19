import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/carousel/microsoft-azure.jpg', // Image showing Microsoft Azure certification
      title: 'Microsoft Azure Certifications',
      description: 'Become a certified Azure Solutions Architect, Developer, or Administrator. Master cloud computing with Microsoft\'s leading platform.',
      buttonText: 'Explore Azure Certifications',
      buttonLink: '/certifications/microsoft-azure'
    },
    {
      image: '/carousel/ibm-data-science.jpg', // Image showing IBM Data Science certification
      title: 'IBM Data Science & AI',
      description: 'Get certified in Data Science, Machine Learning, and AI with IBM\'s professional certification programs.',
      buttonText: 'View IBM Certifications',
      buttonLink: '/certifications/ibm'
    },
    {
      image: '/carousel/aws-cloud.jpg', // Image showing AWS certification
      title: 'AWS Cloud Solutions',
      description: 'Advance your career with AWS Certified Solutions Architect, Developer, and DevOps Engineer certifications.',
      buttonText: 'Discover AWS Paths',
      buttonLink: '/certifications/aws'
    },
    {
      image: '/carousel/google-cloud.jpg', // Image showing Google Cloud certification
      title: 'Google Cloud Platform',
      description: 'Master cloud technologies with Google Cloud Architect, Data Engineer, and Cloud Developer certifications.',
      buttonText: 'Start GCP Journey',
      buttonLink: '/certifications/google-cloud'
    },
    {
      image: '/carousel/cybersecurity.jpg', // Image showing Cybersecurity certification
      title: 'Cybersecurity Excellence',
      description: 'Get certified in CompTIA Security+, CEH, or CISSP. Become a cybersecurity expert with industry-leading certifications.',
      buttonText: 'Explore Security Certs',
      buttonLink: '/certifications/cybersecurity'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${
            index === currentSlide 
              ? 'translate-x-0 opacity-100' 
              : index < currentSlide 
                ? '-translate-x-full opacity-0' 
                : 'translate-x-full opacity-0'
          }`}
          style={{
            zIndex: index === currentSlide ? 10 : 0,
          }}
        >
          {/* Slide Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-20 flex items-center justify-center h-full">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 transform translate-y-0 opacity-100 transition-all duration-500 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-100 transform translate-y-0 opacity-100 transition-all duration-500 delay-200 drop-shadow-md">
                {slide.description}
              </p>
              <Link
                to={slide.buttonLink}
                className="inline-block bg-[#0da2e5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#0b8ac2] transition-all duration-300 transform translate-y-0 opacity-100 hover:scale-105 shadow-lg"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel; 