import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  useEffect(() => {
    AOS.init({
      offset: 130,
      duration: 500,
      easing: "ease",
    });
  }, []);
  return (
    <div>
      <div
        className='text-4xl font-semibold text-center my-10'
        data-aos='fade-up'
      >
        Your swiss knife for
        <HighlightText text={"learning any language"} />
        <div className='text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3'>
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
          <img
            src={Know_your_progress}
            alt=''
            className='object-contain  lg:-mr-32 '
            data-aos='slide-left'
          />
          <img
            src={Compare_with_others}
            alt=''
            className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'
            data-aos='slide-right'
          />
          <img
            src={Plan_your_lessons}
            alt=''
            className='object-contain  lg:-ml-36 lg:-mt-5 -mt-16'
            data-aos='slide-left'
          />
        </div>
      </div>

      <div className='w-fit mx-auto lg:mb-20 mb-8 -mt-5'>
        <CTAButton active={true} linkto={"/signup"}>
          <div className=''>Learn More</div>
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
