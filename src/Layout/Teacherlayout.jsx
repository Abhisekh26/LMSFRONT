

import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../DataStore/Slice/Authslice";
import Footer from "../Footer/Footer";

export default function Teacherlayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await axios.post("http://localhost:5500/logout", {}, { withCredentials: true });
    dispatch(logout());
    navigate("/");
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link to="/teacher" className="btn btn-ghost text-xl">
            LMS
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/teacher">Dashboard</Link></li>
            <li><Link to="/teacher/courses">My Courses</Link></li>
            <li><Link to="/teacher/create-course">Create Course</Link></li>
          </ul>
        </div>

        <div className="navbar-end">
          <button onClick={handleLogout} className="btn btn-neutral">
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 THIS IS REQUIRED */}
      <div className="p-6">
        <Outlet />
      <Footer></Footer>
      </div>
    </>
  );
}
