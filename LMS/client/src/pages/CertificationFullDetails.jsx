// //certificationaFullDetails
// import { useParams } from 'react-router-dom';
// import { useGetCertificationByIdQuery } from '../Features/Api/certificationsApi';
// import { Clock, Award, ChevronRight } from 'lucide-react';
// // import ChatBot from '@/components/ChatBot';
// import { useState, useEffect } from 'react';
// import { FaStar } from 'react-icons/fa';
// import toast from 'react-hot-toast';

// export default function CertificationFullDetails() {
//   const { id } = useParams();
//   const { data: cert, isLoading, isError } = useGetCertificationByIdQuery(id);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [id]);

//   useEffect(() => {
//     if (cert) {
//       // Transform and validate the data
//       const transformedData = {
//         ...cert,
//         requirements: {
//           experience: Array.isArray(cert.requirements?.experience) ?
//             cert.requirements.experience :
//             ["5 years total work experience (1 year in decision-making role)",
//               "Education waivers:",
//               "Associate degree - 1 year waived",
//               "Bachelor's degree - 3 years waived",
//               "Graduate degree - 4 years waived"],
//           decision_making: cert.requirements?.decision_making || "Defined as authority to execute/control processes with outcome responsibility"
//         },
//         exam_details: {
//           format: cert.exam_details?.format || "145 multiple-choice questions (135 scored)",
//           duration: cert.exam_details?.duration || "4 hours 18 minutes (CBT)",
//           delivery: Array.isArray(cert.exam_details?.delivery) && cert.exam_details.delivery.length > 0 ?
//             cert.exam_details.delivery :
//             ["Computer-Based Testing (Prometric)", "Paper-Based Testing (4 hours)"],
//           windows: cert.exam_details?.windows || "July and November annually",
//           retake_fee: cert.exam_details?.retake_fee || "333.00 (valid for 2 years)"
//         },
//         policies: cert.policies || {
//           materials: "Open-book (bring approved references)",
//           id_requirements: "Government-issued photo ID with signature",
//           refund_policy: "130.00 processing fee for denied applications"
//         },
//         course_content: Array.isArray(cert.course_content) ? cert.course_content : []
//       };

//       console.log('Certification Data Debug:', {
//         id: transformedData._id,
//         title: transformedData.title,
//         hasContent: Boolean(transformedData.course_content),
//         contentType: transformedData.course_content ? typeof transformedData.course_content : 'undefined',
//         contentKeys: transformedData.course_content ? Object.keys(transformedData.course_content) : [],
//         rawContent: transformedData.course_content,
//         requirements: transformedData.requirements,
//         examDetails: transformedData.exam_details,
//         policies: transformedData.policies,
//         fullCert: transformedData
//       });
//     }
//   }, [cert]);

//   const [showFaq1, setShowFaq1] = useState(false);
//   const [showFaq2, setShowFaq2] = useState(false);
//   const [showFaq3, setShowFaq3] = useState(false);
//   const [showFaq4, setShowFaq4] = useState(false);

//   // Add image URL transformation function
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "/placeholder.png";
//     return imagePath.startsWith("http")
//       ? imagePath
//       : `http://localhost:9000${imagePath}`;
//   };

//   // Update PDF URL transformation function
//   const getPdfUrl = (pdfPath) => {
//     if (!pdfPath) return null;

//     // Remove any leading dots and ensure we have a leading slash
//     const cleanPath = pdfPath.replace(/^\.+/, '').replace(/^\/+/, '');

//     // Extract the filename and preserve its case exactly as in the JSON
//     const filename = cleanPath.split('/').pop();
//     const url = `http://localhost:9000/pdfs/${filename}`;

//     console.log('PDF URL generation:', {
//       originalPath: pdfPath,
//       cleanPath,
//       filename,
//       finalUrl: url
//     });

//     return url;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <p className="text-gray-600 text-center">Loading...</p>
//       </div>
//     );
//   }

//   if (isError || !cert) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <p className="text-gray-600 text-center">Certificate not found.</p>
//       </div>
//     );
//   }

//   const handleDownloadSyllabus = async () => {
//     if (!cert.syllabus_pdf) {
//       console.log('No PDF path found in cert:', cert);
//       toast.error("No syllabus PDF available");
//       return;
//     }

//     try {
//       console.log('Certificate data:', cert);
//       console.log('Syllabus PDF path:', cert.syllabus_pdf);

//       // Ensure we're using the correct PDF path from the certificate
//       const pdfPath = cert.syllabus_pdf.startsWith('./') ? cert.syllabus_pdf.substring(2) : cert.syllabus_pdf;
//       const pdfUrl = getPdfUrl(pdfPath);

//       console.log('Generated PDF URL:', pdfUrl);

//       if (!pdfUrl) {
//         toast.error("Invalid PDF URL");
//         return;
//       }

//       // Create a loading toast
//       const loadingToast = toast.loading("Downloading syllabus...");

//       // Fetch the PDF with CORS headers
//       console.log('Fetching PDF from:', pdfUrl);
//       const response = await fetch(pdfUrl, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//           'Accept': 'application/pdf'
//         }
//       });

