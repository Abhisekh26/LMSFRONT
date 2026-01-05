

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Teacherdashboard() {
  const auth = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    revenue: 0,
  });

  const [otherCourses, setOtherCourses] = useState([]);

  useEffect(() => {
    fetchMyCourses();
    fetchOtherCourses();
  }, []);

  async function fetchMyCourses() {
    const res = await axios.get("http://localhost:5500/my-courses", {
      withCredentials: true,
    });

    let students = 0;
    let revenue = 0;

    res.data.forEach((course) => {
      const count = course.enrolledStudents?.length || 0;
      students += count;
      revenue += count * course.price;
    });

    setStats({
      courses: res.data.length,
      students,
      revenue,
    });
  }

  async function fetchOtherCourses() {
    const res = await axios.get("http://localhost:5500/course", {
      withCredentials: true,
    });

    const filtered = res.data.filter(
      (course) => course.createdBy._id !== auth.user._id
    );

    setOtherCourses(filtered);
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">👨‍🏫 Teacher Dashboard</h1>
        <p className="text-base-content/70 mt-1">
          Overview of your teaching journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-red-200 shadow">
          <div className="card-body">
            <h2 className="card-title">📚 My Courses</h2>
            <p className="text-3xl font-bold">{stats.courses}</p>
          </div>
        </div>

        <div className="card bg-red-200 shadow">
          <div className="card-body">
            <h2 className="card-title">👨‍🎓 Students</h2>
            <p className="text-3xl font-bold">{stats.students}</p>
          </div>
        </div>

        <div className="card bg-red-200 shadow">
          <div className="card-body">
            <h2 className="card-title">💰 Revenue</h2>
            <p className="text-3xl font-bold">₹ {stats.revenue}</p>
          </div>
        </div>
      </div>

      {/* Other Teachers Courses */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          👀 See what other teachers are offering
        </h2>

        {otherCourses.length === 0 ? (
          <p className="text-base-content/60">No courses available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCourses.map((course) => (
              <div
                key={course._id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden"
              >
                {/* 🖼️ Image */}
                <div className="relative h-44 w-full">
                  {course.thumbnail ? (
                    <>
                      <img
                        src={course.thumbnail}
                        alt={course.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-base-200">
                      <span className="text-sm text-base-content/60">
                        No image available
                      </span>
                    </div>
                  )}

                  <h3 className="absolute bottom-3 left-3 right-3 text-white text-lg font-semibold line-clamp-2">
                    {course.name}
                  </h3>
                </div>

                <div className="card-body">
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {course.coursedescription || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge badge-outline capitalize">
                      {course.level}
                    </span>
                    <span className="badge badge-secondary">
                      ₹ {course.price}
                    </span>
                    <span className="badge badge-info capitalize">
                      {course.status}
                    </span>
                  </div>

                  <p className="text-sm mt-3 text-base-content/80">
                    👨‍🏫{" "}
                    <span className="font-medium">
                      {course.createdBy.firstName}{" "}
                      {course.createdBy.lastName}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
