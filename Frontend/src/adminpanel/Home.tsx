import React from "react";
import { useEffect, useState } from "react";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/slices/JobseekerSlice";
import { fetchDataa } from "../redux/slices/EmployerSlice";
import { fetchJobs } from "../redux/slices/JobsSlice";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Link } from "react-router-dom";

function Home() {
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const { employers } = useSelector((state: RootState) => state.employers);
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchData());
    dispatch(fetchDataa());
  }, [dispatch]);
  const locations = jobs.map((job) => job.location);

  const locationCount = locations.reduce((acc, location) => {
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const locationData = Object.entries(locationCount).map(
    ([location, count]) => ({
      location,
      count,
    })
  );
  const jobSeekerCounts = {};

  employers.forEach((employer) => {
    employer.notifications.forEach((notification) => {
      const jobSeekerEmail = notification.jobSeekerEmail;

      jobSeekerCounts[jobSeekerEmail] =
        (jobSeekerCounts[jobSeekerEmail] || 0) + 1;
    });
  });
  const totalApplications = Object.values(jobSeekerCounts).reduce(
    (total, count) => total + count,
    0
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    const aggregatedData = aggregateJobApplications(employers);
    setData(aggregatedData);
  }, [employers]);

  const aggregateJobApplications = (employersData) => {
    const jobApplicationsByDate = {};

    employersData.forEach((employer) => {
      employer.notifications.forEach((notification) => {
        const date = new Date(notification.date).toLocaleDateString();

        if (jobApplicationsByDate[date]) {
          jobApplicationsByDate[date]++;
        } else {
          jobApplicationsByDate[date] = 1;
        }
      });
    });
    const chartData = Object.keys(jobApplicationsByDate).map((date) => ({
      name: date,
      uv: jobApplicationsByDate[date],
    }));

    return chartData;
  };

  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>JOBS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{jobs.length}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>APPLICATIONS</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalApplications}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>JOBSEEKERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{jobseekers.length}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>EMPLOYERS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{employers.length}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={330}>
          <BarChart
            data={locationData}
            margin={{
              top: 3,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" angle={-40} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 3,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
