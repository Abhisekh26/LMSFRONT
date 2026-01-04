     
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { login } from "./DataStore/Slice/Authslice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate()
  
  const dispatch = useDispatch()

  async function getuserdetails(e) {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:5500/login", {
        emailId,
        password,
       },
       {withCredentials:true}
      );
     if(user.status === 200){
      console.log(user)
      dispatch(login(user.data))
      // navigate("/navbar")
      // navigate("/student/home")
       if (user.data.user.occupation === "Teacher") {
        console.log("teacher")
        navigate("/teacher");
      } else {
        navigate("/student/home");
      }
     
     }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <center className="mt-30">
      <form onSubmit={getuserdetails}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4">
          <legend className="fieldset-legend text-3xl">Login</legend>

          <label className="label text-2xl ml-35">Email</label>
          <input
            type="email"
            className="input ml-10"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label text-2xl ml-30">Password</label>
          <input
            type="password"
            className="input ml-10"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-neutral mt-4">
            Login
          </button>
        </fieldset>
      </form>
    </center>
  );
}
