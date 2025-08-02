import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const defaultValues = {
  requirements: {
    experience: [
      "5 years total work experience (1 year in decision-making role)",
      "Education waivers:",
      "Associate degree - 1 year waived",
      "Bachelor's degree - 3 years waived",
      "Graduate degree - 4 years waived"
    ],
    decision_making: "Defined as authority to execute/control processes with outcome responsibility"
  },
  exam_details: {
    format: "145 multiple-choice questions (135 scored)",
    duration: "4 hours 18 minutes (CBT)",
    delivery: [
      "Computer-Based Testing (Prometric)",
      "Paper-Based Testing (4 hours)"
    ],
    windows: "July and November annually",
    retake_fee: "333.00 (valid for 2 years)"
  },
  policies: {
    materials: "Open-book (bring approved references)",
    id_requirements: "Government-issued photo ID with signature",
    refund_policy: "130.00 processing fee for denied applications"
  }
};

import { API_ENDPOINTS } from '../../config/api.js';

export const certificationApi = createApi({
  reducerPath: "certificationApi",
  tagTypes: ["Certifications"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.CERTIFICATIONS_API,
    credentials: "include", // Include cookies for authentication if needed
  }),
  endpoints: (builder) => ({
    // Fetch all certifications
    getAllCertifications: builder.query({
      query: () => "certifications/all",
      transformResponse: (response) => {
        if (Array.isArray(response)) {
          return response.map(cert => ({
            ...cert,
            requirements: {
              experience: Array.isArray(cert.requirements?.experience) ? 
                cert.requirements.experience : 
                defaultValues.requirements.experience,
              decision_making: cert.requirements?.decision_making || defaultValues.requirements.decision_making
            },
            exam_details: {
              format: cert.exam_details?.format || defaultValues.exam_details.format,
              duration: cert.exam_details?.duration || defaultValues.exam_details.duration,
              delivery: Array.isArray(cert.exam_details?.delivery) && cert.exam_details.delivery.length > 0 ? 
                cert.exam_details.delivery : 
                defaultValues.exam_details.delivery,
              windows: cert.exam_details?.windows || defaultValues.exam_details.windows,
              retake_fee: cert.exam_details?.retake_fee || defaultValues.exam_details.retake_fee
            },
            policies: cert.policies || defaultValues.policies
          }));
        }
        return response;
      },
      providesTags: ["Certifications"],
    }),

    // Fetch a single certification by ID
    getCertificationById: builder.query({
      query: (id) => `certifications/${id}`,
      transformResponse: (response) => ({
        ...response,
        requirements: {
          experience: Array.isArray(response.requirements?.experience) ? 
            response.requirements.experience : 
            defaultValues.requirements.experience,
          decision_making: response.requirements?.decision_making || defaultValues.requirements.decision_making
        },
        exam_details: {
          format: response.exam_details?.format || defaultValues.exam_details.format,
          duration: response.exam_details?.duration || defaultValues.exam_details.duration,
          delivery: Array.isArray(response.exam_details?.delivery) && response.exam_details.delivery.length > 0 ? 
            response.exam_details.delivery : 
            defaultValues.exam_details.delivery,
          windows: response.exam_details?.windows || defaultValues.exam_details.windows,
          retake_fee: response.exam_details?.retake_fee || defaultValues.exam_details.retake_fee
        },
        policies: response.policies || defaultValues.policies
      }),
      providesTags: (result, error, id) => [{ type: "Certifications", id }],
    }),

    // Create a new certification (Admin only)
    createCertification: builder.mutation({
      query: (formData) => {
        try {
          // Validate and ensure required arrays are not empty
          const requirements = JSON.parse(formData.get('requirements') || '{}');
          const examDetails = JSON.parse(formData.get('exam_details') || '{}');
          
          // Set default values if arrays are empty
          if (!requirements.experience || !requirements.experience.length) {
            requirements.experience = defaultValues.requirements.experience;
            formData.set('requirements', JSON.stringify(requirements));
          }

          if (!examDetails.delivery || !examDetails.delivery.length) {
            examDetails.delivery = defaultValues.exam_details.delivery;
            formData.set('exam_details', JSON.stringify(examDetails));
          }

          // Log the final form data being sent
          console.log('Creating certification with data:', {
            ...Object.fromEntries(formData),
            requirements: JSON.parse(formData.get('requirements')),
            exam_details: JSON.parse(formData.get('exam_details')),
            policies: JSON.parse(formData.get('policies'))
          });

          return {
            url: 'certifications/create', // Fixed endpoint URL
            method: 'POST',
            body: formData,
            formData: true
          };
        } catch (error) {
          console.error('Error preparing certification data:', error);
          throw error;
        }
      },
      transformErrorResponse: (response) => {
        console.error('API Error Response:', response);
        return response.data?.error || 'Failed to create certification';
      },
      invalidatesTags: ['Certifications']
    }),

    // Update a certification (Admin only)
    updateCertification: builder.mutation({
      query: ({ id, formData }) => ({
        url: `certifications/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Certifications", id }],
    }),

    // Delete a certification (Admin only)
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `certifications/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certifications"],
    }),
  }),
});

export const {
  useGetAllCertificationsQuery,
  useGetCertificationByIdQuery,
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} = certificationApi;