import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/addNewInterview'
import InterviewList from './_components/InterviewList'
function Dashboard() {
  return (
    <div className="p-10">
          <h2  className='font-bold text-2xl'>Welcome ! you are in the way of building something crazy..........!</h2>
          <h2 className='text-gray-500'>Create and start your first mockupp interview</h2>

          <div className='grid grid-cols-1 md:frid-cols-3 my-5'>
            <AddNewInterview />
            </div>
          {/* Previous Interview List  */}
          <InterviewList/>
          
    </div>
  );
}

export default Dashboard;