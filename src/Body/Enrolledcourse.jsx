

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Enrolledcourse() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  async function fetchEnrolledCourses() {
    try {
      const res = await axios.get("http://localhost:5500/course", {
        withCredentials: true,
      });

      const enrolledCourses = res.data.filter((course) =>
        auth.user?.EnrolledCourses?.includes(course._id)
      );

      setCourses(enrolledCourses);
    } catch (err) {
      console.log("Error fetching courses 👉", err.response?.data || err.message);
    }
  }

  if (!auth.user) {
    return (
      <p className="text-center mt-10">
        Please login to view your courses
      </p>
    );
  }

  if (courses.length === 0) {
    return (
      <p className="text-center mt-10">
        You haven't enrolled in any courses yet.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => navigate(`/student/course/${course._id}`)}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden"
          >
            {/* 🖼️ IMAGE WITH GRADIENT */}
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

              {/* COURSE NAME OVER IMAGE */}
              <h2 className="absolute bottom-3 left-3 right-3 text-white text-lg font-semibold line-clamp-2">
                {course.name}
              </h2>
            </div>

            <div className="card-body">
              {/* 📄 DESCRIPTION */}
              <p className="text-sm text-base-content/70 line-clamp-2">
                {course.coursedescription || "No description provided."}
              </p>

              {/* 🏷️ BADGES */}
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

              {/* 👨‍🏫 INSTRUCTOR */}
              <p className="text-sm mt-3 text-base-content/80">
                👨‍🏫{" "}
                <span className="font-medium">
                  {course.createdBy?.firstName} {course.createdBy?.lastName}
                </span>
              </p>

              {/* STATUS */}
              <div className="card-actions justify-end mt-4">
                <span className="badge badge-success">Enrolled</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
