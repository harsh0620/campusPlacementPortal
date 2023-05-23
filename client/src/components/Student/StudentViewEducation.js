import React from 'react'
import { useAppContext } from '../../context/appContext';
import StudentViewComp from './StudentViewComp';

const StudentViewEducationComp = () => {
    const {specificStudent}=useAppContext();
    const {academicDetails}=specificStudent;
    return (
        <div className='flex flex-col'>
            {academicDetails?.map((academicDetail,index)=>(
                <div key={index} className={`flex flex-col items-start ${index+1!==academicDetails?.length && "border-b"} p-2`}>
                    <h1 className='text-xl font-bold'>{academicDetail?.institute}</h1>
                        <h1 className='text-md font-bold text-gray-700'>{academicDetail?.board}</h1>
                        <h1 className='text-md font-bold text-gray-700'>{academicDetail?.degree} - {academicDetail?.specialization}</h1>
                    <div className='text-sm text-gray-500'>{academicDetail?.yearOfPassing}</div>
                    <div className='text-sm text-gray-500'>{academicDetail?.result?.option}:{academicDetail?.result?.value}</div>
                    <div className='text-sm text-gray-500'>{academicDetail?.jobDescription}</div>
                </div>
            ))}
        </div>
    )
}     
const StudentViewEducation = () => {
  return (
    <div>
    <StudentViewComp title="Education" viewComponent={<StudentViewEducationComp/>}/>
  </div>
  )
}

export default StudentViewEducation