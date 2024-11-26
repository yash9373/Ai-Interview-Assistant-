"use client";
import React, { useEffect, useState } from 'react';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../../../../utils/db'; // Ensure db is imported correctly
import QuestionSection from './_components/QuestionSection';
import RecordAnswer from './_components/RecordAnswer';

function StartInterviewPage({ params }) {
    const [interviewData, setInterviewData] = useState(null); // Initialize with null
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState(null); // Initialize with null
    const [activecursorindex,setactivecursorindex]=useState(0);

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
                if (interview.jsonMockresponse && typeof interview.jsonMockresponse === 'string') {
                    console.log("Raw JSON response:", interview.jsonMockresponse);
                    try {
                        const jsonmockResponse = JSON.parse(interview.jsonMockresponse);
                        setMockInterviewQuestions(jsonmockResponse); // Schedule state update
                        console.log("Parsed JSON:", mockInterviewQuestions); // Log the parsed response directly
    
                    } catch (parseError) {
                        console.error("Error parsing JSON:", parseError);
                    }
                } else {
                    console.warn("jsonmockresponse is not available, empty, or invalid.");
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
            <h1 className="text-3xl font-bold mb-6">Interview Questions</h1>

            {/* Conditional rendering while the questions are being loaded */}
           
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Pass the mockInterviewQuestions to the QutionSection component */}
                    <QuestionSection mockInterviewQuestions={mockInterviewQuestions} 
                    activecursorindex={activecursorindex}/>
                    <RecordAnswer
                    mockInterviewQuestions={mockInterviewQuestions}
                    activecursorindex={activecursorindex}
                    />
        </div>
        </div>
    );
}

export default StartInterviewPage;
