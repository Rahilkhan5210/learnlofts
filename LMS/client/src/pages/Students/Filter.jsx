// new code
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useGetPublishedCourseQuery } from "@/Features/Api/courseApi";

const Filter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Fetch published courses
  const { data: coursesData, isLoading, isError } = useGetPublishedCourseQuery();

  // Extract unique categories from courses
  useEffect(() => {
    if (isError) {
      console.error("Failed to fetch courses");
      setCategories([]);
      return;
    }

    if (!coursesData) {
      console.log("No courses data available yet");
      return;
    }

    // Handle both array and object response formats
    const courseList = Array.isArray(coursesData) 
      ? coursesData 
      : coursesData.courses 
      ? coursesData.courses 
      : [];

    if (courseList.length > 0) {
      const uniqueCategories = [
        ...new Set(
          courseList
            .map((course) => course.category)
            .filter((category) => category && category.trim() !== "")
        ),
      ];
      setCategories(uniqueCategories);
      setFilteredCourses(courseList);
    } else {
      setCategories([]);
      setFilteredCourses([]);
    }
  }, [coursesData, isLoading, isError]);

  // Filter courses based on selected categories
  useEffect(() => {
    if (!coursesData) return;

    const courseList = Array.isArray(coursesData) 
      ? coursesData 
      : coursesData.courses 
      ? coursesData.courses 
      : [];

    if (courseList.length === 0) {
      setFilteredCourses([]);
      return;
    }

    const filtered = courseList.filter((course) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(course.category)
        : true
    );

    // Sort courses by price if sorting is applied
    if (sortByPrice === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredCourses(filtered);
  }, [selectedCategories, sortByPrice, coursesData]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle sorting by price
  const selectByPriceHandler = (value) => {
    setSortByPrice(value);
  };

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  if (isError || (!Array.isArray(coursesData) && !Array.isArray(coursesData?.courses))) {
    return <p>Failed to load courses. Please try again later.</p>;
  }

  return (
    <div className="flex flex-col  p-4 bg-yellow-500 w-1/2 ">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-[45%] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all"
      >
        <div className="flex items-center justify-between  mb-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="text-blue-600" size={22} /> Filters
          </h1>

          <Select onValueChange={selectByPriceHandler}>
            <SelectTrigger className="w-36 h-9 border ml-6 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-zinc-800 hover:shadow-md transition">
              <SelectValue placeholder="Sort by"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-gray-500">Sort by price</SelectLabel>
                <SelectItem value="low">Low to High</SelectItem>
                <SelectItem value="high">High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4 rounded-full" />

        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Categories
          </h2>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scroll">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center space-x-2 group px-2 py-1 rounded-md transition-all hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-zinc-800 dark:hover:to-zinc-700"
              >
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Courses
        </h2>
        <div className="w-full  grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-zinc-900 flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {course.courseTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Category: {course.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lectures: {course.lectures.length}
              </p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Filter;




