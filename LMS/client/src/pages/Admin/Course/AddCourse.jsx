import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateCourseMutation } from "@/Features/Api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const getSelectedCategory = (value) => setCategory(value);

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6 transition-all duration-300">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🚀 Create a New Course</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill out the course title and category to get started.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Course Title */}
          <div className="grid gap-2">
            <Label className="text-base font-medium">Course Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Mastering Kubernetes"
              className="transition-all focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Select */}
          <div className="grid gap-2">
            <Label className="text-base font-medium">Category</Label>
            {/* <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Categories</SelectLabel>
                  {[
                    "Next JS",
                    "Data Science",
                    "Frontend Development",
                    "Fullstack Development",
                    "MERN Stack Development",
                    "Javascript",
                    "Python",
                    "Docker",
                    "MongoDB",
                    "HTML",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Mastering Kubernetes"
              className="transition-all focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="transition-all hover:bg-gray-100"
              onClick={() => navigate("/admin/course")}
            >
              ⬅️ Back
            </Button>
            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

