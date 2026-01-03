import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Landing from "./Landing";
import Home from "./Body/Home";
import { useDispatch } from "react-redux";
import { login } from "./DataStore/Slice/Authslice";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();   

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:5500/me", {
          withCredentials: true,
        });
        dispatch(login(res.data));
      } catch (err) {
        console.log("User not logged in");
      }
    }

    fetchUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing></Landing>,
    },
    {
      path: "/signup",
      element: <Signup></Signup>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/navbar",
      element: <Navbar></Navbar>,

      children: [
        {
          path: "home",
          element: <Home></Home>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
