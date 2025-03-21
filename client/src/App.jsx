import React, { useState } from 'react';
import TeamNamePage from './TeamNamePage'; 
import QuizPage from './QuizPage'; 

const App = () => {
    const [teams, setTeams] = useState([{ name: '', score: 0 }, { name: '', score: 0 }, { name: '', score: 0 }]);
    const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = (teamNames) => {
    const initialTeams = teamNames.map((name) => ({ name, score: 0 }));
    setTeams(initialTeams);
    setQuizStarted(true);  // Start the quiz
  };

  return (
    <div>
      {!quizStarted ? (
        <TeamNamePage startQuiz={startQuiz} />
      ) : (
        <QuizPage teams={teams} setTeams={setTeams} />  // Pass the teams data to the quiz
      )}
    </div>
  );
};

export default App;
