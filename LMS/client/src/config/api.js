// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://learnlofts.onrender.com';

export const API_ENDPOINTS = {
  // User API
  USER_API: `${API_BASE_URL}/api/v1/user`,
  
  // Course API
  COURSE_API: `${API_BASE_URL}/api/v1/course`,
  
  // Course Progress API
  COURSE_PROGRESS_API: `${API_BASE_URL}/api/v1/progress`,
  
  // Course Purchase API
  COURSE_PURCHASE_API: `${API_BASE_URL}/api/v1/purchase`,
  
  // Certifications API
  CERTIFICATIONS_API: `${API_BASE_URL}/api/v1`,
  
  // Blogs API
  BLOGS_API: `${API_BASE_URL}/api/v1`,
  
  // Media API
  MEDIA_API: `${API_BASE_URL}/api/v1/media`,
  
  // Form submission
  FORM_API: `${API_BASE_URL}/api/submit-form`,
  
  // Static assets
  STATIC_ASSETS: API_BASE_URL,
  PDFS: `${API_BASE_URL}/pdfs`,
  FRONTEND_ASSETS: `${API_BASE_URL}/frontend_assets`
};

export default API_ENDPOINTS; 