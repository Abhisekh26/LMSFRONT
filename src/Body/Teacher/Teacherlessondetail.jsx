
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Teacherlessondetail() {
  const { id } = useParams(); // lessonId
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
      console.error("Error fetching lesson 👉", err);
    }
  }

  if (!lesson) return <p className="text-center mt-10">Loading...</p>;

  // pick best available video
  const videoUrl =
    lesson.video?.sources?.["720p"] ||
    lesson.video?.sources?.["360p"];

  // detect youtube embed
  const isYouTube = videoUrl?.includes("youtube.com/embed");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>

          <p className="text-sm text-gray-500 mt-2">
            Type: {lesson.lessonType}
          </p>

          {lesson.isPreview && (
            <span className="badge badge-info mt-2">Preview Lesson</span>
          )}

          {!lesson.published && (
            <span className="badge badge-warning mt-2 ml-2">Draft</span>
          )}

          <div className="divider"></div>

          {/* 🎥 VIDEO */}
          {lesson.lessonType === "video" && videoUrl && (
            <>
              {isYouTube ? (
                <iframe
                  src={videoUrl}
                  className="w-full h-[400px] rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video Lesson"
                />
              ) : (
                <video
                  controls
                  className="w-full h-[400px] rounded"
                  src={videoUrl}
                />
              )}
            </>
          )}

          {/* 📄 PDF */}
          {lesson.lessonType === "pdf" && lesson.pdf?.fileUrl && (
            <iframe
              src={lesson.pdf.fileUrl}
              className="w-full h-[600px] border rounded"
              title="PDF Lesson"
            />
          )}

          {/* 🔴 LIVE */}
          {lesson.lessonType === "live" && lesson.live && (
            <p className="text-gray-600">
              Live class:
              <br />
              {lesson.live.startTime && (
                <>
                  {new Date(lesson.live.startTime).toLocaleString()} –{" "}
                  {new Date(lesson.live.endTime).toLocaleString()}
                </>
              )}
              <br />
              Link:{" "}
              <a
                href={lesson.live.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                Join Meeting
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
