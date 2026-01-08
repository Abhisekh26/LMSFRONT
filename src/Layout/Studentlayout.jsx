
import { Outlet } from "react-router-dom";
import Navbar from './../Header/Navbar';
import Footer from "../Footer/Footer";

export default function StudentLayout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
