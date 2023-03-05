import React, { Fragment } from 'react'
import { Dialog, Transition, Switch } from '@headlessui/react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { updateCakeTypeAPI } from 'actions/ApiCall'

import {
  selectCurrentActiveCakeTypeSetting,
  clearCurrentActiveCakeTypeSetting,
  updateCurrentActiveCakeTypeSetting
} from 'redux/activeCakeTypeSetting/activeCakeTypeSettingSlice'
import { updateCakeTypeInList } from 'redux/listCakeType/listCakeTypeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { singleFileValidator } from 'utilities/validators'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ActiveCakeTypeSettingModal() {
  const dispatch = useDispatch()
  const currentActiveCakeTypeSetting = useSelector(selectCurrentActiveCakeTypeSetting)
  const status = currentActiveCakeTypeSetting?.status

  const beforeUpdateCakeTypeTitle = (e) => {
    //
    if (!e.target.value) {
      toast.error('Vui lòng nhập tiêu đề !')
      return false
    }
    if (e.target.value === currentActiveCakeTypeSetting.title)
    {
      return false
    }
    //Gọi API
    updateCakeType({ title: e.target?.value })
  }

  const beforeUpdateCakeTypeDescription = (e) => {
    //
    if (e.target.value === currentActiveCakeTypeSetting.description)
    {
      return false
    }
    //Gọi API
    updateCakeType({ description: e.target?.value })
  }

  const beforeUpdateCakeTypeStatus = (checked) => {
    //
    updateCakeType({ status: checked })
  }

  const beforeUpdateCakeTypeCover = (event) => {
    const err = singleFileValidator(event.target?.files[0])
    if (err) {
      toast.error(err)
      return
    }

    let reqData = new FormData()
    reqData.append('cover', event.target?.files[0])

    toast.promise(
      updateCakeType(reqData).finally(() => event.target.value = ''),
      { pending: 'Đang cập nhật...' }
    )
  }

  const updateCakeType = async (updateData) => {
    const updatedCakeType = await updateCakeTypeAPI(currentActiveCakeTypeSetting._id, updateData)
    // Cập nhật lại CakeType trong Modal
    dispatch(updateCurrentActiveCakeTypeSetting(updatedCakeType))
    // Cập nhật caketype in list
    dispatch(updateCakeTypeInList(updatedCakeType))
    return updatedCakeType
  }

  const onHide = () => {
    dispatch(clearCurrentActiveCakeTypeSetting())
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onHide}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4 block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onHide}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form className='mt-4'>
                  <div className=" w-full sm:items-start">
                    <div className="mt-3 sm:mt-0 sm:ml-4 text-left" >
                      <Dialog.Title as="h3" className="text-lg font-medium text-center leading-6 text-gray-900">
                        Chi tiết loại: <span className='font-bold text-sky-600'>{currentActiveCakeTypeSetting.title}</span>
                      </Dialog.Title>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-500">
                          Tiêu đề
                        </label>
                        <div className="mt-1 w-full">
                          <input
                            type="text"
                            defaultValue={currentActiveCakeTypeSetting?.title}
                            onBlur={beforeUpdateCakeTypeTitle}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-base font-semibold"
                          />
                        </div>

                        <label className="block text-sm font-medium text-gray-500">
                          Mô tả
                        </label>
                        <div className="mt-1 w-full">
                          <input
                            type="text"
                            defaultValue={currentActiveCakeTypeSetting?.description}
                            onBlur={beforeUpdateCakeTypeDescription}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-base font-semibold"
                          />
                        </div>

                        <Switch.Group as="div" className="flex items-center justify-between mt-4">
                          <span className="flex flex-grow flex-col">
                            <Switch.Label as="span" className="text-sm font-medium text-gray-500" passive>
                              Trạng thái
                            </Switch.Label>
                            <Switch.Description as="span" className="flex text-gray-500 items-center">
                              { currentActiveCakeTypeSetting.status
                                ? <p className="mt-2 text-xs text-green-700 font-semibold bg-green-200 px-4 py-1 rounded-full">Hiện</p>
                                : <p className="mt-2 text-xs text-red-700 font-semibold bg-red-200 px-4 py-1 rounded-full">Ẩn</p> }
                            </Switch.Description>
                          </span>
                          <Switch
                            checked={status}
                            onChange={beforeUpdateCakeTypeStatus}
                            className={classNames(
                              status ? 'bg-green-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                status ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>

                        <label htmlFor="" className="block text-sm font-medium text-gray-500 mt-4">
                          Cover
                        </label>
                        <p className="text-xs text-gray-500">Định dạng: PNG, JPG, GIF (nhỏ hơn 10MB)</p>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="cover-photo"
                            className="flex cursor-pointer items-center rounded-md bg-gray-200 px-4 py-1 my-2 font-medium text-gray-500 hover:bg-gray-300"
                          >
                            <PhotoIcon className='flex w-6 h-6 mr-2'/>
                            <span>Cập nhật cover</span>
                            <input
                              id="cover-photo"
                              name="cover-photo"
                              type="file" className="sr-only"
                              onChange={beforeUpdateCakeTypeCover}/>
                          </label>
                        </div>
                        { currentActiveCakeTypeSetting?.cover &&
                          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 justify-center">
                            <div className="mt-2 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                              <img
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                src={currentActiveCakeTypeSetting.cover}
                              />
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ActiveCakeTypeSettingModal