import React from 'react'
import StudentViewHeader from './StudentViewHeader'
import { useParams } from 'react-router-dom';

const StudentView = () => {
    const params=useParams();
    const {id}=params;
    console.log(id);
  return (
    <div>
        <StudentViewHeader/>
    </div>
  )
}

export default StudentView