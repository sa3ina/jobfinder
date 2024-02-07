import Companies from "../pages/Companies";
import FindJob from "../pages/FindJob";
import Home from "../pages/Home";
import JobsGrid from "../pages/JobsGrid";
import JobsList from "../pages/JobsList";
import Login from "../pages/Login";
import PostJob from "../pages/PostJob";
import SignUp from "../pages/SignUp";
import Root from "../pages/Root";
import Detail from "../pages/Detail";
export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/findjob",
        element: <FindJob />,
      },
      {
        path: "/jobsgrid",
        element: <JobsGrid />,
      },
      {
        path: "/jobslist",
        element: <JobsList />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/postjob",
        element: <PostJob />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/:id",
        element: <Detail />,
      },
    ],
  },
];
