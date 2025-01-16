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
import UserProfile from './pages/userProfile.jsx'
import JobPost from './components/Others/JobPost.jsx';
import EMain from './components/Pages/MainComponent/EMain.jsx'
import AllCandidates from './pages/AllCandidates.jsx';
import Applications from './pages/Applications.jsx';

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
    path: '/JSDashboard',
    element: <JSdashboard></JSdashboard>
  },

  {
    path: '/user/jobs',
    element: <Jobs />
  },

  {
    path: '/user/:username',
    element: <UserProfile />

  },
  {
    path:'/EDashboard',
    element:<Edashboard></Edashboard>,
    children:[
      {
        path:'',
        element:<EMain></EMain> 
      },
      {
        path:'/EDashboard/jobposting',
        element:<JobPost></JobPost>
      },
      {
        path:'/EDashboard/allcandidates',
        element:<AllCandidates></AllCandidates>
      },{
        path:'/EDashboard/applications',
        element:<Applications></Applications>
      }
    ]
  }




]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>
);
