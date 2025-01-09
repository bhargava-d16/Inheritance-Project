import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Main from './components/Others/Main.jsx';
import About from './components/Others/About.jsx';
import LoginJs from './components/Pages/Login/LoginJs.jsx';
import LoginE from './components/Pages/Login/LoginE.jsx';
import SignupJs from './components/Pages/SignUp/SignupJs.jsx';
import SignupE from './components/Pages/SignUp/SignupE.jsx';
import Edashboard from './components/DashBoards/Edashboard.jsx';
import JSdashboard from './components/DashBoards/JSdashboard.jsx';
import Jobs from './pages/Jobs.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },

  {
    path: '/login/jobseeker',
    element: <LoginJs />,
  },

  {
    path: '/login/employeer',
    element: <LoginE />,
  },

  {
    path: '/signup/jobseeker',
    element: <SignupJs />,
  },

  {
    path: '/signup/employeer',
    element: <SignupE />,
  },

  {
    path: '/EDashboard',
    element: <Edashboard></Edashboard>
  },

  {
    path: '/JSDashboard',
    element: <JSdashboard></JSdashboard>
  },


  {
    path: '/Jobs',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Jobs />,
      }
      
    ],
  },




]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Pass the router to RouterProvider */}

  </StrictMode>
);
