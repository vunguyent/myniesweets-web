import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import {
  CAKE_SIZE_SELECT_POPOVER_TYPE_CAKESIZE,
  CAKE_PRICE_BY_SIZES_ACTION_PUSH,
  CAKE_PRICE_BY_SIZES_ACTION_REMOVE
} from 'utilities/constants'
import { cloneDeep } from 'lodash'

function CakeSizeSelectPopver({ cakeSizes=[], type, priceBySizes, beforeUpdateCakePriceBySize }) {

  const [remakeCakeSizes, setRemakeCakeSizes] = useState([])

  useEffect(() => {
    if (Array.isArray(cakeSizes) && Array.isArray(priceBySizes) && type===CAKE_SIZE_SELECT_POPOVER_TYPE_CAKESIZE) {
      let sizes = []
      priceBySizes.map(priceBySize => sizes.push(priceBySize.sizeId))
      //console.log(sizes)
      let newRemakeCakeSizes = cloneDeep(cakeSizes)
      newRemakeCakeSizes.forEach(cakeSize => {
        if (sizes.includes(cakeSize._id)) {
          cakeSize['selected'] = true
        }
      })
      setRemakeCakeSizes(newRemakeCakeSizes)
    } else {
      setRemakeCakeSizes(cakeSizes)
    }
  }, [priceBySizes, cakeSizes, type])

  const handleClickCakeSize = (cakeSize) => {
    if (type === CAKE_SIZE_SELECT_POPOVER_TYPE_CAKESIZE) {
      let action = CAKE_PRICE_BY_SIZES_ACTION_PUSH
      if (cakeSize.selected) action = CAKE_PRICE_BY_SIZES_ACTION_REMOVE
      beforeUpdateCakePriceBySize (cakeSize._id, action)
    }
  }

  return (
    <Popover className="relative">
      <Popover.Button>
        <PlusCircleIcon className='w-6 h-6 text-mn-blue hover:text-mn-blue-hover font-semibold'/>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bg-slate-100 px-4 py-2 rounded-xl">
        <div>
          <span className='text-sm font-semibold text-red-400'>Click để chọn size</span>
        </div>
        <div className="grid mt-2 grid-cols-1 sm:grid-cols-2 gap-1">
          { remakeCakeSizes.map(( cakeSize, index ) => (
            <div key={index} className={`inline-flex items-center rounded-full  px-3 py-0.5 text-sm font-medium  ${cakeSize.selected ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-800'}`}
              onClick={() => handleClickCakeSize(cakeSize)}
            >
              {cakeSize.name}
              {cakeSize.selected && <CheckIcon className='ml-1 w-4 h-4 text-green-600 font-bold'/>}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default CakeSizeSelectPopver