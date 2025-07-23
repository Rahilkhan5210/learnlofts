// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex">
//       <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
//         <div className="space-y-4 ">
//           <Link to="dashboard" className="flex items-center gap-2">
//             <ChartNoAxesColumn size={22} />
//             <h1>Dashboard</h1>
//           </Link>
//           <Link to="course" className="flex items-center gap-2">
//             <SquareLibrary size={22} />
//             <h1>Courses</h1>
//           </Link>
//         </div>
//       </div>
//     <div className="flex-1 p-10 ">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// new code
import { ChartNoAxesColumn, SquareLibrary,Newspaper, Award } from "lucide-react"; // Replace Certificate with Award
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          {/* Dashboard Link */}
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>

          {/* Courses Link */}
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>

          {/* Certifications Link */}
          <Link to="certifications" className="flex items-center gap-2">
            <Award size={22} /> {/* Use Award icon */}
            <h1>Certifications</h1>
          </Link>

          {/* News Link */}
          <Link to="blogs" className="flex items-center gap-2">
            <Newspaper size={22} />
            <h1>Blogs</h1>
          </Link>

        </div>
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;