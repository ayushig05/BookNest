import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDiv, userDivData, setUserDiv }) => {
  const isUserValid =
    userDivData &&
    Object.keys(userDivData).length > 0 &&
    (userDivData.username || userDivData.email || userDivData.address);

  return (
    <>
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 z-40`}
      ></div>
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50`}
      >
        <div className="bg-white rounded p-6 w-[90%] md:w-[60%] lg:w-[40%] text-zinc-800 shadow-lg relative">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">User Information</h1>
            <button
              onClick={() => setUserDiv("hidden")}
              className="text-zinc-600 hover:text-red-500 transition"
            >
              <RxCross1 size={20} />
            </button>
          </div>
          {isUserValid ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-zinc-600">Username</p>
                <p className="font-semibold">
                  {userDivData.username || "Username not available"}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600">Email</p>
                <p className="font-semibold">
                  {userDivData.email || "Email not available"}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-600">Address</p>
                <p className="font-semibold">
                  {userDivData.address || "Address not available"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-red-600 text-center text-lg font-semibold py-8">
              User data is not available or has been deleted.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
