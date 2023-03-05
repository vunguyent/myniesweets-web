import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout'
import { PlusIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from 'components/Common/LoadingSpinner'
import CreateCakeModal from './CreateNewCakeModal'
import ActiveCakeSettingModal from './ActiveCakeSettingModal'

import { selectCurrentActiveCakeSetting } from 'redux/activeCakeSetting/activeCakeSettingSlice'

import {
  createNewCakeAPI
} from 'actions/ApiCall'
import { useSelector, useDispatch } from 'react-redux'
import ListCakeSetting from '../ListCakeSetting/ListCakeSetting'
import { fetchListCakesAPI, selectCurrentListCake } from 'redux/listCake/listCakeSlice'
import { fetchListCakeTypesAPI, selectCurrentListCakeType } from 'redux/listCakeType/listCakeTypeSlice'
import { fetchListGeneralCakeDatasAPI, selectListCakeSizes } from 'redux/listGeneralCakeData/listGeneralCakeDataSlice'
import { fetchListCakeStylesAPI } from 'redux/listCakeStyle/listCakeStyleSlice'
import { selectCurrentListCakeStyle } from 'redux/listCakeStyle/listCakeStyleSlice'

function PageCakesSetting() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListCakesAPI())
    dispatch(fetchListCakeTypesAPI())
    dispatch(fetchListCakeStylesAPI())
    dispatch(fetchListGeneralCakeDatasAPI())
  }, [dispatch])

  const [showCreateCakeModal, setShowCreateCakeModal] = useState(false)
  const currentActiveCakeSetting = useSelector(selectCurrentActiveCakeSetting)
  const cakes = useSelector(selectCurrentListCake)
  const cakeTypes = useSelector(selectCurrentListCakeType)
  const cakeStyles = useSelector(selectCurrentListCakeStyle)
  const cakeSizes = useSelector(selectListCakeSizes)
  const createNewCake = async (cakeData) => {
    try {
      // Gọi API tạo mới 1 caketype
      await createNewCakeAPI(cakeData)
      // fetch lại danh sách
      dispatch(fetchListCakesAPI())
    } catch (error) {
      return error
    }
  }

  const onUpdateCakeState = (newCakeToUpdate) => {
    const cakeIdToUpdate = newCakeToUpdate._id
    let newCakes = [...cakes]
    const cakeIndexToUpdate = newCakes.findIndex(i => i._id === cakeIdToUpdate)

    if (newCakeToUpdate._destroy) {
      newCakes.splice(cakeIndexToUpdate, 1)
    } else {
      newCakes.splice(cakeIndexToUpdate, 1, newCakeToUpdate)
    }

    dispatch(fetchListCakesAPI())
  }

  return (
    <DashboardLayout>
      {currentActiveCakeSetting &&
        <ActiveCakeSettingModal
          cakeTypes = {cakeTypes}
          cakeStyles = {cakeStyles}
          cakeSizes = {cakeSizes}
        />
      }
      <CreateCakeModal
        show={showCreateCakeModal}
        onClose={() => setShowCreateCakeModal(false)}
        onCreateNewCake = { createNewCake }
      />
      <div className="px-2 lg:px-16 pb-12 lg:pb-16">
        <div className="flex items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Danh mục sản phẩm</h1>
        </div>
        <div className='mt-4'>
          <div className="bg-white rounded-xl mx-auto">
            <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
              <button
                className="mb-4 inline-flex items-center rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700"
                onClick={() => setShowCreateCakeModal(true)}
              >
                Thêm mới
                <PlusIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
              </button>
              {!cakes
                ? <LoadingSpinner caption="Loading ..."/>
                : isEmpty(cakes)
                  ?<div>Chưa có sản phẩm</div>
                  : <>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      <ListCakeSetting
                        cakes = {cakes}
                        onUpdateCakeState = {onUpdateCakeState}
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

export default PageCakesSetting