import React from 'react'
import StudentViewComp from './StudentViewComp'
import { useAppContext } from '../../context/appContext'

const StudentViewExperienceComp = () => {
    const {specificStudent}=useAppContext();
    const {experiences}=specificStudent?.professionalDetails;
    return (
        <div className='flex flex-col'>
            {experiences?.map((experience,index)=>(
                <div key={index} className={`flex flex-col items-start ${index+1!==experiences?.length && "border-b"} p-2`}>
                    <h1 className='text-xl font-bold'>{experience?.designation}</h1>
                        <h1 className='text-md font-bold text-gray-700'>{experience?.companyName}</h1>
                    <div className='text-sm text-gray-500'>{new Date(experience?.from).toLocaleDateString()} - {new Date(experience?.to).toLocaleDateString()} &bull; {experience?.duration} months</div>
                    <div className='text-sm text-gray-500'>{experience?.location}</div>
                    <div className='text-sm text-gray-500'>{experience?.jobDescription}</div>
                </div>
            ))}
        </div>
    )
}
const StudentViewExperience = () => {
  return (
    <div>
    <StudentViewComp title="Experience" viewComponent={<StudentViewExperienceComp/>}/>
  </div>
  )
}

export default StudentViewExperience