

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../DataStore/Slice/Authslice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await axios.get("http://localhost:5500/course", {
        withCredentials: true,
      });
      setCourses(res.data);
    } catch (err) {
      console.log("Error fetching courses 👉", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function getEnrolled(courseId) {
    try {
      const res = await axios.post(
        `http://localhost:5500/enroll/${courseId}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(updateUser(res.data));
      }
    } catch (err) {
      alert("Enrollment failed");
    }
  }

  /* ---------------- SKELETON CARD ---------------- */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow">
            <div className="skeleton h-44 w-full"></div>
            <div className="card-body space-y-3">
              <div className="skeleton h-5 w-3/4"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map((course) => {
        const isEnrolled = auth.user?.EnrolledCourses?.includes(course._id);

        return (
          <div
            key={course._id}
            onClick={() => navigate(`/student/course/${course._id}`)}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden"
          >
            {/* 🖼️ IMAGE WITH GRADIENT */}
            <div className="relative h-44 w-full">
              {course.thumbnail ? (
                <>
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center bg-base-200">
                  <span className="text-sm text-base-content/60">
                    No image available
                  </span>
                </div>
              )}

              {/* COURSE NAME OVER IMAGE */}
              <h2 className="absolute bottom-3 left-3 right-3 text-white text-lg font-semibold line-clamp-2">
                {course.name}
              </h2>
            </div>

            <div className="card-body">
              {/* 📄 DESCRIPTION */}
              <p className="text-sm text-base-content/70 line-clamp-2">
                {course.coursedescription || "No description provided."}
              </p>

              {/* 🏷️ BADGES */}
              <div className="flex flex-wrap gap-2 mt-2">
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

              {/* 👨‍🏫 INSTRUCTOR */}
              <p className="text-sm mt-3 text-base-content/80">
                👨‍🏫{" "}
                <span className="font-medium">
                  {course.createdBy?.firstName} {course.createdBy?.lastName}
                </span>
              </p>

              {/* CTA */}
              <div className="card-actions justify-end mt-4">
                {isEnrolled ? (
                  <span className="badge badge-success">Enrolled</span>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      getEnrolled(course._id);
                    }}
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}






















