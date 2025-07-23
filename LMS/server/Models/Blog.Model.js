import mongoose from 'mongoose';

const SocialsSchema = new mongoose.Schema({
  linkedin: { type: String },
  twitter: { type: String },
  // Add more socials as needed
}, { _id: false });

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  role: { type: String },
  bio: { type: String },
  socials: { type: SocialsSchema }
}, { _id: false });

const ResourceSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const RelatedPostSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true }
}, { _id: false });

const ContentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const BlogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  heroImage: { type: String },
  coverImage: { type: String },
  description: { type: String },
  image: { type: String }, // fallback for old data
  author: { type: AuthorSchema, required: true },
  category: { type: String },
  readTime: { type: String },
  date: { type: String },
  tags: [{ type: String }],
  resources: [ResourceSchema],
  relatedPosts: [RelatedPostSchema],
  content: [ContentSchema]
}, { timestamps: true });

// Add a pre-save middleware to ensure id is set for new documents
BlogSchema.pre('save', function(next) {
  if (this.isNew && !this.id) {
    // Generate a unique ID if not provided
    this.id = 'blog-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
  next();
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;