import React from "react";
// import { useState } from 'react'
// import { Dialog } from '@headlessui/react'
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/is-authenticated";

interface LogoutModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LogoutModal: React.FC<LogoutModalProps> = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const { isOpen, setIsOpen } = props;
  const [cookie, setCookie, removeCookie] = useCookies(["collectibles-token"]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => setIsOpen(false)}
        className="absolute top-1/3 mx-auto left-0 right-0 w-80 "
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/*
        ...and another Transition.Child to apply a separate transition
        to the contents.
      */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="p-3 bg-white shadow-lg rounded-lg">
            <Dialog.Title>
              <div className="text-lg text-collectible-500 font-bold text-center mb-2">
                Do you want to logout?
              </div>
            </Dialog.Title>
            <div className="flex justify-end">
              <button
                className="bg-green-600 rounded border-none outline-none p-1.5 text-sm font-bold text-white m-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 rounded border-none outline-none p-1.5 text-sm font-bold text-white m-1"
                onClick={() => {
                  removeCookie("collectibles-token");
                  navigate("/sign-in");
                  setIsAuthenticated(false);
                  setIsOpen(false);
                  // TODO:
                  // reset current user context
                  // reset collectibles context
                }}
              >
                Logout
              </button>
            </div>
            {/* ... */}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default LogoutModal;
