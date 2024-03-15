import { IonIcon } from "@ionic/react";
import { add, trash, chevronUp, chevronDown } from "ionicons/icons";
import { useState } from "react";

function Questionnaire() {
  // States
  const [multiChoicesarr, setMultiChoicesarr] = useState([
    {
      answer: "",
      id: Date.now(),
    },
  ]);
  const [singleChoicesArr, setSingleChoicesArr] = useState([
    {
      id: Date.now(),
      answer: "",
    },
  ]);
  const [attached, setAttached] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      question: "",
      type: "",
      stage: "",
      attached: false,
      parentQuestion: "",
      singleChoices: [],
      multiChoices: [],
    },
  ]);

  // handlers
  const handleChange = (event, formId) => {
    const { name, value } = event.target;
    setQuestions((prevQuestions) =>
      prevQuestions.map((form) =>
        form.id === formId ? { ...form, [name]: value } : form
      )
    );
  };
  const handleSubmit = (event, formId) => {
    event.preventDefault();
    const form = questions.find((form) => form.id === formId);

    console.log(form);
  };

  const handleChoiceChange = (event, choiceId) => {
    const { name, value } = event.target;
    setSingleChoicesArr((prevChoices) =>
      prevChoices.map((choice) =>
        choice.id === choiceId ? { ...choice, [name]: value } : choice
      )
    );
    console.log(singleChoicesArr);
  };
  // methods
  console.log(questions);
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: "",
      singleChoices: [],
      multiChoices: [],
      type: "",
      stage: "",
      parentQuestion: "",
      attached: attached,
    };
    setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
    // console.log(questions);
  };
  const handleCheckboxChange = () => {
    setAttached(!attached);
  };

  const addSubQuestion = (data) => {
    // console.log(id);
    const newSubQuestion = {
      id: Date.now(),
      question: data.answer,
      singleChoices: [],
      multiChoices: [],
      type: "",
      stage: "closed",

      parentQuestion: data.answer,
      attached: attached,
    };
    setQuestions((prevQuestions) => [newSubQuestion, ...prevQuestions]);
  };
  const removeQuestion = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
    );
  };
  const addMultiChoice = () => {
    const newChoice = {
      type: "text",
      id: multiChoicesarr.length,
      value: "",
    };

    setMultiChoicesarr((prevChoices) => [...prevChoices, newChoice]);
  };
  const addSingleChoice = () => {
    const newChoice = {
      id: Date.now(),
      answer: "",
    };
    setSingleChoicesArr((prevChoices) => [newChoice, ...prevChoices]);
    // console.log(questions[0].singleChoices);
    console.log(singleChoicesArr);
  };
  const removeMultiQ = (id) => {
    const updatedData = multiChoicesarr.filter((choice) => choice.id !== id);
    setMultiChoicesarr(updatedData);
  };
  const removeSingleQ = (id) => {
    const updatedData = singleChoicesArr.filter((choice) => choice.id !== id);
    setSingleChoicesArr(updatedData);
  };
  const liftQuestionUp = (index) => {
    if (index === 0) {
      return; // No change needed if the row is already at the top
    }

    const liftedData = [...questions];
    const liftedRow = liftedData[index];
    liftedData[index] = liftedData[index - 1];
    liftedData[index - 1] = liftedRow;

    setQuestions(liftedData);
  };
  const liftQuestionDown = (index) => {
    if (index === questions.length - 1) {
      return; // No change needed if the row is already at the bottom
    }

    const liftedData = [...questions];
    const liftedRow = liftedData[index];
    liftedData[index] = liftedData[index + 1];
    liftedData[index + 1] = liftedRow;

    setQuestions(liftedData);
  };

  return (
    <div>
      {questions.map((question) => {
        // console.log(question);
        return (
          <form
            key={question.id}
            onSubmit={(event) => handleSubmit(event, question.id)}
            className="grid grid-flow-col text-xl grid-cols-8"
          >
            <div className="border border-gray-400 flex justify-start items-center pl-2">
              <label className="">
                <input
                  name="question"
                  value={question.question}
                  type="text"
                  className="text-black   border border-gray-400 text-sm p-2 rounded-md  outline-none placeholder:text-black"
                  placeholder="New Question"
                  onChange={(event) => handleChange(event, question.id)}
                />
              </label>
            </div>

            <div className="border border-gray-400 flex justify-start items-center pl-2 ">
              <select
                name="type"
                value={question.type}
                onChange={(event) => handleChange(event, question.id)}
                className=" text-black p-2  border border-gray-400 text-sm rounded-md outline-none"
              >
                <option value="">Select</option>
                <option value="essay">Essay</option>
                <option value="sq">Single Question</option>
                <option value="mq">Multiple Question</option>
              </select>
            </div>

            <div className="border border-gray-400 flex justify-start items-center pl-2">
              {question.type === "essay" ? (
                <div className="flex justify-center pt-5">
                  <label htmlFor="essay">
                    <input
                      type="text"
                      placeholder="Type your answer"
                      className="text-black   border border-gray-400 text-sm p-2 rounded-md  outline-none placeholder:text-black"
                    />
                  </label>
                </div>
              ) : (
                ""
              )}

              {question.type === "sq" ? (
                <div className="py-4 flex  flex-col space-y-3 pl-2">
                  {singleChoicesArr.map((choice) => {
                    // console.log(choice);
                    return (
                      <div className="flex  space-x-4 " key={choice.id}>
                        <label
                          // htmlFor="sqa"
                          className="flex justify-center items-center "
                        >
                          <input
                            name="answer"
                            value={choice.answer}
                            type="text"
                            className="text-black   border border-gray-400 text-sm p-2 rounded-md  outline-none placeholder:text-black"
                            placeholder="type your answer"
                            onChange={
                              (event) => handleChoiceChange(event, choice.id)
                              // console.log(event.target.value)
                            }
                          />
                        </label>
                        <button>
                          <IonIcon
                            icon={add}
                            size="large"
                            className="pt-2 cursor-pointer"
                            style={{ color: "#9CA3AF" }}
                            onClick={() => addSubQuestion(choice)}
                          />
                        </button>
                        <button>
                          <IonIcon
                            icon={trash}
                            size="medium"
                            className="pt-2 cursor-pointer"
                            style={{ color: "red" }}
                            onClick={() => removeSingleQ(choice.id)}
                          />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    className="flex self-start bg-green-500 py-2  justify-center  rounded-md text-white text-lg w-[50%]"
                    onClick={addSingleChoice}
                  >
                    Add Choice
                  </button>
                </div>
              ) : (
                ""
              )}

              {question.type === "mq" ? (
                <div className="flex flex-col space-y-4 pl-2 justify-start items-start py-4 ">
                  <div className="flex flex-col space-y-2">
                    {multiChoicesarr.map((item, i) => {
                      return (
                        <label htmlFor="mq" className="flex space-x-16" key={i}>
                          <input
                            // value={item.value}
                            id={i}
                            type={item.type}
                            className=" text-black   border border-gray-400 text-sm p-2 rounded-md  outline-none placeholder:text-black"
                            placeholder="Type your answer"
                          />
                          <button>
                            <IonIcon
                              icon={trash}
                              size="medium"
                              className=" cursor-pointer"
                              style={{ color: "red" }}
                              onClick={() => removeMultiQ(item.id)}
                            />
                          </button>
                        </label>
                      );
                    })}
                  </div>

                  <button
                    className="flex self-start bg-green-500 py-2  justify-center  rounded-md text-white text-lg w-[50%]"
                    onClick={addMultiChoice}
                  >
                    Add Choice
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <label className="border border-gray-400 flex justify-start items-center pl-2">
              <select
                name="stage"
                value={question.stage}
                onChange={(event) => handleChange(event, question.id)}
                className=" text-black p-2  border border-gray-400 text-sm rounded-md outline-none"
              >
                <option value="">Select</option>
                <option value="opened">Opened</option>
                <option value="action">Action</option>
                <option value="closed">Closed</option>
              </select>
            </label>

            <div className="border border-gray-400 flex justify-start items-center pl-2">
              {question.parentQuestion ? (
                <p>parent choice: {question.parentQuestion}</p>
              ) : (
                <p>No parent question</p>
              )}
            </div>
            <label className="border border-gray-400 flex justify-start items-center pl-2">
              <input
                type="checkbox"
                name="attached"
                // value={question.attached}
                // checked={attached}
                onClick={() => handleCheckboxChange(question.id)}
              />
            </label>
            <div className="border border-gray-400 flex justify-start items-center pl-2">
              <button
                type="button"
                onClick={() => removeQuestion(question.id)}
                className="bg-[red] text-white py-2 px-8 rounded-md text-lg"
              >
                Delete
              </button>
            </div>
            <div className="border border-gray-400 flex justify-start items-center pl-2">
              <button>
                <IonIcon
                  icon={chevronUp}
                  size="large"
                  className=" cursor-pointer"
                  style={{ color: "#9CA3AF" }}
                  onClick={() => liftQuestionUp(question.id)}
                />
              </button>
              <button>
                <IonIcon
                  icon={chevronDown}
                  onClick={() => liftQuestionDown(question.id)}
                  size="large"
                  className="cursor-pointer"
                  style={{ color: "#9CA3AF" }}
                />
              </button>
            </div>

            <button type="submit">Submit</button>
          </form>
        );
      })}
      <button type="button" onClick={addQuestion}>
        Add Form
      </button>
    </div>
  );
}

export default Questionnaire;

// import React from "react";

// const EssayQuestion = () => {
//   const choices = []; // Empty array for essay question

//   return <div>{/* Render the essay question */}</div>;
// };

// const MultipleQuestion = () => {
//   const choices = ["Choice 1", "Choice 2", "Choice 3"]; // Array of choices for multiple question

//   return (
//     <div>
//       {/* Render the multiple question */}
//       <div>
//         {choices.map((choice, index) => (
//           <label htmlFor="" key={index}>
//             <input type="text" placeholder={choice} />
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// const QuestionComponent = () => {
//   return (
//     <div>
//       {/* <EssayQuestion /> */}
//       <SingleQuestion />
//       <MultipleQuestion />
//     </div>
//   );
// };

// export default QuestionComponent;
