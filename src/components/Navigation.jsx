import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Signin from "./Signin";
import { useAuth } from "../context/AuthProvider";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photo, setPhoto] = useState("https://imgs.search.brave.com/Tnf2-DKXvnBkslp0A8cvo2bblj8ThNVXh9Oti3zao58/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NzE0NDE0Ni92ZWN0/b3IvZGVmYXVsdC1h/dmF0YXItcHJvZmls/ZS1pY29uLXZlY3Rv/ci5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9QkliRnd1djdG/eFRXdmg1UzN2QjZi/a1QwUXY4Vm44TjVG/ZnNlcTg0Q2xHST0");

  const { user, profile } = useAuth();
  // const  profile = useAuth();

  // console.log(profile?.photo);

  useEffect(() => {
    if (user && profile?.photo) {
      setPhoto(profile?.photo);
    } 
  }, [user, profile?.photo]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log(user)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleForm = () => {
    setHasAccount(!hasAccount); // Toggle between login and create account form
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Open or close modal
  };

  !isOpen && toggleMenu;

  return (
    <header
      className={`bg-white sticky max-w-screen top-0 z-50 p-4 border-2 border-gray-200 py-5`}
    >
      <nav className="flex items-center justify-between">
        <div className="font-bold lg:pl-10">
          <h1 className="text-xl -mb-2">HOR</h1>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <button
          className="block lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center lg:gap-7 lg:top-0 lg:pr-10 fixed top-16 right-0 h-72 lg:h-full w-3/4 bg-white p-10 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } lg:relative lg:transform-none lg:translate-x-0 lg:w-auto lg:bg-transparent lg:p-0`}
        >
          {isOpen && (
            <NavLink
              to="Profile"
              onClick={isOpen ? toggleMenu : undefined}
              className={({ isActive }) =>
                ` block duration-200 lg:hover:bg-transparent hover:text-blue-300 lg:p-0`
              }
            >
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full " src={photo} alt="" />
                <h2 className="ml-3 h-full align-middle">
                  {profile?.name}
                </h2>
              </div>
            </NavLink>
          )}
          <NavLink
            to="/"
            onClick={isOpen ? toggleMenu : undefined}
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 ${
                isActive ? "text-blue-600 text-lg font-semibold" : ""
              } duration-200 lg:hover:bg-transparent hover:text-blue-300 lg:p-0`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="Explore"
            onClick={isOpen ? toggleMenu : undefined}
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 ${
                isActive ? "text-blue-600 text-lg font-semibold" : ""
              } duration-200 lg:hover:bg-transparent hover:text-blue-300 lg:p-0`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="Blog"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 ${
                isActive ? "text-blue-600 text-lg font-semibold" : ""
              } duration-200 lg:hover:bg-transparent hover:text-blue-300 lg:p-0`
            }
          >
            Blog
          </NavLink>

          {!isOpen && (
            <NavLink
              to="Profile"
              onClick={isOpen ? toggleMenu : undefined}
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 ${
                  isActive ? "text-blue-600 text-lg font-semibold" : ""
                } duration-200 lg:hover:bg-transparent hover:text-blue-300 lg:p-0`
              }
            >
              <div>
                <img className="w-8 h-8 rounded-full " src={photo} alt="" />
              </div>
            </NavLink>
          )}

          {user ? (
            <Logout />
          ) : (
            <button
              onClick={toggleModal}
              className="h-10 cursor-pointer w-20 rounded-md bg-[#242426] text-white"
            >
              {hasAccount ? "Login" : "Sign Up"}
            </button>
          )}
        </div>
      </nav>

      {isModalOpen && (
        <dialog
          open
          className="modal z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
        >
          <div className="modal-box">
            <div>
            <button
              onClick={toggleModal}
              className="btn cursor-pointer btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close Modal"
            >
              ✕
            </button>
              {hasAccount ? (
                <Login toggleForm={toggleForm} />
              ) : (
                <Signin toggleForm={toggleForm} />
              )}
            </div>
          </div>
        </dialog>
      )}
    </header>
  );
};

export default Navigation;
