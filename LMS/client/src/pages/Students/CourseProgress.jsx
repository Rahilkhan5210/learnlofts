import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/Features/Api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const CourseProgress = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture = currentLecture || courseDetails.lectures?.[0];
  
  // Ensure we have a valid video URL
  const getVideoUrl = () => {
    // First try to get URL from current lecture
    if (currentLecture?.videoUrl) {
      return currentLecture.videoUrl;
    }
    
    // Then try initial lecture
    if (initialLecture?.videoUrl) {
      return initialLecture.videoUrl;
    }
    
    return null;
  };

  const isLectureCompleted = (lectureId) =>
    progress.some((p) => p.lectureId === lectureId && p.viewed);

  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({ courseId, lectureId });
      refetch();
    } catch (error) {
      toast.error('Failed to update lecture progress');
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    setVideoError(false);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const totalLectures = courseDetails.lectures.length;
  const completedLectures = progress.filter((p) => p.viewed).length;
  const completionPercentage = Math.round((completedLectures / totalLectures) * 100);

  return (
    <div className="-mt-20 w-screen min-h-screen bg-gradient-to-br from-[#f2f4f5] via-[#fefeff] to-[#f4f4f5] px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className="flex gap-2 items-center shadow-md"
        >
          {completed ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">Completed</span>
            </>
          ) : (
            <>
              <CirclePlay className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Mark as Completed</span>
            </>
          )}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full h-3 rounded-full bg-gray-300 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          />
        </div>
        <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
          {completedLectures} of {totalLectures} lectures completed ({completionPercentage}%)
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-4"
        >
          <div className="aspect-video">
            {getVideoUrl() ? (
              <ReactPlayer
                url={getVideoUrl()}
                controls
                width="100%"
                height="100%"
                playing={false}
                onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
                onError={(e) => {
                  setVideoError(true);
                  toast.error("Failed to load video. Please try again.");
                }}
                onReady={() => {
                  setVideoError(false);
                }}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      onContextMenu: e => e.preventDefault()
                    }
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No video available for this lecture</p>
              </div>
            )}
            {videoError && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
                Error loading video. Please check your internet connection and try again.
                <p className="text-sm mt-2">Video URL: {getVideoUrl() || 'No URL available'}</p>
              </div>
            )}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
            Lecture {courseDetails.lectures.findIndex((lec) =>
              lec._id === (currentLecture?._id || initialLecture._id)
            ) + 1}
            {`: ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
          </h3>
        </motion.div>

        {/* Lecture List */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full md:w-2/5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Course Lectures</h2>
          {courseDetails.lectures.map((lecture, index) => {
            const isCurrent = lecture._id === (currentLecture?._id || initialLecture._id);
            return (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                key={lecture._id}
                className={`mb-3 p-4 rounded-xl shadow transition-all cursor-pointer border ${
                  isCurrent
                    ? "bg-gradient-to-r from-blue-100 to-blue-50 border-blue-300"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex justify-between items-center p-0">
                  <div className="flex items-center gap-3">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 className="text-green-500" size={22} />
                    ) : (
                      <CirclePlay className="text-gray-400" size={22} />
                    )}
                    <CardTitle className="text-sm font-semibold text-gray-700 dark:text-white">
                      Lecture {index + 1}: {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border border-green-400 animate-pulse">
                      Done
                    </Badge>
                  )}
                </CardContent>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseProgress;
