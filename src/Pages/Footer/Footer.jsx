import { FaFacebook, FaLinkedin } from "react-icons/fa"; // For social media icons

import logo from '../../assets/c.jpg';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Website Logo and Name */}
        <div className="flex items-center mb-6 sm:mb-0">
          <img
            src={logo} // Replace with your logo path
            alt="Website Logo"
            className="w-16 h-16 mr-4"
          />
          <h1 className="text-2xl font-bold">AlgoArena</h1>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-6 sm:mb-0">
          <a
            href="https://www.facebook.com/yourprofile" // Replace with your Facebook link
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/yourprofile" // Replace with your LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-700"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Information */}
      <div className="text-center text-sm text-gray-400 mt-4">
        <p>
          &copy; {new Date().getFullYear()} AlgoArena. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
