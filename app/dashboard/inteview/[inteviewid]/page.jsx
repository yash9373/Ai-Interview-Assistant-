"use client";
import React, { useEffect, useState } from "react";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../../utils/db";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";
import { Button } from "../../_components/@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  useEffect(() => {
    // console.log(params.inteviewid);
    GetInterviewDetails();
  }, [params.inteviewid]);

  const [interviewData, setInterviewData] = useState(null); // Initialize to null
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  const GetInterviewDetails = async () => {
    try {
      if (!params.inteviewid) {
        // console.warn("Interview ID is not provided.");
        return;
      }

      // Fetch data from the database
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.inteviewid));

      // console.log("Database result:", result); // Log the result

      // Check if result is an array and set the first item if available
      if (Array.isArray(result) && result.length > 0) {
        setInterviewData(result[0]); // Assuming you want the first item
      } else {
        // console.warn("No data found for the given interview ID.");
      }
    } catch (error) {
      // console.error("Error fetching interview details:", error);
    }
  };

  const requestWebcamPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamEnabled(true);
    } catch (error) {
      // console.error("Error accessing webcam:", error);
      alert("Could not access the webcam. Please check your permissions.");
    }
  };

  return (
    <div className="flex flex-col items-center my-10 p-5 bg-gray-100 rounded-lg shadow-lg">
      {/* Instructional Information */}
      <div className="w-full mb-6 p-4 bg-red-100 text-red-800 rounded-lg shadow-md">
        <h3 className="text-lg font-bold">Important Instructions</h3>
        <p>
          Please enable your webcam to start the interview. You will be asked 10
          questions, and based on your responses, a detailed report will be
          generated at the end.
        </p>
      </div>

      <h2 className="font-bold text-3xl text-gray-800 mb-6">
        Let's get started
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 items-start">
        {/* Description Section */}
        <div className="flex flex-col h-full bg-white p-6 rounded-lg shadow-lg space-y-4">
          {interviewData ? (
            <>
              <h2 className="text-xl text-gray-800">
                <strong>Job Role / Job Position: </strong>
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-xl text-gray-800">
                <strong>Job Description / Tech Stack: </strong>
                {interviewData.jobDesc}
              </h2>
              <h2 className="text-xl text-gray-800">
                <strong>Years of Experience: </strong>
                {interviewData.jobExp}
              </h2>
              <h2 className="text-xl text-gray-800">
                <strong>Projects and Skills from Your Resume: </strong>
                {interviewData.Resume}
              </h2>
            </>
          ) : (
            <h2 className="text-lg text-gray-500">
              <strong>Loading Data...</strong>
            </h2>
          )}
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center justify-center h-auto md:h-full p-4 bg-white rounded-lg shadow-lg">
          <div className="flex-grow flex items-center justify-center mb-4">
            {webcamEnabled ? (
              <Webcam
                style={{
                  height: "300px",
                  width: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
                mirrored={true} // Ensure the webcam feed is mirrored
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <WebcamIcon className="h-72 w-full text-gray-400 p-10 bg-secondary rounded-lg border" />
              </div>
            )}
          </div>

          {/* Button below Webcam */}
          <Button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-2 transition-transform hover:scale-105 shadow-md"
            onClick={requestWebcamPermission}
          >
            Enable Webcam And Microphone
          </Button>
        </div>
      </div>

      {/* Big Start Button */}
      <div className="flex justify-center p-5">
        <Link href={"/dashboard/inteview/" + params.inteviewid + "/start"}>
          <Button
            className="
        bg-gradient-to-r from-indigo-500 to-purple-600 
        text-white text-2xl font-semibold
        py-3 px-8 
        rounded-full 
        shadow-md 
        hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 
        transition-all duration-300 ease-in-out 
        focus:outline-none focus:ring-4 focus:ring-purple-300
    "
          >
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
