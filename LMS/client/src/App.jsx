//app.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import PopupForm from './components/PopupForm';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogsPage from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";

// Layouts
import MainLayout from "./Layout/MainLayout";

// Public Pages
import HeroSection from "./pages/Students/HeroSection";
import Courses from "./pages/Students/Courses";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import NewCourses from "./pages/NewCourses";

import CertificationFullDetails from "./pages/CertificationFullDetails";
import Login from "./pages/Login";

// Students (Protected)
import MyLearning from "./pages/Students/MyLearning";
import Profile from "./pages/Students/Profile";
import SearchPage from "./pages/Students/SearchPage";
import CourseDetail from "./pages/Students/CourseDetail";
import CourseProgress from "./pages/Students/CourseProgress";

// Admin Pages
import Sidebar from "./pages/Admin/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import CourseTable from "./pages/Admin/Course/CourseTable";
import AddCourse from "./pages/Admin/Course/AddCourse";
import EditCourse from "./pages/Admin/Course/EditCourse";
import CreateLecture from "./pages/Admin/Lecture/CreateLecture";
import EditLecture from "./pages/Admin/Lecture/EditLecture";

// Protected Routes
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

// Theme
import { ThemeProvider } from "./components/ThemeProvider";

// Certifications Management
import CertificationsTab from "./pages/Admin/Certifications/CertificationsTab";
import CertificationsTable from "./pages/Admin/Certifications/CertificationsTable";
import AddCertifications from "./pages/Admin/Certifications/AddCertifications";
import EditCertifications from "./pages/Admin/Certifications/EditCertifications";

// import DisplayAllContent from "./pages/Students/DisplayAllContent";
import DisplayCertificates from "./pages/Students/DisplayCertificates";
import ViewMore from "./pages/Students/ViewMore";
// import CertificationListing from "./pages/CertificationListing";
import AdminBlogs from "./pages/Admin/Blogs/AdminBlogs";
import BlogsTab from "./pages/Admin/Blogs/BlogsTab";
import BlogsTable from "./pages/Admin/Blogs/BlogsTable";
import AddBlogs from "./pages/Admin/Blogs/AddBlogs";
import EditBlogs from "./pages/Admin/Blogs/EditBlogs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection showCarousel={true} showHeroContent={false} />
            <DisplayCertificates />
          </>
        ),
      },
      {
        path: "/:id",
        element: <ViewMore />,
      },
      { path: "about", element: <About /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      { path: "NewCourses", element: <NewCourses /> },
      
      {
        path: "certification/:id",
        element: <CertificationFullDetails />,
      },
      {
        path: "certification/:category/:id",
        element: <CertificationFullDetails />,
      },
      {
        path: "student/certifications",
        element: <DisplayCertificates />, // Add this route
      },
      { path: "login", element: <AuthenticatedUser><Login /></AuthenticatedUser> },
      { path: "my-learning", element: <ProtectedRoute><MyLearning /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "course/search", element: <ProtectedRoute><SearchPage /></ProtectedRoute> },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetail /></ProtectedRoute>,
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // Admin Routes
      {
        path: "admin",
        element: <AdminRoute><Sidebar /></AdminRoute>,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "course", element: <CourseTable /> },
          { path: "course/create", element: <AddCourse /> },
          { path: "course/:courseId", element: <EditCourse /> },
          { path: "course/:courseId/lecture", element: <CreateLecture /> },
          { path: "course/:courseId/lecture/:lectureId", element: <EditLecture /> },
          // Certifications Management
          {
            path: "certifications",
            element: <CertificationsTab />,
            children: [
              { path: "", element: <CertificationsTable /> },
              { path: "add-certification", element: <AddCertifications /> },
              { path: "edit-certification/:id", element: <EditCertifications /> },
            ],
          },
          // Blogs Management
          {
            path: "blogs",
            element: <BlogsTab />,
            children: [
              { path: "", element: <BlogsTable /> },
              { path: "add-blog", element: <AddBlogs /> },
              { path: "edit-blog/:id", element: <EditBlogs /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  );
}

export default App;