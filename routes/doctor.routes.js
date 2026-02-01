import { Router } from "express";
import {
  searchDoctors,
  getDoctorBasic,
  getDoctorResume,
  getDoctorDepartments,
  getDoctorPhotos,
  getDoctorVideos,
  getDoctorMapPhotos,
} from "../controllers/doctor.controller.js";

const router = Router();

// Search doctors
router.get("/search", searchDoctors);

// Basic details
router.get("/:id/basic", getDoctorBasic);

// Resume
router.get("/:id/resume", getDoctorResume);

// Departments list
router.get("/:id/departments", getDoctorDepartments);

// NEW → Doctor Photos
router.get("/:id/photos", getDoctorPhotos);

// NEW → Doctor Videos
router.get("/:id/videos", getDoctorVideos);

// NEW → Doctor Map Photos
router.get("/:id/map-photos", getDoctorMapPhotos);

export default router;






