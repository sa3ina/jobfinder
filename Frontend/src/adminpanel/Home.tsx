//@ts-nocheck
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
  const [dataline, setDataline] = useState({ pv: [], uv: [] });

  const aggregateJobPosts = (jobs) => {
    const jobPostsByDate = {};
    jobs.forEach((job) => {
      const date = new Date(job.date).toLocaleDateString();
      if (jobPostsByDate[date]) {
        jobPostsByDate[date]++;
      } else {
        jobPostsByDate[date] = 1;
      }
    });
    return Object.keys(jobPostsByDate).map((date) => ({
      date,
      count: jobPostsByDate[date],
    }));
  };

  useEffect(() => {
    if (jobs.length > 0 && employers.length > 0) {
      const jobPostsByDate = aggregateJobPosts(jobs);
      const jobApplicationsByDate = aggregateJobApplications(employers);
      const newData = {
        pv: jobPostsByDate.map(({ date, count }) => ({
          name: date,
          pv: count,
        })),
        uv: jobApplicationsByDate.map(({ name, uv }) => ({ name, uv })),
      };
      setDataline(newData);
      console.log(newData);
    }
  }, [jobs, employers]);

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
  console.log(data);
  const mergedData = [];
  let pvIndex = 0;
  let uvIndex = 0;

  while (pvIndex < dataline.pv.length || uvIndex < dataline.uv.length) {
    const pvData = dataline.pv[pvIndex];
    const uvData = dataline.uv[uvIndex];

    if (!pvData) {
      mergedData.push({ name: uvData.name, pv: 0, uv: uvData.uv });
      uvIndex++;
    } else if (!uvData) {
      mergedData.push({ name: pvData.name, pv: pvData.pv, uv: 0 });
      pvIndex++;
    } else {
      if (pvData.name === uvData.name) {
        mergedData.push({ name: pvData.name, pv: pvData.pv, uv: uvData.uv });
        pvIndex++;
        uvIndex++;
      } else if (pvData.name < uvData.name) {
        mergedData.push({ name: pvData.name, pv: pvData.pv, uv: 0 });
        pvIndex++;
      } else {
        mergedData.push({ name: uvData.name, pv: 0, uv: uvData.uv });
        uvIndex++;
      }
    }
  }

  console.log(mergedData);
  const sortedData = mergedData.sort(
    (a, b) => new Date(a.name) - new Date(b.name)
  );

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
              bottom: 75,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" angle={-40} textAnchor="end" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sortedData}
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
              name="Posted jobs"
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#82ca9d"
              name="Applied jobs"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
