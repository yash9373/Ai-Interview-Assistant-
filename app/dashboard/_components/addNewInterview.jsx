"use client";

import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./@/components/ui/dialog";
import { Button } from "./@/components/ui/button";
import { Input } from "./@/components/ui/input";
import { Textarea } from "./@/components/ui/textarea";
import { LoaderCircle } from 'lucide-react';
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from "next/navigation";



// Initialize the Google Generative AI client
// Note: For security, consider moving this to a server-side API route.
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [projects, setProjects] = useState("");
    const [skills, setSkills] = useState("");
    const [resume, setResume] = useState("");
    const [loading, setLoading] = useState(false); // Corrected state variable name
    const [error, setError] = useState(null);
    const [jsonresponse,setjsonrespnse] = useState([]); // To handle errors
    const {user} = useUser();
    const router = useRouter();
    // Helper function to parse AI response
    const parseAIResponse = (responseText) => {
        // Remove code fences and trim whitespace
        let jsonString = responseText.replace(/```json/, '').replace(/```/, '').trim();

        // Optional: Replace single backslashes with double backslashes to escape characters
        // jsonString = jsonString.replace(/\\([^\\])/g, '\\\\$1');

        try {
            return JSON.parse(jsonString);
        } catch (err) {
            console.error("Failed to parse JSON:", err);
            console.error("Response received:", jsonString);
            return null;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formattedResume = `
        Projects and Participations:
        ${projects.trim()}

        Skills:
        ${skills.trim()}
        `;

        setResume(formattedResume);
        console.log("Projects and Skills Combined:", formattedResume);

        const inputPrompt = `Here are the details about my job and experience: 
                                Job Role / Position: ${jobRole}, 
                                Job Description / Tech Stack: ${jobDescription}, 
                                Years of Experience: ${jobExperience}, 
                                Projects and Skills: ${formattedResume}. 

                                Please generate 10 interview questions for the Full Stack Developer role, starting with an introduction question. Including the introduction, it should be a total of 11 questions. For each question, provide corresponding answers based on the details I've provided. The answers should reflect a person with ${jobExperience} years in this role. The complexity of both the questions and answers should be aligned with real-world interviews for someone at this experience level, with common questions that have been asked in previous interviews. Ensure that the answers are detailed but appropriate for someone with ${jobExperience} years in this job. 

                                The response should be in pure JSON format without any code fences or additional text.`;

        try {
            // Create a new chat session
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const chat = model.startChat();

            // Send the message and get the response
            const result = await chat.sendMessage(inputPrompt);
            const rawResponse = result.response.text();

            // Clean the response by removing code fences if present
            const cleanResponse = rawResponse.replace(/```json/, '').replace(/```/, '').trim();
            console.log("Cleaned AI Response:", cleanResponse);

            // Attempt to parse the JSON
            const jsonResponse = parseAIResponse(cleanResponse);
            setjsonrespnse(jsonResponse);
            if(jsonResponse)
            {
            const resp  = await db.insert(MockInterview)
            .values({
                mockId:uuidv4(),
                jsonMockresponse:jsonResponse,
                jobPosition:jobRole,
                jobDesc:jobDescription,
                jobExp:jobExperience,
                createdby :user?.primaryEmailAddress?.emailAddress,
                createdat : moment().format('DD-MM-YYYY'),
                Resume:formattedResume
            }).returning({mockId:MockInterview.mockId})

            console.log("Response from DB",resp);
            if(resp){
            
                setOpenDialog(false);
                router.push('/dashboard/inteview/'+resp[0]?.mockId)

            }
        else
        {
            console.log("getting error to insert.........");
        }
            if (jsonResponse) {
                console.log("Parsed JSON Response:", jsonResponse);
            } else {
                setError("Failed to parse the AI's response. Please try again.");
            }}
        } catch (error) {
            console.error("Error when calling Google Generative AI:", error);
            setError("There was an error generating the interview questions. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
          {/* Trigger Button with Improved CSS */}
          <div
            className="py-6 px-8 border-2 rounded-xl bg-blue-600 hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out mt-6 w-fit mx-auto"
            onClick={() => setOpenDialog(true)}
            >
            <h2 className="font-semibold text-xl text-white text-center">
                <span className="mr-2">+</span>  Add New Resume
            </h2>
            </div>
      
          {/* Dialog Component with Improved CSS */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-3xl mx-auto p-4">
              <DialogHeader className="flex justify-between items-center mb-4">
                <DialogTitle className="text-2xl font-bold">Tell Us About Your Experience</DialogTitle>
              </DialogHeader>
      
              {/* Form with Improved CSS */}
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Job Role / Position */}
                <div className="my-2">
                  <label className="font-bold mb-1 block">Job Role / Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(event) => setJobRole(event.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                </div>
      
                {/* Job Description / Tech Stack */}
                <div className="my-3">
                  <label className="font-bold mb-1 block">Job Description / Tech Stack</label>
                  <Textarea
                    placeholder="Ex. Angular, Python, etc."
                    required
                    onChange={(event) => setJobDescription(event.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                </div>
      
                {/* Years of Experience */}
                <div className="my-3">
                  <label className="font-bold mb-1 block">Years of Experience</label>
                  <Input
                    placeholder="Ex. 1, 2, 4 years"
                    required
                    onChange={(event) => setJobExperience(event.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                </div>
      
                {/* Projects and Participations */}
                <div className="my-3">
                  <label className="font-bold mb-1 block">Projects and Participations</label>
                  <Textarea
                    placeholder="Enter your project names and descriptions"
                    required
                    onChange={(event) => setProjects(event.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                </div>
      
                {/* Skills */}
                <div className="my-3">
                  <label className="font-bold mb-1 block">Skills</label>
                  <Textarea
                    placeholder="Enter the skills you have (e.g., Python, Java, communication, etc.)"
                    required
                    onChange={(event) => setSkills(event.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                </div>
      
                {/* Action Buttons with Improved CSS */}
                <div className="flex gap-5 justify-end mt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {loading? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating from AI...
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                    disabled={loading}
                    className="border border-gray-400 text-gray-600 font-bold py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                </div>
      
                {/* Error Message with Improved CSS */}
                {error && (
                  <div className="mt-4 text-red-500 font-bold">
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </DialogContent>
          </Dialog>
        </div>
      );
}

export default AddNewInterview;
