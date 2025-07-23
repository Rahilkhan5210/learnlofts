import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "emailjs-com";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Replace with your actual EmailJS credentials
const SERVICE_ID = "service_t7bbjxa";
const TEMPLATE_ID = "template_z3nhgp9";
const PUBLIC_KEY = "zmndvkevtmdC_U9w1"; // formerly user_id

const handleSubscribe = async (e) => {
  e.preventDefault();
  if (!email) {
    toast.error("Please enter your email address");
    return;
  }

  setIsSubscribing(true);
  try {
    const templateParams = {
      to_email: email,
      // You can add more dynamic values here from the form
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

    setIsSubscribed(true);
    toast.success("Successfully subscribed! Check your inbox 📩");
    setEmail("");
  } catch (error) {
    console.error("EmailJS error:", error);
    toast.error("Subscription failed. Please try again.");
  } finally {
    setIsSubscribing(false);
  }
};

  return (
    <footer className="w-full text-white relative overflow-hidden bg-red-500">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-[#064d95] pointer-events-none z-0" />

      {/* Newsletter Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 border-t-4 border-blue-500">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white animate-fade-in">
                Subscribe to Our LearnLofts
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Stay updated with our latest courses and educational insights
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 items-center"
              >
                <div className="relative w-full sm:w-64">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white transition-all duration-200 w-full text-white placeholder:text-blue-100"
                  />
                  {isSubscribed && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg hover:shadow-xl px-4 py-2"
                >
                  {isSubscribing ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About Section */}
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                About LearnLofts
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Empowering learners worldwide with quality education and professional development opportunities.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, url: 'https://www.facebook.com/share/16fgMmBjD3/?mibextid=wwXIfr', label: 'Facebook' },
                  { Icon: Twitter, url: 'https://twitter.com/learnlofts', label: 'Twitter' },
                  { Icon: Instagram, url: 'https://www.instagram.com/learnloftsofficial/profilecard/?igsh=ZjlqZWxlYWI0cTly', label: 'Instagram' },
                  { Icon: Linkedin, url: 'https://www.linkedin.com/company/learnloftsofficial/', label: 'LinkedIn' }
                ].map(({ Icon, url, label }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-200 transform hover:scale-110 cursor-pointer"
                    aria-label={`Follow us on ${label}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {[{ to: "/NewCourses", text: "Explore Courses" },{ to: "/student/certifications", text: "Certifications" }, { to: "/about", text: "About Us" }, { to: "/blogs", text: "Blog" }, { to: "/student/contact", text: "Contact" }, { to: "/student/faq", text: "FAQ" }].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                {[{ to: "/student/help", text: "Help Center" }, { to: "/student/terms", text: "Terms of Service" }, { to: "/student/privacy", text: "Privacy Policy" }].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Contact Us
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3 group hover:text-white transition-all duration-200">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 group-hover:text-blue-400" />
                  <span className="text-gray-400 group-hover:text-white">
                    Delhi NCR,<br />
                    India
                  </span>
                </li>
                <li className="group">
                  <a
                    href="tel:+91-7248108520"
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-200"
                  >
                    <Phone className="h-5 w-5 group-hover:text-blue-400" />
                    <span>+91-7248108520</span>
                  </a>
                </li>
                <li className="group">
                  <a
                    href="mailto:info@learnlofts.com"
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-200"
                  >
                    <Mail className="h-5 w-5 group-hover:text-blue-400" />
                    <span>info@learnlofts.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} LearnLofts. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {[{ to: "/student/terms", text: "Terms" }, { to: "/student/privacy", text: "Privacy" }].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 hover:text-white transition-all duration-200"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



