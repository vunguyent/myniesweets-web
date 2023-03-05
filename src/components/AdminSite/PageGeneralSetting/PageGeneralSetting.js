import React, { useEffect, useState, useRef, Fragment } from 'react'
import { isEmpty } from 'lodash'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout'
import { PlusIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from 'components/Common/LoadingSpinner'

import {
  fetchListGeneralCakeDatasAPI,
  selectListGeneralCakeData,
  updateCurrentListGeneralCakeData
}
  from 'redux/listGeneralCakeData/listGeneralCakeDataSlice'

import GeneralCakeDataSetting from './GeneralCakeDataSetting/GeneralCakeDataSetting'

import { SIZE, SPONGE_TASTE, JAM_TASTE } from 'utilities/constants'
import { useDispatch, useSelector } from 'react-redux'
import { createNewGeneralCakeDataAPI } from 'actions/ApiCall'

const generalDatas = [
  { id: 1, name: 'SIZE', show: 'Size bánh' },
  { id: 2, name: 'SPONGE_TASTE', show: 'Vị bánh bông lan' },
  { id: 3, name: 'JAM_TASTE', show: 'Vị mứt' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PageGeneralSetting() {
  const dispatch = useDispatch()
  const [selectedType, setSelectedType] = useState(generalDatas[0])
  const [openNewDataForm, setOpenNewDataForm] = useState(false)
  const toggleOpenNewDataForm = () => setOpenNewDataForm(!openNewDataForm)
  const newDataTitleInputRef = useRef(null)
  const [newDataTitle, setNewDataTitle] = useState('')
  const newDataTitleChange = (e) => setNewDataTitle(e.target.value)

  const generalCakeDatas = useSelector(selectListGeneralCakeData)

  useEffect(() => {
    dispatch(fetchListGeneralCakeDatasAPI())
  }, [dispatch])

  useEffect(() => {
    if (newDataTitleInputRef && newDataTitleInputRef.current) {
      newDataTitleInputRef.current.focus()
      newDataTitleInputRef.current.select()
    }
  }, [openNewDataForm])

  const addNewData = () => {
    if (!newDataTitle) {
      newDataTitleInputRef.current.focus()
      return
    }
    const newGeneralCakeDataToAdd = {
      type: selectedType.name,
      name: newDataTitle
    }
    createNewGeneralCakeDataAPI(newGeneralCakeDataToAdd).then(generalCakeData => {
      let newGeneralCakeDatas = [ ...generalCakeDatas ]
      newGeneralCakeDatas.push(generalCakeData)
      dispatch(updateCurrentListGeneralCakeData(newGeneralCakeDatas))
      setNewDataTitle('')
      toggleOpenNewDataForm()
    })
  }

  const onUpdateGeneralCakeDataState = (newGeneralCakeDataToUpdate) => {
    const generalCakeDataIdToUpdate = newGeneralCakeDataToUpdate._id

    let newGeneralCakeDatas = [...generalCakeDatas]
    const generalCakeDataIndexToUpdate = newGeneralCakeDatas.findIndex(i => i._id === generalCakeDataIdToUpdate)

    if (newGeneralCakeDataToUpdate._destroy) {
      // remove column
      newGeneralCakeDatas.splice(generalCakeDataIndexToUpdate, 1)
    } else {
      // update column info
      newGeneralCakeDatas.splice(generalCakeDataIndexToUpdate, 1, newGeneralCakeDataToUpdate)
    }

    dispatch(updateCurrentListGeneralCakeData(newGeneralCakeDatas))
  }


  return (
    <DashboardLayout>
      <div className="px-2 lg:px-16 pb-12 lg:pb-16">
        <div className="flex items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Danh mục chung</h1>
        </div>
        <div className='mt-4'>
          <div className='grid grid-cols-1 mb-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-x-2 xl:gap-x-8 sm:gap-y-2 xl:gap-y-8'>
            { !openNewDataForm &&
            <div>
              <button
                className="items-center rounded-md border border-transparent bg-mn-blue px-1 py-1 text-sm font-medium leading-4 text-white shadow-sm hover:bg-mn-blue-hover"
                onClick={toggleOpenNewDataForm}
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            }
            { openNewDataForm &&
            <div>
              <div className='grid space-y-2'>
                <Listbox value={selectedType} onChange={setSelectedType} className="block w-full">
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-sm font-medium text-gray-700">Chọn loại danh mục</Listbox.Label>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-mn-blue focus:outline-none focus:ring-1 focus:ring-mn-blue sm:text-sm">
                          <span className="block truncate">{selectedType.show}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {generalDatas.map((data) => (
                              <Listbox.Option
                                key={data.id}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'text-white bg-mn-blue-hover' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                  )
                                }
                                value={data}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                      {data.show}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active ? 'text-white' : 'text-mn-blue',
                                          'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                      >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>

                <input
                  type="text"
                  placeholder='Nhập tên danh mục'
                  ref={newDataTitleInputRef}
                  value={newDataTitle}
                  onChange={newDataTitleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-mn-blue focus:ring-mn-blue focus:ring-inset sm:text-sm"
                />
                <div className='flex flex-row-reverse gap-2 place-items-end'>
                  <button
                    type="button"
                    onClick={addNewData}
                    className="flex items-center rounded-lg border border-transparent bg-mn-blue px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-mn-blue-hover focus:outline-none focus:ring-0"
                  >
                    Thêm
                  </button>
                  <button
                    type="button"
                    className="flex items-center rounded-lg border border-transparent bg-gray-400 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-0"
                    onClick={toggleOpenNewDataForm}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
            }
          </div>
          {!generalCakeDatas
            ? <LoadingSpinner caption="Loading ..."/>
            : isEmpty(generalCakeDatas)
              ?<div>Chưa có danh mục</div>
              :
              <>
                <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-2 lg:gap-x-6 gap-y-2 lg:gap-y-6">
                  <div className='bg-slate-100 col-span-1 px-4 py-4 rounded-xl space-y-2'>
                    <div>
                      <span className='font-semibold text-gray-500'>Size</span>
                    </div>
                    <div className='space-y-2'>
                      {generalCakeDatas.map(generalCakeData => (
                        (generalCakeData.type === SIZE)
                          ?
                          (<GeneralCakeDataSetting
                            key={generalCakeData._id}
                            generalCakeData={generalCakeData}
                            onUpdateGeneralCakeDataState={onUpdateGeneralCakeDataState}
                          />)
                          : null
                      ))}
                    </div>
                  </div>
                  <div className='bg-slate-100 col-span-1 px-4 py-4 rounded-xl space-y-2'>
                    <div>
                      <span className='font-semibold text-gray-500'>Vị bánh bông lan</span>
                    </div>
                    <div className='space-y-2'>
                      {generalCakeDatas.map(generalCakeData => (
                        (generalCakeData.type === SPONGE_TASTE)
                          ?
                          (<GeneralCakeDataSetting
                            key={generalCakeData._id}
                            generalCakeData={generalCakeData}
                            onUpdateGeneralCakeDataState={onUpdateGeneralCakeDataState}
                          />)
                          : null
                      ))}
                    </div>
                  </div>
                  <div className='bg-slate-100 col-span-1 px-4 py-4 rounded-xl space-y-2'>
                    <div>
                      <span className='font-semibold text-gray-500'>Vị mứt</span>
                    </div>
                    <div className='space-y-2'>
                      {generalCakeDatas.map(generalCakeData => (
                        (generalCakeData.type === JAM_TASTE)
                          ?
                          (<GeneralCakeDataSetting
                            key={generalCakeData._id}
                            generalCakeData={generalCakeData}
                            onUpdateGeneralCakeDataState={onUpdateGeneralCakeDataState}
                          />)
                          : null
                      ))}
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PageGeneralSetting