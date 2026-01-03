import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from '../DataStore/Slice/Authslice';


export default function Navbar() {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()


  async function handlelogout(){

 const signout = await axios.post("http://localhost:5500/logout")
 if(signout.status === 200){
  dispatch(logout())
  setTimeout(()=>{
  navigate("/")
  },2000)
 }
  }
  return (
    <>
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/navbar/home">Home</Link></li>
        <li>
          <Link>Courses</Link>
          <ul className="p-2">                            
            <li><Link to="/navbar/enrolledcourse">Enrolled</Link></li>
            <li><Link to="navbar/allcourses">All Courses</Link></li>
          </ul>
        </li>
        <li><Link>Profile</Link></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">LMS</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/navbar/home">Home</Link></li>
      <li>
        <details>
          <summary>Courses</summary>
          <ul className="p-2 bg-base-100 w-40 z-1"> 
            <li><Link to="/navbar/enrolledcourse">Enrolled</Link></li>
            <li><Link to="navbar/allcourses">All Courses</Link></li>
           </ul>
        </details>
      </li>
      <li><Link>Profile</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <button className="btn btn-neutral" onClick={handlelogout}>Logout</button>
  </div>
</div>
<div>
  <Outlet></Outlet>
</div>
</>
  )
}
