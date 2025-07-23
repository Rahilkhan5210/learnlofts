import React from "react";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../../../Features/Api/blogsApi";
import { Link } from "react-router-dom";

const BlogsTable = () => {
  const { data: blogs, isLoading, isError } = useGetAllBlogsQuery();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  console.log("BlogsTable: All blogs data:", blogs);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id).unwrap();
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Failed to delete blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Failed to load blogs. Please try again later.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <Link to="/admin/blogs/add-blog" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Blog
      </Link>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Author</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Read Time</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog._id}>
              <td className="border border-gray-300 p-2">{blog.title}</td>
              <td className="border border-gray-300 p-2">{blog.category}</td>
              <td className="border border-gray-300 p-2">{blog.author?.name}</td>
              <td className="border border-gray-300 p-2">{blog.date}</td>
              <td className="border border-gray-300 p-2">{blog.readTime}</td>
              <td className="border border-gray-300 p-2">
                <Link to={`/admin/blogs/edit-blog/${blog.id || blog._id}`} className="text-blue-500 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog.id || blog._id)}
                  className={`text-red-500 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsTable; 