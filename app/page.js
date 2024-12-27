"use client";

import { Button } from "../@/components/ui/button";
import { ArrowRight, Brain, Video, FileText, LineChart } from "lucide-react";
import Link from "next/link";
import { Navbar } from "../components/sections/navbar";
// import {Header} from "./dashboard/_components/Header";
import { Hero } from "../components/sections/hero";
// import { Footer } from "../components/layout/footer";
// import  { Features } from "../components/sections/features";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
          <div className="mb-16"> <Navbar /></div>
          <div> <Hero /></div>

          
          
          {/* <Header /> */}
          

          {/* <Features /> */}
          {/* <Footer/> */}

    </main>


    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    
    
      
    //   {/* Hero Section */}
    //   <section className="relative py-20 lg:py-32">
    //     <div className="container mx-auto px-6">
    //       <div className="flex flex-col lg:flex-row items-center gap-12">
    //         <div className="flex-1 text-center lg:text-left">
    //           <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
    //             Master Your Interviews with{" "}
    //             <span className="text-blue-600">AI Assistant</span>
    //           </h1>
    //           <p className="text-lg text-gray-600 mb-8">
    //             Practice technical interviews with real-time AI feedback, video recording, 
    //             and personalized questions based on your resume and experience level.
    //           </p>
    //           <Link href="/dashboard">
    //             <Button size="lg" className="animate-pulse bg-blue-600 hover:bg-blue-700 text-white">
    //               Start Practicing Now
    //               <ArrowRight className="ml-2 h-5 w-5" />
    //             </Button>
    //           </Link>
    //         </div>
    //         <div className="flex-1">
    //           <div className="relative">
    //             <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20" />
    //             <img
    //               src="/interview-mock.svg" 
    //               alt="Interview Practice"
    //               className="relative rounded-lg shadow-2xl"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Features Grid */}
    //   <section className="py-20">
    //     <div className="container mx-auto px-6">
    //       <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
    //         Powerful Features for Interview Success
    //       </h2>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         <FeatureCard
    //           icon={<Video className="w-8 h-8 text-blue-500" />}
    //           title="Real-time Video"
    //           description="Practice with webcam recording and instant speech-to-text conversion"
    //         />
    //         <FeatureCard
    //           icon={<Brain className="w-8 h-8 text-indigo-500" />}
    //           title="AI Feedback"
    //           description="Get detailed analysis and scoring of your interview responses"
    //         />
    //         <FeatureCard
    //           icon={<LineChart className="w-8 h-8 text-green-500" />}
    //           title="Progress Tracking"
    //           description="Monitor your improvement over time with detailed analytics"
    //         />
    //         <FeatureCard
    //           icon={<FileText className="w-8 h-8 text-purple-500" />}
    //           title="Resume Analysis"
    //           description="Get personalized questions based on your resume"
    //         />
    //       </div>
    //     </div>
    //   </section>

    //   {/* CTA Section */}
    //   <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
    //     <div className="container mx-auto px-6 text-center text-white">
    //       <h2 className="text-3xl lg:text-4xl font-bold mb-8">
    //         Ready to Excel in Your Next Interview?
    //       </h2>
    //       <p className="text-xl mb-8 text-blue-100">
    //         Join thousands of developers who have improved their interview skills with our platform
    //       </p>
    //       <Link href="/dashboard">
    //         <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
    //           Get Started Free
    //           <ArrowRight className="ml-2 h-5 w-5" />
    //         </Button>
    //       </Link>
    //     </div>
    //   </section>

    //   <Footer />
    // </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}