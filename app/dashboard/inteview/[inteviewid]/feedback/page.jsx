"use client";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent
  } from '../../../_components/@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../../../_components/@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetFeedback();
  }, []);
  const GetFeedback = async () => {
    // console.log("Params received:", params);
    // console.log("Interview ID:", params.inteviewid);

    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.inteviewid))
      .orderBy(UserAnswer.id);

    // console.log(result);
    setFeedbackList(result);
  };

  return (
    <div className="p-10 ">
      {feedbackList?.length === 0 ? (
        <div className="mt-10">
          <div className="mt-10 text-center">
  <div className="flex justify-center">
    <div className="h-5 w-5 bg-gray-500 rounded-full animate-bounce delay-100"></div>
    <div className="h-5 w-5 bg-gray-500 rounded-full animate-bounce delay-300 mx-2"></div>
    <div className="h-5 w-5 bg-gray-500 rounded-full animate-bounce delay-500"></div>
  </div>
  <h2 className="font-bold text-xl text-gray-500 mt-3">Loading Feedback...</h2>
  
</div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500  mt-5">
            Congratulation!
          </h2>
          <h2 className="font-bold text-2xl mt-3">
            Here is your interview feedback
          </h2>
          <h2 className="text-sm text-gray-500 mt-5 mb-10">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7 w-full">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full hover:scale-105 transition-transform duration-200">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 p-5 rounded-lg shadow-md">
                    <h2 className={`p-2 rounded-lg ${
                      parseInt(item.rating) < 5 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                    } text-sm font-mono`}>
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 rounded-lg bg-gray-50 text-sm text-gray-700 font-mono">
                      <strong>Your Answer: </strong> {item.userAns}
                    </h2>
                    <h2 className="p-2 rounded-lg bg-green-50 text-sm text-green-700 font-mono">
                      <strong>Correct Answer: </strong> {item.correctAns}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button
        onClick={() => router.replace("/dashboard")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-5 shadow-md"
      >
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
