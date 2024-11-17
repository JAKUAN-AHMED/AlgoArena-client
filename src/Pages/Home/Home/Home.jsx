import React, { useState } from "react";
import Footer from "../../Footer/Footer";
import AdvertisementSection from "../AdvertisementSection/AdvertisementSection";
import Banner from "../Banner/Banner";
import BestContestCreatorsSection from "../BestContestCreatorSection/BestContestCreatorSection";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import Navbar from "../Navbar/Navbar";
import PopularContest from "../PopularContest/PopularContest";
import FilteredHome from "../../FilteredHome/FilteredHome";
// import FilteredHome from "../FilteredHome/FilteredHome"; // Import FilteredHome

const Home = () => {
  const [searchResults, setSearchResults] = useState([]); // State to hold search results

  return (
    <div>
      <Navbar />
      <Banner setSearchResults={setSearchResults} />{" "}
      {/* Pass setSearchResults to Banner */}
      <FilteredHome contests={searchResults} />{" "}
      {/* Display search results in FilteredHome */}
      <PopularContest />
      <AdvertisementSection />
      <BestContestCreatorsSection />
      <FeaturedSection />
      <Footer />
    </div>
  );
};

export default Home;
