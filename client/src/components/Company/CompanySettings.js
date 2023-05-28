import React from 'react'
import ActionCard from '../ActionCard'
import { RiKeyFill } from 'react-icons/ri'
import UpdatePasswordForm from '../UpdatePasswordForm'
import { FaUser } from 'react-icons/fa'
import CompanyProfileForm from './CompanyProfileForm'

const CompanySettings = () => {
  return (
    <div className="bg-white w-full pb-24">
   
       <ActionCard
        title={"Update Profile"}
        bgColor={"bg-blue-500"}
        icon={<FaUser />}
        dropDownComponent={<CompanyProfileForm />}
      />
      <ActionCard
        title={"Update Password"}
        bgColor={"bg-red-500"}
        icon={<RiKeyFill />}
        dropDownComponent={<UpdatePasswordForm />}
      />

    </div>
  )
}

export default CompanySettings