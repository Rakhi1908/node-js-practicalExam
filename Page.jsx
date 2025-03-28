"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TaskManagement() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        getTasks();
    }, []);

    async function getTasks() {
        const response = await axios.get("http://localhost:3333/task");
        console.log("Fetched Tasks:", response.data); // Check API response
        setTasks(response.data);
        setFilteredTasks(response.data);
    }

    async function addTask(e) {
        e.preventDefault();
        await axios.post("http://localhost:3333/addtask", { title, description, status }); 
        setTitle("");
        setDescription("");
        setStatus("pending");
        getTasks();
    }
    

    useEffect(() => {
        if (filterStatus === "all") {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter((task) => task.status === filterStatus));
        }
    }, [filterStatus, tasks]);

    async function updateTask(e) {
        e.preventDefault();
        await axios.put(`http://localhost:3333/updatetask/${editId}`, {
            title: editTitle,
            description: editDescription,
            status: editStatus,
        });
        setEditId(null);
        getTasks();
    }

    async function deleteTask(id) {
        await axios.delete(`http://localhost:3333/deletetask/${id}`);
        getTasks();
    }

    function checkTaskStatus(task) {
        if (!task.status) {
            alert(`Task: ${task.title}\nStatus: No Status`);
        } else if (task.status === "completed") {
            alert(`Task: ${task.title}\nStatus: Completed`);
        } else if (task.status === "in-progress") {
            alert(`Task: ${task.title}\nStatus:  In Progress`);
        } else {
            alert(`Task: ${task.title}\nStatus: Pending`);
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Task Management</h2>

            {/* Add Task Form */}
            <form onSubmit={addTask} className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select className="form-control mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit" className="btn btn-primary w-100">
                    Add Task
                </button>
            </form>

            {/* Filter Tasks by Status */}
            <select className="form-control mb-3" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <h3 className="text-center">No tasks found</h3>
            ) : (
                <div className="task-list">
                    {filteredTasks.map((task, i) => (
                        <div key={i} className="card p-3 mb-3">
                            {editId === task._id ? (
                                <form onSubmit={updateTask}>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                    <select
                                        className="form-control mb-2"
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <button type="submit" className="btn btn-success me-2">
                                        Save
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <h5 className="text-primary">{task.title}</h5>
                                    <p>{task.description}</p>
                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`badge ${
                                                task.status === "completed"
                                                    ? "bg-success"
                                                    : task.status === "in-progress"
                                                    ? "bg-warning"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {task.status || "No Status"}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => {
                                            setEditId(task._id);
                                            setEditTitle(task.title);
                                            setEditDescription(task.description);
                                            setEditStatus(task.status || "pending");
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger me-2" onClick={() => deleteTask(task._id)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-info" onClick={() => checkTaskStatus(task)}>
                                        Check Status
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
