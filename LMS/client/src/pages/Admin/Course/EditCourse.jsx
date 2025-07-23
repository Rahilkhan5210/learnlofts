// import { Button } from "@/components/ui/button";
// import React from "react";
// import { Link } from "react-router-dom";
// import CourseTab from "./CourseTab";

// const EditCourse = () => {
//   return (
//     <div className="flex-1 px-6 py-8 max-w-5xl mx-auto">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             ✍️ Edit Course Details
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Add or update detailed information for your course.
//           </p>
//         </div>
//         <Link to="lecture">
//           <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all">
//             Go to Lectures Page
//           </Button>
//         </Link>
//       </div>

//       {/* Course Tabs Section */}
//       <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//         <CourseTab />
//       </div>
//     </div>
//   );
// };

// export default EditCourse;






import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1 px-6 py-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            ✍️ Edit Course Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add or update detailed information for your course.
          </p>
        </div>
        <Link to="lecture">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all">
            Go to Lectures Page
          </Button>
        </Link>
      </div>

      {/* Course Tabs Section */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;