import React from 'react'
import StudentViewComp from './StudentViewComp'
import { useAppContext } from '../../context/appContext';

const StudentViewLinkComp = () => {
    const {specificStudent}=useAppContext();
const {links}=specificStudent?.professionalDetails;
    return (
        <div className="flex flex-col">
        {links?.map((link, index) => (
          <a className={`flex flex-col items-start ${index+1!==links?.length && "border-b"} p-2 text-blue-500`} key={index} href={link}>
            {link}
        </a>
        ))}
        </div>
    )
}

const StudentViewLink = () => {
  return (
    <div>
      <StudentViewComp
        title="Links"
        viewComponent={<StudentViewLinkComp />}
      />
    </div>
  )
}

export default StudentViewLink