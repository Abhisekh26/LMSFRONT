
import { Outlet } from "react-router-dom";
import Navbar from './../Header/Navbar';

export default function StudentLayout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}
