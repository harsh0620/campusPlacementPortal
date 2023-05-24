import React from 'react'
import CompanyViewComp from './CompanyViewComp'
import { useAppContext } from '../../context/appContext';

const CompanyViewHrComp = () => {
    const { specificCompany } = useAppContext();
    return (
        <div className="flex flex-col">
        <div className={`flex flex-col items-start p-2`}>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                <div>
                    <p className="text-gray-700 font-medium">HR Name:</p>
                    <p>{specificCompany?.hr?.name}</p>
                </div>
                <div>
                    <p className="text-gray-700 font-medium">HR Email:</p>
                    <p>{specificCompany?.hr?.email}</p>
                </div>
                <div>
                    <p className="text-gray-700 font-medium">HR Phone:</p>
                    <p>{specificCompany?.hr?.phone}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

const CompanyViewHr = () => {
  return (
    <div>
    <CompanyViewComp
      title="Hr Details"
      viewComponent={<CompanyViewHrComp />}
    />
  </div>
  )
}

export default CompanyViewHr