import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function addQuestion(newQuestion) {
    setQuestions((questions) => [...questions, newQuestion]);
  }

  function deleteQuestion(id) {
    console.log("Deleting question with id:", id);
    setQuestions((questions) => {
      const filtered = questions.filter((q) => q.id !== id);
      console.log("Questions after delete:", filtered);
      return filtered;
    });
  }

  function updateQuestion(updatedQuestion) {
    console.log("Updating question:", updatedQuestion);
    setQuestions((questions) => {
      const updatedQuestions = questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      );
      console.log("Questions after update:", updatedQuestions);
      return updatedQuestions;
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
