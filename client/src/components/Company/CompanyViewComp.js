import React from 'react'

const CompanyViewComp = ({title,viewComponent}) => {
  return (
    <div className="bg-white p-6 shadow rounded-lg mt-4 mb-2">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className='mt-2'>{viewComponent}</div>
    </div>
  )
}

export default CompanyViewComp