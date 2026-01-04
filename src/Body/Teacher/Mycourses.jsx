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
          className="card bg-red-200 shadow cursor-pointer hover:shadow-lg transition"
        >
          <div className="card-body">
            <h2 className="card-title">{course.name}</h2>
            <p className="text-sm text-base-content/70">
              Level: {course.level}
            </p>
            <span className="badge badge-outline capitalize w-fit">
              {course.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
