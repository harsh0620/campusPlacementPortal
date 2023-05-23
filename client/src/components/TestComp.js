import React from 'react';

const TestComp = () => {
  const personalData = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Title', value: 'Software Engineer' },
    { label: 'Location', value: 'San Francisco, CA' },
    { label: 'Email', value: 'john.doe@example.com' },
    { label: 'Phone', value: '+1 123-456-7890' },
    // Add more personal data fields as needed
  ];

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <ul>
        {personalData.map((data) => (
          <li key={data.label} className="mb-2">
            <span className="text-gray-500 font-medium">{data.label}: </span>
            <span className="text-gray-700">{data.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestComp;
