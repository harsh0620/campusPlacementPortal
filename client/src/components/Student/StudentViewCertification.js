import React from 'react'
import StudentViewComp from './StudentViewComp'
import { useAppContext } from '../../context/appContext';

const StudentViewCertificationComp = () => {
    const {specificStudent}=useAppContext();
    const {certifications}=specificStudent?.professionalDetails;
    return (
        <div className='flex flex-col'>
            {certifications?.map((certification,index)=>(
            <div className={`flex flex-col items-start p-2 ${index+1!==certifications?.length && "border-b"}`} key={index}>
                <h1 className='text-xl font-bold'>{certification?.certificationName}</h1>
                <div className='text-sm text-gray-500'>Issued by: {certification?.certificationAuthority}</div>
                <div className='text-sm text-gray-500'>Credential URL: <a href={certification?.certificationLink} target='__blank' className='text-blue-500'>{certification?.certificationLink}</a></div>
            </div>
            ))}
        </div>
    )
}

const StudentViewCertification = () => {
  return (
    <div>
    <StudentViewComp
      title="Certifications"
      viewComponent={<StudentViewCertificationComp />}
    />
  </div>
  )
}

export default StudentViewCertification