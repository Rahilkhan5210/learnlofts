import { Award, BookOpen, GraduationCap, Menu, Newspaper, School } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogoutUserMutation } from "@/Features/Api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import CertificationDropdown from "@/pages/CertificationDropDown";
import LearnLoftsLogo from "../../../assets/frontend_assets/logo.png"


const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCertifications, setShowCertifications] = useState(false);

  const handleNavigation = (path) => {
    // Always navigate first
    navigate(path);
    
    // Then scroll to top after a small delay to ensure the page has started loading
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Add effect to handle scroll on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <>
      <div className="h-16   border-b bg-white  border-b-gray-200 fixed top-0 left-0 right-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            
            <Link to="/" className="cursor-pointer">
              <h1 className="font-extrabold text-2xl text-gray-900 dark:text-white tracking-tight">
              <img src={LearnLoftsLogo} alt="logo" className="h-8 sm:h-10 w-auto" />
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ">
            <nav className="flex items-center gap-6 text-black-700 dark:text-black-200">
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center gap-1 hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="flex items-center gap-1 hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>About</span>
              </button>
              <button
                onClick={() => handleNavigation('/blogs')}
                className="flex items-center gap-1 hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
              >
                <Newspaper className="h-4 w-4" />
                <span>Blogs</span>
              </button>
              <button
                onClick={() => handleNavigation('/NewCourses')}
                className="flex items-center gap-1 hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
              >
                <Award className="h-4 w-4" />
                <span>Courses</span>
              </button>
              <div
                className="relative group"
                onMouseEnter={() => setShowCertifications(true)}
                onMouseLeave={() => setShowCertifications(false)}
              >
                <button
                  onClick={() => handleNavigation("/student/certification")}
                  className="flex items-center gap-1 text-base font-medium hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <Award className="h-4 w-4" />
                  <span>Certification</span>
                </button>
                {showCertifications && (
                  <CertificationDropdown onMouseLeave={() => setShowCertifications(false)} />
                )}
              </div>
            </nav>

            {/* Avatar / Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:ring-2 ring-primary transition">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="user"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 shadow-lg rounded-lg">
                  <DropdownMenuLabel className="text-sm text-muted-foreground">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/my-learning" className="cursor-pointer">📚 My Learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">👤 Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer">
                      🚪 Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="cursor-pointer">📊 Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={() => handleNavigation("/login")} className="cursor-pointer">
                  Login
                </Button>
                <Button onClick={() => handleNavigation("/login")} className="cursor-pointer">Sign Up</Button>
              </div>
            )}
            {/* <DarkMode /> */}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNavbar user={user} />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();
  const [showCertifications, setShowCertifications] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
    setOpen(false);
  };

  // Add effect to handle scroll on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  const logoutHandler = async () => {
    await logoutUser();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full hover:bg-muted" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col justify-between py-6 px-5">
        <div>
          <SheetHeader className="flex flex-row items-center justify-between mb-6">
            <SheetTitle>
              <button onClick={() => handleNavigation('/')} className="text-xl font-bold cursor-pointer">LearnLofts</button>
            </SheetTitle>
            {/* <DarkMode /> */}
          </SheetHeader>

          <nav className="flex flex-col gap-4">
            <button onClick={() => handleNavigation('/')} className="text-base hover:text-primary text-left cursor-pointer">Home</button>
            <button onClick={() => handleNavigation('/about')} className="text-base hover:text-primary text-left cursor-pointer">About</button>
            <button onClick={() => handleNavigation('/blogs')} className="text-base hover:text-primary text-left cursor-pointer">Blogs</button>
            <button onClick={() => handleNavigation('/NewCourses')} className="text-base hover:text-primary text-left cursor-pointer">Courses</button>
            <button onClick={() => handleNavigation('/student/certifications')} className="text-base hover:text-primary text-left cursor-pointer">
              Certifications
            </button>

            {user && (
              <>
                <button onClick={() => handleNavigation('/my-learning')} className="text-base hover:text-primary text-left cursor-pointer">My Learning</button>
                <button onClick={() => handleNavigation('/profile')} className="text-base hover:text-primary text-left cursor-pointer">Edit Profile</button>
                <button onClick={logoutHandler} className="text-base hover:text-red-500 text-left cursor-pointer">
                  Log out
                </button>
              </>
            )}

            {user?.role === "instructor" && (
              <Button className="mt-4 w-full cursor-pointer" onClick={() => handleNavigation("/admin/dashboard")}>
                Instructor Dashboard
              </Button>
            )}
          </nav>
        </div>

        {!user && (
          <div className="flex flex-col gap-3">
            <Button variant="outline" onClick={() => handleNavigation("/login")} className="cursor-pointer">
              Login
            </Button>
            <Button onClick={() => handleNavigation("/login")} className="cursor-pointer">
              Sign Up
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};



