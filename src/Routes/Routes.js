import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Main from "../Layout/Main";
import AllImages from './../components/AllImages/AllImages';
import IsLoggedin from "./PrivateRoute/IsLoggedin";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

     
      
      {
        path: "/images",

        element:<PrivateRoute><AllImages></AllImages></PrivateRoute> ,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  
]);
export default router;
