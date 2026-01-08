
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [progressData, setProgressData] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});

  useEffect(() => {
    fetchCoursesAndProgress();
  }, []);

  async function fetchCoursesAndProgress() {
    try {
      // 1️⃣ Fetch all courses (for name + total lessons)
      const courseRes = await axios.get("http://localhost:5500/course", {
        withCredentials: true,
      });

      const map = {};
      courseRes.data.forEach((course) => {
        map[course._id] = course;
      });
      setCoursesMap(map);

      // 2️⃣ Fetch student progress
      const progressRes = await axios.get(
        "http://localhost:5500/progress/student",
        { withCredentials: true }
      );

      setProgressData(progressRes.data);
    } catch (err) {
      console.log("Dashboard error 👉", err.response?.data || err.message);
    }
  }

  if (!auth.user) {
    return <p className="text-center mt-10">Please login</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🎓 Student Dashboard</h1>

      {progressData.length === 0 ? (
        <p className="text-red-500">Enroll in courses to see progress</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progressData.map((item) => {
            const course = coursesMap[item.courseId];
            const totalLessons = item.totalLessons || 0;

            return (
              <div
                key={item.courseId}
                className="card bg-red-100 shadow hover:shadow-lg transition cursor-pointer"
                onClick={() =>
                  navigate(`/student/course/${item.courseId}`)
                }
              >
                <div className="card-body">
                  <h2 className="card-title">
                    {course?.name || "Course"}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Instructor:{" "}
                    {course?.createdBy?.firstName}{" "}
                    {course?.createdBy?.lastName}
                  </p>

                  {/* ✅ Progress Bar */}
                  <div className="mt-4">
                    <progress
                      className="progress progress-success w-full"
                      value={item.completedCount}
                      max={totalLessons}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {item.completedCount} / {totalLessons} lessons completed
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}




