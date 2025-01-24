import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [interest, setInterest] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [careerPath, setCareerPath] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.post(
        "http://localhost:3000/api/career-path",
        {
          interest,
          experience,
          education,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCareerPath(response.data); // Set the career path response from the backend
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching career path");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")

  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to CareerPilot!</h1>

      {/* Input Form for Career Path */}
      <div className="input-section">
        <h2>Tell us about yourself</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Your field of interest (e.g. AI, Web Development)"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Your experience level (e.g. Beginner, Intermediate)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Your education (e.g., B.Tech, Diploma)"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
          <br />
          <button className="career_btn" type="submit">Get Career Path</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Display Career Path */}
      {careerPath && (
        <div className="career-path-section">
          <h2>Your Suggested Career Path</h2>
          <p>{careerPath.message}</p>
          <ul>
            {careerPath.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
