import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Step 1: Import useNavigate
import { useSelector, useDispatch } from "react-redux";
import { setSigninData, checkLoginStatus } from "../redux/userSlice";

const Signin = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleSuccessSignup, setToggleSuccessSignup] = useState(false);
    const [toggleErrorSignup, settoggleErrorSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const navigate = useNavigate(); // Step 2: Initialize useNavigate

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        const formData = isSignup
            ? { name, email, password }
            : { email, password };
        const url = isSignup
            ? "/api/auth/sign-up"
            : "/api/auth/sign-in";

        axios
            .post(url, formData, { withCredentials: true })
            .then((response) => {
                console.log(response.data);

                // Handle Signin success
                if (response.status === 200 && !isSignup) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    dispatch(setSigninData(response.data));
                    dispatch(checkLoginStatus(true));
                    setLoginMessage("Sign-in successful!");
                    navigate("/"); // Redirect to the home page after sign-in
                }
                // Handle Signup success
                else if (isSignup) {
                    setIsSignup(false);
                    setToggleSuccessSignup(true);
                    setErrorMessage("");
                }
            })
            .catch((error) => {
                // Handle errors (such as duplicate user or invalid credentials)
                console.error("Error:", error);

                // Set the error messages based on server response
                if (error.response && error.response.status === 409) {
                    // Conflict status, meaning duplicate user on signup
                    setErrorMessage("User with this email already exists.");
                } else if (error.response && error.response.status === 401) {
                    // Unauthorized status, meaning invalid credentials during sign-in
                    setErrorMessage("Invalid email or password.");
                } else {
                    // Any other errors
                    setErrorMessage("An error occurred. Please try again.");
                }
            });
    };

    const handleLoginLogout = () => {
        setIsSignup(!isSignup);
        setToggleSuccessSignup(false); // Reset success message when toggling
        setErrorMessage(""); // Reset error message when toggling
    };

    return (
        <>
            <div className="flex justify-center mt-32">
                <div className="w-2/5 py-3 shadow-[0_35px_60px_25px_rgba(0.2,0.2,0.2,0.2)]">
                    <div className="text-center text-lg font-semibold ">
                        {isSignup ? "Signup" : "Signin"}
                    </div>
                    <div className="px-2 mt-5">
                        <form action="submit">
                            {isSignup && (
                                <>
                                    <div>Name</div>
                                    <input
                                        className="w-full h-8 px-2 bg-gray-100"
                                        type="text"
                                        placeholder="Enter your Name"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </>
                            )}
                            <div>Email</div>
                            <input
                                className="w-full h-8 px-2 bg-gray-100"
                                type="text"
                                placeholder="Enter your Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                            <div className="mt-2">Password</div>
                            <input
                                className="w-full h-8 px-2 bg-gray-100"
                                type="text"
                                placeholder="Enter your Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            <button
                                className="bg-cyan-600 text-white mt-4 w-full rounded-md h-8 font-bold"
                                onClick={handleClick}
                            >
                                {isSignup ? "Signup" : "Signin"}
                            </button>
                        </form>
                        <div className="mt-3">
                            <span className="text-gray-500">
                                {!isSignup
                                    ? "Don't have an account?"
                                    : "Already have an account?"}
                                <span
                                    className="text-red-800 cursor-pointer"
                                    onClick={handleLoginLogout}
                                >
                                    {!isSignup ? "Signup" : "Signin"}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Show Success Message for Signup */}
            {toggleSuccessSignup && (
                <div className="text-center text-green-600">
                    User Created Successfully! Please Sign in.
                </div>
            )}

            {/* Show Error Messages */}
            {errorMessage && (
                <div className="text-center text-red-600 mt-4">
                    {errorMessage}
                </div>
            )}

            {/* Show Success Message for Signin */}
            {loginMessage && (
                <div className="text-center text-green-600 mt-4">
                    {loginMessage}
                </div>
            )}
        </>
    );
};

export default Signin;