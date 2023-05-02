import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../config/firebase";

import video1 from "../../assets/video/video1.mp4";
import google from "../../assets/images/logo/google.png";
import github from "../../assets/images/logo/github.png";
import twitter from "../../assets/images/logo/twitter.png";
import logo from "../../assets/images/logo/logo.png";

import { CgSpinnerAlt } from "react-icons/cg";
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");

  useEffect(() => {
    if (isLoggedIn !== null) {
      navigate("/home");
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateInp = () => {return (email.length && password === confirmPassword && password.length && confirmPassword.length)};

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate("/home");
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        setLoading(false);
        setErr("");
      }, 2000);
    } catch (error) {
      const errorCode = error.code;
      setErr(
        errorCode === "auth/popup-closed-by-user"
          ? "Popup closed by user"
          : "" || errorCode === "auth/account-exists-with-different-credential"
          ? "Account exists with different credential"
          : ""
      );
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
      setTimeout(() => {
        setLoading(false);
        setErr("");
      }, 2000);
    } catch (error) {
      const errorCode = error.code;
      setErr(
        errorCode === "auth/popup-closed-by-user"
          ? "Popup closed by user"
          : "" || errorCode === "auth/account-exists-with-different-credential"
          ? "Account exists with different credential"
          : ""
      );
      setLoading(false);
    }
  };

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
      setTimeout(() => {
        setLoading(false);
        setErr("");
      }, 2000);
    } catch (error) {
      const errorCode = error.code;
      setErr(
        errorCode === "auth/popup-closed-by-user"
          ? "Popup closed by user"
          : "" || errorCode === "auth/account-exists-with-different-credential"
          ? "Account exists with different credential"
          : ""
      );
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      setTimeout(() => {
        setLoading(false);
        setErr("Registration Successfull");
      }, 2000);
       navigate("/")
    } catch (error) {
      const errorCode = error.code;
      setErr(
        errorCode === "auth/email-already-in-use"
          ? "Email already exists"
          : errorCode
      );
      setLoading(false);
    }
  };

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-1 max-sm:grid-cols-1">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-sm:p-8">
          <img className="w-16 m-auto mb-2" src={logo} alt="" />
          <h1 className=" text-center font-semibold text-[27px] mb-3">
            Register
          </h1>
          <p className=" text-center text-[15px] 2xl:text-slate-500 xl:text-slate-500 md:text-slate-500 sm:text-slate-500 mb-7">
            Please enter your details.
          </p>
          <input
            className="w-full h-14 pl-5 border border-gray-300 placeholder:text-gray-300 text-gray-500 rounded-full mb-5 bg-transparent outline-none"
            placeholder="Email"
            onChange={(e) => {
              setErr("");
              setEmail(e.target.value);
            }}
          />
          <div>
          <span className="relative">
          <input
            className="w-full h-14 pl-5 border border-gray-300 placeholder:text-gray-300 text-gray-500 rounded-full mb-5 bg-transparent outline-none"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setErr("");
              setPassword(e.target.value);
            }}
          />
            {showPassword ? <AiFillEyeInvisible onClick={handleClickShowPassword} size={24} className="rounded-full absolute right-5 top-0 bottom-0 text-gray-500 cursor-pointer"/> : <AiFillEye onClick={handleClickShowPassword} size={24} className="absolute right-5 top-0 bottom-0 text-gray-500 cursor-pointer"/>}
          </span>
            <input
              className="w-full h-14 pl-5 border border-gray-300 placeholder:text-gray-300 text-gray-500 rounded-full mb-5 bg-transparent outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => {
                setErr("");
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button
            className=" w-full h-14  text-white flex items-center justify-center text-center rounded-full bg-slate-800 transition-all disabled:bg-slate-500 active:scale-105"
            onClick={handleCreateUser}
            disabled={!validateInp()}
          >
            Continue
            {loading && (
              <span className="animate-spin ml-2">
                <CgSpinnerAlt size={15} />
              </span>
            )}
          </button>
          {err === "Registration Successfull" && (
            <div className="w-full h-12 bg-emerald-200 rounded-xl text-emerald-700 flex items-center justify-center mt-4 transition-all">
              {err}
            </div>
          )}
          {err !== "Registration Successfull" && err.length > 0 && (
            <div className="w-full h-12 bg-rose-200 rounded-xl text-rose-700 flex items-center justify-center mt-4 transition-all">
              {err}
            </div>
          )}
          <div className="w-full border-b-2 border-gray-200 mt-10 relative flex items-center justify-center">
            <span className="text-gray-600 absolute top-0 left-0 m-auto right-0 bottom-10 w-8 h-4 bg-white flex items-center justify-center">
              OR
            </span>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 text-black text-center rounded-xl border border-gray-200 mt-10 flex items-center justify-center transition-all active:scale-105"
          >
            <span>
              <img className="mr-2" width={22} src={google} />
            </span>
            Continue with Google
          </button>
          <button
            onClick={handleTwitterLogin}
            className="w-full h-12 text-black text-center rounded-xl border border-gray-200 mt-2 flex items-center justify-center transition-all active:scale-105"
          >
            <span>
              <img className="mr-2" width={22} src={twitter} />
            </span>
            Continue with Twitter
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full h-12 text-black text-center rounded-xl border border-gray-200 mt-2 flex items-center justify-center transition-all active:scale-105"
          >
            <span>
              <img className="mr-2" width={20} src={github} />
            </span>
            Continue with Github
          </button>
          <p className=" text-center text-sm 2xl:text-slate-500 xl:text-slate-500 md:text-slate-500 sm:text-black text-slate-500 mt-10">
            Do you have an account?{" "}
            <NavLink to="/" className="font-bold">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
      <div className="w-full 2xl:block xl:block max-md:hidden sm:hidden col-span-2 h-screen bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-l-[90px] overflow-hidden relative">
        <video
          className="w-full h-full object-cover opacity-50"
          src={video1}
          autoPlay
          loop
          muted
        />
        <span className=" absolute bottom-2 right-4 text-white opacity-30 text-[15px]">
          © 2023
        </span>
      </div>
    </div>
  );
}

export default Signup;