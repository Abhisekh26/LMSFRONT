import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-base-100">
      
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold">
            LMS
          </Link>
        </div>

        <div className="navbar-end gap-3">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </div>

      
      <div className="hero min-h-[85vh]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16">
          
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBVvkuQpdYVimY-xk34t3TCnm3gFC-M924A&s"
            alt="Learning illustration"
            className="max-w-sm rounded-lg"
          />
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Learn. Track. Grow.
            </h1>
            <p className="py-6 text-lg text-gray-500 max-w-md">
              A modern Learning Management System for students and instructors
              to manage courses, track progress, and grow together.
            </p>

            <div className="flex gap-4">
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
