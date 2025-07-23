import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "../../../Features/Api/blogsApi";

const EditBlogs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("EditBlogs: URL parameter id:", id);
  
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);
  console.log("EditBlogs: Blog data:", blog);
  console.log("EditBlogs: Loading state:", isLoading);
  console.log("EditBlogs: Error state:", isError);
  
  const [updateBlog] = useUpdateBlogMutation();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    heroImage: "",
    coverImage: "",
    description: "",
    image: "",
    author: {
      name: "",
      avatar: "",
      role: "",
      bio: "",
      socials: {
        linkedin: "",
        twitter: ""
      }
    },
    category: "",
    readTime: "",
    date: "",
    tags: [],
    resources: [],
    relatedPosts: [],
    content: []
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        id: blog.id || "",
        title: blog.title || "",
        heroImage: blog.heroImage || "",
        coverImage: blog.coverImage || "",
        description: blog.description || "",
        image: blog.image || "",
        author: {
          name: blog.author?.name || "",
          avatar: blog.author?.avatar || "",
          role: blog.author?.role || "",
          bio: blog.author?.bio || "",
          socials: {
            linkedin: blog.author?.socials?.linkedin || "",
            twitter: blog.author?.socials?.twitter || ""
          }
        },
        category: blog.category || "",
        readTime: blog.readTime || "",
        date: blog.date || "",
        tags: blog.tags || [],
        resources: blog.resources || [],
        relatedPosts: blog.relatedPosts || [],
        content: blog.content || []
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuthorChange = (field, value) => {
    setFormData({
      ...formData,
      author: {
        ...formData.author,
        [field]: value
      }
    });
  };

  const handleSocialsChange = (field, value) => {
    setFormData({
      ...formData,
      author: {
        ...formData.author,
        socials: {
          ...formData.author.socials,
          [field]: value
        }
      }
    });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   console.log("Submitting update for blog ID:", id);
    //   console.log("Form data:", formData);
      
      // Remove the id field from formData to avoid conflicts with the unique id field
      const { id: blogId, ...updateData } = formData;
    //   console.log("Update data being sent:", updateData);
      
      const response = await updateBlog({ id, ...updateData }).unwrap();
    //   console.log("Server response:", response);

      alert("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Failed to update blog:", error);
      console.error("Error details:", error.data);
      
      // Show more detailed error message
      let errorMessage = "Failed to update blog";
      if (error.data?.error) {
        errorMessage += ": " + error.data.error;
        if (error.data.details) {
          errorMessage += "\nDetails: " + (Array.isArray(error.data.details) ? error.data.details.join(', ') : error.data.details);
        }
      } else if (error.message) {
        errorMessage += ": " + error.message;
      }
      
      alert(errorMessage);
    }
  };

  if (isLoading) return <p>Loading blog...</p>;
  if (isError) return <p>Failed to load blog. Please try again later.</p>;
  if (!blog) return <p>Blog not found. Please check the URL or go back to the blogs list.</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      
      {/* Debug Info */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p><strong>URL ID:</strong> {id}</p>
        <p><strong>Blog Data:</strong> {blog ? 'Loaded' : 'Not loaded'}</p>
        <p><strong>Form Data ID:</strong> {formData.id}</p>
        <p><strong>Form Data Title:</strong> {formData.title}</p>
        <p><strong>Content Blocks:</strong> {formData.content?.length || 0}</p>
        <p><strong>Resources:</strong> {formData.resources?.length || 0}</p>
        <p><strong>Related Posts:</strong> {formData.relatedPosts?.length || 0}</p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="id" className="block mb-2">Blog ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          rows="3"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="readTime" className="block mb-2">Read Time:</label>
        <input
          type="text"
          id="readTime"
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="e.g., 5 min read"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="e.g., January 15, 2024"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block mb-2">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleTagsChange}
          className="border p-2 w-full"
          placeholder="e.g., cloud computing, AWS, tutorial"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="heroImage" className="block mb-2">Hero Image URL:</label>
        <input
          type="url"
          id="heroImage"
          name="heroImage"
          value={formData.heroImage}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="coverImage" className="block mb-2">Cover Image URL:</label>
        <input
          type="url"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block mb-2">Image URL (fallback):</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Author Information */}
      <div className="border p-4 mb-4 rounded">
        <h3 className="text-lg font-semibold mb-3">Author Information</h3>
        
        <div className="mb-4">
          <label htmlFor="authorName" className="block mb-2">Author Name:</label>
          <input
            type="text"
            id="authorName"
            value={formData.author.name}
            onChange={(e) => handleAuthorChange('name', e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authorAvatar" className="block mb-2">Author Avatar URL:</label>
          <input
            type="url"
            id="authorAvatar"
            value={formData.author.avatar}
            onChange={(e) => handleAuthorChange('avatar', e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authorRole" className="block mb-2">Author Role:</label>
          <input
            type="text"
            id="authorRole"
            value={formData.author.role}
            onChange={(e) => handleAuthorChange('role', e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authorBio" className="block mb-2">Author Bio:</label>
          <textarea
            id="authorBio"
            value={formData.author.bio}
            onChange={(e) => handleAuthorChange('bio', e.target.value)}
            className="border p-2 w-full"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="linkedin" className="block mb-2">LinkedIn URL:</label>
          <input
            type="url"
            id="linkedin"
            value={formData.author.socials.linkedin}
            onChange={(e) => handleSocialsChange('linkedin', e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="twitter" className="block mb-2">Twitter URL:</label>
          <input
            type="url"
            id="twitter"
            value={formData.author.socials.twitter}
            onChange={(e) => handleSocialsChange('twitter', e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>

      {/* Content Management */}
      <div className="border p-4 mb-4 rounded">
        <h3 className="text-lg font-semibold mb-3">Content Management</h3>
        
        {/* Content Blocks */}
        <div className="mb-4">
          <label className="block mb-2">Content Blocks:</label>
          <div className="space-y-2">
            {formData.content?.map((block, index) => (
              <div key={index} className="border p-3 rounded">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type (e.g., paragraph, image, quote)"
                    value={block.type}
                    onChange={(e) => {
                      const newContent = [...formData.content];
                      newContent[index] = { ...block, type: e.target.value };
                      setFormData({ ...formData, content: newContent });
                    }}
                    className="border p-2 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newContent = formData.content.filter((_, i) => i !== index);
                      setFormData({ ...formData, content: newContent });
                    }}
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  placeholder="Content text"
                  value={block.text}
                  onChange={(e) => {
                    const newContent = [...formData.content];
                    newContent[index] = { ...block, text: e.target.value };
                    setFormData({ ...formData, content: newContent });
                  }}
                  className="border p-2 w-full"
                  rows="3"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newContent = [...(formData.content || []), { type: '', text: '' }];
                setFormData({ ...formData, content: newContent });
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Content Block
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-4">
          <label className="block mb-2">Resources:</label>
          <div className="space-y-2">
            {formData.resources?.map((resource, index) => (
              <div key={index} className="border p-3 rounded">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Resource label"
                    value={resource.label}
                    onChange={(e) => {
                      const newResources = [...formData.resources];
                      newResources[index] = { ...resource, label: e.target.value };
                      setFormData({ ...formData, resources: newResources });
                    }}
                    className="border p-2 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newResources = formData.resources.filter((_, i) => i !== index);
                      setFormData({ ...formData, resources: newResources });
                    }}
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="url"
                  placeholder="Resource URL"
                  value={resource.url}
                  onChange={(e) => {
                    const newResources = [...formData.resources];
                    newResources[index] = { ...resource, url: e.target.value };
                    setFormData({ ...formData, resources: newResources });
                  }}
                  className="border p-2 w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newResources = [...(formData.resources || []), { label: '', url: '' }];
                setFormData({ ...formData, resources: newResources });
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Resource
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mb-4">
          <label className="block mb-2">Related Posts:</label>
          <div className="space-y-2">
            {formData.relatedPosts?.map((post, index) => (
              <div key={index} className="border p-3 rounded">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Post ID"
                    value={post.id}
                    onChange={(e) => {
                      const newPosts = [...formData.relatedPosts];
                      newPosts[index] = { ...post, id: e.target.value };
                      setFormData({ ...formData, relatedPosts: newPosts });
                    }}
                    className="border p-2 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newPosts = formData.relatedPosts.filter((_, i) => i !== index);
                      setFormData({ ...formData, relatedPosts: newPosts });
                    }}
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Post title"
                  value={post.title}
                  onChange={(e) => {
                    const newPosts = [...formData.relatedPosts];
                    newPosts[index] = { ...post, title: e.target.value };
                    setFormData({ ...formData, relatedPosts: newPosts });
                  }}
                  className="border p-2 w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newPosts = [...(formData.relatedPosts || []), { id: '', title: '' }];
                setFormData({ ...formData, relatedPosts: newPosts });
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Related Post
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Blog
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin/blogs")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBlogs;
