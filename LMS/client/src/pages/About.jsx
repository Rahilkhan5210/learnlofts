import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Target,
  Sparkles,
  Globe,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function StatItem({ icon, value, suffix, label, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, value, duration])

  return (
    <div ref={ref} className="flex flex-col items-center text-center group">
      <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300 transform group-hover:scale-110">
        <div className="text-blue-600 group-hover:text-blue-700 transition-colors">{icon}</div>
      </div>
      <div className="mb-2">
        <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {count.toLocaleString()}
        </span>
        <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {suffix}
        </span>
      </div>
      <p className="text-gray-600 font-medium text-lg md:text-xl">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <div className="w-screen -mt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="w-full bg-[#064d95] from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About LearnLofts
            </h1>
            <p className="text-lg sm:text-xl text-blue-100">
              Empowering learners worldwide with quality education and innovative
              learning solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            {[
              {
                title: "Our Mission",
                text: "Our mission is simple: ensure you pass your IT or non-IT certification exam—on the first try. We cut through the noise with laser-focused study materials, expert-curated strategies, and fail-proof techniques designed for speed and accuracy. No filler, no outdated advice—just what works. We empower you with confidence, clarity, and competence, turning daunting exams into conquered milestones. Whether you're a beginner or a pro, our tools and insights guarantee maximum efficiency. Your success isn't luck; it's engineered. Join thousands who've skipped the retake cycle and leaped ahead. First attempt. Every time. That's our promise.",
              },
              {
                title: "Our Vision",
                text: "We envision a world where every certification aspirant succeeds on their first attempt—eliminating retakes, wasted time, and frustration. Our platform is the ultimate catalyst for IT and non-IT professionals, turning exam anxiety into unstoppable confidence. By delivering precision-crafted resources, real-world strategies, and unwavering support, we redefine what's possible in certification prep. No more guesswork, no more failures—just a direct path to mastery. We dream big: a global community where careers accelerate, skills dominate, and success becomes inevitable. Because when you pass fast, you rise faster. This isn't just learning; it's a revolution in certification excellence.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-600">
                  {item.title}
                </h2>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose LearnLofts?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
                title: "Expert Instructors",
                description:
                  "Learn from industry professionals and experienced educators.",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Community Learning",
                description:
                  "Connect with peers and engage in collaborative learning experiences.",
              },
              {
                icon: <Award className="h-8 w-8 text-blue-600" />,
                title: "Certified Courses",
                description: "Earn recognized certificates upon course completion.",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-blue-600" />,
                title: "Comprehensive Content",
                description: "Access detailed course materials and resources.",
              },
              {
                icon: <Target className="h-8 w-8 text-blue-600" />,
                title: "Flexible Learning",
                description: "Learn at your own pace with 24/7 course access.",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-blue-600" />,
                title: "Interactive Learning",
                description:
                  "Engage with dynamic content and hands-on projects.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of learners worldwide and be part of our growing educational community
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            {[
              {
                icon: <Users size={32} />,
                value: 100000,
                suffix: "+",
                label: "Students",
              },
              {
                icon: <BookOpen size={32} />,
                value: 500,
                suffix: "+",
                label: "Courses",
              },
              {
                icon: <GraduationCap size={32} />,
                value: 100,
                suffix: "+",
                label: "Instructors",
              },
              {
                icon: <Globe size={32} />,
                value: 50,
                suffix: "+",
                label: "Countries",
              },
            ].map((stat, index) => (
              <StatItem
                key={index}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                duration={2000 + index * 200} // Stagger animations slightly
              />
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>

      {/* Team Section */}
      {/* <div className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "CEO & Founder",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
              },
              {
                name: "Sarah Johnson",
                role: "Head of Education",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
              },
              {
                name: "Michael Chen",
                role: "Technical Director",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
