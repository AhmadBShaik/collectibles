import { MdOutlineMailOutline } from "react-icons/md";
import {
  AiFillLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import React from "react";
import axiosInstance from "../utils/axios-instance";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/is-authenticated";

const SignIn = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["collectibles-token"]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<boolean>(false);
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const { setIsAuthenticated } = useAuthContext();

  async function signInUser() {
    const req = await axiosInstance.post("user/sign-in", {
      email,
      password,
    });
    return req;
  }
  return (
    <div className="max-w-lg rounded m-auto flex-1">
      <form
        className=" text-collectible-500 bg-white p-5 mx-2 rounded-lg shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(email, password);
          signInUser()
            .then((e) => {
              setCookie("collectibles-token", e.data.accessToken);
              navigate("/dashboard");
              setIsAuthenticated(true);
              // TODO:
              // set current user context
              // set collectibles context
            })
            .catch((err) => setError(true));
        }}
      >
        <legend className="text-center text-2xl font-bold ">Sign In</legend>
        <div className="h-0.5 bg-collectible-400 my-0.5"></div>
        {error && (
          <div className="text-sm text-red-500 mt-2 -mb-4 text-center">
            Incorrect email / username
          </div>
        )}
        <div className="mt-5 relative">
          <div className="left-1 top-1.5 absolute">
            <MdOutlineMailOutline size={20} />
          </div>
          <input
            onChange={(e) => {
              setError(false);
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Email"
            className="w-full rounded p-1 outline-none pl-8 border border-collectible-400"
          />
        </div>
        <div className="mt-5 relative">
          <div className="left-1 top-1.5 absolute">
            <AiFillLock size={20} />
          </div>
          <div className="right-2 top-1.5 absolute">
            {hidePassword ? (
              <AiOutlineEyeInvisible
                size={20}
                onClick={() => setHidePassword(false)}
                className="cursor-pointer"
              />
            ) : (
              <AiOutlineEye
                size={20}
                onClick={() => setHidePassword(true)}
                className="cursor-pointer"
              />
            )}
          </div>
          <input
            onChange={(e) => {
              setError(false);
              setPassword(e.target.value);
            }}
            value={password}
            type={hidePassword ? "password" : "text"}
            placeholder="Password"
            className="w-full rounded p-1 outline-none pl-8 border border-collectible-400"
          />
        </div>
        <div className="mt-5">
          <button className="bg-collectible-500 text-collectible-100 p-2 rounded w-full">
            Sign In
          </button>
        </div>
        <div className="text-center mt-5 text-collectible-500 cursor-default">
          Don't have an Account?{" "}
          <Link to={"/sign-up"}>
            <span className="hover:underline text-collectible-500 cursor-pointer">
              {" "}
              Sign Up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
