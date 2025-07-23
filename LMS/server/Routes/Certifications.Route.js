import express from "express";
import upload from "../Utils/Multer.js";
import {
  uploadCertification,
  updateCertification,
  deleteCertification,
  getAllCertifications,
  getCertificationById,
  getCertificationAssets,
} from "../Controllers/Certifications.Controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";

const router = express.Router();

// Upload a new certification (requires authentication)
router.post("/create", isAuthenticated, upload.single("file"), uploadCertification);

// Update a certification (requires authentication)
router.put("/update/:id", isAuthenticated, upload.single("file"), updateCertification);

// Delete a certification (requires authentication)
router.delete("/delete/:id", isAuthenticated, deleteCertification);

// Get all certifications (public route)
router.get("/all", getAllCertifications);

// Get a certification by ID (public route)
router.get("/:id", getCertificationById);
router.get('/:certificationId/assets', getCertificationAssets);

export default router;