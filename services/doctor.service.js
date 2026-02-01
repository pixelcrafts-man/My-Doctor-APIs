import pool from "../config/database.js";

/* ================================
   1) SEARCH DOCTORS
================================ */
export const searchDoctorsService = async ({ name, speciality, insurance, region }) => {
  let query = `
    SELECT 
      d.id,
      d.full_name,
      d.profile_photo,
      d.rating,
      s.name AS speciality_name
    FROM doctors d
    LEFT JOIN specialities s ON s.id = d.speciality_id
    LEFT JOIN doctor_clinics dc ON dc.doctor_id = d.id
    LEFT JOIN clinics c ON c.id = dc.clinic_id
    WHERE 1 = 1
  `;

  const params = [];

  if (name) {
    params.push(`%${name}%`);
    query += ` AND d.full_name ILIKE $${params.length}`;
  }

  if (speciality) {
    params.push(speciality);
    query += ` AND d.speciality_id = $${params.length}`;
  }

  if (insurance) {
    params.push(insurance);
    query += ` AND $${params.length} = ANY(d.insurance_ids)`;
  }

  if (region) {
    params.push(region);
    query += ` AND c.state ILIKE $${params.length}`;
  }

  query += ` GROUP BY d.id, s.name`;

  const { rows } = await pool.query(query, params);
  return rows;
};

/* ================================
   2) BASIC DOCTOR DETAILS
================================ */
export const getDoctorBasicService = async (doctorId) => {
  const query = `
    SELECT 
      d.id,
      d.full_name,
      d.profile_photo,
      d.experience,
      d.rating,
      d.bio,
      s.name AS speciality_name,
      c.clinic_name,
      c.address,
      c.city,
      c.state
    FROM doctors d
    LEFT JOIN specialities s ON s.id = d.speciality_id
    LEFT JOIN doctor_clinics dc ON dc.doctor_id = d.id
    LEFT JOIN clinics c ON c.id = dc.clinic_id
    WHERE d.id = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [doctorId]);
  return rows[0] || null;
};

/* ================================
   3) RESUME
================================ */
export const getDoctorResumeService = async (doctorId) => {
  const eduQuery = `
    SELECT institute, degree, start_year, end_year
    FROM doctor_education
    WHERE doctor_id = $1
    ORDER BY start_year;
  `;

  const expQuery = `
    SELECT position, hospital_name, start_year, end_year
    FROM doctor_experience
    WHERE doctor_id = $1
    ORDER BY start_year;
  `;

  const edu = await pool.query(eduQuery, [doctorId]);
  const exp = await pool.query(expQuery, [doctorId]);

  return {
    education: edu.rows,
    experience: exp.rows,
  };
};

/* ================================
   4) DEPARTMENTS
================================ */
export const getDoctorDepartmentsService = async (doctorId) => {
  const query = `
    SELECT 
      c.id AS clinic_id,
      c.clinic_name,
      c.address,
      c.city,
      c.state,
      c.latitude,
      c.longitude,
      cd.department_name
    FROM doctor_clinics dc
    LEFT JOIN clinics c ON c.id = dc.clinic_id
    LEFT JOIN clinic_departments cd ON cd.clinic_id = c.id
    WHERE dc.doctor_id = $1
    ORDER BY c.clinic_name;
  `;

  const { rows } = await pool.query(query, [doctorId]);
  return rows;
};

/* ================================
   5) PHOTOS
================================ */
export const getDoctorPhotosService = async (doctorId) => {
  const q = `
    SELECT id, photo_url
    FROM doctor_photos
    WHERE doctor_id = $1
    ORDER BY id;
  `;
  const { rows } = await pool.query(q, [doctorId]);
  return rows;
};

/* ================================
   6) VIDEOS
================================ */
export const getDoctorVideosService = async (doctorId) => {
  const q = `
    SELECT id, video_url, thumbnail_url
    FROM doctor_videos
    WHERE doctor_id = $1
    ORDER BY id;
  `;
  const { rows } = await pool.query(q, [doctorId]);
  return rows;
};

/* ================================
   7) MAP PHOTOS
================================ */
export const getDoctorMapPhotosService = async (doctorId) => {
  const q = `
    SELECT id, image_url
    FROM doctor_map_photos
    WHERE doctor_id = $1
    ORDER BY id;
  `;
  const { rows } = await pool.query(q, [doctorId]);
  return rows;
};




