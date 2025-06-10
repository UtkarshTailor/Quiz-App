import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Styles/TeacherDashboard.css';

const TeacherDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionType, setQuestionType] = useState('one-word');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentMarks, setCurrentMarks] = useState(0);
  const [options, setOptions] = useState(['', '', '', '']);
  const [timeLimit, setTimeLimit] = useState('');
  const [password, setPassword] = useState('');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      content: currentQuestion,
      type: questionType,
      answer: currentAnswer,
      options: questionType === 'mcq' ? options : [],
      marks: parseInt(currentMarks),
    };
    setQuestions([...questions, newQuestion]);

    // Reset form
    setCurrentQuestion('');
    setCurrentAnswer('');
    setCurrentMarks(0);
    setOptions(['', '', '', '']);
    setQuestionType('one-word');
  };

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(2, 10).toUpperCase();
    setPassword(randomPassword);
  };

  const handleDownloadJSON = () => {
  const paperData = {
    questions: questions,
    password: password,
    timeLimit: parseInt(timeLimit) || 0
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(paperData, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "questions.json");
  dlAnchorElem.click();
};


  return (
    <div className='teacher-dashboard-container'>
      <h2>👩‍🏫 Teacher Dashboard</h2>

      <h3>Create New Question</h3>

      <label>Question Type:</label>
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
        <option value="one-word">One Word</option>
        <option value="true-false">True / False</option>
        <option value="mcq">MCQ</option>
      </select>

      <Editor
        apiKey="z2nqqrz8m8zat8n11cp4i2ttdlaq6xemrrsel1fr9eupi4yz"
        value={currentQuestion}
        init={{
          height: 200,
          menubar: false,
          plugins: 'lists link image code',
          toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent',
        }}
        onEditorChange={(newText) => setCurrentQuestion(newText)}
      />

      {questionType === 'mcq' && (
        <div>
          <label>MCQ Options:</label>
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
        </div>
      )}

      <label>Correct Answer:</label>
      {questionType === 'true-false' ? (
        <select value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)}>
          <option value="">Select</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      ) : (
        <input
          type="text"
          placeholder="Correct Answer"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
        />
      )}

      <input
        type="number"
        placeholder="Marks"
        value={currentMarks}
        onChange={(e) => setCurrentMarks(e.target.value)}
      />

      <button onClick={handleAddQuestion}>➕ Add Question</button>

      <h3>Added Questions</h3>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <div dangerouslySetInnerHTML={{ __html: q.content }} />
            <p><strong>Type:</strong> {q.type}</p>
            {q.options.length > 0 && (
              <ul>
                {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
              </ul>
            )}
            <p><strong>Answer:</strong> {q.answer}</p>
            <p><strong>Marks:</strong> {q.marks}</p>
          </li>
        ))}
      </ul>

      <h3>Settings</h3>
      <label>Time Limit (minutes):</label>
      <input
        type="number"
        placeholder="Enter time limit"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
      />
      <br />
      <button onClick={generatePassword}>🔒 Generate Paper Password</button>
      {password && <p><strong>Generated Password:</strong> {password}</p>}

      <br />
      <button onClick={handleDownloadJSON}>💾 Download Question Paper JSON</button>
    </div>
  );
};

export default TeacherDashboard;
