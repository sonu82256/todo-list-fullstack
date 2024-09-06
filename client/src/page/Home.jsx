import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const { loginStatus, currentUser } = useSelector((state) => state.user);
    const [task, setTask] = useState("");
    const [newTask, setNewTask] = useState("");

    const navigate = useNavigate();

    const fetchTask = async (userId) => {
        console.log(userId);
        const url = "/api/task/get-task";
        await axios
            .post(url, { userId }, { withCredentials: true })
            .then((response) => {
                setTask(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log("error", error);
                navigate("/sign-in");
            });
    };

    const handleClick = async () => {
        const url = "/api/task/add-task";
        const userId = currentUser._id;
        console.log(newTask);
        await axios
            .post(url, { userId, task: newTask }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                fetchTask(userId);
            })
            .catch((error) => {
                console.log("error", error);
            });
        setNewTask("");
    };

    const showDate = (dateString) => {

        const date = new Date(dateString);

        const day = date.getUTCDate(); // Get day (5)
        const month = date.toLocaleString("default", { month: "short" }); // Get short month name (Sep)

        const formattedDate = `${day} ${month}`;
        return formattedDate;
        
    };

    const handleDelete = async (taskId) => {
        const userId = currentUser._id;
        console.log(taskId);
        const url = `/api/task/delete/${taskId}`;
        console.log(url);
        await axios
            .delete(url, { withCredentials: true })
            .then((response) => {
                console.log(response);
                fetchTask(userId);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        setNewTask(e.target.value);
    };

    useEffect(() => {
        if (!loginStatus) {
            navigate("/sign-in");
        }
        console.log(loginStatus);
        fetchTask(currentUser._id);
    }, [loginStatus, navigate]);

    return (
        <div className="flex justify-center mt-16">
            <div className="w-2/5 py-3 px-2 shadow-[0_35px_60px_25px_rgba(0.2,0.2,0.2,0.2)] bg-gray-200">
                <div className="text-center text-lg font-semibold ">
                    welcome sonu
                </div>
                <div className="text-md font-semibold mt-6 ">Add Task</div>
                <div className="flex ">
                    <input
                        className="w-full"
                        type="text"
                        onChange={handleChange}
                        value={newTask}
                        name="newTask"
                    />
                    <div
                        className="flex items-center justify-center text-lg font-semibold bg-cyan-600 rounded-lg px-3 text-white ml-2 cursor-pointer"
                        onClick={handleClick}
                    >
                        Add
                    </div>
                </div>

                <div className="text-sm font-semibold mt-6">Your Task</div>
                <div className="">
                    {task && task.length > 0 ? (
                        <>
                            {task.map((taskItem) => (
                                <div
                                    key={taskItem._id}
                                    className="mt-2 flex justify-between"
                                >
                                    <div className="bg-white w-full px-1 flex justify-between">
                                        <div className="">{taskItem.task}{" "}</div>
                                        <div className="text-sm text-gray-400 pt-1">{showDate(taskItem.createdAt)}</div>   
                                    </div>

                                    {/* Assuming task has a 'name' property */}
                                    <div
                                        className="flex  items-center justify-center text-lg font-semibold bg-red-600 rounded-lg px-2 text-white ml-2 cursor-pointer"
                                        onClick={() =>
                                            handleDelete(taskItem._id)
                                        }
                                    >
                                        Delete
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div>No tasks available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
