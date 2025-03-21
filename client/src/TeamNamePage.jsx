import React, { useState } from 'react';

const TeamNamePage = ({ startQuiz }) => {
  const [teamNames, setTeamNames] = useState(["", ""]);
  const [error, setError] = useState("");

  const handleNameChange = (index, value) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = value;
    setTeamNames(newTeamNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if both team names are entered
    if (teamNames[0] && teamNames[1]) {
      startQuiz(teamNames);  // Pass the team names to start the quiz
    } else {
      setError("Please enter team names.");
    }
  };

  return (
    <div className="team-name-page">
      <h1>Lisage tiimi nimed</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiim 1 </label>
          <input 
            type="text" 
            value={teamNames[0]} 
            onChange={(e) => handleNameChange(0, e.target.value)} 
          />
        </div>
        <div>
          <label>Tiim 2 </label>
          <input 
            type="text" 
            value={teamNames[1]} 
            onChange={(e) => handleNameChange(1, e.target.value)} 
          />
        </div>
        <div>
          <label>Tiim 3 </label>
          <input 
            type="text" 
            value={teamNames[2]} 
            onChange={(e) => handleNameChange(2, e.target.value)} 
          />
        </div>
        <button type="submit">Start Quiz</button>
      </form>
      {error && <p style={{ color: "red", marginTop: 3 }}>{error}</p>}
    </div>
  );
};

export default TeamNamePage;