//       if (!response.ok) {
//         console.error('PDF fetch failed:', response.status, response.statusText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Get the blob
//       const blob = await response.blob();

//       // Create a download link
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;

//       // Get filename from the path or use default
//       const filename = cert.syllabus_pdf.split('/').pop() || 'syllabus.pdf';
//       link.setAttribute('download', filename);

//       // Trigger download
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       // Dismiss loading toast and show success
//       toast.dismiss(loadingToast);
//       toast.success("Syllabus downloaded successfully!");
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       toast.error("Failed to download syllabus. Please try again.");
//     }
//   };

//   console.log("Selected Category:", cert.category);
//   console.log("Available Categories:", Object.keys(cert));
//   console.log("Certifications for category:", cert);
//   console.log('Image data:', cert?.image);

//   // Add debug check before course content section
//   const renderCourseContent = () => {
//     if (!cert?.course_content || !Array.isArray(cert.course_content) || cert.course_content.length === 0) {
//       console.log('Course content not available or invalid');
//       return null;
//     }

//     return (
//       <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//         <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Course Content</h2>
//         <div className="space-y-4">
//           {cert.course_content.map((content, index) => {
//             console.log('Module data:', content);
//             return (
//               <div key={content._id || index} className="border rounded-lg p-4">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">{content.title}</h3>
//                 <div className="space-y-3">
//                   {content.lessons?.map((lesson, lessonIndex) => {
//                     console.log('Lesson data:', lesson);
//                     return (
//                       <details key={lesson._id || lessonIndex} className="group">
//                         <summary className="flex items-center gap-2 sm:gap-3 cursor-pointer list-none p-2 sm:p-3 rounded-lg hover:bg-gray-50">
//                           <div className="flex-1">
//                             <h4 className="text-sm sm:text-base font-medium text-gray-900">{lesson.title}</h4>
//                           </div>
//                           <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform group-open:rotate-90" />
//                         </summary>
//                         {lesson.topics && lesson.topics.length > 0 && (
//                           <div className="pl-6 sm:pl-8 mt-2 space-y-2">
//                             {lesson.topics.map((topic, topicIndex) => (
//                               <div key={topicIndex} className="flex items-center gap-2">
//                                 <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
//                                 <p className="text-sm sm:text-base text-gray-600">{topic}</p>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </details>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     );
//   };

//   return (
//     <div className="min-h-screen  py-4 px-4 sm:py-6 sm:px-6 lg:px-8 -mt-15">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-sm p-3 sm:p-6 mb-4 sm:mb-8">
//           <div className="flex flex-col md:flex-row gap-3 sm:gap-6 items-start">
//             <div className="w-full md:w-1/3 lg:w-1/4">
//               <div className="relative aspect-square w-32 h-32 sm:w-64 sm:h-64 md:w-full md:h-auto mx-auto rounded-xl overflow-hidden bg-gray-100 shadow-sm">
//                 {cert.image && (
//                   <img
//                     src={getImageUrl(Array.isArray(cert.image) ? cert.image[0] : cert.image)}
//                     alt={cert.title}
//                     className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 p-2 sm:p-4"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "/placeholder.png";
//                     }}
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="flex-1 w-full">
//               <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
//                 {cert.title}
//               </h1>
//               <p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-6">{cert.description}</p>

//               {/* 100% pass guarantee */}
//               <div className="w-full sm:w-[70%] bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 sm:p-6 mb-3 sm:mb-6 shadow-lg transform hover:scale-[1.03] transition-transform duration-300">
//                 <div className="flex items-start gap-3">
//                   <div className="flex-shrink-0 bg-white rounded-full p-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">100% Passing Program or Your Money Back</h3>
//                     <p className="text-blue-100 text-xs sm:text-base">
//                       LearnLofts proudly offers a 100% Passing Rate Guarantee—if you don't pass, you get your money back. No risk, only reward.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-xs sm:text-sm">
//                 <span className="text-lg sm:text-2xl font-bold text-blue-600">
//                   Price:${cert.price}
//                 </span>
//                 <div className="flex items-center text-gray-600">
//                   <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
//                   <span className="text-xs sm:text-base">{cert.duration}</span>
//                 </div>
//                 {cert.tag && (
//                   <span className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm ${cert.tagColor}`}>
//                     {cert.tag}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Sections */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 ">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-4 sm:space-y-8">
//             {/* Action Buttons Section */}
//             <div className="rounded-xl shadow-sm p-3 sm:p-6 mb-2">
//               <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
//                 <button
//                   className="w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg text-base sm:text-lg font-medium hover:bg-blue-700 transition-all duration-200"
//                   onClick={() => window.location.href = '#enroll'}
//                 >
//                   Apply Now
//                 </button>
//                 <button
//                   className="w-full bg-white text-blue-600 text-center py-3 px-6 rounded-lg text-base sm:text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
//                   onClick={handleDownloadSyllabus}
//                 >
//                   Download Syllabus
//                 </button>
//               </div>
//             </div>

