
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from "./components/Login/Login" 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otherprofile from './components/Otherprofile/Otherprofile';


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
