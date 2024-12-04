import  { useState } from 'react'

function TaskForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        taskStatus:"Pending",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();

       try {
        const response=await fetch("http://localhost:8000/api/user/expiredTasks",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        const data=await response.json();
        console.log(data);
        
       } catch (error) {
        console.log("Error while entering task",error);
        
       }finally{
        console.log("Task Scheduled:", formData);
        alert("Task Scheduled Successfully!");
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
        });
       }
      };
    
  return (
    <div className="min-h-[89vh] h-fit flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Schedule a Task</h2>
      
      {/* Name Input */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Task Date Input */}
      <div className="mb-4">
        <label htmlFor="taskDate" className="block text-sm font-medium text-gray-700">
          Task Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Task Time Input */}
      <div className="mb-4">
        <label htmlFor="taskTime" className="block text-sm font-medium text-gray-700">
          Task Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Schedule Task
      </button>
    </form>
  </div>
  )
}

export default TaskForm