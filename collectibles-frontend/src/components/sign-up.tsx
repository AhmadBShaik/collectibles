import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import {
  AiFillLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios-instance";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateUsername = (username: string) => {
  return String(username)
    .toLowerCase()
    .match(/[a-zA-Z]{2,7}\w+$/);
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] =
    React.useState<string>("");

  const [emailStatus, setEmailStatus] = React.useState<string>("");
  const [usernameStatus, setUsernameStatus] = React.useState<string>("");
  const [passwordStatus, setPasswordStatus] = React.useState<string>("");
  const [passwordConfirmationStatus, setPasswordConfirmationStatus] =
    React.useState<string>("");
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);

  const [haveErrors, setHaveErrors] = React.useState<boolean>(false);
  // async function checkConnection() {
  //   const req = await axiosInstance.get("user/check");
  //   return req.status;
  // }

  async function fetchEmailValidity() {
    const req = await axiosInstance.post("user/is-valid-email", {
      email,
    });

    return req;
  }
  async function fetchUsernameValidity() {
    const req = await axiosInstance.post("user/is-valid-username", {
      username,
    });

    return req;
  }

  async function createUser() {
    const req = await axiosInstance.post("user/sign-up", {
      email,
      username,
      password,
      passwordConfirmation,
    });
    return req;
  }

  React.useEffect(() => {
    if (email !== "") {
      if (validateEmail(email)) {
        console.log(
          fetchEmailValidity()
            .then((e) => {
              setEmailStatus("");
            })
            .catch((err) => {
              setEmailStatus("Email already exists!");
            })
        );
      } else {
        setEmailStatus("Invalid Email address");
      }
    }
    if (
      validateEmail(email) &&
      validateUsername(username) &&
      password.length > 5 &&
      password === passwordConfirmation &&
      emailStatus === "" &&
      usernameStatus === ""
    ) {
      setHaveErrors(false);
    } else {
      setHaveErrors(true);
    }
  }, [email]);

  React.useEffect(() => {
    if (username !== "") {
      if (validateUsername(username)) {
        console.log(
          "something",
          fetchUsernameValidity()
            .then((e) => {
              setUsernameStatus("");
            })
            .catch((err) => {
              setUsernameStatus("Username already exists!");
            })
        );
      } else {
        setUsernameStatus("Invalid Username");
      }
    }

    if (
      validateEmail(email) &&
      validateUsername(username) &&
      password.length > 5 &&
      password === passwordConfirmation &&
      emailStatus === "" &&
      usernameStatus === ""
    ) {
      setHaveErrors(false);
    } else {
      setHaveErrors(true);
    }
  }, [username]);

  React.useEffect(() => {
    if (password !== "") {
      if (password.length > 5) {
        setPasswordStatus("");
      } else {
        setPasswordStatus("Too Short Password");
      }
    }
    if (passwordConfirmation !== "") {
      if (password === passwordConfirmation) {
        setPasswordConfirmationStatus("");
      } else {
        setPasswordConfirmationStatus("Passwords didn't matched");
      }
    }
    if (
      validateEmail(email) &&
      validateUsername(username) &&
      password.length > 5 &&
      password === passwordConfirmation &&
      emailStatus === "" &&
      usernameStatus === ""
    ) {
      setHaveErrors(false);
    } else {
      setHaveErrors(true);
    }
  }, [password, passwordConfirmation]);
  return (
    <div className="max-w-lg rounded m-auto flex-1">
      <form
        className="text-collectible-500 bg-white p-5 mx-2 rounded-lg shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();

          if (!haveErrors) {
            createUser().then((e) => {
              if (e.status === 201) {
                navigate("/sign-in");
              }
            });
          }
        }}
      >
        <legend className="text-center text-2xl font-bold ">Sign Up</legend>
        <div className="h-0.5 bg-collectible-400 my-0.5="></div>
        <div className="mt-3">
          {emailStatus !== "" && (
            <div className="text-red-500 px-2 text-sm mb-0.5">
              {emailStatus}
            </div>
          )}
          <div className=" relative">
            <div className="left-1 top-1.5 absolute">
              <MdOutlineMailOutline size={20} />
            </div>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="Email"
              className="w-full rounded p-1 outline-none pl-8 border border-collectible-400"
            />
          </div>
        </div>
        <div className="mt-3">
          {usernameStatus !== "" && (
            <div className="text-red-500 px-2 text-sm mb-0.5">
              {usernameStatus}
            </div>
          )}
          <div className="relative">
            <div className="left-1 top-1.5 absolute">
              <FiUser size={20} />
            </div>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              placeholder="Username"
              className="w-full rounded p-1 outline-none pl-8 border border-collectible-400"
            />
          </div>
        </div>
        <div className="mt-3">
          {passwordStatus !== "" && (
            <div className="text-red-500 px-2 text-sm mb-0.5">
              {passwordStatus}
            </div>
          )}
          <div className="relative">
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
                setPassword(e.target.value);
              }}
              value={password}
              type={hidePassword ? "password" : "text"}
              placeholder="Password"
              className="w-full rounded p-1 outline-none pl-8 border border-collectible-400"
            />
          </div>
        </div>
        <div className="mt-3">
          {passwordConfirmationStatus !== "" && (
            <div className="text-red-500 px-2 text-sm mb-0.5">
              {passwordConfirmationStatus}
            </div>
          )}
          <div className="relative">
            <div className="left-1 top-1.5 absolute">
              <AiFillLock size={20} />
            </div>
            <input
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
              value={passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded p-1 outline-none pl-8 border border-collectible-400"
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="bg-collectible-500 text-collectible-100 p-2 rounded w-full">
            Sign Up
          </button>
        </div>
        <div className="text-center mt-5 text-collectible-500 cursor-default">
          Already have an Account?{" "}
          <Link to={"/sign-in"}>
            <span className="hover:underline text-collectible-500 cursor-pointer">
              {" "}
              Sign In
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
