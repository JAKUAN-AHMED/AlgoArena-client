const NotFound = () => {
  // Function to handle redirection to homepage
  const goToHomepage = () => {
    window.location.href = "/"; // Redirect to the homepage ("/")
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-red-600 mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={goToHomepage}
          className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-md transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
