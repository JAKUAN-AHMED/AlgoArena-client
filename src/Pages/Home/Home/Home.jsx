import Footer from "../../Footer/Footer";
import AdvertisementSection from "../AdvertisementSection/AdvertisementSection";
import Banner from "../Banner/Banner";
import BestContestCreatorsSection from "../BestContestCreatorSection/BestContestCreatorSection";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import Navbar from "../Navbar/Navbar";
import PopularContest from "../PopularContest/PopularContest";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <PopularContest/>
            <AdvertisementSection/>
            <BestContestCreatorsSection/>
            <FeaturedSection/>
            <Footer/>
        </div>
    );
};

export default Home;