# 🎓 Digital Question Paper System

A responsive single-page application built using React for conducting digital examinations. It supports two primary user flows:
- 👩‍🏫 **Teacher Dashboard** – for creating question papers with various question types.
- 🧑‍🎓 **Student Portal** – for attempting the exams interactively.

---

## 📦 Features

- Rich question creation interface (MCQ, True/False, One Word)
- Password-protected paper access
- Auto answer input and validation system
- Downloadable answer JSON file
- Responsive design for all screen sizes

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 📁 Clone the Repository

```bash
git clone https://github.com/UtkarshTailor/Quiz-App.git
cd QUIZ-APP
```

### 📦 Install Dependencies

Make sure you have **Node.js (v16 or later)** installed.

```bash
npm install
```

### ▶️ Run the Development Server

```bash
npm start
```

The app will launch in your browser at:  
`http://localhost:3000`

---

## 👩‍🏫 Accessing Teacher's Dashboard

1. Visit: `http://localhost:3000/teacher`
2. Fill out the fields to add questions:
   - Choose a question type (MCQ, True/False, One Word).
   - Enter correct answers.
   - Set a password and time limit (optional).
3. Question data is temporarily stored in the frontend and will be used by students.

---

## 🧑‍🎓 Accessing Student Portal

1. Visit: `http://localhost:3000/student`
2. Enter the password (shared by the teacher).
3. Attempt the exam:
   - Each question type has a dynamic input form.
   - Submit answers once done.
4. The results will be displayed immediately with the option to **download the answers as a JSON file**.

---

## 🧰 Tech Stack

- **React 19**
- **React Router DOM v7.6.2**
- **TinyMCE** (via `@tinymce/tinymce-react`) – for rich text editing in Teacher Dashboard
- **CSS3** – for responsive UI styling

---

## 📌 Assumptions Made

- Questions and answers are stored in-memory; no backend/database integration yet.
- Passwords are shared manually between teacher and students.
- Timer and automatic submission features are not yet fully implemented.
- This project simulates a prototype for future backend-connected digital exams.

---

## 🎨 Design Choices

- Used clean, minimal UI with `Segoe UI` font for readability.
- Structured UI components for clear separation of teacher and student flows.
- Responsive CSS for mobile and desktop support.
- Styled input forms and buttons with clear states for a user-friendly experience.

---

## 🧗 Challenges Faced

- Compatibility issues with some rich text editors in React 19 (e.g., Quill was incompatible).
- Managing state for dynamically added question types while ensuring answer validation.
- Ensuring responsiveness across devices while handling form inputs and rich content.

---

