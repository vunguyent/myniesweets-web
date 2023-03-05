import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout'
import { PlusIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from 'components/Common/LoadingSpinner'
import CreateCakeStyleModal from './CreateNewCakeStyleModal'
import ActiveCakeStyleSettingModal from './ActiveCakeStyleSettingModal'

import { selectCurrentActiveCakeStyleSetting } from 'redux/activeCakeStyleSetting/activeCakeStyleSettingSlice'

import {
  createNewCakeStyleAPI
} from 'actions/ApiCall'
import { useSelector, useDispatch } from 'react-redux'
import ListCakeStyleSetting from '../ListCakeStyleSetting/ListCakeStyleSetting'
import { fetchListCakeStylesAPI, selectCurrentListCakeStyle } from 'redux/listCakeStyle/listCakeStyleSlice'

function PageCakeStylesSetting() {
  const dispatch = useDispatch()
  const [showCreateCakeStyleModal, setShowCreateCakeStyleModal] = useState(false)
  const cakeStyles = useSelector(selectCurrentListCakeStyle)

  const currentActiveCakeStyleSetting = useSelector(selectCurrentActiveCakeStyleSetting)

  useEffect(() => {
    dispatch(fetchListCakeStylesAPI())
  }, [dispatch])

  const createNewCakeStyle = async (cakeStyleData) => {
    try {
      // Gọi API tạo mới 1 caketype
      await createNewCakeStyleAPI(cakeStyleData)
      // fetch lại danh sách
      dispatch(fetchListCakeStylesAPI())
    } catch (error) {
      return error
    }
  }

  const onUpdateCakeStyleState = (newCakeStyleToUpdate) => {
    const cakeStyleIdToUpdate = newCakeStyleToUpdate._id
    let newCakeStyles = [...cakeStyles]
    const cakeStyleIndexToUpdate = newCakeStyles.findIndex(i => i._id === cakeStyleIdToUpdate)

    if (newCakeStyleToUpdate._destroy) {
      newCakeStyles.splice(cakeStyleIndexToUpdate, 1)
    } else {
      newCakeStyles.splice(cakeStyleIndexToUpdate, 1, newCakeStyleToUpdate)
    }

    dispatch(fetchListCakeStylesAPI())
  }

  return (
    <DashboardLayout>
      {currentActiveCakeStyleSetting && <ActiveCakeStyleSettingModal/>}
      <CreateCakeStyleModal
        show={showCreateCakeStyleModal}
        onClose={() => setShowCreateCakeStyleModal(false)}
        onCreateNewCakeStyle = { createNewCakeStyle }
      />
      <div className="px-2 lg:px-16 pb-12 lg:pb-16">
        <div className="flex items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Danh mục mẫu sản phẩm</h1>
        </div>
        <div className='mt-4'>
          <div className="bg-white rounded-xl mx-auto">
            <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
              <button
                className="mb-4 inline-flex items-center rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700"
                onClick={() => setShowCreateCakeStyleModal(true)}
              >
                Thêm mới
                <PlusIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
              </button>
              {!cakeStyles
                ? <LoadingSpinner caption="Loading ..."/>
                : isEmpty(cakeStyles)
                  ?<div>Chưa có danh mục</div>
                  : <>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      <ListCakeStyleSetting
                        cakeStyles = {cakeStyles}
                        onUpdateCakeStyleState = {onUpdateCakeStyleState}
                      />
                    </div>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PageCakeStylesSetting