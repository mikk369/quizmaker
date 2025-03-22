import { useEffect, useState } from 'react';
import axios from 'axios'

function QuizPage({ teams, setTeams }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [answerStatus, setAnswerStatus] = useState([]);
    
    useEffect(() => {
      const getQuestions = async () => {
        try {
          const response = await axios.get('https://quizback.webcodes.ee/quiz')
        //   const response = await axios.get('http://localhost:2999/quiz')
          setQuestions(response.data)
        } catch (error) {
          console.log(error);
        }
      }
      getQuestions();
    }, []);
    
    const handleAnswerClick = (correct, index) => {
        const newStatus = [...answerStatus];
        newStatus[currentQuestionIndex] = newStatus[currentQuestionIndex] || [];
        newStatus[currentQuestionIndex][index] = correct;
      
        setAnswerStatus(newStatus);
    
        const updatedTeams = [...teams];
    
        if (correct) {
            updatedTeams[currentTeam].score += 10; // Increase score for the current question
        } else {
            updatedTeams[currentTeam].score = 0; // Reset current question's score
        }
    
        setTeams(updatedTeams);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            // Move to the next question
            setCurrentQuestionIndex(currentQuestionIndex + 1);
    
            // Update total scores before moving to the next question
            const updatedTeams = teams.map(team => ({
                ...team,
                totalScore: team.totalScore + team.score, // Add current round's score to totalScore
                score: 0 // Reset the current round's score
            }));
    
            setTeams(updatedTeams);
    
            // Reset the answer status for the next question
            setAnswerStatus([]);
        }
    };


  const prevQuestion = () => {
      if (currentQuestionIndex > 0) {
        // Reset the answer status for the current question immediately
        const newStatus = [...answerStatus];
        newStatus[currentQuestionIndex] = []; 
        setAnswerStatus(newStatus);
          setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
  };

  return (
    <div className='main'>
        <div class="question-overlay"></div>
        <div className='wrapper-div'>
        {questions.length > 0 && (
            <h3 className="question-text">{questions[currentQuestionIndex].question}</h3>
        )}
            <div className="quiz-container">
                <h1 className="quiz-header">Kolmevõistlus</h1>
                <div className="team-info">
                    {teams.map((team, index) => (
                        <div key={index} className="team">
                            <strong>{team.name}</strong>: {team.score} punkti
                        </div>
                    ))}
                    <label htmlFor="">Vastab tiim </label>
                    <select 
                        onChange={(e) => setCurrentTeam(Number(e.target.value))} 
                        value={currentTeam} 
                        className="team-select"
                        >
                        {teams.map((team, index) => (
                            <option key={index} value={index}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className="totals-div">
                    <h3>Koondpunktid</h3>
                    <div className="total-points">
                        {teams.map((team, i) => (
                            <div className="total">
                                <strong>{team.name}</strong>: {team.totalScore}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {questions.length > 0 && (
                <div className="question-section">
                    <div className="button-grid">
                    {questions[currentQuestionIndex].answers.map((a, index) => (
                            <button 
                            key={index} 
                            onClick={() => handleAnswerClick(a.correct, index)} 
                            className={`answer-button ${answerStatus[currentQuestionIndex]?.[index] === true ? 'correct' : answerStatus[currentQuestionIndex]?.[index] === false ? 'incorrect' : ''}`}>
                            {a.text}
                            </button>
                    ))}
                    </div>
                    <div className="navigation-buttons">
                        <button 
                            onClick={prevQuestion} 
                            disabled={currentQuestionIndex === 0} 
                            className="nav-button">
                            ◀ Eelmine
                        </button>
                        <span className="question-count"> {currentQuestionIndex + 1} / {questions.length} </span>
                        <button 
                            onClick={nextQuestion} 
                            disabled={currentQuestionIndex === questions.length - 1} 
                            className="nav-button">
                            Järgmine ▶
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

export default QuizPage;