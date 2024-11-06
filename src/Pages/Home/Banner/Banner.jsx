import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from "react-awesome-slider/dist/autoplay";
import 'react-awesome-slider/dist/styles.css';
import img1 from '../../../assets/s1.jpg';
import img2 from '../../../assets/s2.jpg';
import img3 from '../../../assets/s3.jpg';
import img4 from '../../../assets/s4.jpg';
import img5 from '../../../assets/s5.jpg';
const images=[img1,img2,img3,img4,img5];
const Banner = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div className="relative">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={3000}
        className="h-full overflow-hidden"
      >
        {images.map((img, idx) => (
          <div key={idx} data-src={img} className="bg-cover bg-center h-full" />
        ))}
      </AutoplaySlider>

      {/* banner content */}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 font-jost">
        {/* for text only */}
        <div className="relative  z-20 text-center max-w-4xl px-4">
          <h2 className="text-lg md:text-3xl lg:text-5xl text-blue-200 font-bold md:p-4 font-jost">
            Master Programming with Mates
          </h2>
          <p className="text-[15px] md:text-xl mb-6">
            Join forces to solve challenges
          </p>
        </div>

        {/*search bar */}
        <div className="flex z-20 items-center justify-center max-w-lg md:w-full">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-l-md text-gray-800 "
            placeholder="Search for contests ...."
          />
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white font-semibold">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;