
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function LessonDetails() {
//   const { id } = useParams(); // lessonId
//   const [lesson, setLesson] = useState(null);

//   async function getClassDetail() {
//     try {
//       const res = await axios.get(
//         `http://localhost:5500/course/${id}/lessons`,
//         { withCredentials: true }
//       );

//       // If backend returns single lesson object
//       setLesson(res.data);
//     } catch (err) {
//       console.log("Lesson fetch error 👉", err);
//     }
//   }

//   useEffect(() => {
//     getClassDetail();
//   }, []);

//   if (!lesson) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">

//       {/* ===== Lesson Header ===== */}
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h1 className="card-title text-2xl">
//             📘 {lesson.title}
//           </h1>

//           <div className="flex flex-wrap gap-3 mt-3">
//             <span className="badge badge-outline capitalize">
//               {lesson.lessonType}
//             </span>

//             {lesson.isPreview && (
//               <span className="badge badge-success">
//                 Free Preview
//               </span>
//             )}

//             {!lesson.published && (
//               <span className="badge badge-warning">
//                 Unpublished
//               </span>
//             )}
//           </div>

//           <p className="text-sm text-base-content/60 mt-2">
//             Lesson Order: {lesson.order}
//           </p>
//         </div>
//       </div>

//       {/* ===== Lesson Content ===== */}
//       <div className="card bg-base-100 shadow-lg">
//         <div className="card-body">
//           <h2 className="card-title text-lg">
//             📂 Lesson Content
//           </h2>

//           {/* PDF Lesson */}
//           {lesson.lessonType === "pdf" && lesson.pdf && (
//             <div className="mt-4">
//               <p className="mb-2 text-base-content/70">
//                 This lesson contains a PDF resource.
//               </p>

//               <a
//                 href={lesson.pdf.url}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="btn btn-primary btn-sm"
//               >
//                 📄 Open PDF
//               </a>
//             </div>
//           )}

//           {/* Live Lesson (future-ready) */}
//           {lesson.lessonType === "live" && (
//             <div className="alert alert-info mt-4">
//               Live class details will appear here.
//             </div>
//           )}

//           {/* Fallback */}
//           {!lesson.pdf && lesson.lessonType === "pdf" && (
//             <p className="text-sm text-base-content/60 mt-4">
//               No resource attached yet.
//             </p>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }






import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LessonDetails() {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);

  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetchLesson();
  }, []);

  async function fetchLesson() {
    try {
      const res = await axios.get(
        `http://localhost:5500/lesson/${id}`,
        { withCredentials: true }
      );
      setLesson(res.data);
    } catch (err) {
      console.log("Lesson fetch error 👉", err);
    }
  }

  if (!lesson) {
    return <p className="text-center mt-10">Loading lesson...</p>;
  }

  /* =======================
     🔐 CORRECT LOCK LOGIC
     ======================= */

//   const isPreview =
//     lesson.isPreview === true || lesson.isPreview === "true";

//   const isEnrolled = auth.user?.EnrolledCourses?.some(
//     (courseId) => courseId.toString() === lesson.courseId.toString()
//   );

//   const isLocked = !isEnrolled && !isPreview;

/* =======================
   🔐 LOCK LOGIC (SAFE)
   ======================= */

const isPreview =
  lesson.isPreview === true || lesson.isPreview === "true";

const lessonCourseId = lesson.courseId?.toString();

const isEnrolled = auth.user?.EnrolledCourses?.some(
  (id) => id && id.toString() === lessonCourseId
);

const isLocked = !isEnrolled && !isPreview;


  /* ======================= */

  if (isLocked) {
    return (
      <div className="max-w-xl mx-auto mt-20">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">Lesson Locked 🔒</h2>
            <p className="text-gray-500 mt-2">
              Enroll in the course to access this lesson.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>

          {isPreview && (
            <span className="badge badge-info w-fit mt-2">
              Preview Lesson
            </span>
          )}

          <div className="divider"></div>

          {/* 📄 PDF LESSON */}
          {lesson.lessonType === "pdf" && lesson.pdf?.url && (
            <iframe
              src={lesson.pdf.url}
              className="w-full h-[600px] border rounded"
              title="Lesson PDF"
            />
          )}

          {/* 🎥 LIVE LESSON */}
          {lesson.lessonType === "live" && (
            <p className="text-gray-600">
              Live class details will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
