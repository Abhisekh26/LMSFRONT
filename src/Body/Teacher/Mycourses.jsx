
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  async function fetchMyCourses() {
    const res = await axios.get("http://localhost:5500/my-courses", {
      withCredentials: true,
    });
    setCourses(res.data);
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map(course => (
        <div
          key={course._id}
          onClick={() => navigate(`/teacher/course/${course._id}`)}
          className="card bg-red-100 shadow-md cursor-pointer hover:shadow-xl transition duration-300"
        >
          {/* 🔹 Thumbnail */}
          <figure className="h-40 overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          </figure>

          {/* 🔹 Content */}
          <div className="card-body space-y-1">
            <h2 className="card-title">{course.name}</h2>

            <p className="text-sm text-base-content/70">
              Level: {course.level}
            </p>

            <div className="flex justify-between items-center">
              <span className="badge badge-outline capitalize">
                {course.status}
              </span>

              <span className="text-sm font-semibold">
                ₹ {course.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
