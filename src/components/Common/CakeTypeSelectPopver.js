import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import {
  CAKE_TYPE_SELECT_POPOVER_TYPE_CAKETYPE,
  CAKE_TYPE_IDS_ACTION_PUSH,
  CAKE_TYPE_IDS_ACTION_REMOVE
} from 'utilities/constants'
import { cloneDeep } from 'lodash'

function CakeTypeSelectPopver({ cakeTypes=[], type, cakeTypeIds, beforeUpdateCakeCakeType }) {

  const [remakeCakeTypes, setRemakeCakeTypes] = useState([])

  useEffect(() => {
    if (Array.isArray(cakeTypes) && Array.isArray(cakeTypeIds) && type===CAKE_TYPE_SELECT_POPOVER_TYPE_CAKETYPE) {
      //
      let newRemakeCakeTypes = cloneDeep(cakeTypes)
      newRemakeCakeTypes.forEach(cakeType => {
        if (cakeTypeIds.includes(cakeType._id)) {
          cakeType['selected'] = true
        }
      })
      setRemakeCakeTypes(newRemakeCakeTypes)
    } else {
      setRemakeCakeTypes(cakeTypes)
    }
  }, [cakeTypeIds, cakeTypes, type])

  const handleClickCakeType = (cakeType) => {
    if (type === CAKE_TYPE_SELECT_POPOVER_TYPE_CAKETYPE) {
      let action = CAKE_TYPE_IDS_ACTION_PUSH
      if (cakeType.selected) action = CAKE_TYPE_IDS_ACTION_REMOVE
      //let action = 'CARD_MEMBER_ACTION_PUSH'
      beforeUpdateCakeCakeType (cakeType._id, action)
    }
  }

  return (
    <Popover className="relative">
      <Popover.Button>
        <PlusCircleIcon className='w-6 h-6 text-mn-blue hover:text-mn-blue-hover font-semibold'/>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bg-slate-100 px-4 py-2 rounded-xl">
        <div>
          <span className='text-sm font-semibold text-red-400'>Click để chọn loại sản phẩm</span>
        </div>
        <div className="grid mt-2 grid-cols-1 sm:grid-cols-2 gap-1">
          { remakeCakeTypes.map(( cakeType, index ) => (
            <div key={index} className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
              onClick={() => handleClickCakeType(cakeType)}
            >
              <svg className={`-ml-1 mr-1.5 h-2 w-2 ${cakeType.status ? 'text-green-400' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
              </svg>
              {cakeType.title}
              {cakeType.selected && <CheckIcon className='ml-1 w-4 h-4 text-green-600 font-bold'/>}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default CakeTypeSelectPopver