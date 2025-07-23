import Blog from '../Models/Blog.Model.js';

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    console.log('Fetching all blogs');
    const blogs = await Blog.find();
    console.log(`Found ${blogs.length} blogs`);
    
    // Log all blog IDs for debugging
    blogs.forEach(blog => {
      console.log(`Blog ID: ${blog.id}, MongoDB ID: ${blog._id}`);
    });
    
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Get single blog
export const getBlog = async (req, res) => {
  try {
    console.log('Fetching blog with ID:', req.params.id);
    
    let blog = null;
    
    // Check if the ID looks like a MongoDB ObjectId (24 character hex string)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    
    if (isObjectId) {
      // Try to find by MongoDB ObjectId first
      blog = await Blog.findById(req.params.id);
    }
    
    // If not found or not an ObjectId, try to find by custom id field
    if (!blog) {
      blog = await Blog.findOne({ id: req.params.id });
    }
    
    if (!blog) {
      console.log('Blog not found for ID:', req.params.id);
      return res.status(404).json({ error: 'Blog not found' });
    }
    console.log('Found blog:', blog);
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

// Create blog
export const createBlog = async (req, res) => {
  try {
    console.log('Creating blog with data:', req.body);
    const blog = new Blog(req.body);
    await blog.save();
    console.log('Created blog:', blog);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validationErrors 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate key error - this ID already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create blog',
      details: error.message 
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    console.log('Updating blog with ID:', req.params.id);
    console.log('Update data:', req.body);
    
    // Remove the id field from the update data to prevent conflicts
    const { id, ...updateData } = req.body;
    
    let blog = null;
    
    // Check if the ID looks like a MongoDB ObjectId (24 character hex string)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    
    if (isObjectId) {
      // Try to find by MongoDB ObjectId first
      blog = await Blog.findById(req.params.id);
    }
    
    // If not found or not an ObjectId, try to find by custom id field
    if (!blog) {
      blog = await Blog.findOne({ id: req.params.id });
    }
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Update using the found document's _id
    blog = await Blog.findByIdAndUpdate(
      blog._id, 
      updateData, 
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    );
    
    console.log('Updated blog:', blog);
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validationErrors 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate key error - this ID already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to update blog',
      details: error.message 
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    console.log('Deleting blog with ID:', req.params.id);
    
    let blog = null;
    
    // Check if the ID looks like a MongoDB ObjectId (24 character hex string)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    
    if (isObjectId) {
      // Try to find by MongoDB ObjectId first
      blog = await Blog.findById(req.params.id);
    }
    
    // If not found or not an ObjectId, try to find by custom id field
    if (!blog) {
      blog = await Blog.findOne({ id: req.params.id });
    }
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Delete using the found document's _id
    blog = await Blog.findByIdAndDelete(blog._id);
    
    console.log('Deleted blog:', blog);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};