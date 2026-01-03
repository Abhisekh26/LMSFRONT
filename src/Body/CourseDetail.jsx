import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchCourse();
  }, []);

  async function fetchCourse() {
    const res = await axios.get(
      `http://localhost:5500/course/${id}`,
      { withCredentials: true }
    );
    console.log(res.data.courseData)
    console.log(res.data.lessonData)
    setCourse(res.data.courseData);
    setLessons(res.data.lessonData);
  }

  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Course Info */}
      <h1 className="text-3xl font-bold">{course.name}</h1>

      <p className="mt-2 text-gray-600">
        Instructor: {course.createdBy.firstName} {course.createdBy.lastName}
      </p>

      <div className="flex gap-3 mt-4">
        <span className="badge badge-outline">{course.level}</span>
        <span className="badge badge-secondary">₹ {course.price}</span>
        <span className="badge badge-info">{course.status}</span>
      </div>

      {/* Lessons */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        Course Content
      </h2>

      <div className="space-y-3">
        {lessons.length === 0 && (
          <p className="text-gray-500">No lessons yet</p>
        )}

        {lessons.map((lesson, index) => (
          <div
            key={lesson._id}
            className="p-4 border rounded-lg bg-base-100"
          >
            <p className="font-medium">
              {index + 1}. {lesson.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
