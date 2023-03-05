import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import {
  CAKE_STYLE_SELECT_POPOVER_TYPE_CAKESTYLE,
  CAKE_STYLE_IDS_ACTION_PUSH,
  CAKE_STYLE_IDS_ACTION_REMOVE
} from 'utilities/constants'
import { cloneDeep } from 'lodash'

function CakeStyleSelectPopver({ cakeStyles=[], type, cakeStyleIds, beforeUpdateCakeCakeStyle }) {

  const [remakeCakeStyles, setRemakeCakeStyles] = useState([])

  useEffect(() => {
    if (Array.isArray(cakeStyles) && Array.isArray(cakeStyleIds) && type===CAKE_STYLE_SELECT_POPOVER_TYPE_CAKESTYLE) {
      //
      let newRemakeCakeStyles = cloneDeep(cakeStyles)
      newRemakeCakeStyles.forEach(cakeStyle => {
        if (cakeStyleIds.includes(cakeStyle._id)) {
          cakeStyle['selected'] = true
        }
      })
      setRemakeCakeStyles(newRemakeCakeStyles)
    } else {
      setRemakeCakeStyles(cakeStyles)
    }
  }, [cakeStyleIds, cakeStyles, type])

  const handleClickCakeStyle = (cakeStyle) => {
    if (type === CAKE_STYLE_SELECT_POPOVER_TYPE_CAKESTYLE) {
      let action = CAKE_STYLE_IDS_ACTION_PUSH
      if (cakeStyle.selected) action = CAKE_STYLE_IDS_ACTION_REMOVE
      //let action = 'CARD_MEMBER_ACTION_PUSH'
      beforeUpdateCakeCakeStyle (cakeStyle._id, action)
    }
  }

  return (
    <Popover className="relative">
      <Popover.Button>
        <PlusCircleIcon className='w-6 h-6 text-mn-blue hover:text-mn-blue-hover font-semibold'/>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bg-slate-100 px-4 py-2 rounded-xl">
        <div>
          <span className='text-sm font-semibold text-red-400'>Click để chọn mẫu sản phẩm</span>
        </div>
        <div className="grid mt-2 grid-cols-1 sm:grid-cols-2 gap-1">
          { remakeCakeStyles.map(( cakeStyle, index ) => (
            <div key={index} className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
              onClick={() => handleClickCakeStyle(cakeStyle)}
            >
              <svg className={`-ml-1 mr-1.5 h-2 w-2 ${cakeStyle.status ? 'text-green-400' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
              </svg>
              {cakeStyle.title}
              {cakeStyle.selected && <CheckIcon className='ml-1 w-4 h-4 text-green-600 font-bold'/>}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default CakeStyleSelectPopver