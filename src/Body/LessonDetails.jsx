

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function LessonDetails() {
//   const { id } = useParams();
//   const auth = useSelector((state) => state.auth);

//   const [lesson, setLesson] = useState(null);

//   useEffect(() => {
//     fetchLesson();
//   }, []);

//   async function fetchLesson() {
//     try {
//       const res = await axios.get(
//         `http://localhost:5500/lesson/${id}`,
//         { withCredentials: true }
//       );
//       setLesson(res.data);
//     } catch (err) {
//       console.log("Lesson fetch error 👉", err);
//     }
//   }

//   if (!lesson) {
//     return <p className="text-center mt-10">Loading lesson...</p>;
//   }

// const isPreview =
//   lesson.isPreview === true || lesson.isPreview === "true";

// const lessonCourseId = lesson.courseId?.toString();

// const isEnrolled = auth.user?.EnrolledCourses?.some(
//   (id) => id && id.toString() === lessonCourseId
// );

// const isLocked = !isEnrolled && !isPreview;



//   if (isLocked) {
//     return (
//       <div className="max-w-xl mx-auto mt-20">
//         <div className="card bg-base-100 shadow-lg">
//           <div className="card-body text-center">
//             <h2 className="text-xl font-semibold">Lesson Locked 🔒</h2>
//             <p className="text-gray-500 mt-2">
//               Enroll in the course to access this lesson.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="card bg-base-100 shadow-lg">
//         <div className="card-body">
//           <h1 className="text-2xl font-bold">{lesson.title}</h1>

//           {isPreview && (
//             <span className="badge badge-info w-fit mt-2">
//               Preview Lesson
//             </span>
//           )}

//           <div className="divider"></div>

//           {/* 📄 PDF LESSON */}
//           {lesson.lessonType === "pdf" && lesson.pdf?.url && (
//             <iframe
//               src={lesson.pdf.url}
//               className="w-full h-[600px] border rounded"
//               title="Lesson PDF"
//             />
//           )}

//           {/* 🎥 LIVE LESSON */}
//           {lesson.lessonType === "live" && (
//             <p className="text-gray-600">
//               Live class details will appear here.
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

  const isPreview =
    lesson.isPreview === true || lesson.isPreview === "true";

  const lessonCourseId = lesson.courseId?.toString();

  const isEnrolled = auth.user?.EnrolledCourses?.some(
    (cid) => cid && cid.toString() === lessonCourseId
  );

  const isLocked = !isEnrolled && !isPreview;

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

  // 🎥 pick best available video source
  const videoUrl =
    lesson.video?.sources?.["720p"] ||
    lesson.video?.sources?.["360p"];

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

          {/* 🎥 VIDEO LESSON */}
          {lesson.lessonType === "video" && videoUrl && (
            <div className="w-full aspect-video rounded overflow-hidden">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Lesson"
              />
            </div>
          )}

          {/* 📄 PDF LESSON */}
          {lesson.lessonType === "pdf" && lesson.pdf?.fileUrl && (
            <iframe
              src={lesson.pdf.fileUrl}
              className="w-full h-[600px] border rounded"
              title="Lesson PDF"
            />
          )}

          {/* 🔴 LIVE LESSON */}
          {lesson.lessonType === "live" && lesson.live?.meetingLink && (
            <div className="space-y-2">
              <p className="text-gray-600">
                Live class link:
              </p>
              <a
                href={lesson.live.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Join Live Class
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
