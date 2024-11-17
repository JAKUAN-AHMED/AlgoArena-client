import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Correct Swiper CSS import

const FilteredHome = ({ contests }) => {
  return (
    <div className="py-8 px-4">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">Searched Contests</h2>

      {/* Contest Slider */}
      <div className="w-full max-w-7xl mx-auto">
        <Swiper
          spaceBetween={10} // Space between slides
          slidesPerView={1} // Show 1 slide at a time
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2, // Show 2 slides on small screens
            },
            768: {
              slidesPerView: 3, // Show 3 slides on medium screens
            },
            1024: {
              slidesPerView: 4, // Show 4 slides on large screens
            },
          }}
        >
          {contests.length > 0 ? (
            contests.map((contest) => (
              <SwiperSlide key={contest._id}>
                <div
                  className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300"
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Shadow effect
                  }}
                >
                  {/* Contest Image */}
                  <figure className="pt-4">
                    <img
                      src={contest.contestImage}
                      alt={contest.contestName}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  </figure>
                  <h3 className="font-semibold text-lg">
                    {contest.contestName}
                  </h3>
                  <p className="text-sm">{contest.contestDescription}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <strong>Entry Fee:</strong> ${contest.entryFee}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <strong>Prize Money:</strong> ${contest.prizeMoney}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <strong>Deadline:</strong> {contest.deadline}
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-lg text-center text-gray-500">
              No contests found.
            </p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default FilteredHome;
