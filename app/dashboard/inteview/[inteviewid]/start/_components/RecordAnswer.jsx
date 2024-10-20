"use client";

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaRegLaughSquint } from 'react-icons/fa';
import Image from "next/image";
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';

function RecordAnswer({ mockInterviewQuestions, activecursorindex }) {
    const webcamRef = useRef(null);
    const [webcamEnabled, setWebcamEnabled] = useState(true);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [useranswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false); // For loading state
    const [error, setError] = useState(null); // For error handling

    const questions = mockInterviewQuestions?.interviewQuestions || [];

    const {
        error: speechError,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    const checkPermissions = async () => {
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setWebcamEnabled(true);
            videoStream.getTracks().forEach(track => track.stop());
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStream.getTracks().forEach(track => track.stop());
        } catch (error) {
            console.error('Permission denied or not available:', error);
            setWebcamEnabled(false);
            setPermissionDenied(true);
        }
    };

    useEffect(() => {
        checkPermissions();
    }, []);

    useEffect(() => {
        const newAnswer = results.map(result => result.transcript).join(' ');
        setUserAnswer(newAnswer);
    }, [results]);

    const handleRecordingToggle = () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    const saveUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();

            if (useranswer?.length < 10) {
                toast('Error While Saving Answer, please record again');
                return;
            }

            const feedbackPrompt = `Question: ${questions[activecursorindex]?.question}. User answer: ${useranswer}. Based on the user answer for the given question, give me a rating and an area for improvement (if any) in just 2-3 lines. Return the feedback in JSON format with 'rating' (out of 10) and 'feedback' fields.`;

            // Initialize ChatSession with your Google API key
            const chatSession = new ChatSession({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

            setLoading(true); // Set loading state

            try {
                const response = await chatSession.sendMessage(feedbackPrompt);
                const cleanResponse = response.message.replace(/```json/, '').replace(/```/, '').trim();

                // Attempt to parse JSON response
                const jsonResponse = parseAIResponse(cleanResponse);
                if (jsonResponse) {
                    console.log("Parsed JSON Response:", jsonResponse);
                    // You can handle the JSON response further here (e.g., displaying it, storing it, etc.)
                } else {
                    setError("Failed to parse the AI's response. Please try again.");
                }
            } catch (error) {
                console.error("Error while sending message:", error);
                setError("Error while sending the message to AI.");
                toast('Error while sending the message to AI.');
            } finally {
                setLoading(false); // Reset loading state
            }
        } else {
            startSpeechToText();
        }
    };

    const parseAIResponse = (responseText) => {
        let jsonString = responseText.trim();

        try {
            return JSON.parse(jsonString);
        } catch (err) {
            console.error("Failed to parse JSON:", err);
            console.error("Response received:", jsonString);
            return null;
        }
    };

    const combinedTranscription = results.map(result => result.transcript).join(' ');

    if (speechError) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    return (
        <div className="p-4 border rounded-lg bg-gray-100 grid grid-cols-1 justify-center items-center">
            {webcamEnabled ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        style={{
                            width: "100%",
                            height: 400,
                            objectFit: "cover",
                        }}
                        className='mb-5 rounded-sm'
                    />
                    <div className="mb-4">
                        <button
                            onClick={saveUserAnswer}
                            className={`px-4 py-2 rounded ${isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Recording Status: {isRecording ? 'Recording...' : 'Not Recording'}</h2>
                    </div>
                    <div className="mb-4 w-full">
                        <h3 className="text-md font-medium">Transcriptions:</h3>
                        <p className="bg-white p-2 rounded text-gray-800">
                            {combinedTranscription}
                            {interimResult && <span className="italic text-gray-500"> {interimResult}</span>}
                        </p>
                    </div>
                    {error && (
                        <div className="mt-4">
                            <span className="text-red-500">{error}</span>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center">
                    {permissionDenied ? (
                        <Image src="/touc.jpeg" width={550} height={400} alt="Webcam access denied" className="mb-4" />
                    ) : (
                        <FaRegLaughSquint className="text-6xl mb-4 text-gray-400" />
                    )}
                    <p className="text-lg text-center">
                        Webcam is not available! In the left corner, you will see the "i" icon. Click on it and allow the camera.
                    </p>
                </div>
            )}
            <button onClick={() => console.log(useranswer)} className="px-4 py-2 bg-green-500 text-white rounded">
                Log Answer
            </button>
        </div>
    );
}

export default RecordAnswer;
