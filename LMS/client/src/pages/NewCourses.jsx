import React from "react";

import HeroSection from "../pages/Students/HeroSection";
import Courses from "../pages/Students/Courses";

const NewCourses = () => {
  return (
    <div className="flex flex-col -mt-[7.5rem]">
      <HeroSection showCarousel={false} showHeroContent={true} />
      <Courses />
    </div>
  );
};

export default NewCourses;
