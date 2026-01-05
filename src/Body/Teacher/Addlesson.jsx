

import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AddLesson() {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();

  const [lessonType, setLessonType] = useState("video");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    order: 1,
    isPreview: false,

    video360: "",
    video720: "",

    pdfUrl: "",
    meetingLink: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ✅ Convert YouTube URL to embed URL
  function toYouTubeEmbed(url) {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url; // already embed or hosted mp4
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let payload = {
      title: form.title,
      lessonType,
      order: Number(form.order),
      isPreview: form.isPreview,
    };

    if (lessonType === "video") {
      payload.video = {
        sources: {
          "360p": toYouTubeEmbed(form.video360),
          "720p": toYouTubeEmbed(form.video720),
        },
      };
    }

    if (lessonType === "pdf") {
      payload.pdf = {
        fileUrl: form.pdfUrl,
      };
    }

    if (lessonType === "live") {
      payload.live = {
        meetingLink: form.meetingLink,
      };
    }

    try {
      await axios.post(
        `http://localhost:5500/course/${id}/lesson`,
        payload,
        { withCredentials: true }
      );

      navigate(`/teacher/course/${id}`);
    } catch (err) {
      console.error("Add lesson failed:", err.response?.data || err.message);
      alert("Failed to add lesson");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-red-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl">➕ Add Lesson</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="title"
              placeholder="Lesson Title"
              className="input input-bordered w-full"
              required
              onChange={handleChange}
            />

            <input
              type="number"
              name="order"
              placeholder="Lesson Order"
              className="input input-bordered w-full"
              onChange={handleChange}
            />

            <select
              className="select select-bordered w-full"
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value)}
            >
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="live">Live</option>
            </select>

            {lessonType === "video" && (
              <>
                <input
                  type="text"
                  name="video360"
                  placeholder="YouTube / Video URL (360p)"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="video720"
                  placeholder="YouTube / Video URL (720p)"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </>
            )}

            {lessonType === "pdf" && (
              <input
                type="text"
                name="pdfUrl"
                placeholder="PDF File URL"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            )}

            {lessonType === "live" && (
              <input
                type="text"
                name="meetingLink"
                placeholder="Live Meeting Link"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPreview"
                className="checkbox"
                onChange={handleChange}
              />
              Preview Lesson
            </label>

            <button
              className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
            >
              {loading ? "Creating..." : "Create Lesson"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