//             {/* Certification Comparison */}
//             <section className="bg-white rounded-xl shadow-sm p-3 sm:p-6 mt-2">
//               <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-6 text-center">
//                 Why Certification Is Important ?
//               </h2>
//               <div className="relative overflow-hidden ">
//                 <div className="overflow-x-auto -mx-2 sm:mx-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//                   <div className="inline-block min-w-full align-middle">
//                     <table className="min-w-full divide-y divide-gray-200 bg-white text-black rounded-lg overflow-hidden text-xs sm:text-sm border border-gray-200">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider w-1/4 border-b border-gray-200">
//                             Criteria
//                           </th>
//                           <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b border-gray-200">
//                             Certified Professionals
//                           </th>
//                           <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider border-b border-gray-200">
//                             Non-Certified Professionals
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-100">
//                         <tr className="hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Average Salary</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">₹12–25 LPA (depending on field & experience)</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">₹6–15 LPA (limited by lack of credentials)</td>
//                         </tr>
//                         <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Salary Growth Rate</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">20%–40% higher than non-certified peers</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Slower salary growth</td>
//                         </tr>
//                         <tr className="hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Job Opportunities</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">More job offers from top companies globally</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Fewer and often lower-paying job opportunities</td>
//                         </tr>
//                         <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Career Progression</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Faster promotions, leadership roles</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Slower career growth</td>
//                         </tr>
//                         <tr className="hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Industry Recognition</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Recognized for specialized skills</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">May need to prove skills through experience alone</td>
//                         </tr>
//                         <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Global Opportunities</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">High chance of working with international clients</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Limited unless skills are proven otherwise</td>
//                         </tr>
//                         <tr className="hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Roles Often Landed</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Cloud Architect, Cybersecurity Analyst, AI Engineer, Project Manager</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Junior Developer, Support Engineer, Assistant Roles</td>
//                         </tr>
//                         <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Job Security</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Higher due to in-demand certified skills</td>
//                           <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Moderate, depends on employer perception</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent h-4 pointer-events-none sm:hidden"></div>
//               </div>
//               <p className="mt-2 text-xs text-gray-500 italic sm:hidden">Scroll horizontally to view more →</p>
//             </section>

//             {/* Introduction */}
//             <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Introduction</h2>
//               <p className="text-sm sm:text-base text-gray-600">{cert.introduction}</p>
//             </section>

//             {/* Key Highlights */}
//             <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Key Highlights</h2>
//               <div className="space-y-3 sm:space-y-4">
//                 {cert.key_1 && (
//                   <div className="flex gap-2 sm:gap-3">
//                     <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
//                     <p className="text-sm sm:text-base text-gray-600">{cert.key_1}</p>
//                   </div>
//                 )}
//                 {cert.key_2 && (
//                   <div className="flex gap-2 sm:gap-3">
//                     <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
//                     <p className="text-sm sm:text-base text-gray-600">{cert.key_2}</p>
//                   </div>
//                 )}
//                 {cert.key_3 && (
//                   <div className="flex gap-2 sm:gap-3">
//                     <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
//                     <p className="text-sm sm:text-base text-gray-600">{cert.key_3}</p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Course Benefits */}
//             <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Course Benefits</h2>
//               <div className="space-y-3 sm:space-y-4">
//                 {cert.Course_Benefits && (
//                   <div className="flex gap-2 sm:gap-3">
//                     <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
//                     <p className="text-sm sm:text-base text-gray-600">{cert.Course_Benefits}</p>
//                   </div>
//                 )}
//                 {cert.Course_Benefits_2 && (
//                   <div className="flex gap-2 sm:gap-3">
//                     <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
//                     <p className="text-sm sm:text-base text-gray-600">{cert.Course_Benefits_2}</p>
//                   </div>
//                 )}
//                 {cert.Course_Benefits_3 && (
//                   <div className="flex gap-2 sm:gap-3">
//                     <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
//                     <p className="text-sm sm:text-base text-gray-600">{cert.Course_Benefits_3}</p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Course Content */}
//             {renderCourseContent()}

//             {/* Requirements Section */}
//             {cert.requirements && (
//               <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-6 relative border-2 border-blue-100 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
//                 <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
//                   IMPORTANT
//                 </div>
//                 <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6">Requirements & Experience</h2>

//                 {/* Experience Requirements */}
//                 {cert.requirements.experience && cert.requirements.experience.length > 0 && (
//                   <div className="mb-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                       <svg className="w-6 h-6 text-blue-600 mr-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       Experience Requirements
//                     </h3>
//                     <ul className="list-none space-y-3">
//                       {cert.requirements.experience.map((req, index) => (
//                         <li key={index} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
//                           <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
//                           {req}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Decision Making Role */}
//                 {cert.requirements.decision_making && (
//                   <div className="bg-blue-500 p-6 rounded-xl border-l-4  transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
//                       <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                       </svg>
//                       Decision Making Role
//                     </h3>
//                     <p className="text-white hover:text-yellow-800 transition-colors">{cert.requirements.decision_making}</p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* Exam Details Section */}
//             {cert.exam_details && (
//               <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-6 relative border-2 border-purple-100 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
//                 <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
//                   EXAM INFO
//                 </div>
//                 <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-6">Exam Details</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Format */}
//                   {cert.exam_details.format && (
//                     <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-500 transform transition-all duration-300 hover:shadow-lg">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                         <span className="mr-3">📝</span>
//                         Format
//                       </h3>
//                       <p className="text-gray-700 hover:text-purple-800 transition-colors">{cert.exam_details.format}</p>
//                     </div>
//                   )}

