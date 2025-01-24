import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.email}!</h1>
      <div className="profile-section">
        <h2>Your Profile</h2>
        <p>Email: {user.email}</p>
        <p>Signup Date: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="recommendations-section">
        <h2>Your Career Recommendations</h2>
        <p>[Placeholder for AI-generated advice]</p>
      </div>
      <button className="logout-button" onClick={() => localStorage.clear() && window.location.reload()}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
