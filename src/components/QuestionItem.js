import React from "react";

function QuestionItem({ question, deleteQuestion, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index.toString()}>
      {answer}
    </option>
  ));

  function handleChange(event) {
    const updatedCorrectIndex = parseInt(event.target.value, 10);

    fetch("http://localhost:4000/questions/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        console.log("Updated question from server:", updatedQuestion);
        updateQuestion(updatedQuestion);
      });
  }

  function handleDelete() {
    fetch("http://localhost:4000/questions/" + id, {
      method: "DELETE",
    }).then(() => {
      deleteQuestion(id);
    });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex.toString()} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
