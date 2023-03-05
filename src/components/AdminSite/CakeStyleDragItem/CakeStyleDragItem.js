import React from 'react'

function CakeStyleDragItem( props ) {
  const { cakeStyle } = props

  return (
    <>
      <div key={cakeStyle.title} className='flex items-center w-full justify-between px-2 md:px-4 py-2 my-2 border rounded-2xl bg-white'>
        <div className="flex">
          <img className="h-12 w-12 rounded-xl" src={cakeStyle.cover} alt="IMAGE" />
        </div>
        <div className='flex cursor-pointer'>
          <p className="truncate text-sm text-gray-500 font-medium">{cakeStyle.title}</p>
        </div>
        <div className="flex items-center">
          {cakeStyle.status &&
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
              Active
            </span>
          }
          {!cakeStyle.status &&
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
              Inactive
            </span>
          }
        </div>
      </div>
    </>
  )
}

export default CakeStyleDragItem
