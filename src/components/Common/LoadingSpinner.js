import React from 'react'

function LoadingSpinner({ caption }) {
  return (
    <div className="loading-progress">
      <p className='flex'>{caption ? caption : 'Đang nướng bánh…'}</p>
    </div>
  )
}

export default LoadingSpinner