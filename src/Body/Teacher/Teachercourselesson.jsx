import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TeachercourseLesson() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchLessons();
  }, []
);

async function fetchLessons() {
  const res = await axios.get(
    `http://localhost:5500/course/${id}`,
    { withCredentials: true }
  );

  console.log("API 👉", res.data);

  setLessons(res.data.lessonData); 
}

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📘 Course Lessons</h1>

      {lessons.length === 0 ? (
        <p>No lessons added yet</p>
      ) : (
        lessons.map(lesson => (
          <div
            key={lesson._id}
            className="card bg-base-200 shadow"
          >
            <div className="card-body">
              <h2 className="card-title">{lesson.title}</h2>
              <p className="text-sm capitalize">
                Type: {lesson.lessonType}
              </p>
              {lesson.isPreview && (
                <span className="badge badge-info w-fit">Preview</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
