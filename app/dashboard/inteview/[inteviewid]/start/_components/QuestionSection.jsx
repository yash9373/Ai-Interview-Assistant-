import React from 'react';
import { FiVolume2 } from 'react-icons/fi'; // Import the Volume2 icon

function QuestionSection({ mockInterviewQuestions, activecursorindex }) {
    console.log("imported mock", mockInterviewQuestions);

    // Access the interviewQuestions array from the passed mockInterviewQuestions
    const questions = mockInterviewQuestions?.questions;
    console.log("questions", questions);

    // Text-to-speech function
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Your browser does not support speech synthesis');
        }
    };

    return (
        <div className="p-5 border rounded-lg">
            {/* Display list of questions */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((_, index) => (
                        <h2
                            key={index}
                            className={`p-2 rounded-full text-center text-sm cursor-pointer ${
                                activecursorindex === index
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-secondary'
                            }`}
                        >
                            Question #{index + 1}
                        </h2>
                    ))
                ) : (
                    <h2 className="col-span-full text-center text-red-500">
                        No questions available.
                    </h2>
                )}
            </div>

            {/* Active question display */}
            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                {Array.isArray(questions) && questions.length > 0 && (
                    <>
                        <h2 className="font-bold text-md my-5 text-blue-700">
                            Question:<br />
                            {questions[activecursorindex]?.question}
                        </h2>
                        {/* Volume icon for text-to-speech */}
                        <FiVolume2
                            className="cursor-pointer text-blue-700 text-2xl"
                            onClick={() => textToSpeech(questions[activecursorindex]?.question)}
                        />
                    </>
                )}
            </div>

            {/* Instructions section */}
            <div className="w-full mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Important Instructions</h3>
                <p className="text-sm">
                    Click to record the answer. At the end of the session, we will provide
                    feedback based on your answer. Best of luck!
                </p>
            </div>
        </div>
    );
}

export default QuestionSection;