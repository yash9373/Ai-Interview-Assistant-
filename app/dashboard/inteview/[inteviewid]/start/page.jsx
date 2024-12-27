"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db"; // Ensure db is imported correctly
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswer from "./_components/RecordAnswer";
import { Button } from "../../../_components/@/components/ui/button";
import Link from "next/link";

function StartInterviewPage({ params }) {
  // Edit 1
  const [interviewData, setInterviewData] = useState(null); // Initialize with null
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState(null); // Initialize with null
  const [activecursorindex, setactivecursorindex] = useState(0);

  useEffect(() => {
    if (params.inteviewid) {
      GetInterviewDetails(); // Fetch only if interview ID is available
    }
  }, [params.inteviewid]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.inteviewid));

      console.log("Database result:", result);

      if (Array.isArray(result) && result.length > 0) {
        const interview = result[0];
        setInterviewData(interview);

        // Check if jsonmockresponse is defined and not empty
        if (
          interview.jsonMockresponse &&
          typeof interview.jsonMockresponse === "string"
        ) {
          // console.log("Raw JSON response:", interview.jsonMockresponse);
          try {
            const jsonmockResponse = JSON.parse(interview.jsonMockresponse);
            setMockInterviewQuestions(jsonmockResponse); // Schedule state update
            console.log("Parsed JSON:", mockInterviewQuestions); // Log the parsed response directly
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
          }
        } else {
          // console.warn("jsonmockresponse is not available, empty, or invalid.");
        }
      } else {
        console.warn("No data found for the given interview ID.");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mt-3 mb-6">Interview Questions</h1>

      {/* Conditional rendering while the questions are being loaded */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Pass the mockInterviewQuestions to the QutionSection component */}
        <QuestionSection
          mockInterviewQuestions={mockInterviewQuestions}
          activecursorindex={activecursorindex}
        />

        <RecordAnswer
          mockInterviewQuestions={mockInterviewQuestions}
          activecursorindex={activecursorindex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex px-4 py-2 justify-end gap-6">
        {activecursorindex > 0 && (
          <Button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => setactivecursorindex(activecursorindex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activecursorindex <
          (mockInterviewQuestions?.interviewQuestions?.length ||
            mockInterviewQuestions?.questions?.length ||
            0) -
            1 && (
          <Button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => setactivecursorindex(activecursorindex + 1)}
          >
            Next Question
          </Button>
        )}

        {activecursorindex ===
          (mockInterviewQuestions?.interviewQuestions?.length ||
            mockInterviewQuestions?.questions?.length ||
            0) -
            1 && (
          <Link
            href={"/dashboard/inteview/" + interviewData?.mockId + "/feedback"}
          >
            <Button className="px-4 py-2 rounded bg-blue-500 text-white">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterviewPage;
