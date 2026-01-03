

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector((state) => state.auth); 
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(auth.user?.EnrolledCourses || []);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await axios.get("http://localhost:5500/course", { withCredentials: true });
      setCourses(res.data);
    } catch (err) {
      console.log("Error fetching courses 👉", err.response?.data || err.message);
    }
  }

  async function getEnrolled(courseId) {
    try {
      const res = await axios.post(
        `http://localhost:5500/enroll/${courseId}`,
        {}, 
        { withCredentials: true }
      );

      if (res.status === 200) {
        
        setEnrolledCourses((prev) => [...prev, courseId]);
        console.log("Enrolled in course");
      }
    } catch (err) {
      console.log("Enrollment error 👉", err.response?.data || err.message);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => {
        const isEnrolled = enrolledCourses.includes(course._id);

        return (
          <div
            key={course._id}
            className="card bg-red-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">{course.name}</h2>
              <p className="text-sm text-base-content/70">{course.thumbnail}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge badge-outline capitalize">{course.level}</span>
                <span className="badge badge-secondary">₹ {course.price}</span>
                <span className="badge badge-info capitalize">{course.status}</span>
              </div>

              <p className="text-sm mt-2 text-base-content/80">
                👨‍🏫 Instructor:{" "}
                <span className="font-medium">
                  {course.createdBy?.firstName} {course.createdBy?.lastName}
                </span>
              </p>

              <div className="card-actions justify-end mt-4">
                {isEnrolled ? (
                  <span className="badge badge-success">Enrolled</span>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => getEnrolled(course._id)}
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
 