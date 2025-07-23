import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:9000/api/v1/',
    credentials: 'include',
  }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => 'blogs',
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query({
      query: (id) => {
        console.log('API: Getting blog by ID:', id);
        return `blogs/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: 'blogs',
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...blogData }) => {
        console.log('API: Updating blog with ID:', id);
        console.log('API: Blog data:', blogData);
        return {
          url: `blogs/${id}`,
          method: 'PUT',
          body: blogData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, 'Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi; 