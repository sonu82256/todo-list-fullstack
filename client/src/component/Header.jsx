import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSigninData } from "../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To redirect the user

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle the logout action
  const handleLogout = async () => {
    const url = "/api/auth/sign-out";
    try {
      await axios.get(url, { withCredentials: true });
      // Clear user data from the Redux store
      dispatch(setSigninData(null));  // Clear the current user data in Redux
      // Redirect to the login page
      navigate("/sign-in");  // Redirect to the login route
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-between px-10 py-3 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <div className="text-lg font-semibold">Logo</div>
      <div className="flex items-center justify-center text-lg font-semibold bg-cyan-600 rounded-lg px-3 text-white h-8">
        {currentUser ? (
          <div className="cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => navigate("/sign-in")}>
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;