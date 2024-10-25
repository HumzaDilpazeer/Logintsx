import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Column 1: Welcome Text */}
      <div className="flex-1 bg-blue-500 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to my web</h1>
      </div>

      {/* Column 2: Login and Register Buttons */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">Login</button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-500 text-white px-6 py-2 rounded">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
