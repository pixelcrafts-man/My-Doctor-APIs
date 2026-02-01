import {
  searchDoctorsService,
  getDoctorBasicService,
  getDoctorResumeService,
  getDoctorDepartmentsService,
  getDoctorPhotosService,
  getDoctorVideosService,
  getDoctorMapPhotosService,
} from "../services/doctor.service.js";

// 1) Search
export const searchDoctors = async (req, res, next) => {
  try {
    const { name, speciality, insurance, region } = req.query;
    const doctors = await searchDoctorsService({ name, speciality, insurance, region });

    res.json({ success: true, data: doctors });
  } catch (err) {
    next(err);
  }
};

// 2) Basic Details
export const getDoctorBasic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await getDoctorBasicService(id);

    res.json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

// 3) Resume
export const getDoctorResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await getDoctorResumeService(id);

    res.json({ success: true, data: resume });
  } catch (err) {
    next(err);
  }
};

// 4) Departments
export const getDoctorDepartments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getDoctorDepartmentsService(id);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// 5) Photos
export const getDoctorPhotos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const photos = await getDoctorPhotosService(id);

    res.json({ success: true, data: photos });
  } catch (err) {
    next(err);
  }
};

// 6) Videos
export const getDoctorVideos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const videos = await getDoctorVideosService(id);

    res.json({ success: true, data: videos });
  } catch (err) {
    next(err);
  }
};

// 7) Map Photos
export const getDoctorMapPhotos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const images = await getDoctorMapPhotosService(id);

    res.json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
};





