import React from 'react';
import { FiVolume2 } from 'react-icons/fi'; // Import the Volume2 icon
import { Volume2 } from 'lucide-react';

function QuestionSection({ mockInterviewQuestions, activecursorindex }) {
    // console.log("imported mock", mockInterviewQuestions);

    // Access the interviewQuestions array from the passed mockInterviewQuestions
    const questions = mockInterviewQuestions?.interviewQuestions || mockInterviewQuestions?.questions || [];
    // console.log("questions", questions);

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
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Question Navigation Pills */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((_, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full text-center text-sm font-medium transition-all duration-300 cursor-pointer hover:transform hover:scale-105 ${
                activecursorindex === index
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Q{index + 1}
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center p-4">
            <div className="animate-pulse flex space-x-2 text-gray-400">
              <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
              <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
              <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Current Question Card */}
      <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
        {Array.isArray(questions) && questions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="font-semibold text-lg text-gray-900">
                Current Question
              </h2>
              <Volume2
                className="w-6 h-6 text-blue-600 cursor-pointer transition-transform hover:scale-110"
                onClick={() => textToSpeech(questions[activecursorindex]?.question)}
              />
            </div>
            <p className="text-gray-800 font-medium leading-relaxed">
              {questions[activecursorindex]?.question}
            </p>
          </div>
        )}
      </div>

      {/* Guidelines Panel */}
      <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-emerald-800">
            Ready to Begin?
          </h3>
          <p className="text-sm text-emerald-700">
            Take a deep breath and click the record button when you're ready. Share your thoughts clearly and naturally - we'll provide personalized feedback once you're done. You've got this!
          </p>
        </div>
      </div>
    </div>
    );
}

export default QuestionSection;