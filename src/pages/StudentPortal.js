import React, { useState, useEffect } from 'react';
import './Styles/StudentPortal.css';

const StudentPortal = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [paperPassword, setPaperPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ obtained: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(0); 

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions || []);
        setPaperPassword(data.password || '');
        setTimeLeft((data.timeLimit || 5) * 60); 
      })
      .catch(err => {
        console.error('Error loading question paper:', err);
      });
  }, []);

  
  useEffect(() => {
    if (isAuthenticated && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitAnswers();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAuthenticated, submitted, questions, answers, studentName, rollNumber]);

  const handleStart = () => {
    if (!studentName || !rollNumber || !inputPassword) {
      alert('Please fill all fields.');
      return;
    }

    if (inputPassword === paperPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect paper password.');
    }
  };

  const handleChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const submitAnswers = () => {
    let total = 0;
    let obtained = 0;

    questions.forEach((q, idx) => {
      const userAnswer = answers[idx]?.toString().trim().toLowerCase();
      const correctAnswer = q.answer?.toString().trim().toLowerCase();
      total += q.marks || 1;
      if (userAnswer === correctAnswer) {
        obtained += q.marks || 1;
      }
    });

    setSubmitted(true);
    setScore({ obtained, total });

    const resultData = {
      studentName,
      rollNumber,
      answers,
      obtainedMarks: obtained,
      totalMarks: total,
      timestamp: new Date().toLocaleString()
    };

    const blob = new Blob([JSON.stringify(resultData, null, 2)], {
      type: 'application/json'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${rollNumber}_submission.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="student-portal-container">
      <h2>👨‍🎓 Student Portal</h2>

      {!isAuthenticated ? (
        <div className="student-form">
          <input
            type="text"
            placeholder="Your Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Paper Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button onClick={handleStart}>▶ Start Exam</button>
        </div>
      ) : !submitted ? (
        <div className="questions-section">
          <div className="exam-header">
            <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
            <button onClick={submitAnswers}>⏱️ Submit</button>
          </div>
          <ol>
            {questions.map((q, idx) => (
              <li key={idx} className="question-item">
                <div dangerouslySetInnerHTML={{ __html: q.content }} />
                <p><strong>Type:</strong> {q.type}</p>
                <p><strong>Marks:</strong> {q.marks}</p>

                {q.type.toLowerCase() === 'mcq' && (
                  <div className="mcq-options">
                    {q.options?.map((opt, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          value={opt}
                          checked={answers[idx] === opt}
                          onChange={() => handleChange(idx, opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.type.toLowerCase() === 'true-false' && (
                  <select
                    value={answers[idx] || ''}
                    onChange={(e) => handleChange(idx, e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                )}

                {q.type.toLowerCase() === 'one-word' && (
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    value={answers[idx] || ''}
                    onChange={(e) => handleChange(idx, e.target.value)}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="result-section">
          <h3>🎉 Exam Submitted!</h3>
          <p><strong>Name:</strong> {studentName}</p>
          <p><strong>Roll No:</strong> {rollNumber}</p>
          <p><strong>Score:</strong> {score.obtained} / {score.total}</p>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
