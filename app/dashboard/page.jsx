'use client';

import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import AddNewInterview from './_components/addNewInterview';
import InterviewList from './_components/InterviewList' ;
import { BookOpen, Users, TrendingUp, Target, Clock, Award, Brain } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto mt-5  ">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 flex flex-col">
        {/* Header Section - Compact */}
        <div className="relative mb-6">
          <div className="absolute top-0 right-0 flex items-center space-x-3 hidden md:flex">
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
              {user && (
                <div className="ml-2 flex flex-col text-gray-900 font-medium hover:bg-gray-100 rounded-md p-2 transition-colors duration-200">
                  <span className="text-sm">{user.firstName} {user.lastName}</span>
                  <span className="text-xs text-gray-600">{user.email}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gray-700" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Your Interview Workspace
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Add New Interview Card */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <AddNewInterview />
            </div>
            
            {/* Enhanced Stats Grid */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Practice Mode</h3>
                  <p className="text-xs text-gray-600">Real-time feedback sessions</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Progress Tracking</h3>
                  <p className="text-xs text-gray-600">Monitor your improvement</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Skill Analysis</h3>
                  <p className="text-xs text-gray-600">Personalized feedback</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Time Management</h3>
                  <p className="text-xs text-gray-600">Response timing practice</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Award className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Performance Score</h3>
                  <p className="text-xs text-gray-600">Detailed evaluation metrics</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Brain className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">AI Assistance</h3>
                  <p className="text-xs text-gray-600">Smart interview guidance</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Your Resources</h3>
                  <p className="text-xs text-gray-600">Access your interview materials</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center and Right Column */}
          <div className="col-span-1 sm:col-span-2 grid grid-rows-2 gap-6">
            {/* Image Section */}
            {/* <div className="bg-gray-50 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80"
                alt="AI Interview Assistant"
                className="w-full h-full object-cover"
              />
            </div> */}

            {/* Interview List Section */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Sessions
              </h2>
              <div className="h-[calc(100%-2rem)] overflow-auto">
                <InterviewList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;