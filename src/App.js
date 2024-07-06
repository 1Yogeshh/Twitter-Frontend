
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from "./components/Login/Login" 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otherprofile from './components/Otherprofile/Otherprofile';
import UpdateProfile from './components/Profile/updateprofile';

function App() {
  const router = createBrowserRouter([
  
    {
      path:'/',
      element:<Home/>,
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/otherprofile/:id",
      element:<Otherprofile/>
    },
    {
      path:"/update",
      element:<UpdateProfile/>
    }
  ]);
  
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
}

export default App;