//                   {/* Duration */}
//                   {cert.exam_details.duration && (
//                     <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-500 transform transition-all duration-300 hover:shadow-lg">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                         <span className="mr-3">⏱️</span>
//                         Duration
//                       </h3>
//                       <p className="text-gray-700 hover:text-purple-800 transition-colors">{cert.exam_details.duration}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Delivery Methods */}
//                 {cert.exam_details.delivery && cert.exam_details.delivery.length > 0 && (
//                   <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                       <span className="mr-3">🎯</span>
//                       Delivery Methods
//                     </h3>
//                     <ul className="list-none space-y-3">
//                       {cert.exam_details.delivery.map((method, index) => (
//                         <li key={index} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
//                           <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
//                           {method}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Exam Windows */}
//                 {cert.exam_details.windows && (
//                   <div className="mt-6 bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-l-4 border-yellow-500 transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                       <span className="mr-3">📅</span>
//                       Exam Windows
//                     </h3>
//                     <p className="text-gray-700 hover:text-yellow-800 transition-colors">{cert.exam_details.windows}</p>
//                   </div>
//                 )}

//                 {/* Retake Fee */}
//                 {cert.exam_details.retake_fee && (
//                   <div className="mt-6 bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-l-4 border-red-500 transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                       <span className="mr-3">💰</span>
//                       Retake Fee
//                     </h3>
//                     <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">${cert.exam_details.retake_fee}</p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* Policies Section */}
//             {cert.policies && (
//               <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-6 relative border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
//                 <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-600 to-green-800 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
//                   POLICIES
//                 </div>
//                 <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 mb-6">Policies</h2>

//                 {/* Materials */}
//                 {cert.policies.materials && (
//                   <div className="mb-6 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-500 transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                       <span className="mr-3">📚</span>
//                       Materials Policy
//                     </h3>
//                     <p className="text-gray-700 hover:text-green-800 transition-colors">{cert.policies.materials}</p>
//                   </div>
//                 )}

//                 {/* ID Requirements */}
//                 {cert.policies.id_requirements && (
//                   <div className="mb-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                       <span className="mr-3">🪪</span>
//                       ID Requirements
//                     </h3>
//                     <p className="text-gray-700 hover:text-blue-800 transition-colors">{cert.policies.id_requirements}</p>
//                   </div>
//                 )}

//                 {/* Refund Policy */}
//                 {cert.policies.refund_policy && (
//                   <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-l-4 border-red-500 transform transition-all duration-300 hover:shadow-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                       <span className="mr-3">💳</span>
//                       Refund Policy
//                     </h3>
//                     <p className="text-xl  text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">${cert.policies.refund_policy}</p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* Why Choose LearnLofts */}
//             <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//               <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
//                 Why Choose LearnLofts for Your Certification Journey?
//               </h2>
//               <div className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-blue-900 mb-2">
//                       Future-Ready Training Across Industries
//                     </h3>
//                     <p className="text-base text-blue-800">
//                       At LearnLofts, we offer a wide spectrum of in-demand certifications to power your career—ranging from Project Management, Information Security, and Quality Management to Networking, Cyber Security, Scrum & Agile, Microsoft Certifications, Amazon Web Services, and more. Whether you're upgrading skills or stepping into a new domain, we've got the roadmap.
//                     </p>
//                   </div>

//                   <div className="bg-green-50 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-green-900 mb-2">
//                       Expert Mentors with Real-World Experience
//                     </h3>
//                     <p className="text-base text-green-800">
//                       Our trainers aren't just certified professionals—they're working experts with years of hands-on experience. They bring industry scenarios into the classroom, helping you master not just theory, but application.
//                     </p>
//                   </div>

//                   <div className="bg-purple-50 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-purple-900 mb-2">
//                       Tailored Learning for Maximum Impact
//                     </h3>
//                     <p className="text-base text-purple-800">
//                       Every learner is unique, and so is our approach. LearnLofts offers flexible, personalized learning paths designed to suit your style, pace, and goals. Whether you're self-paced or prefer guided sessions, we align with your rhythm.
//                     </p>
//                   </div>

//                   <div className="bg-yellow-50 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-yellow-900 mb-2">
//                       Guaranteed Success or Your Money Back
//                     </h3>
//                     <p className="text-base text-yellow-800">
//                       We stand behind our training with confidence. LearnLofts proudly offers a 100% Passing Rate Guarantee—if you don't pass, you get your money back. No risk, only reward.
//                     </p>
//                   </div>

//                   <div className="bg-red-50 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-red-900 mb-2">
//                       Beyond Certification – Real Career Growth
//                     </h3>
//                     <p className="text-base text-red-800">
//                       We go beyond helping you pass an exam. Our training equips you with career-ready skills, industry insights, and the confidence to lead in your chosen field.
//                     </p>
//                   </div>

