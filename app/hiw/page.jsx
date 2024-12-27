import React from "react";
import Header from '../dashboard/_components/Header';

function App() {
  return (
    <div>
    <div>
      <Header />
    </div>
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Prepare Smarter, Interview Better</h1>
        <p className="text-lg mb-6">Your AI-Powered Interview Assistant</p>
        
      </section>

      {/* How It Works Section */}
      <section className="p-40">
        <h2 className="text-3xl font-bold mb-10 text-center">How It Works: Your Journey to Success</h2>
        <div className="relative">
          <div className="border-l-4 border-indigo-600 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          {[
            {
              title: "Sign Up or Log In",
              description: "Create your account to unlock all the features and personalize your experience."
            },
            {
              title: "Authenticate Securely",
              description: "Your data is protected with industry-leading encryption and security measures."
            },
            {
              title: "Provide Interview Details",
              description: "Share the specifics of your interview for a customized preparation plan."
            },
            {
              title: "Enable Camera and Microphone",
              description: "Simulate a realistic interview environment with video and audio access."
            },
            {
              title: "Receive Tailored Questions",
              description: "Get questions tailored to your job role and industry preferences."
            },
            {
              title: "Answer in Real-Time",
              description: "Practice your responses in a live setting for the best preparation."
            },
            {
              title: "Audio Transcription",
              description: "Your spoken answers are converted into text for easy review."
            },
            {
              title: "Insightful AI Feedback",
              description: "Receive actionable feedback to enhance your confidence and performance."
            }
          ].map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"} mb-10 relative`}
            >
              <div className="bg-indigo-600 text-white flex items-center justify-center w-10 h-10 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
                {index + 1}
              </div>
              <div className={`bg-white shadow-lg rounded-lg p-6 w-5/12 ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-10 bg-gray-50">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[{
            question: "What do I need to use this app?",
            answer: "Just a device with a camera and microphone—no extra equipment required."
          }, {
            question: "How does the feedback work?",
            answer: "Our AI evaluates your answers for clarity, relevance, and confidence."
          }, {
            question: "Can I customize the practice session?",
            answer: "Absolutely! Tailor questions based on your interview specifics."
          }, {
            question: "Is my data private?",
            answer: "Yes, your data is encrypted and handled with utmost care."
          }, {
            question: "How often can I practice?",
            answer: "As often as you need. Practice makes perfect!"
          }].map((faq, index) => (
            <details key={index} className="p-4 bg-white rounded-lg shadow-md">
              <summary className="cursor-pointer font-semibold text-gray-800">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-indigo-600 text-white py-10 text-center">
        <p>Start your journey to interview success today! &copy; 2024 InterviewPrep</p>
      </footer>
    </div>
    </div>
  );
}

export default App;
