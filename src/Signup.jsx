


import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submituserdata(e) {
    e.preventDefault();
    setError("");

    if (password.length < 4) {
      return setError("Password must be at least 4 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5500/signup", {
        firstName,
        lastName,
        emailId,
        occupation,
        password,
      });

      if (res.status === 200) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <center>
      {success && (
        <div className="alert alert-success w-md mb-4 flex flex-col items-start gap-1">
          <div className="flex items-center gap-2 font-semibold text-lg">
            ✅ Signup successful
          </div>
          <p className="text-sm opacity-80">
            Redirecting you to login in 3 seconds…
          </p>
          <span className="loading loading-dots loading-sm"></span>
        </div>
      )}

      {!success && (
        <form onSubmit={submituserdata}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4">
            <legend className="fieldset-legend text-3xl">Sign Up</legend>

            {error && (
              <div className="alert alert-error mb-3">
                ❌ <span>{error}</span>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="label text-2xl">First Name</label>
                <input
                  type="text"
                  className="input input-info w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="label text-2xl">Last Name</label>
                <input
                  type="text"
                  className="input input-info w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <label className="label text-2xl">Email</label>
            <input
              type="email"
              className="input input-info w-full"
              onChange={(e) => setEmailId(e.target.value)}
            />

            <label className="label text-2xl">Occupation</label>
            <input
              type="text"
              className="input input-info w-full"
              list="role"
              onChange={(e) => setOccupation(e.target.value)}
            />
            <datalist id="role">
              <option value="Student" />
              <option value="Teacher" />
              <option value="Admin" />
            </datalist>

            <label className="label text-2xl">Password</label>
            <input
              type="password"
              className="input input-secondary w-full"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="label text-2xl">Confirm Password</label>
            <input
              type="password"
              className="input input-secondary w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-accent mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </fieldset>
        </form>
      )}
    </center>
  );
}
