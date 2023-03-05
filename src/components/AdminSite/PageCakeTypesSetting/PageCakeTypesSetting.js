import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout'
import { PlusIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from 'components/Common/LoadingSpinner'
import CreateCakeTypeModal from './CreateNewCakeTypeModal'
import ActiveCakeTypeSettingModal from './ActiveCakeTypeSettingModal'

import { selectCurrentActiveCakeTypeSetting } from 'redux/activeCakeTypeSetting/activeCakeTypeSettingSlice'

import {
  createNewCakeTypeAPI
} from 'actions/ApiCall'
import { useSelector, useDispatch } from 'react-redux'
import ListCakeTypeSetting from '../ListCakeTypeSetting/ListCakeTypeSetting'
import { fetchListCakeTypesAPI, selectCurrentListCakeType } from 'redux/listCakeType/listCakeTypeSlice'

function PageCakeTypesSetting() {
  const dispatch = useDispatch()
  const [showCreateCakeTypeModal, setShowCreateCakeTypeModal] = useState(false)
  const cakeTypes = useSelector(selectCurrentListCakeType)
  //const [cakeTypes, setCakeTypes] = useState([])

  const currentActiveCakeTypeSetting = useSelector(selectCurrentActiveCakeTypeSetting)

  useEffect(() => {
    dispatch(fetchListCakeTypesAPI())
  }, [dispatch])

  const createNewCakeType = async (cakeTypeData) => {
    try {
      // Gọi API tạo mới 1 caketype
      await createNewCakeTypeAPI(cakeTypeData)
      // fetch lại danh sách
      dispatch(fetchListCakeTypesAPI())
    } catch (error) {
      return error
    }
  }

  const onUpdateCakeTypeState = (newCakeTypeToUpdate) => {
    const cakeTypeIdToUpdate = newCakeTypeToUpdate._id
    let newCakeTypes = [...cakeTypes]
    const cakeTypeIndexToUpdate = newCakeTypes.findIndex(i => i._id === cakeTypeIdToUpdate)

    if (newCakeTypeToUpdate._destroy) {
      // remove column
      newCakeTypes.splice(cakeTypeIndexToUpdate, 1)
    } else {
      // update column info
      newCakeTypes.splice(cakeTypeIndexToUpdate, 1, newCakeTypeToUpdate)
    }

    dispatch(fetchListCakeTypesAPI())
  }

  return (
    <DashboardLayout>
      {currentActiveCakeTypeSetting && <ActiveCakeTypeSettingModal/>}
      <CreateCakeTypeModal
        show={showCreateCakeTypeModal}
        onClose={() => setShowCreateCakeTypeModal(false)}
        onCreateNewCakeType = { createNewCakeType }
      />
      <div className="px-2 lg:px-16 pb-12 lg:pb-16">
        <div className="flex items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Danh mục loại sản phẩm</h1>
        </div>
        <div className='mt-4'>
          <div className="bg-white rounded-xl mx-auto">
            <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
              <button
                className="mb-4 inline-flex items-center rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700"
                onClick={() => setShowCreateCakeTypeModal(true)}
              >
                Thêm mới
                <PlusIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
              </button>
              {!cakeTypes
                ? <LoadingSpinner caption="Loading ..."/>
                : isEmpty(cakeTypes)
                  ?<div>Chưa có danh mục</div>
                  : <>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      <ListCakeTypeSetting
                        cakeTypes = {cakeTypes}
                        onUpdateCakeTypeState = {onUpdateCakeTypeState}
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

export default PageCakeTypesSetting