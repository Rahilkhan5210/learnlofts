// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaLinkedin, FaTwitter } from "react-icons/fa";

// function BlogDetail() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     axios.get(`http://localhost:9000/api/v1/blogs/${id}`)
//       .then(res => {
//         setBlog(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError("Blog not found");
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!blog) return <div>No blog found.</div>;

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
//         {/* Main Content */}
//         <div className="flex-1 min-w-0">
//         <h1 className="text-3xl font-extrabold mb-4 text-gray-900 leading-tight">{blog.title}</h1>

//           {/* Cover Image */}
//           {blog.coverImage && (
//             <img src={blog.coverImage} alt={blog.title} className="w-full h-72 object-cover rounded-xl shadow mb-8" />
//           )}
//           {/* Title & Meta */}
          
//           <div className="flex items-center gap-4 mb-6">
//             <img src={blog.author?.avatar} alt={blog.author?.name} className="w-12 h-12 rounded-full border-2 border-blue-500" />
//             <div>
//               <h3 className="font-semibold text-lg text-gray-800">{blog.author?.name}</h3>
//               <p className="text-sm text-gray-500">{blog.author?.role}</p>
//             </div>
//             <span className="ml-auto text-gray-400 text-sm">{blog.date} • {blog.readTime}</span>
//           </div>
//           {/* Description */}
//           <p className="mb-6 text-xl text-gray-700 font-medium">{blog.description}</p>
//           {/* Tags */}
//           <div className="flex flex-wrap gap-2 mb-8">
//             {blog.tags && blog.tags.map((tag) => (
//               <span key={tag} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
//                 #{tag}
//               </span>
//             ))}
//           </div>
//           {/* Blog Content */}
//           <div className="prose max-w-none prose-blue prose-lg mb-12">
//             {blog.content && blog.content.map((block, idx) => {
//               if (block.type === "paragraph") {
//                 return <p key={idx}>{block.text}</p>;
//               }
//               // Add more block types as needed
//               return null;
//             })}
//           </div>
//         </div>
//         {/* Sidebar */}
//         <aside className="w-full lg:w-80 flex-shrink-0">
//           {/* Author Card */}
//           <div className="bg-white rounded-xl shadow p-6 mb-8">
//             <div className="flex items-center gap-4 mb-3">
//               <img src={blog.author?.avatar} alt={blog.author?.name} className="w-14 h-14 rounded-full border-2 border-blue-500" />
//               <div>
//                 <h3 className="font-bold text-lg text-gray-900">{blog.author?.name}</h3>
//                 <p className="text-sm text-gray-500">{blog.author?.role}</p>
//               </div>
//             </div>
//             {blog.author?.bio && <p className="text-gray-700 text-sm mb-2">{blog.author.bio}</p>}
//             <div className="flex gap-3 mt-2">
//               {blog.author?.socials?.linkedin && (
//                 <a href={blog.author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
//                   <FaLinkedin size={20} />
//                 </a>
//               )}
//               {blog.author?.socials?.twitter && (
//                 <a href={blog.author.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
//                   <FaTwitter size={20} />
//                 </a>
//               )}
//             </div>
//           </div>
//           {/* Resources */}
//           {blog.resources && blog.resources.length > 0 && (
//             <div className="bg-white rounded-xl shadow p-6 mb-8">
//               <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
//               <ul className="space-y-2">
//                 {blog.resources.map((res, idx) => (
//                   <li key={idx}>
//                     <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                       {res.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {/* Related Posts */}
//           {blog.relatedPosts && blog.relatedPosts.length > 0 && (
//             <div className="bg-white rounded-xl shadow p-6 mb-8">
//               <h4 className="font-semibold text-gray-900 mb-3">Related Posts</h4>
//               <ul className="space-y-2">
//                 {blog.relatedPosts.map((post) => (
//                   <li key={post.id}>
//                     <Link to={`/blogs/${post.id}`} className="text-blue-600 hover:underline">
//                       {post.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {/* Tags in Sidebar */}
//           {blog.tags && blog.tags.length > 0 && (
//             <div className="bg-white rounded-xl shadow p-6">
//               <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
//               <div className="flex flex-wrap gap-2">
//                 {blog.tags.map((tag) => (
//                   <span key={tag} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }

// export default BlogDetail;









import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaTwitter, FaGithub, FaBook, FaCalculator, FaGift, FaEye, FaHeart, FaComment, FaCalendarAlt, FaSyncAlt, FaClock } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

