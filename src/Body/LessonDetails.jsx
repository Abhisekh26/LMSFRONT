
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LessonDetails() {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);

  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function markCompleted() {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5500/progress/complete/${id}`,
        {},
        { withCredentials: true }
      );
      setCompleted(true);
    } catch (err) {
      console.log("Progress update error 👉", err.response?.data);
    } finally {
      setLoading(false);
    }
  }

  if (!lesson) {
    return <p className="text-center mt-10">Loading lesson...</p>;
  }

  const lessonCourseId = lesson.courseId?.toString();

  const isEnrolled = auth.user?.EnrolledCourses?.some(
    (cid) => cid && cid.toString() === lessonCourseId
  );

  const isPreview =
    lesson.isPreview === true || lesson.isPreview === "true";

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

  const videoUrl =
    lesson.video?.sources?.["720p"] ||
    lesson.video?.sources?.["360p"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body space-y-4">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>

          {isPreview && (
            <span className="badge badge-info w-fit">
              Preview Lesson
            </span>
          )}

          {/* 🎥 VIDEO */}
          {lesson.lessonType === "video" && videoUrl && (
            <div className="w-full aspect-video rounded overflow-hidden">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
                title="Video Lesson"
              />
            </div>
          )}

          {/* 📄 PDF */}
          {lesson.lessonType === "pdf" && lesson.pdf?.fileUrl && (
            <iframe
              src={lesson.pdf.fileUrl}
              className="w-full h-[600px] border rounded"
              title="Lesson PDF"
            />
          )}

          {/* 🔴 LIVE */}
          {lesson.lessonType === "live" && lesson.live?.meetingLink && (
            <a
              href={lesson.live.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-fit"
            >
              Join Live Class
            </a>
          )}

          {/* ✅ MARK COMPLETE BUTTON */}
          {!completed && (
            <button
              onClick={markCompleted}
              disabled={loading}
              className="btn btn-success w-fit"
            >
              {loading ? "Saving..." : "Mark as Completed"}
            </button>
          )}

          {completed && (
            <span className="badge badge-success w-fit">
              Completed ✅
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


