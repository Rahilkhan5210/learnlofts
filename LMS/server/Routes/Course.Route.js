import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeCourse, removeLecture, searchCourse, togglePublishCourse } from "../Controllers/Course.Controller.js";
import upload from "../Utils/Multer.js";
const router = express.Router();

// Course routes
router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);

// Course specific routes
router.route("/:courseId")
  .get(isAuthenticated, getCourseById)
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse)
  .delete(isAuthenticated, removeCourse)
  .patch(isAuthenticated, togglePublishCourse);

// Lecture routes
router.route("/:courseId/lecture")
  .post(isAuthenticated, createLecture)
  .get(isAuthenticated, getCourseLecture);

router.route("/:courseId/lecture/:lectureId")
  .get(isAuthenticated, getLectureById)
  .post(isAuthenticated, editLecture);

router.route("/lecture/:lectureId")
  .delete(isAuthenticated, removeLecture);

export default router;