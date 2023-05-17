import React from 'react'

const StudentViewHeader = () => {
  return (
    <div className='shadow bg-white w-full rounded-xl flex flex-col'>
        {/* //Details Section */}
        <div className='flex flex-row justify-between items-center p-4'>
            <div className='flex flex-col'>
                <div className='text-2xl font-bold'>Student Name</div>
                <div className='text-lg font-medium'>Enrollment No.</div>
            </div>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <div className='text-lg font-medium'>Stream</div>
                    <div className='text-lg font-medium'>Year of Passing</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentViewHeader