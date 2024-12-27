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
// import { StopCircle } from 'lucide-react';
// import { Mic } from 'lucide-react';
import { Mic, StopCircle, Camera, AlertCircle } from 'lucide-react';

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
            // console.error('Permission denied or not available:', error);
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
        // console.log(userAnswer);
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
            // console.error('Error:', error);
            toast.error('Failed to process answer');
        } finally {
            setLoading(false);
        }
    };

    if (speechError) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm">
      {webcamEnabled ? (
        <div className="space-y-6">
          {/* Webcam Display */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <Webcam
              audio={false}
              ref={webcamRef}
              className="w-full h-[400px] object-cover"
            />
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full text-white text-sm animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full" />
                Recording
              </div>
            )}
          </div>

          {/* Recording Controls */}
          <div className="flex items-center justify-between">
            <Button
              onClick={startStopRecording}
              disabled={loading}
              className={`${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center gap-2">
                {isRecording ? (
                  <>
                    <StopCircle className="w-5 h-5" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </>
                )}
              </div>
            </Button>

            {loading && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500" />
                Processing...
              </div>
            )}
          </div>

          
        {/* Transcription Area */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Live Transcription</h3>
                <div className="bg-white rounded-lg p-4 max-h-[100px] overflow-y-auto border border-gray-200 shadow-inner">
                    <p className="text-gray-800 whitespace-pre-wrap">
                    {userAnswer}
                    {interimResult && (
                        <span className="text-gray-400 italic"> {interimResult}</span>
                    )}
                    </p>
                </div>
            </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 space-y-6">
          <div className="bg-gray-100 p-6 rounded-full">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
          
          <div className="text-center space-y-2 max-w-md">
            <h3 className="text-xl font-semibold text-gray-800">
              {permissionDenied ? 'Camera Access Required' : 'Camera Not Available'}
            </h3>
            <p className="text-gray-600">
              {permissionDenied ? (
                <span className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Please click the camera icon in your browser's address bar and allow access to continue.
                </span>
              ) : (
                'Please enable your camera to begin the interview session.'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
    );
}

export default RecordAnswer;
