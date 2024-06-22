
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from "./components/Login/Login" 

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
    }
  ]);
  
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
