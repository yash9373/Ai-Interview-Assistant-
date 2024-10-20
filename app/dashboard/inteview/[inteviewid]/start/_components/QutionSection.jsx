import React from 'react';
import { FiVolume2 } from 'react-icons/fi'; // Import the Volume2 icon

function QutionSection({ mockInterviewQuestions, activecursorindex }) {
    console.log("imported mock", mockInterviewQuestions);

    // Access the interviewQuestions array
    const questions = mockInterviewQuestions?.interviewQuestions;

    // Text-to-speech function
    const textToseach = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Your browser does not support speech synthesis');
        }
    };

    return (
        <div className='p-5 border rounded-lg'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4'>
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((item, index) => (
                        <h2
                            key={index}
                            className={`p-2 rounded-full text-center text-xm md:text-sm cursor-pointer ${activecursorindex === index ? 'bg-indigo-500 text-white' : 'bg-secondary'}`}
                        >
                            Question #{index + 1}
                        </h2>
                    ))
                ) : (
                    <h2>No questions available.</h2>
                )}
            </div>

            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                {/* Only show the question text for the active question */}
                {Array.isArray(questions) && questions.length > 0 && (
                    <>
                        <h2 className="font-bold text-md my-5 md:text-md text-blue-700">
                            Question :<br />{questions[activecursorindex]?.question}
                        </h2>
                        {/* Volume icon to trigger text-to-speech */}
                        <FiVolume2
                            className="cursor-pointer text-blue-700 text-2xl"
                            onClick={() => textToseach(questions[activecursorindex]?.question)}
                        />
                    </>
                )}
            </div><br />

            <div className="w-full mb-6 p-4 bg-green-100 text-red-800 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-xm md:text-sm">Important Instructions</h3>
                <p className='text-xm md:text-sm'>
                    Click to record the answer, and at the end, we will give you feedback based on your answer. Best of luck!
                </p>
            </div>
        </div>
    );
}

export default QutionSection;
