import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Stats = [
  { count: "5K", label: "Active Students", order: 1 },
  { count: "10+", label: "Mentors", order: 2 },
  { count: "200+", label: "Courses", order: 3 },
  { count: "50+", label: "Awards", order: 4 },
];

const StatsComponenet = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS library
  }, []);

  return (
    <div
      className='bg-richblack-700'
      data-aos='slide-up'
      data-aos-duration='400'
      data-aos-offset='100'
    >
      {/* Stats */}
      <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto '>
        <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
          {Stats.map((data, index) => (
            <div
              className='flex flex-col py-10'
              key={index}
              data-aos={data.order < 3 ? "slide-right" : "slide-left"}
              data-aos-duration='400'
            >
              <h1 className={`text-[32px] font-bold text-richblack-5`}>
                {data.count}
              </h1>
              <h2 className={`font-semibold text-[18px] text-richblack-500`}>
                {data.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;