//                   <div className="bg-indigo-50 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-indigo-900 mb-2">
//                       Join LearnLofts Today
//                     </h3>
//                     <p className="text-base text-indigo-800">
//                       Your success is our mission. With the right support, expert guidance, and our proven methods, you're not just getting certified—you're getting ahead.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Faqs */}
//             <div className="mb-8 space-y-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>

//               {/* FAQ Item 1 */}
//               <div className="border-b border-gray-200 pb-4">
//                 <button
//                   onClick={() => setShowFaq1(!showFaq1)}
//                   className="flex items-center justify-between w-full text-left"
//                 >
//                   <span className="font-medium text-gray-800">Who can take Learnlofts certifications?</span>
//                   <ChevronRight
//                     className={`transition-transform duration-200 ${showFaq1 ? 'rotate-90' : ''}`}
//                   />
//                 </button>
//                 {showFaq1 && (
//                   <p className="mt-2 text-gray-600">
//                     Our certifications are designed for professionals at all levels - from beginners looking to enter the field to experienced practitioners seeking validation of their skills.
//                   </p>
//                 )}
//               </div>

//               {/* FAQ Item 2 */}
//               <div className="border-b border-gray-200 pb-4">
//                 <button
//                   onClick={() => setShowFaq2(!showFaq2)}
//                   className="flex items-center justify-between w-full text-left"
//                 >
//                   <span className="font-medium text-gray-800">Are Learnlofts certifications globally recognized?</span>
//                   <ChevronRight
//                     className={`transition-transform duration-200 ${showFaq2 ? 'rotate-90' : ''}`}
//                   />
//                 </button>
//                 {showFaq2 && (
//                   <p className="mt-2 text-gray-600">
//                     Yes, Learnlofts certifications are industry-approved and recognized by employers worldwide, especially in Networking, Cloud Computing, and Microsoft technologies.
//                   </p>
//                 )}
//               </div>

//               {/* FAQ Item 3 */}
//               <div className="border-b border-gray-200 pb-4">
//                 <button
//                   onClick={() => setShowFaq3(!showFaq3)}
//                   className="flex items-center justify-between w-full text-left"
//                 >
//                   <span className="font-medium text-gray-800">How do I prepare for Microsoft-related certifications?</span>
//                   <ChevronRight
//                     className={`transition-transform duration-200 ${showFaq3 ? 'rotate-90' : ''}`}
//                   />
//                 </button>
//                 {showFaq3 && (
//                   <p className="mt-2 text-gray-600">
//                     We recommend our official study guides, hands-on labs, and practice exams. For Azure certifications, practical experience with the platform is highly valuable.
//                   </p>
//                 )}
//               </div>

//               {/* FAQ Item 4 */}
//               <div className="border-b border-gray-200 pb-4">
//                 <button
//                   onClick={() => setShowFaq4(!showFaq4)}
//                   className="flex items-center justify-between w-full text-left"
//                 >
//                   <span className="font-medium text-gray-800">What's the exam retake policy?</span>
//                   <ChevronRight
//                     className={`transition-transform duration-200 ${showFaq4 ? 'rotate-90' : ''}`}
//                   />
//                 </button>
//                 {showFaq4 && (
//                   <p className="mt-2 text-gray-600">
//                     You can retake exams after 14 days. We provide detailed score reports to help you focus your studies before attempting again.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Review */}
//             <div className="mb-10">
//               <h2 className="text-xl font-semibold text-blue-600 mb-2">Student Reviews</h2>
//               <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
//                 <div className="flex items-center gap-2 mb-2">
//                   <FaStar className="text-yellow-500" />
//                   <FaStar className="text-yellow-500" />
//                   <FaStar className="text-yellow-500" />
//                   <FaStar className="text-yellow-500" />
//                   <FaStar className="text-yellow-400" />
//                   <span className="text-sm text-gray-600 ml-2">(4.8/5 from 1,250 learners)</span>
//                 </div>
//                 <p className="text-gray-700 italic">"The content was very well explained. Helped me land my first role!"</p>
//               </div>
//             </div>



//             {/* Roadmap */}
//             {cert.Road_map?.[0] && (
//               <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Learning Roadmap</h2>
//                 <div className="rounded-lg overflow-hidden">
//                   <img
//                     src={getImageUrl(cert.Road_map[0])}
//                     alt="Certification Roadmap"
//                     className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
//                     style={{ maxHeight: '600px' }}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "/placeholder.png";
//                     }}
//                   />
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* Sidebar */}
//           {/* <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-8">
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
//                 Ready to Get Started?
//               </h3>
//               <button className="w-full bg-blue-600 text-white rounded-lg py-2.5 sm:py-3 px-4 text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors">
//                 Enroll Now
//               </button>
//               <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
//                 Join thousands of professionals who have already taken this certification course to advance their careers.
//               </p>
//             </div>
//           </div> */}


//         </div>

//         {/* Add ChatBot component */}
//         {/* <ChatBot /> */}
//       </div>
//     </div>
//   );
// }
