function BlogDetail() { 
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${import.meta.env.VITE_API_URL || 'https://learnlofts.onrender.com'}/api/v1/blogs/${id}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Blog not found");
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, you would call an API to update the like count
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
          Return to homepage
        </Link>
      </div>
    </div>
  );
  
  if (!blog) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
        <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or may have been removed.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200">
          Browse All Articles
        </Link>
      </div>
    </div>
  );

  const renderContentBlock = (block, idx) => {
    switch (block.type) {
      case "paragraph":
        return <p key={idx} className="mb-6 text-gray-700 leading-relaxed">{block.text}</p>;
      case "image":
        return (
          <figure key={idx} className="my-8">
            <img 
              src={block.url} 
              alt={block.alt || ""} 
              className="w-full rounded-lg shadow-md border border-gray-200"
            />
            {block.caption && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      case "quote":
        return (
          <blockquote key={idx} className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-600">
            <p className="text-xl">"{block.text}"</p>
            {block.author && (
              <footer className="mt-2 not-italic font-medium text-gray-700">— {block.author}</footer>
            )}
          </blockquote>
        );
      case "code":
        return (
          <div key={idx} className="my-8 rounded-lg overflow-hidden">
            <SyntaxHighlighter language={block.language || "bash"} style={tomorrow}>
              {block.text}
            </SyntaxHighlighter>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-cyan-600 text-white py-16 -mt-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{blog.title}</h1>
            <p className="text-xl text-blue-100 mb-8">{blog.description}</p>
            
            <div className="flex items-center gap-4">
              <img 
                src={blog.author?.avatar} 
                alt={blog.author?.name} 
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <h3 className="font-semibold text-lg">{blog.author?.name}</h3>
                <p className="text-blue-100 text-sm">{blog.author?.role}</p>
              </div>
              <div className="ml-auto flex items-center space-x-6">
                <span className="flex items-center text-sm">
                  <FaCalendarAlt className="mr-2" />
                  {blog.date}
                </span>
                <span className="flex items-center text-sm">
                  <FaEye className="mr-2" />
                  {blog.stats?.views?.toLocaleString() || '0'} views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Cover Image */}
          {blog.coverImage && (
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg mb-8 border border-gray-200"
            />
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="flex items-center text-gray-500 text-sm">
                <FaClock className="mr-1" />
                {blog.readTime}
              </span>
              {blog.lastUpdated && (
                <span className="flex items-center text-gray-500 text-sm">
                  <FaSyncAlt className="mr-1" />
                  Updated {blog.lastUpdated}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition ${liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <FaHeart className={liked ? 'fill-current' : ''} />
                {blog.stats?.likes + (liked ? 1 : 0)}
              </button>
              
              <a 
                href="#comments" 
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-600 text-sm font-medium transition"
              >
                <FaComment />
                {blog.stats?.comments}
              </a>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags?.map((tag) => (
              <Link 
                key={tag} 
                to={`/tags/${tag.toLowerCase()}`}
                className="inline-flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold transition"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Blog Content */}
          <article className="prose prose-lg max-w-none mb-12">
            {blog.content?.map((block, idx) => renderContentBlock(block, idx))}
          </article>

          {/* Author Card (Mobile) */}
          <div className="lg:hidden bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={blog.author?.avatar} 
                alt={blog.author?.name} 
                className="w-14 h-14 rounded-full border-2 border-blue-500"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{blog.author?.name}</h3>
                <p className="text-sm text-gray-500">{blog.author?.role}</p>
              </div>
            </div>
            {blog.author?.bio && (
              <p className="text-gray-700 text-sm mb-4">{blog.author.bio}</p>
            )}
            <div className="flex gap-3">
              {blog.author?.socials?.linkedin && (
                <a 
                  href={blog.author.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-700 hover:text-blue-900 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {blog.author?.socials?.twitter && (
                <a 
                  href={blog.author.socials.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:text-blue-600 transition"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {blog.author?.socials?.github && (
                <a 
                  href={blog.author.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 hover:text-gray-900 transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <section id="comments" className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments ({blog.stats?.comments || 0})</h2>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-500">Sign in to leave a comment</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
          {/* Author Card */}
          <div className="hidden lg:block bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={blog.author?.avatar} 
                alt={blog.author?.name} 
                className="w-14 h-14 rounded-full border-2 border-blue-500"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{blog.author?.name}</h3>
                <p className="text-sm text-gray-500">{blog.author?.role}</p>
              </div>
            </div>
            {blog.author?.bio && (
              <p className="text-gray-700 text-sm mb-4">{blog.author.bio}</p>
            )}
            <div className="flex gap-3">
              {blog.author?.socials?.linkedin && (
                <a 
                  href={blog.author.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-700 hover:text-blue-900 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {blog.author?.socials?.twitter && (
                <a 
                  href={blog.author.socials.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:text-blue-600 transition"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {blog.author?.socials?.github && (
                <a 
                  href={blog.author.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 hover:text-gray-900 transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Table of Contents (would be dynamic in a real app) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Table of Contents</h4>
            <ul className="space-y-2">
              <li>
                <a href="#introduction" className="text-blue-600 hover:underline flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-blue-600"></span>
                  Introduction
                </a>
              </li>
              <li>
                <a href="#getting-started" className="text-blue-600 hover:underline flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-blue-600"></span>
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#core-services" className="text-blue-600 hover:underline flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-blue-600"></span>
                  Core Services
                </a>
              </li>
              <li>
                <a href="#conclusion" className="text-blue-600 hover:underline flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-blue-600"></span>
                  Conclusion
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          {blog.resources?.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                {blog.resources.map((res, idx) => (
                  <li key={idx}>
                    <a 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition"
                    >
                      {res.icon === 'book' && <FaBook className="flex-shrink-0" />}
                      {res.icon === 'calculator' && <FaCalculator className="flex-shrink-0" />}
                      {res.icon === 'gift' && <FaGift className="flex-shrink-0" />}
                      <span>{res.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Posts */}
          {blog.relatedPosts?.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Related Posts</h4>
              <ul className="space-y-4">
                {blog.relatedPosts.map((post) => (
                  <li key={post.id}>
                    <Link 
                      to={`/blogs/${post.id}`} 
                      className="group flex gap-3 items-start"
                    >
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div>
                        <h5 className="font-medium text-gray-900 group-hover:text-blue-600 transition">
                          {post.title}
                        </h5>
                        <p className="text-xs text-gray-500">{post.readTime}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-md p-6 text-white">
            <h4 className="font-semibold text-lg mb-2">Stay Updated</h4>
            <p className="text-sm text-blue-100 mb-4">Get the latest articles on cloud computing delivered to your inbox.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button 
                type="submit" 
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-blue-100 mt-3">No spam, unsubscribe anytime.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BlogDetail;


