
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetPurchasedCoursesQuery } from "@/Features/Api/purchaseApi";
// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const Dashboard = () => {

//   const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();

//   if(isLoading) return <h1>Loading...</h1>
//   if(isError) return <h1 className="text-red-500">Failed to get purchased course</h1>

//   //
//   const {purchasedCourse} = data || [];

//   const courseData = purchasedCourse.map((course)=> ({
//     name:course.courseId.courseTitle,
//     price:course.courseId.coursePrice
//   }))

//   const totalRevenue = purchasedCourse.reduce((acc,element) => acc+(element.amount || 0), 0);

//   const totalSales = purchasedCourse.length;
//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Sales</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Revenue</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
//         </CardContent>
//       </Card>

//       {/* Course Prices Card */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-gray-700">
//             Course Prices
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={courseData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//               <XAxis
//                 dataKey="name"
//                 stroke="#6b7280"
//                 angle={-30} // Rotated labels for better visibility
//                 textAnchor="end"
//                 interval={0} // Display all labels
//               />
//               <YAxis stroke="#6b7280" />
//               <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="#4a90e2" // Changed color to a different shade of blue
//                 strokeWidth={3}
//                 dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

// new code 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/Features/Api/purchaseApi";
import { useGetAllCertificationsQuery } from "@/Features/Api/certificationsApi";
import { useGetAllBlogsQuery } from "@/Features/Api/blogsApi";
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  // Fetch purchased courses data
  const { data: purchasedData, isLoading: isCoursesLoading, isError: isCoursesError } = useGetPurchasedCoursesQuery();

  // Fetch certifications data
  const { data: certificationsData, isLoading: isCertificationsLoading, isError: isCertificationsError } = useGetAllCertificationsQuery();

  // Fetch blog count
  const { data: blogsData } = useGetAllBlogsQuery();
  const blogCount = blogsData?.length || 0;

  if (isCoursesLoading || isCertificationsLoading) return <h1>Loading...</h1>;
  if (isCoursesError || isCertificationsError) return <h1 className="text-red-500">Failed to load data</h1>;

  // Purchased courses metrics
  const { purchasedCourse = [] } = purchasedData || [];
  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));
  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  // Certifications metrics
  const totalCertifications = certificationsData?.length || 0;
  const certificationsByCategory = certificationsData?.reduce((acc, cert) => {
    acc[cert.category] = (acc[cert.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Total Sales Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      {/* Total Revenue Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">${totalRevenue}</p>
        </CardContent>
      </Card>

      {/* Total Certifications Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalCertifications}</p>
        </CardContent>
      </Card>

      {/* Total Blogs Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{blogCount}</p>
        </CardContent>
      </Card>

      {/* Manage Blogs Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Manage Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <Link to="/admin/blogs">
            <button className="btn btn-primary w-full">Go to Blog Management</button>
          </Link>
        </CardContent>
      </Card>

      {/* Certifications by Category */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">Certifications by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {certificationsByCategory &&
              Object.entries(certificationsByCategory).map(([category, count]) => (
                <li key={category} className="text-gray-700">
                  <strong>{category}:</strong> {count}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      {/* Course Prices Chart */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">Course Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`$${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

