import React, { useState, useEffect } from "react";

const App = () => {
  
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const response = await fetch("http://localhost:8181/benchease/v1/hotskills");
      const data = await response.json();

      setSkills(Array.from(data.result));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <h1>Hot Skills</h1>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>{skill.title} : {skill.searchCount}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
