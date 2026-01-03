import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Landing from "./Landing";
import Home from "./Body/Home";
function App() {
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
      path:"/navbar",
      element:<Navbar></Navbar>,

      children:[
        {
        path:"home",
        element:<Home></Home>
      },
    ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
