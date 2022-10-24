import React from "react";
import { ImCross } from "react-icons/im";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/is-authenticated";
import LogoutModal from "../modals/logout-modal";

export const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  React.useEffect(() => {
    const closeDropdown = (e: any) => {
      if (menuRef) {
        // console.log(
        //   "target: ",
        //   e.target.tagName,
        //   e.target.tagName === "path" || e.target.tagName === "svg"
        // );
        if (!(e.target.tagName === "path" || e.target.tagName === "svg")) {
          setIsOpen(false);
        }
      }
    };

    document.body.addEventListener("click", closeDropdown);

    return () => document.body.addEventListener("click", closeDropdown);
  }, []);
  return (
    <div className="absolute bg-collectible-500 h-16 w-full text-white">
      <div className="max-w-6xl flex justify-end h-full mx-auto">
        {isAuthenticated !== undefined && (
          <>
            {isAuthenticated ? (
              <>
                <div className="my-auto mr-5 hidden md:block hover:underline">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="my-auto mr-5 hidden md:block hover:underline">
                  <Link to="/profile">Profile</Link>
                </div>
                <div className="my-auto mr-5 hidden md:block hover:underline cursor-pointer">
                  <span
                    onClick={() => {
                      //open modal pop up
                      setIsLogoutModalOpen(true);
                    }}
                  >
                    Logout
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="my-auto mr-5 hidden md:block hover:underline">
                  <Link to="/">Home</Link>
                </div>
                <div className="my-auto mr-5 hidden md:block hover:underline">
                  <Link to="/sign-in"> Sign In</Link>
                </div>
                <div className="my-auto mr-5 hidden md:block hover:underline">
                  <Link to="/sign-up">Sign Up</Link>
                </div>
                <div className="my-auto mr-5 hidden md:block hover:underline">
                  <Link to="/about"> About</Link>
                </div>
              </>
            )}
          </>
        )}

        <div
          className="flex justify-center items-center mr-2 text-white w-10 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <ImCross size={18} style={{ padding: "2px" }} />
          ) : (
            <CgMenu size={30} style={{ padding: "2px" }} />
          )}
        </div>

        {isOpen && (
          <>
            {isAuthenticated !== undefined && (
              <>
                {isAuthenticated ? (
                  <div
                    className="p-3 mt-1 absolute top-16 -bottom-26 right-2 bg-collectible-100  text-collectible-500 z-10 rounded-lg md:hidden w-28 shadow-md bg-opacity-80"
                    ref={menuRef}
                  >
                    <div className="hover:underline">
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </Link>
                    </div>
                    <div className="hover:underline">
                      <Link to="/profile" onClick={() => setIsOpen(false)}>
                        {" "}
                        Profile
                      </Link>
                    </div>
                    <div className="hover:underline cursor-pointer">
                      <span
                        onClick={() => {
                          //open modal pop up
                          setIsLogoutModalOpen(true);
                        }}
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="p-3 mt-1 absolute top-16 -bottom-26 right-2 bg-collectible-100  text-collectible-500 z-10 rounded-lg md:hidden w-28 shadow-md bg-opacity-80"
                    ref={menuRef}
                  >
                    <div className="hover:underline">
                      <Link to="/" onClick={() => setIsOpen(false)}>
                        Home
                      </Link>
                    </div>
                    <div className="hover:underline">
                      <Link to="/sign-in" onClick={() => setIsOpen(false)}>
                        {" "}
                        Sign In
                      </Link>
                    </div>
                    <div className="hover:underline">
                      <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </div>
                    <div className="hover:underline">
                      <Link to="/about" onClick={() => setIsOpen(false)}>
                        {" "}
                        About
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <LogoutModal
          isOpen={isLogoutModalOpen}
          setIsOpen={setIsLogoutModalOpen}
        />
      </div>
    </div>
  );
};
