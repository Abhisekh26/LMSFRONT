
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { login } from "./DataStore/Slice/Authslice";


import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";

// student pages
import Home from "./Body/Home";
import CourseDetail from "./Body/CourseDetail";
import LessonDetails from "./Body/LessonDetails";
import Enrolledcourse from "./Body/Enrolledcourse";

// teacher pages
// import TeacherDashboard from "./Teacher/Dashboard";
// import MyCourses from "./Teacher/MyCourses";
// import CreateCourse from "./Teacher/CreateCourse";
import RoleGuard from "./Roleguard/Roleguard";
import StudentLayout from "./Layout/Studentlayout";
import Teacherlayout from "./Layout/Teacherlayout";
import Teacherdashboard from "./Body/Teacher/Teacherdashboard";
import Mycourses from "./Body/Teacher/Mycourses";
import Teachercourselesson from "./Body/Teacher/Teachercourselesson";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:5500/me", {
          withCredentials: true,
        });
        dispatch(login(res.data));
      } catch {
        console.log("User not logged in");
      }
    }
    fetchUser();
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },

    // STUDENT ROUTES
    {
      path: "/student",
      element: (
          <RoleGuard role ="Student">
          <StudentLayout></StudentLayout>
        </RoleGuard>
      ),
      children: [
        { path: "home", element: <Home /> },
        { path: "course/:id", element: <CourseDetail /> },
        { path: "course/lesson/:id", element: <LessonDetails /> },
        { path: "enrolled", element: <Enrolledcourse /> },
      ],
    },

    // TEACHER ROUTES
    {
      path: "/teacher",
      element: (
        <RoleGuard role="Teacher">
          <Teacherlayout />
        </RoleGuard>
      ),
      children: [
         { index: true, element: <Teacherdashboard></Teacherdashboard> },
           { path: "courses", element: <Mycourses></Mycourses> },
            { path: "course/:id", element: <Teachercourselesson></Teachercourselesson> },
      //   { path: "create-course", element: <CreateCourse /> },
       ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
