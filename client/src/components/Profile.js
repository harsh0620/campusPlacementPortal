import React from 'react'
import { useAppContext } from '../context/appContext';
import AdminProfile from './Admin/AdminProfile';
import StudentProfile from './Student/StudentProfile';
import CompanyProfile from './Company/CompanyProfile';

const Profile = () => {
    const {user}=useAppContext();
  return (
    <div>
        {user?.role==="admin" && <AdminProfile/>}
        {user?.role==="student" && <StudentProfile/>}
        {user?.role==="company" && <CompanyProfile/>}
    </div>
  )
}

export default Profile