import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AllJobs } from './components/AllJobs.tsx'
import CreateJobForm from './components/NewJob.tsx'
import { JobsTable } from './components/JobTables.tsx'
import { JobDescription } from './components/Job.tsx'
import Candidates from './components/CandidatesTable.tsx'

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
        element: <CreateJobForm />,
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
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);