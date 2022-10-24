import React from "react";
import "./App.css";
import About from "./components/about";
import Dashboard from "./components/dashboard";
import LandingPage from "./components/landing-page";
import Profile from "./components/profile";

import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import axiosInstance from "./utils/axios-instance";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/is-authenticated";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const [cookie] = useCookies(["collectibles-token"]);

  async function checkAuthenticated() {
    const res = await axiosInstance.get("user/is-authenticated", {
      headers: {
        authorization: ("Bearer " + cookie["collectibles-token"]) as string,
      },
    });

    return res;
  }
  React.useEffect(() => {
    checkAuthenticated()
      .then((e) => {
        console.log(e);
        navigate("/dashboard");
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
        navigate("/sign-in");
      });
    console.log("isAuthenticated", isAuthenticated);

    if (isAuthenticated) {
      // set current user context
      // set collectibles context
    } else {
      // reset current user context
      // reset collectibles context
    }
  }, [isAuthenticated]);

  // React.useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, []);
  return (
    <>
      {isAuthenticated !== undefined && (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      )}
    </>
  );
}

export default App;
