
import { useEffect, useState } from "react";
import { IoIosCloudDone } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

function ExpiredTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    taskStatus: "Pending",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://task-scheduler-b7ue.onrender.com/api/user/expiredTasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();        
        setTasks(data.filterTaskArray || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (task) => {
    setEditableTaskId(task._id);
    setFormData({
      name: task.name,
      email: task.email,
      date: task.date,
      time: task.time,
      taskStatus: task.taskStatus,
    });
  };

  const editTaskDetails = async (id) => {
    try {
      const response = await fetch(`https://task-scheduler-b7ue.onrender.com/api/user/editTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      const updatedTask = await response.json();
      console.log(updatedTask);
      
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...formData } : task
        )
      );
      setEditableTaskId(null); 
    } catch (error) {
      console.error("Error while updating task details:", error);
    }
  };

  return (
    <div className="min-h-[89vh] h-fit flex flex-col items-center justify-center bg-gray-100">
      <div className="w-[95vw] min-[768px]:w-[90vw] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Expired Tasks</h2>

        {loading && <p className="text-center text-gray-500">Loading tasks...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && tasks.length === 0 && (
          <p className="text-center text-gray-500">No pending tasks found.</p>
        )}

        {!loading && tasks.length > 0 && (
          <table className="min-w-full table-auto border-collapse text-[12px] min-[956px]:text-[17px] border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="min-[768px]:px-4 px-2 py-2 border border-gray-300">Name</th>
                <th className="min-[768px]:px-4 px-2 py-2 border border-gray-300">Email</th>
                <th className="min-[768px]:px-4 px-2 py-2 border border-gray-300">Date</th>
                <th className="min-[768px]:px-4 px-2 py-2 border border-gray-300">Time</th>
                <th className="min-[768px]:px-4 px-2 py-2 border border-gray-300">Status</th>
                <th className="min-[768px]:px-4 px-2 py-2 border border-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  <td className="min-[768px]:px-4 px-2 py-2 border border-gray-300">
                    {editableTaskId === task._id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 w-full"
                      />
                    ) : (
                      task.name
                    )}
                  </td>
                  <td className="min-[768px]:px-4 px-2 py-2 border border-gray-300">
                    {editableTaskId === task._id ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 w-full"
                      />
                    ) : (
                      task.email
                    )}
                  </td>
                  <td className="min-[768px]:px-4 px-2 py-2 border border-gray-300">
                    {editableTaskId === task._id ? (
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 w-full"
                      />
                    ) : (
                      task.date
                    )}
                  </td>
                  <td className="min-[768px]:px-4 px-2 py-2 border border-gray-300">
                    {editableTaskId === task._id ? (
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 w-full"
                      />
                    ) : (
                      task.time
                    )}
                  </td>
                  <td className="min-[768px]:px-4 px-2 py-2 border border-gray-300">
                    {editableTaskId === task._id ? (
                      <select
                        name="taskStatus"
                        value={formData.taskStatus}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 w-full"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      task.taskStatus
                    )}
                  </td>
                  <td className="min-[768px]:px-4 px-2 py-2 border border-gray-300 text-center text-[25px] cursor-pointer">
                    {editableTaskId === task._id ? (
                      <button
                        onClick={() => editTaskDetails(task._id)}
                        className="text-blue-500"
                      >
                        <IoIosCloudDone/>
                      </button>
                    ) : (
                      <FaRegEdit
                        onClick={() => startEditing(task)}
                        className="text-blue-500"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ExpiredTasks;

