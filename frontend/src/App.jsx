import { useState } from 'react'
import './App.css'

function App() {
  const [jobData, setJobData] = useState({
    company: "",
    position: "",
    location: "",
    experience: "",
    eligibility: "",
    salary: "",
    post_link: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    const result = await response.json();
    alert(result.message || "Job posted successfully!");

  };

  return (
    <div>
      <h2>Post a Job to LinkedIn</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
        <input type="text" name="position" placeholder="Position" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
        <input type="text" name="eligibility" placeholder="Eligibility" onChange={handleChange} required />
        <input type="text" name="salary" placeholder="Salary" onChange={handleChange} required />
        <input type="text" name="post_link" placeholder="Apply Link" onChange={handleChange} required />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}


export default App
