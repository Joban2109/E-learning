import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SuspenseLoader from './components/SuspenseLoader'
import StudentDashboard from './pages/StudentDashboard'
import ScreenTimeTracker from './components/ScreenTimeTracker'
import BreakTimeAlert from './components/BreakTimeAlert'

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'))
const Courses = lazy(() => import('./pages/Courses'))
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const Profile = lazy(() => import('./pages/profile'))
const Admin = lazy(() => import('./pages/admin/Admin'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Course = lazy(() => import('./pages/admin/Course'))
const CreateCourse = lazy(() => import('./pages/admin/CreateCourse'))
const UpdateCourse = lazy(() => import('./pages/admin/UpdateCourse'))
const CreateLecture = lazy(() => import('./pages/admin/CreateLecture'))
const Lecture = lazy(() => import('./pages/admin/Lecture'))
const EditLecture = lazy(() => import('./pages/admin/EditLecture'))
const CourseDetails = lazy(() => import('./pages/CourseDetails.jsx'))
const LecturePlayer = lazy(() => import('./pages/LecturePlayer.jsx'))
const Footer = lazy(() => import('./components/Footer'))

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <Home/>
        <Footer/>
      </Suspense>
    )
  },
  {
    path:"/courses",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <Courses/>
        <Footer/>
      </Suspense>
    )
  },
  {
    path:"/login",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <Login/>
        <Footer/>
      </Suspense>
    )
  },
  {
    path:"/signup",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <Signup/>
        <Footer/>
      </Suspense>
    )
  },
  {
    path:"/profile",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <Profile/>
        <Footer/>
      </Suspense>
    )
  },
  {
    path:"/dashboard",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <StudentDashboard/>
        <Footer/>
      </Suspense>
    )
  },
  {
    path:"/courses/:courseId",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <CourseDetails/>
        <Footer/>
      </Suspense>
    )
  },
  {
    path:"/courses/:courseId/lecture/:lectureId",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <LecturePlayer/>
      </Suspense>
    )
  },
  
  {
    path:"/admin",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Navbar/>
        <Admin/>
      </Suspense>
    ),
    children: [
      {
        path:"dashboard",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path:"course",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Course />
          </Suspense>
        )
      },
      {
        path:"course/create",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <CreateCourse />
          </Suspense>
        )
      },
      {
        path:"course/:courseId",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <UpdateCourse/>
          </Suspense>
        )
      },
      {
        path:"course/:courseId/lecture",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Lecture/>
          </Suspense>
        )
      },
      {
        path:"course/:courseId/lecture/create",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <CreateLecture/>
          </Suspense>
        )
      },
      {
        path:"course/:courseId/lecture/:lectureId",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <EditLecture/>
          </Suspense>
        )
      }
    ]
  }
])

const App = () => {
  return (
    <>
      {/* Global components that work across all pages */}
      <ScreenTimeTracker />
      <BreakTimeAlert />
      <RouterProvider router={router}/>
    </>
  )
}

export default App