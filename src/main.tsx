import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { AllJobs } from './components/AllJobs.tsx'
import { JobsTable } from './components/JobTables.tsx'
import { JobDescription } from './components/Job.tsx'
import Candidates from './components/CandidatesTable.tsx'
import LoginForm from './components/login.tsx'
import { AdminJobDescription } from './components/JobAdmin.tsx'
import EditJob from './components/EditJob.tsx'
import CreateEditJobForm from './components/NewJob.tsx'

const router = createBrowserRouter([
  {
    path: "/admin/jobs",
    element: <App />,
    children: [
      {
        index: true,
        element: <JobsTable />,
      },
      {
        path: "new",
        element: <CreateEditJobForm />,
      },
      {
        path: "edit/:id",
        element: <EditJob />,
      },
      {
        path: ":id",
        element: <AdminJobDescription />,
      },
      {
        path: ":id/candidates",
        element: <Candidates />
      },
    ],
  },
  {
    path: "/jobs",
    element: <App />,
    children: [
      {
        index: true,
        element: <AllJobs />,
      },
      {
        path: ":id",
        element: <JobDescription />,
      },
    ]
  },
  {
    path: "/",
    element: <Navigate to="/jobs" />

  },
  {
    path: "/login",
    element: <LoginForm />

  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);