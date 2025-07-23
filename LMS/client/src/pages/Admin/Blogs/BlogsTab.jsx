import React from "react";
import { Outlet, Link } from "react-router-dom";

const BlogsTab = () => {
  return (
    <div>
      <nav className="mb-4">
        <Link to="/admin/blogs" className="mr-4 text-blue-500">
          View Blogs
        </Link>
        <Link to="/admin/blogs/add-blog" className="text-blue-500">
          Add Blog
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default BlogsTab; 