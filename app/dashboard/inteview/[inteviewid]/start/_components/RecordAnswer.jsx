"use client";

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaRegLaughSquint } from 'react-icons/fa';
import Image from "next/image";
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../../../../utils/db';
import { UserAnswer } from '../../../../../../utils/schema';
import moment from 'moment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from '../../../../_components/@/components/ui/button';
import { StopCircle } from 'lucide-react';
import { Mic } from 'lucide-react';

const MODEL_NAME = 'gemini-pro';

function RecordAnswer({ mockInterviewQuestions, activecursorindex, interviewData }) {
    const webcamRef = useRef(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [webcamEnabled, setWebcamEnabled] = useState(true);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const { user } = useUser();

    const questions = mockInterviewQuestions?.interviewQuestions || 
                     mockInterviewQuestions?.questions || [];

    const {
        error: speechError,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const checkPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });
            setWebcamEnabled(true);
            setPermissionDenied(false);
            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            console.error('Permission denied or not available:', error);
            setWebcamEnabled(false);
            setPermissionDenied(true);
        }
    };

    useEffect(() => {
        checkPermissions();
        return () => {
            if (isRecording) {
                stopSpeechToText();
            }
        };
    }, []);

    useEffect(() => {
        setUserAnswer('');
        setResults([]);
        setLoading(false);
    }, [activecursorindex]);

    useEffect(() => {
        const newTranscript = results.map(result => result.transcript).join(' ');
        setUserAnswer(newTranscript);
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer?.length > 10) {
            UpdateUserAnswer();
        }
    }, [userAnswer, isRecording]);

    const startStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setResults([]);
            setUserAnswer('');
            startSpeechToText();
        }
    };

    const UpdateUserAnswer = async () => {
        console.log(userAnswer);
        setLoading(true);

        try {
            const feedbackPrompt = `Question: ${questions[activecursorindex]?.question}. User answer: ${userAnswer}. Based on the user answer for the given question, give me a rating and an area for improvement (if any) in just 2-3 lines. Return the feedback in JSON format with 'rating' (out of 10) and 'feedback' fields.`;

            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });
            
            const result = await model.generateContent(feedbackPrompt);
            const response = await result.response;
            const mockResponse = (response.text())
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            
            const JsonFeedbackResp = JSON.parse(mockResponse);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: questions[activecursorindex]?.question,
                correctAns: questions[activecursorindex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            });

            if (resp) {
                toast('User Answer recorded successfully');
                setUserAnswer('');
                setResults([]);
                toast.success(`Rating: ${JsonFeedbackResp.rating}/10`);
            }

        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to process answer');
        } finally {
            setLoading(false);
        }
    };

    if (speechError) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    return (
        <div className="p-4 border rounded-lg bg-gray-100">
            {webcamEnabled ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        style={{ width: "100%", height: 400, objectFit: "cover" }}
                        className="mb-5 rounded-sm"
                    />
                    <div className="mb-4">
                        <Button
                            onClick={startStopRecording}
                            variant={isRecording ? "recording" : "default"}
                            disabled={loading}
                        >
                            {isRecording ? (
                                <h2 className="flex gap-2 items-center">
                                    <StopCircle />
                                    Stop Recording
                                </h2>
                            ) : (
                                <h2 className="flex gap-2 items-center">
                                    <Mic />
                                    Start Recording
                                </h2>
                            )}
                        </Button>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">
                            {/* Recording Status: {isRecording ? "Recording..." : "Not Recording"} */}
                        </h2>
                    </div>

                    <div className="mb-4 w-full">
                        <h3 className="text-md font-medium">Transcription:</h3>
                        <p className="bg-white p-2 rounded text-gray-800">
                            {userAnswer}
                            {interimResult && (
                                <span className="italic text-gray-500"> {interimResult}</span>
                            )}
                        </p>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    {permissionDenied ? (
                        <Image
                            src="/touc.jpeg"
                            width={550}
                            height={400}
                            alt="Webcam access denied"
                            className="mb-4"
                        />
                    ) : (
                        <FaRegLaughSquint className="text-6xl mb-4 text-gray-400" />
                    )}
                    <p className="text-lg text-center">
                        Webcam is not available! In the left corner, you will see the "i"
                        icon. Click on it and allow the camera.
                    </p>
                </div>
            )}
        </div>
    );
}

export default RecordAnswer;
