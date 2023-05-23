import React from 'react'
import StudentViewComp from './StudentViewComp'
import { useAppContext } from '../../context/appContext';

const StudentViewSkillComp = () => {
    const {specificStudent}=useAppContext();
    const {skills}=specificStudent?.professionalDetails;
    return (
        <div className='flex sm:flex-row flex-col'>
            {skills?.map((skill,index)=>(
            <div className={`grid sm:grid-cols-4 grid-cols-2 gap-2 text-md`} key={index}>
                {skill}
            </div>
            ))}
        </div>
    )
}
const StudentViewSkill = () => {
  return (
    <div>
    <StudentViewComp title="Skills" viewComponent={<StudentViewSkillComp/>}/>
  </div>
  )
}

export default StudentViewSkill