import { useParams } from 'react-router-dom';
import { useGetCertificationByIdQuery } from '../Features/Api/certificationsApi';
import { Clock, Award, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CertificationFullDetails() {
  const { id } = useParams();
  const { data: cert, isLoading, isError } = useGetCertificationByIdQuery(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (cert) {
      // Transform and validate the data
      const transformedData = {
        ...cert,
        requirements: {
          experience: Array.isArray(cert.requirements?.experience) ?
            cert.requirements.experience :
            ["5 years total work experience (1 year in decision-making role)",
              "Education waivers:",
              "Associate degree - 1 year waived",
              "Bachelor's degree - 3 years waived",
              "Graduate degree - 4 years waived"],
          decision_making: cert.requirements?.decision_making || "Defined as authority to execute/control processes with outcome responsibility"
        },
        exam_details: {
          format: cert.exam_details?.format || "145 multiple-choice questions (135 scored)",
          duration: cert.exam_details?.duration || "4 hours 18 minutes (CBT)",
          delivery: Array.isArray(cert.exam_details?.delivery) && cert.exam_details.delivery.length > 0 ?
            cert.exam_details.delivery :
            ["Computer-Based Testing (Prometric)", "Paper-Based Testing (4 hours)"],
          windows: cert.exam_details?.windows || "July and November annually",
          retake_fee: cert.exam_details?.retake_fee || "333.00 (valid for 2 years)"
        },
        policies: cert.policies || {
          materials: "Open-book (bring approved references)",
          id_requirements: "Government-issued photo ID with signature",
          refund_policy: "130.00 processing fee for denied applications"
        },
        course_content: Array.isArray(cert.course_content) ? cert.course_content : []
      };

      console.log('Certification Data Debug:', transformedData);
    }
  }, [cert]);

  const [showFaq1, setShowFaq1] = useState(false);
  const [showFaq2, setShowFaq2] = useState(false);
  const [showFaq3, setShowFaq3] = useState(false);
  const [showFaq4, setShowFaq4] = useState(false);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `${import.meta.env.VITE_API_URL || 'https://learnlofts.onrender.com'}${imagePath}`;
  };

  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return null;
    const cleanPath = pdfPath.replace(/^\.+/, '').replace(/^\/+/, '');
    const filename = cleanPath.split('/').pop();
    return `${import.meta.env.VITE_API_URL || 'https://learnlofts.onrender.com'}/pdfs/${filename}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 text-center">Loading...</p>
      </div>
    );
  }

  if (isError || !cert) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 text-center">Certificate not found.</p>
      </div>
    );
  }

  const handleDownloadSyllabus = async () => {
    if (!cert.syllabus_pdf) {
      toast.error("No syllabus PDF available");
      return;
    }

    try {
      const pdfPath = cert.syllabus_pdf.startsWith('./') ? cert.syllabus_pdf.substring(2) : cert.syllabus_pdf;
      const pdfUrl = getPdfUrl(pdfPath);

      if (!pdfUrl) {
        toast.error("Invalid PDF URL");
        return;
      }

      const loadingToast = toast.loading("Downloading syllabus...");
      const response = await fetch(pdfUrl, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Accept': 'application/pdf' }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename = cert.syllabus_pdf.split('/').pop() || 'syllabus.pdf';
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss(loadingToast);
      toast.success("Syllabus downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download syllabus. Please try again.");
    }
  };

  const renderCourseContent = () => {
    if (!cert?.course_content || !Array.isArray(cert.course_content) || cert.course_content.length === 0) {
      return null;
    }

    return (
      <section className="bg-white rounded-xl shadow-sm p-6 w-[100%] mx-auto my-6 ">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
        <div className="space-y-4">
          {cert.course_content.map((content, index) => (
            <div key={content._id || index} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{content.title}</h3>
              <div className="space-y-3">
                {content.lessons?.map((lesson, lessonIndex) => (
                  <details key={lesson._id || lessonIndex} className="group">
                    <summary className="flex items-center gap-3 cursor-pointer list-none p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-gray-900">{lesson.title}</h4>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90" />
                    </summary>
                    {lesson.topics && lesson.topics.length > 0 && (
                      <div className="pl-8 mt-2 space-y-2">
                        {lesson.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                            <p className="text-base text-gray-600">{topic}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen py-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 w-[88%] mx-auto mb-8 -mt-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative aspect-square w-full mx-auto rounded-xl overflow-hidden bg-gray-100 shadow-sm">
              {cert.image && (
                <img
                  src={getImageUrl(Array.isArray(cert.image) ? cert.image[0] : cert.image)}
                  alt={cert.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 p-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png";
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex-1 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {cert.title}
            </h1>
            <p className="text-base text-gray-600 mb-6">{cert.description}</p>

            <div className="w-full sm:w-[70%] bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-6 shadow-lg transform hover:scale-[1.03] transition-transform duration-300">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">100% Passing Program or Your Money Back</h3>
                  <p className="text-blue-100 text-base">
                    LearnLofts proudly offers a 100% Passing Rate Guarantee—if you don't pass, you get your money back. No risk, only reward.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center text-sm">
              <span className="text-2xl font-bold text-blue-600">
                Price: ${cert.price}
              </span>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-1" />
                <span className="text-base">{cert.duration}</span>
              </div>
              {cert.tag && (
                <span className={`px-3 py-1 rounded-full text-white text-sm ${cert.tagColor}`}>
                  {cert.tag}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="w-[88%] mx-auto space-y-8">
        {/* Action Buttons */}
        <div className="rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-200"
              onClick={() => window.location.href = '#enroll'}
            >
              Enroll Now
            </button>
            <button
              className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
              onClick={handleDownloadSyllabus}
            >
              Download Syllabus
            </button>
          </div>
        </div>

        {/* Certification Comparison */}


        <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mt-8  mx-auto ">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 text-center" >
            Why Certification Is Important ?
          </h2>

          <div className="relative overflow-hidden">
            <div className="overflow-x-auto -mx-4 sm:mx-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-gray-900 rounded-lg overflow-hidden border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider w-1/4">
                        Criteria
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider">
                        Certified Professionals
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider">
                        Non-Certified Professionals
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold">Average Salary</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base ">₹12–25 LPA (depending on field & experience)</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base ">₹6–15 LPA (limited by lack of credentials)</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold">Salary Growth Rate</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">20%–40% higher than non-certified peers</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Slower salary growth</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold">Job Opportunities</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">More job offers from top companies globally</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Fewer and often lower-paying job opportunities</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold">Career Progression</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Faster promotions, leadership roles</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Slower career growth</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xssm:text-base font-bold">Industry Recognition</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Recognized for specialized skills</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">May need to prove skills through experience alone</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold">Global Opportunities</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">High chance of working with international clients</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Limited unless skills are proven otherwise</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold">Roles Often Landed</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Cloud Architect, Cybersecurity Analyst, AI Engineer, Project Manager</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Junior Developer, Support Engineer, Assistant Roles</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold">Job Security</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Higher due to in-demand certified skills</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Moderate, depends on employer perception</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold">Learning Curve</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">Structured and up-to-date with trends</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Often self-taught or experience-based</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent h-4 pointer-events-none sm:hidden"></div>
          </div>
          <p className="mt-2 text-xs text-gray-500 italic sm:hidden">Scroll horizontally to view more →</p>
        </section>

        {/* Introduction */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-base text-gray-600">{cert.introduction}</p>
        </section>

        {/* Key Highlights */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h2>
          <div className="space-y-4">
            {cert.key_1 && (
              <div className="flex gap-3">
                <Award className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-base text-gray-600">{cert.key_1}</p>
              </div>
            )}
            {cert.key_2 && (
              <div className="flex gap-3">
                <Award className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-base text-gray-600">{cert.key_2}</p>
              </div>
            )}
            {cert.key_3 && (
              <div className="flex gap-3">
                <Award className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-base text-gray-600">{cert.key_3}</p>
              </div>
            )}
          </div>
        </section>

        {/* Course Benefits */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Course Benefits</h2>
          <div className="space-y-4">
            {cert.Course_Benefits && (
              <div className="flex gap-3">
                <ChevronRight className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-base text-gray-600">{cert.Course_Benefits}</p>
              </div>
            )}
            {cert.Course_Benefits_2 && (
              <div className="flex gap-3">
                <ChevronRight className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-base text-gray-600">{cert.Course_Benefits_2}</p>
              </div>
            )}
            {cert.Course_Benefits_3 && (
              <div className="flex gap-3">
                <ChevronRight className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-base text-gray-600">{cert.Course_Benefits_3}</p>
              </div>
            )}
          </div>
        </section>

        {/* Course Content */}
        {renderCourseContent()}

        {/* Requirements Section */}
        {cert.requirements && (
          <section className="bg-white rounded-xl shadow-lg p-6 relative border-2 border-blue-100">
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
              IMPORTANT
            </div>
            <h2 className="text-2xl font-bold text-gray-800 cursor-pointer mb-6">Requirements & Experience</h2>

            {/* Experience Requirements */}
            {cert.requirements.experience && cert.requirements.experience.length > 0 && (
              <div className="mb-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Experience Requirements
                </h3>
                <ul className="list-none space-y-3">
                  {cert.requirements.experience.map((req, index) => (
                    <li key={index} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Decision Making Role */}
            {cert.requirements.decision_making && (
              <div className="bg-white p-6 rounded-xl border-l-4 cursor-pointer shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Decision Making Role
                </h3>
                <p className="text-black  transition-colors">{cert.requirements.decision_making}</p>
              </div>
            )}
          </section>
        )}

        {/* Exam Details Section */}
        {cert.exam_details && (
          <section className="bg-white rounded-xl shadow-lg p-6 relative border-2 border-purple-100  cursor-pointer">
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
              EXAM INFO
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Format */}
              {cert.exam_details.format && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-500 transform transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="mr-3">📝</span>
                    Format
                  </h3>
                  <p className="text-gray-700 hover:text-purple-800 transition-colors">{cert.exam_details.format}</p>
                </div>
              )}

              {/* Duration */}
              {cert.exam_details.duration && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-500 transform transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="mr-3">⏱️</span>
                    Duration
                  </h3>
                  <p className="text-gray-700 hover:text-purple-800 transition-colors">{cert.exam_details.duration}</p>
                </div>
              )}
            </div>

            {/* Delivery Methods */}
            {cert.exam_details.delivery && cert.exam_details.delivery.length > 0 && (
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">🎯</span>
                  Delivery Methods
                </h3>
                <ul className="list-none space-y-3">
                  {cert.exam_details.delivery.map((method, index) => (
                    <li key={index} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exam Windows */}
            {cert.exam_details.windows && (
              <div className="mt-6 bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-l-4 border-yellow-500 transform transition-all duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-3">📅</span>
                  Exam Windows
                </h3>
                <p className="text-gray-700 hover:text-yellow-800 transition-colors">{cert.exam_details.windows}</p>
              </div>
            )}

            {/* Retake Fee */}
            {cert.exam_details.retake_fee && (
              <div className="mt-6 bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-l-4 border-red-500 transform transition-all duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-3">💰</span>
                  Retake Fee
                </h3>
                <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">${cert.exam_details.retake_fee}</p>
              </div>
            )}
          </section>
        )}

        {/* Why Choose LearnLofts */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose LearnLofts for Your Certification Journey?
          </h2>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Future-Ready Training Across Industries
                </h3>
                <p className="text-base text-blue-800">
                  At LearnLofts, we offer a wide spectrum of in-demand certifications to power your career—ranging from Project Management, Information Security, and Quality Management to Networking, Cyber Security, Scrum & Agile, Microsoft Certifications, Amazon Web Services, and more. Whether you're upgrading skills or stepping into a new domain, we've got the roadmap.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Expert Mentors with Real-World Experience
                </h3>
                <p className="text-base text-green-800">
                  Our trainers aren't just certified professionals—they're working experts with years of hands-on experience. They bring industry scenarios into the classroom, helping you master not just theory, but application.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  Tailored Learning for Maximum Impact
                </h3>
                <p className="text-base text-purple-800">
                  Every learner is unique, and so is our approach. LearnLofts offers flexible, personalized learning paths designed to suit your style, pace, and goals. Whether you're self-paced or prefer guided sessions, we align with your rhythm.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Guaranteed Success or Your Money Back
                </h3>
                <p className="text-base text-yellow-800">
                  We stand behind our training with confidence. LearnLofts proudly offers a 100% Passing Rate Guarantee—if you don't pass, you get your money back. No risk, only reward.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Beyond Certification – Real Career Growth
                </h3>
                <p className="text-base text-red-800">
                  We go beyond helping you pass an exam. Our training equips you with career-ready skills, industry insights, and the confidence to lead in your chosen field.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  Join LearnLofts Today
                </h3>
                <p className="text-base text-indigo-800">
                  Your success is our mission. With the right support, expert guidance, and our proven methods, you're not just getting certified—you're getting ahead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <div className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>

          {/* FAQ Item 1 */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setShowFaq1(!showFaq1)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-800">Who can take Learnlofts certifications?</span>
              <ChevronRight className={`transition-transform duration-200 ${showFaq1 ? 'rotate-90' : ''}`} />
            </button>
            {showFaq1 && (
              <p className="mt-2 text-gray-600">
                Our certifications are designed for professionals at all levels - from beginners looking to enter the field to experienced practitioners seeking validation of their skills.
              </p>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setShowFaq2(!showFaq2)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-800">Are Learnlofts certifications globally recognized?</span>
              <ChevronRight className={`transition-transform duration-200 ${showFaq2 ? 'rotate-90' : ''}`} />
            </button>
            {showFaq2 && (
              <p className="mt-2 text-gray-600">
                Yes, Learnlofts certifications are industry-approved and recognized by employers worldwide, especially in Networking, Cloud Computing, and Microsoft technologies.
              </p>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setShowFaq3(!showFaq3)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-800">How do I prepare for Microsoft-related certifications?</span>
              <ChevronRight className={`transition-transform duration-200 ${showFaq3 ? 'rotate-90' : ''}`} />
            </button>
            {showFaq3 && (
              <p className="mt-2 text-gray-600">
                We recommend our official study guides, hands-on labs, and practice exams. For Azure certifications, practical experience with the platform is highly valuable.
              </p>
            )}
          </div>

          {/* FAQ Item 4 */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setShowFaq4(!showFaq4)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-800">What's the exam retake policy?</span>
              <ChevronRight className={`transition-transform duration-200 ${showFaq4 ? 'rotate-90' : ''}`} />
            </button>
            {showFaq4 && (
              <p className="mt-2 text-gray-600">
                You can retake exams after 14 days. We provide detailed score reports to help you focus your studies before attempting again.
              </p>
            )}
          </div>
        </div>

        {/* Review */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Student Reviews</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-400" />
              <span className="text-sm text-gray-600 ml-2">(4.8/5 from 100,000 learners)</span>
            </div>
            <p className="text-gray-700 italic">"The content was very well explained. Helped me land my first role!"</p>
          </div>
        </div>

        {/* Roadmap */}
        {cert.Road_map?.[0] && (
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Roadmap</h2>
            <div className="rounded-lg overflow-hidden">
              <img
                src={getImageUrl(cert.Road_map[0])}
                alt="Certification Roadmap"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                style={{ maxHeight: '600px' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png";
                }}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}