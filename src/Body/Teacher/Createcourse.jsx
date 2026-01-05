
import { useState } from "react";
import axios from "axios";

export default function CreateCourse() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://localhost:5500/course",
        {
          name,
          price,
          level,
          description,
          thumbnail,
        },
        { withCredentials: true }
      );

      setSuccess("🎉 Course created successfully!");
      setName("");
      setPrice("");
      setLevel("");
      setDescription("");
      setThumbnail("");
    } catch (err) {
      setError("❌ Failed to create course");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-10 ">
      <div className="card bg-red-100 shadow-xl border">
        <div className="card-body space-y-6">

          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold">📘 Create New Course</h2>
            <p className="text-base-content/70">
              Add details and publish your course
            </p>
          </div>

          {/* Alerts */}
          {success && (
            <div className="alert alert-success shadow">
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="alert alert-error shadow">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Course Name */}
            <div className="form-control">
              <label className="label font-medium">Course Title</label>
              <input
                type="text"
                className="input input-bordered focus:ring-2 focus:ring-primary"
                placeholder="Title of Course"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Price + Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-medium">Price (₹)</label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Enter Amount"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Difficulty Level</label>
                <select
                  className="select select-bordered"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-medium">Course Description</label>
              <textarea
                className="textarea textarea-bordered min-h-[120px]"
                placeholder="What will students learn?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Thumbnail */}
            <div className="form-control">
              <label className="label font-medium">Thumbnail Image URL</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="https://image-link.com/course.jpg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            {/* Thumbnail Preview */}
            {thumbnail && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Preview</p>
                <img
                  src={thumbnail}
                  alt="Thumbnail preview"
                  className="rounded-lg border h-40 object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className={`btn btn-primary w-full text-lg ${
                  loading ? "btn-disabled" : ""
                }`}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  "🚀 Create Course"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
