


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function TeachercourseLesson() {
//   const { id } = useParams(); // courseId
//   const navigate = useNavigate();

//   const [lessons, setLessons] = useState([]);

//   useEffect(() => {
//     fetchLessons();
//   }, []);

//   async function fetchLessons() {
//     const res = await axios.get(
//       `http://localhost:5500/course/${id}`,
//       { withCredentials: true }
//     );

//     setLessons(res.data.lessonData);
//   }

//   return (
//     <div className="p-6 space-y-6">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">📘 Course Lessons</h1>

//         {/* ➕ Add Class */}
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate(`/teacher/course/${id}/add-lesson`)}
//         >
//           ➕ Add Lesson
//         </button>
//       </div>

//       {/* Lessons */}
//       {lessons.length === 0 ? (
//         <p>No lessons added yet</p>
//       ) : (
//         <div className="space-y-4">
//           {lessons.map((lesson) => (
//             <div
//               key={lesson._id}
//               className="card bg-base-200 shadow cursor-pointer hover:shadow-lg transition"
//               onClick={() => navigate(`/teacher/lesson/${lesson._id}`)}
//             >
//               <div className="card-body">
//                 <h2 className="card-title">{lesson.title}</h2>

//                 <p className="text-sm capitalize">
//                   Type: {lesson.lessonType}
//                 </p>

//                 {lesson.isPreview && (
//                   <span className="badge badge-info w-fit">
//                     Preview
//                   </span>
//                 )}

//                 {!lesson.published && (
//                   <span className="badge badge-warning w-fit ml-2">
//                     Draft
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function TeachercourseLesson() {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      const res = await axios.get(
        `http://localhost:5500/course/${id}`,
        { withCredentials: true }
      );
      setLessons(res.data.lessonData);
    } catch (err) {
      console.error("Error fetching lessons", err);
    }
  }

  async function deleteLesson() {
    if (!selectedLesson) return;

    try {
      setIsDeleting(true);

      await axios.delete(
        `http://localhost:5500/lessons/${selectedLesson._id}`,
        { withCredentials: true }
      );

      setLessons(prev =>
        prev.filter(lesson => lesson._id !== selectedLesson._id)
      );

      setSelectedLesson(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete lesson");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📘 Course Lessons</h1>

      {lessons.length === 0 ? (
        <p>No lessons added yet</p>
      ) : (
        lessons.map(lesson => (
          <div
            key={lesson._id}
            className="card bg-base-200 shadow cursor-pointer"
            onClick={() => navigate(`/teacher/lesson/${lesson._id}`)}
          >
            <div className="card-body flex-row justify-between items-center">
              <div>
                <h2 className="card-title">{lesson.title}</h2>
                <p className="text-sm capitalize">
                  Type: {lesson.lessonType}
                </p>
                {lesson.isPreview && (
                  <span className="badge badge-info mt-1">Preview</span>
                )}
              </div>

              <button
                className="btn btn-sm btn-error"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLesson(lesson);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* 🔴 Confirmation Modal */}
      {selectedLesson && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Lesson?</h3>

            <p className="py-4">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}“{selectedLesson.title}”
              </span>
              ? <br />
              This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedLesson(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                className="btn btn-error"
                onClick={deleteLesson}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
