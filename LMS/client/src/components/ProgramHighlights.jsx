import React from "react";
import Marquee from "react-fast-marquee";


const highlights = [
  {
    image: "src/assets/frontend_assets/programhighlights/image2.jpg", 
    title: "Cutting Edge Curriculum",
    description: "Co-created with the world's top universities and companies",
  },
  {
    image: "src/assets/frontend_assets/programhighlights/image4.jpg",
    title: "Taught Live by Industry Experts",
    description: "Learn live from practitioners with real world experience",
  },
  {
    image: "src/assets/frontend_assets/programhighlights/image3.jpg",
    title: "Hands-on Learning",
    description: "Work on real projects and case studies for practical skills",
  },
  {
    image: "src/assets/frontend_assets/programhighlights/careersupport.jpg",
    title: "Career Support",
    description: "Get guidance, mentorship, and placement assistance",
  },
];

const placedCompanies = [
  { name: "HCL", logo: "/src/assets/frontend_assets/companylogo/HCL.png" },
  { name: "Google", logo: "/src/assets/frontend_assets/companylogo/google.png" },
  { name: "Microsoft", logo: "/src/assets/frontend_assets/companylogo/microsoft.png" },
  { name: "Wipro", logo: "/src/assets/frontend_assets/companylogo/wipro.png" },
  { name: "TCS", logo: "/src/assets/frontend_assets/companylogo/tcs.png" },
  { name: "Infosys", logo: "/src/assets/frontend_assets/companylogo/info.png" },
  { name: "Capgemini", logo: "/src/assets/frontend_assets/companylogo/cap.png" },
  { name: "Tech Mahindra", logo:"/src/assets/frontend_assets/companylogo/info.png" },
  { name: "Cognizant", logo:"/src/assets/frontend_assets/companylogo/info.png" },
  { name: "Accenture", logo:"/src/assets/frontend_assets/companylogo/Acc.jpg"},
  { name: "IBM", logo: "/src/assets/frontend_assets/companylogo/info.png"},
  { name: "Dell", logo: "/src/assets/frontend_assets/companylogo/info.png"},
];

const ProgramHighlights = () => (
  <>
    <section className="mx-auto py-16 px-4  w-[88%]">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Why Our Programs Stand Out
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full md:w-1/2 h-56 object-cover"
            />
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Professional Placed Companies Section */}
    {/* <section className="py-14 bg-gradient-to-b from-gray-50 to-white w-[95%] mx-auto rounded-2xl shadow-sm mb-10">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">
        Our Learners Are Placed In
      </h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Trusted by top companies for talent and upskilling
      </p>
      <Marquee
        gradient={true}
        gradientWidth={60}
        speed={70}
        pauseOnHover={true}
        className=""
      >
        {placedCompanies.map((company) => (
          <div
            key={company.name}
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow hover:shadow-md transition mx-6 p-3 h-28 w-36"
            title={company.name}
          >
            <img
              src={company.logo}
              alt={company.name}
              className="max-h-16 w-auto object-contain mb-2"
              loading="lazy"
              onError={e => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
            />
            <span className="text-sm font-medium text-gray-700 text-center">{company.name}</span>
          </div>
        ))}
      </Marquee>
    </section> */}

<section className="py-16 bg-gradient-to-b from-gray-50 to-white w-[88%] mx-auto rounded-2xl shadow-sm mb-12">
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-2 mb-2">
      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 tracking-tight">
        Our Learners Are Placed In
      </h2>
    </div>
    <div className="w-24 h-1 bg-blue-600 rounded-full mb-4 animate-pulse"></div>
    <p className="text-center text-gray-600 mb-10 text-base sm:text-lg max-w-2xl">
      Our alumni have launched their careers at top companies worldwide. <span className="font-semibold text-blue-700">Join a network of successful professionals</span> making an impact in the industry. Your dream job could be next!
    </p>
  </div>
  <Marquee
    gradient={true}
    gradientWidth={60}
    speed={70}
    pauseOnHover={true}
    className=""
  >
    {placedCompanies.map((company) => (
      <div
        key={company.name}
        className="flex flex-col items-center justify-center mx-8"
        title={company.name}
      >
        <div className="rounded-full bg-white border-2 border-blue-100 shadow-md flex items-center justify-center h-20 w-20 sm:h-22 sm:w-22 mb-2 transition-transform duration-300">
          <img
            src={company.logo}
            alt={company.name}
            className="max-h-12 sm:max-h-16 w-auto object-contain"
            loading="lazy"
            onError={e => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
          />
        </div>
        <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{company.name}</span>
      </div>
    ))}
  </Marquee>
</section>
  </>
);

export default ProgramHighlights;