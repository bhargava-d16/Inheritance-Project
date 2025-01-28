import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout.jsx';
import Main from './components/Others/Main.jsx';
import About from './components/Others/About.jsx';
import LoginUser from './components/Pages/Login/LoginJs.jsx';
import LoginE from './components/Pages/Login/LoginE.jsx';
import SignupJs from './components/Pages/SignUp/SignupJs.jsx';
import SignupE from './components/Pages/SignUp/SignupE.jsx';
import Edashboard from './components/DashBoards/Edashboard.jsx';
import JSdashboard from './components/DashBoards/JSdashboard.jsx';
import Jobs from './pages/Jobs.jsx'
import UserProfile from './pages/userProfile.jsx'
import JobPost from './components/Others/JobPost.jsx';
import EMain from './components/Pages/MainComponent/EMain.jsx'
import CompanyDetails from './pages/CompanyDetails.jsx';
import User from './pages/User';
import { AuthContextProvider } from './context/authcontext.jsx';
import { Toaster} from 'react-hot-toast';
import JobApplications from './components/Others/JobApplications.jsx';
import AllJobs from './components/Others/AllJobs.jsx';

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
    element: <LoginUser />,
  },

  {
    path: '/login/employer',
    element: <LoginE />,
  },

  {
    path: '/register/jobseeker',
    element: <SignupJs />,
  },

  {
    path: '/register/employer',
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
    path: '/user/jobs/:companyusername',
    element: <CompanyDetails />
  },

  {
    path: '/user/:username',
    element: <UserProfile />

  },
  {
    path: '/user',
    element: <User />

  },

  {
    path: '/EDashboard',
    element: <Edashboard></Edashboard>,
    children: [
      {
        path: '',
        element: <EMain></EMain>
      },
      {
        path: '/EDashboard/jobposting',
        element: <JobPost></JobPost>
      },
      {
        path:'/EDashboard/myjobs',
        element:<AllJobs></AllJobs>
      },
      {
        path:'/EDashboard/myjobs/:id',
        element:<JobApplications></JobApplications>
      }
    ]
  }


]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
     
      <RouterProvider router={router} />
      <Toaster
        position="top-center" 
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }} />
    </AuthContextProvider>

  </StrictMode>
);
