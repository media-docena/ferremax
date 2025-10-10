import React from 'react';

function DetailFieldTitle({ label, value, statusBadge = null }) {
  return (
    <div>
      <label className='block text-sm font-roboto font-medium text-gray-500'>
        {label}
      </label>
      {
        statusBadge ? (
          statusBadge
        ) : (
          <p className='mt-1 text-sm text-gray-900'>{value}</p>
        )
      }
      
    </div>
  );
}

export default DetailFieldTitle;
