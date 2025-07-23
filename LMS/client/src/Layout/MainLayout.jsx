import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/Navbar/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import ScrollToTop from "../components/ScrollToTop";
import PopupForm from "../components/PopupForm";
import "../App.css";


const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a]">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="w-full dark:bg-[#0f172a] min-h-screen flex flex-col justify-between">
          {/* <main className="pt-[7.5rem] px-4 md:px-8 lg:px-16 flex-grow transition-all duration-300"> */}
          <main className="pt-[7.5rem] flex-grow transition-all duration-300">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Outlet />
            </motion.div>
          </main>

          <Footer />
        </div>
      </div>
      
      {/* Popup Form */}
      <PopupForm />
    </>
  );
};

export default MainLayout;
