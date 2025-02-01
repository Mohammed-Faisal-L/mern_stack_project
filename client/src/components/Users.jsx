import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7777/user/getUsers", {
        withCredentials: true,
      });
      if (response) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7777/user/deleteUser/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:7777/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/createUser")}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add +
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Age: {user.age}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/updateUser/${user._id}`)}
                  className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
