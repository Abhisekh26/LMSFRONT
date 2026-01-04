
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
   const navigate = useNavigate()
  useEffect(() => {
    fetchCourse();
  }, []);

  async function fetchCourse() {
    const res = await axios.get(
      `http://localhost:5500/course/${id}`,
      { withCredentials: true }
    );

    setCourse(res.data.courseData);
    setLessons(res.data.lessonData);
  }

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* ===== Course Header ===== */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl">{course.name}</h1>

          <p className="text-sm text-base-content/70">
            👨‍🏫 Instructor:{" "}
            <span className="font-medium">
              {course.createdBy.firstName} {course.createdBy.lastName}
            </span>
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
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
        </div>
      </div>

      {/* ===== Lessons Section ===== */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">
            📚 Course Content
          </h2>

          {lessons.length === 0 && (
            <p className="text-base-content/60">
              No lessons available yet
            </p>
          )}

          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div
                key={lesson._id}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer
                           hover:bg-base-200 transition"
                onClick={() => {
                  navigate(`/student/course/lesson/${lesson._id}`)
                  console.log("Clicked lesson:", lesson._id);
                }}
              >
                <div>
                  <p className="font-medium">
                    {index + 1}. {lesson.title}
                  </p>
                </div>

                <span className="text-sm text-base-content/60">
                  ▶
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
