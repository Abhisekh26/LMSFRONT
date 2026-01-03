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
      // Fetch all courses
      const res = await axios.get("http://localhost:5500/course", {
        withCredentials: true,
      });

      // Filter only courses student is enrolled in
      const enrolledCourses = res.data.filter((course) =>
        auth.user?.EnrolledCourses.includes(course._id)
      );

      setCourses(enrolledCourses);
    } catch (err) {
      console.log("Error fetching courses 👉", err.response?.data || err.message);
    }
  }

  if (!auth.user) return <p className="text-center mt-10">Please login to view your courses</p>;

  if (courses.length === 0)
    return <p className="text-center mt-10">You haven't enrolled in any courses yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="card bg-red-100 shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300"
            onClick={() => navigate(`/navbar/course/${course._id}`)}
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">{course.name}</h2>
              <p className="text-sm text-gray-600">{course.thumbnail}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge badge-outline capitalize">{course.level}</span>
                <span className="badge badge-secondary">₹ {course.price}</span>
                <span className="badge badge-info capitalize">{course.status}</span>
              </div>

              <p className="text-sm mt-2 text-gray-700">
                👨‍🏫 Instructor:{" "}
                <span className="font-medium">
                  {course.createdBy?.firstName} {course.createdBy?.lastName}
                </span>
              </p>

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

