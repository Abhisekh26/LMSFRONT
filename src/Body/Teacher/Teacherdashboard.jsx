
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Teacherdashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     courses: 0,
//     students: 0,
//     revenue: 0,
//   });

//   useEffect(() => {
//     fetchMyCourses();
//   }, []);

//   async function fetchMyCourses() {
//     try {
//       const res = await axios.get("http://localhost:5500/my-courses", {
//         withCredentials: true,
//       });

//       const courses = res.data;

//       let totalStudents = 0;
//       let totalRevenue = 0;

//       courses.forEach(course => {
//         const count = course.enrolledStudents?.length || 0;
//         totalStudents += count;
//         totalRevenue += count * course.price;
//       });

//       setStats({
//         courses: courses.length,
//         students: totalStudents,
//         revenue: totalRevenue,
//       });
//     } catch (err) {
//       console.log("Failed to load teacher stats");
//     }
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">👨‍🏫 Teacher Dashboard</h1>
//         <p className="text-base-content/70 mt-1">
//           Manage your courses and track your progress
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="card bg-base-200 shadow">
//           <div className="card-body">
//             <h2 className="card-title">📚 My Courses</h2>
//             <p className="text-3xl font-bold">{stats.courses}</p>
//             <p className="text-sm text-base-content/60">
//               Courses you have created
//             </p>
//           </div>
//         </div>

//         <div className="card bg-base-200 shadow">
//           <div className="card-body">
//             <h2 className="card-title">👨‍🎓 Students</h2>
//             <p className="text-3xl font-bold">{stats.students}</p>
//             <p className="text-sm text-base-content/60">
//               Total enrolled students
//             </p>
//           </div>
//         </div>

//         <div className="card bg-base-200 shadow">
//           <div className="card-body">
//             <h2 className="card-title">💰 Revenue</h2>
//             <p className="text-3xl font-bold">₹ {stats.revenue}</p>
//             <p className="text-sm text-base-content/60">
//               Total earnings
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="card bg-base-100 shadow">
//         <div className="card-body">
//           <h2 className="card-title">Quick Actions</h2>

//           <div className="flex flex-wrap gap-4 mt-4">
//             <button
//               className="btn btn-primary"
//               onClick={() => navigate("/teacher/create-course")}
//             >
//               ➕ Create New Course
//             </button>

//             <button
//               className="btn btn-outline"
//               onClick={() => navigate("/teacher/courses")}
//             >
//               📋 View My Courses
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Teacherdashboard() {
  const auth = useSelector(state => state.auth);

  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    revenue: 0,
  });

  const [otherCourses, setOtherCourses] = useState([]);

  useEffect(() => {
    fetchMyCourses();
    fetchOtherCourses();
  }, []);

  async function fetchMyCourses() {
    const res = await axios.get("http://localhost:5500/my-courses", {
      withCredentials: true,
    });

    let students = 0;
    let revenue = 0;

    res.data.forEach(course => {
      const count = course.enrolledStudents?.length || 0;
      students += count;
      revenue += count * course.price;
    });

    setStats({
      courses: res.data.length,
      students,
      revenue,
    });
  }

  async function fetchOtherCourses() {
    const res = await axios.get("http://localhost:5500/course", {
      withCredentials: true,
    });

    const filtered = res.data.filter(
      course => course.createdBy._id !== auth.user._id
    );

    setOtherCourses(filtered);
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">👨‍🏫 Teacher Dashboard</h1>
        <p className="text-base-content/70 mt-1">
          Overview of your teaching journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-red-200 shadow">
          <div className="card-body">
            <h2 className="card-title">📚 My Courses</h2>
            <p className="text-3xl font-bold">{stats.courses}</p>
          </div>
        </div>

        <div className="card bg-red-200 shadow">
          <div className="card-body">
            <h2 className="card-title">👨‍🎓 Students</h2>
            <p className="text-3xl font-bold">{stats.students}</p>
          </div>
        </div>

        <div className="card bg-red-200 shadow">
          <div className="card-body">
            <h2 className="card-title">💰 Revenue</h2>
            <p className="text-3xl font-bold">₹ {stats.revenue}</p>
          </div>
        </div>
      </div>

      {/* Other Teachers Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          👀 See what other teachers are offering
        </h2>

        {otherCourses.length === 0 ? (
          <p className="text-base-content/60">No courses available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCourses.map(course => (
              <div
                key={course._id}
                className="card bg-red-100 shadow hover:shadow-lg transition"
              >
                <div className="card-body">
                  <h3 className="card-title">{course.name}</h3>

                  <p className="text-sm text-base-content/70">
                    Level: {course.level}
                  </p>

                  <p className="text-sm">
                    Instructor:{" "}
                    <span className="font-medium">
                      {course.createdBy.firstName}{" "}
                      {course.createdBy.lastName}
                    </span>
                  </p>

                  <div className="mt-3 flex justify-between items-center">
                    <span className="badge badge-secondary">
                      ₹ {course.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
