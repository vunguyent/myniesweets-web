import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, Switch } from '@headlessui/react'
import { XMarkIcon, TrashIcon, PhotoIcon, CloudArrowUpIcon, SquaresPlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { updateCakeAPI, updateCakeImageAPI } from 'actions/ApiCall'
import CakeTypeSelectPopver from 'components/Common/CakeTypeSelectPopver'
import CakeStyleSelectPopver from 'components/Common/CakeStyleSelectPopover'
import CakeSizeSelectPopver from 'components/Common/CakeSizeSelectPopover'
import { isEmpty } from 'lodash'
//import 'react-quill/dist/quill.snow.css'
//import CustomReactQuill from 'components/Common/CustomReactQuill/CustomReactQuill'
import { NumericFormat } from 'react-number-format'

import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

import {
  selectCurrentActiveCakeSetting,
  clearCurrentActiveCakeSetting,
  updateCurrentActiveCakeSetting
} from 'redux/activeCakeSetting/activeCakeSettingSlice'
import { updateCakeInList } from 'redux/listCake/listCakeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { singleFileValidator } from 'utilities/validators'

import {
  CAKE_TYPE_SELECT_POPOVER_TYPE_CAKETYPE,
  CAKE_TYPE_IDS_ACTION_REMOVE,
  CAKE_STYLE_SELECT_POPOVER_TYPE_CAKESTYLE,
  CAKE_STYLE_IDS_ACTION_REMOVE,
  CAKE_SIZE_SELECT_POPOVER_TYPE_CAKESIZE,
  CAKE_PRICE_BY_SIZES_ACTION_REMOVE
} from 'utilities/constants'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ActiveCakeSettingModal(props) {
  const { cakeTypes, cakeStyles, cakeSizes } = props
  const dispatch = useDispatch()
  const currentActiveCakeSetting = useSelector(selectCurrentActiveCakeSetting)
  const status = currentActiveCakeSetting?.status
  const bestSell = currentActiveCakeSetting?.bestSell

  const [description, setDescription] = useState(currentActiveCakeSetting?.description)
  const [editorMode, setEditorMode] = useState(false)

  const enableEditorMode = () => setEditorMode(true)
  const disableEditorMode = () => setEditorMode(false)

  const beforeUpdateCakeName = (event) => {
    //
    if (!event.target.value) {
      toast.error('Vui l??ng nh???p ti??u ????? !')
      return false
    }
    if (event.target.value === currentActiveCakeSetting.name)
    {
      return false
    }
    //G???i API
    updateCake({ name: event.target?.value })
  }

  const beforeUpdateCakeCode = (event) => {
    //
    if (!event.target.value) {
      toast.error('Vui l??ng nh???p m?? s???n ph???m !')
      return false
    }
    if (event.target.value === currentActiveCakeSetting.code)
    {
      return false
    }
    //G???i API
    updateCake({ code: event.target?.value })
  }

  const beforeUpdateCakeStatus = (checked) => {
    //
    updateCake({ status: checked })
  }

  const beforeUpdateCakeBestSellStatus = (checked) => {
    //
    updateCake({ bestSell: checked })
  }

  const beforeUpdateCakeMoq = (event) => {
    //
    if (!event.target.value) {
      toast.error('Vui l??ng nh???p s??? l?????ng ?????t h??ng t???i thi???u c???a s???n ph???m !')
      return false
    }
    if (event.target.value === currentActiveCakeSetting.moq)
    {
      return false
    }
    //G???i API
    updateCake({ moq: event.target?.value })
  }

  const beforeUpdateCakePreOrderTime = (event) => {
    //
    if (!event.target.value) {
      toast.error('Vui l??ng nh???p th???i gian ?????t h??ng tr?????c !')
      return false
    }
    if (event.target.value === currentActiveCakeSetting.preOrderTime)
    {
      return false
    }
    //G???i API
    updateCake({ preOrderTime: event.target?.value })
  }

  const [newUnitPrice, setNewUnitPrice] = useState(currentActiveCakeSetting?.unitPrice)
  const setInputUnitPrice = (value) => {
    setNewUnitPrice(value)
  }
  const beforeUpdateCakeUnitPrice = () => {
    // console.log(unitPrice)
    // console.log(typeof(unitPrice))
    //
    if (typeof newUnitPrice === 'undefined') {
      toast.error('Vui l??ng nh???p gi?? s???n ph???m !')
      return false
    }
    if (newUnitPrice === currentActiveCakeSetting.unitPrice)
    {
      return false
    }
    updateCake({ unitPrice: newUnitPrice })
  }

  const [newSortPrice, setNewSortPrice] = useState(currentActiveCakeSetting?.sortPrice)
  const setInputSortPrice = (value) => {
    setNewSortPrice(value)
  }
  const beforeUpdateCakeSortPrice = () => {
    // console.log(unitPrice)
    // console.log(typeof(unitPrice))
    //
    if (typeof newSortPrice === 'undefined') {
      toast.error('Vui l??ng nh???p gi?? s???n ph???m !')
      return false
    }
    if (newSortPrice === currentActiveCakeSetting.sortPrice)
    {
      return false
    }
    updateCake({ sortPrice: newSortPrice })
  }

  const [newPriceBySizes, setNewPriceBySizes] = useState(currentActiveCakeSetting?.priceBySizes)

  useEffect(() => {
    setNewPriceBySizes(currentActiveCakeSetting.priceBySizes)
  }, [currentActiveCakeSetting.priceBySizes])

  const setInputPriceBySizes = (sizeId, value) => {
    let priceBySizesToUpdate = [...newPriceBySizes]
    const index = priceBySizesToUpdate.findIndex(object => {
      return object.sizeId === sizeId
    })
    //console.log(index)
    priceBySizesToUpdate[index] = {
      sizeId: sizeId,
      price: value
    }
    //console.log(priceBySizesToUpdate[index] )
    // console.log(priceBySizesToUpdate)
    setNewPriceBySizes(priceBySizesToUpdate)
  }
  const beforeUpdateCakeUnitPriceBySizes = () => {
    let count = 0
    newPriceBySizes.forEach(priceBySize => {
      if (typeof priceBySize.price === 'undefined') {
        toast.error('Vui l??ng nh???p gi?? s???n ph???m !')
        count++
      }
    })
    if (count !== 0) return false

    if (newPriceBySizes === currentActiveCakeSetting.priceBySizes) return false
    //console.log(newPriceBySizes)
    updateCake({ priceBySizes: newPriceBySizes })
  }

  const beforeUpdateCakeCover = (event) => {
    const err = singleFileValidator(event.target?.files[0])
    if (err) {
      toast.error(err)
      return
    }

    let reqData = new FormData()
    reqData.append('cover', event.target?.files[0])

    toast.promise(
      updateCake(reqData).finally(() => event.target.value = ''),
      { pending: '??ang c???p nh???t...' }
    )
  }

  const beforeUpdateCakeImageList = (event) => {
    const err = singleFileValidator(event.target?.files[0])
    if (err) {
      toast.error(err)
      return
    }

    let reqData = new FormData()
    reqData.append('image', event.target?.files[0])

    toast.promise(
      updateCakeImage(reqData).finally(() => event.target.value = ''),
      { pending: '??ang c???p nh???t...' }
    )
  }

  const beforeRemoveCakeImageFromList = (image) => {
    updateCake({ incomingImage: { image } })
  }

  const beforeUpdateCakeRemark = (event) => {
    //
    if (event.target.value === currentActiveCakeSetting.code)
    {
      return false
    }
    //G???i API
    updateCake({ remark: event.target?.value })
  }

  const beforeUpdateCakeDescription = (event) => {
    event.preventDefault()

    if (description === currentActiveCakeSetting.description)
    {
      disableEditorMode()
      return false
    }
    //G???i API
    updateCake({ description: description })
    disableEditorMode()
  }

  const beforeUpdateCakeCakeType = (cakeTypeId, action) => {
    updateCake({ incomingCakeType: { cakeTypeId, action } })
  }

  const beforeUpdateCakePriceBySize = (sizeId, action) => {
    updateCake({ incomingPriceBySize: { sizeId, action } })
  }

  const beforeUpdateCakeCakeStyle = (cakeStyleId, action) => {
    updateCake({ incomingCakeStyle: { cakeStyleId, action } })
  }

  const updateCake = async (updateData) => {
    const updatedCake = await updateCakeAPI(currentActiveCakeSetting._id, updateData)

    let c_cakeTypes = []
    let c_cakeStyles = []
    let c_priceBySizes = []
    if (Array.isArray(updatedCake.cakeTypeIds)) {
      updatedCake.cakeTypeIds.forEach(cakeTypeId => {
        const fullCakeTypeInfo = cakeTypes.find(t => t._id === cakeTypeId)
        if (fullCakeTypeInfo) c_cakeTypes.push(fullCakeTypeInfo)
      })
    }

    if (Array.isArray(updatedCake.cakeStyleIds)) {
      updatedCake.cakeStyleIds.forEach(cakeStyleId => {
        const fullCakeStyleInfo = cakeStyles.find(s => s._id === cakeStyleId)
        if (fullCakeStyleInfo) c_cakeStyles.push(fullCakeStyleInfo)
      })
    }
    if (Array.isArray(updatedCake.priceBySizes)) {
      updatedCake.priceBySizes.forEach(priceBySize => {
        const sizeInfo = cakeSizes.find(s => s._id === priceBySize.sizeId)
        if (sizeInfo) c_priceBySizes.push({ size: sizeInfo, price: priceBySize.price })
      })
    }

    updatedCake['c_cakeTypes'] = c_cakeTypes
    updatedCake['c_cakeStyles'] = c_cakeStyles
    updatedCake['c_priceBySizes'] = c_priceBySizes
    // C???p nh???t l???i Cake trong Modal
    dispatch(updateCurrentActiveCakeSetting(updatedCake))
    // C???p nh???t Cake in list
    dispatch(updateCakeInList(updatedCake))
    return updatedCake
  }

  const updateCakeImage = async (updateData) => {
    const updatedCake = await updateCakeImageAPI(currentActiveCakeSetting._id, updateData)
    // C???p nh???t l???i Cake trong Modal
    dispatch(updateCurrentActiveCakeSetting(updatedCake))
    // C???p nh???t Cake in list
    dispatch(updateCakeInList(updatedCake))
    return updatedCake
  }

  const onHide = () => {
    dispatch(clearCurrentActiveCakeSetting())
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

        <div className="fixed inset-0 z-10">
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
              <Dialog.Panel className="max-h-[calc(100vh-56px)] overflow-y-auto relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-4xl sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4 block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onHide}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className='mt-4'>
                  <div className=" w-full sm:items-start">
                    <div className="mt-3 sm:mt-0 sm:ml-4 text-left" >
                      <Dialog.Title as="h3" className="text-lg font-medium text-center leading-6 text-gray-900">
                        Chi ti???t ki???u: <span className='font-bold text-sky-600'>{currentActiveCakeSetting.name}</span>
                      </Dialog.Title>
                      <div className="mt-4 border-b-2 border-gray-200">
                        <div className='grid grid-cols-1 sm:grid-cols-2 items-start sm:gap-8'>
                          <div className='grid'>
                            <label htmlFor="" className="block text-sm font-medium text-gray-500 mt-4">
                              Cover
                            </label>
                            <p className="text-xs text-gray-500">?????nh d???ng: PNG, JPG, GIF (nh??? h??n 10MB)</p>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="cover-photo"
                                className="flex cursor-pointer items-center rounded-md bg-gray-200 px-4 py-1 my-2 font-medium text-gray-500 hover:bg-gray-300"
                              >
                                <PhotoIcon className='flex w-6 h-6 mr-2'/>
                                <span>C???p nh???t cover</span>
                                <input
                                  id="cover-photo"
                                  name="cover-photo"
                                  type="file" className="sr-only"
                                  onChange={beforeUpdateCakeCover}/>
                              </label>
                            </div>
                            { currentActiveCakeSetting?.cover ?
                              <div className="grid grid-cols-1 justify-center">
                                <div className="mt-2 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                  <img
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    src={currentActiveCakeSetting.cover}
                                  />
                                </div>
                              </div>
                              : <span className='text-sm text-red-400 font-medium'>Ch??a c?? ???nh cover</span>
                            }
                          </div>
                          <div className='grid'>
                            <label htmlFor="" className="block text-sm font-medium text-gray-500 mt-4">
                              ???nh m?? t???
                            </label>
                            <p className="text-xs text-gray-500">?????nh d???ng: PNG, JPG, GIF (nh??? h??n 10MB) - t???i ??a 04 ???nh</p>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="image-list"
                                className="flex cursor-pointer items-center rounded-md bg-gray-200 px-4 py-1 my-2 font-medium text-gray-500 hover:bg-gray-300"
                              >
                                <SquaresPlusIcon className='flex w-6 h-6 mr-2'/>
                                <span>Th??m ???nh m?? t???</span>
                                <input
                                  id="image-list"
                                  name="image-list"
                                  type="file" className="sr-only"
                                  onChange={beforeUpdateCakeImageList}/>
                              </label>
                            </div>
                            { !isEmpty(currentActiveCakeSetting?.imageList) ?
                              <div className="mt-2 grid grid-cols-2 gap-y-4 gap-x-4 justify-center">
                                {currentActiveCakeSetting?.imageList.map((image, index) => (
                                  <div key={index} className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                      className="h-full w-full object-cover object-center"
                                      src={image}
                                    />
                                    <div
                                      className='flex absolute top-0 right-0'
                                    >
                                      <XMarkIcon
                                        className='h-5 w-5  text-gray-500 bg-slate-100 rounded-full hover:bg-slate-300'
                                        onClick={() => beforeRemoveCakeImageFromList(image)}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                              : <span className='text-sm text-red-400 font-medium'>Ch??a c?? ???nh m?? t???</span>
                            }
                          </div>
                        </div>
                        {/* QUILL */}
                        <div className='grid gap-2 mt-2'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2'>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                                M?? s???n ph???m
                              </label>
                              <div className="mt-1 w-full">
                                <input
                                  type="text"
                                  defaultValue={currentActiveCakeSetting?.code}
                                  onBlur={beforeUpdateCakeCode}
                                  className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-500">
                                T??n s???n ph???m
                              </label>
                              <div className="mt-1 w-full">
                                <input
                                  type="text"
                                  defaultValue={currentActiveCakeSetting?.name}
                                  onBlur={beforeUpdateCakeName}
                                  className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                                Lo???i s???n ph???m
                              </label>
                              <p className="text-xs text-gray-500">C?? th??? ch???n nhi???u lo???i</p>
                              <div className=''>
                                <div className='gap-1'>
                                  {!isEmpty(currentActiveCakeSetting?.c_cakeTypes) &&
                                    currentActiveCakeSetting?.c_cakeTypes.map((cakeType, index) => (
                                      <span key={index} className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-sm font-medium text-mn-blue mr-1">
                                        {cakeType.title}
                                        <button
                                          type="button"
                                          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-mn-blue-hover hover:bg-indigo-200 focus:bg-mn-blue-hover focus:text-white focus:outline-none"
                                          onClick={() => beforeUpdateCakeCakeType(cakeType._id, CAKE_TYPE_IDS_ACTION_REMOVE)}
                                        >
                                          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                          </svg>
                                        </button>
                                      </span>
                                    ))}
                                </div>
                                <div className="mt-1 w-full">
                                  <CakeTypeSelectPopver
                                    cakeTypes={cakeTypes}
                                    cakeTypeIds={currentActiveCakeSetting.cakeTypeIds}
                                    beforeUpdateCakeCakeType={beforeUpdateCakeCakeType}
                                    type = {CAKE_TYPE_SELECT_POPOVER_TYPE_CAKETYPE}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-500">
                                M???u s???n ph???m
                              </label>
                              <p className="text-xs text-gray-500">C?? th??? ch???n nhi???u m???u</p>
                              <div className=''>
                                <div className='gap-1'>
                                  {!isEmpty(currentActiveCakeSetting?.c_cakeStyles) &&
                                    currentActiveCakeSetting?.c_cakeStyles.map((cakeStyle, index) => (
                                      <span key={index} className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-sm font-medium text-mn-blue mr-1">
                                        {cakeStyle.title}
                                        <button
                                          type="button"
                                          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-mn-blue-hover hover:bg-indigo-200 hover:mn-blue focus:bg-mn-blue-hover focus:text-white focus:outline-none"
                                          onClick={() => beforeUpdateCakeCakeStyle(cakeStyle._id, CAKE_STYLE_IDS_ACTION_REMOVE)}
                                        >
                                          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                          </svg>
                                        </button>
                                      </span>
                                    ))}
                                </div>
                                <div className="mt-1 w-full">
                                  <CakeStyleSelectPopver
                                    cakeStyles={cakeStyles}
                                    cakeStyleIds={currentActiveCakeSetting.cakeStyleIds}
                                    beforeUpdateCakeCakeStyle={beforeUpdateCakeCakeStyle}
                                    type = {CAKE_STYLE_SELECT_POPOVER_TYPE_CAKESTYLE}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                                C???n ?????t tr?????c trong:
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <input
                                  type="number"
                                  defaultValue={
                                    Intl.NumberFormat('en-US', {
                                      minimumIntegerDigits: 1
                                    }).format(currentActiveCakeSetting?.preOrderTime)}
                                  onBlur={beforeUpdateCakePreOrderTime}
                                  className="block w-full text-sm rounded-md border-gray-300 pr-12 focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                  placeholder="0.0"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    Gi???
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                                MOQ
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <input
                                  type="number"
                                  defaultValue={
                                    Intl.NumberFormat('en', {
                                      minimumIntegerDigits: 2
                                    }).format(currentActiveCakeSetting?.moq)}
                                  onBlur={beforeUpdateCakeMoq}
                                  className="block w-full text-sm rounded-md border-gray-300 pr-12 focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                  placeholder="S??? l?????ng ?????t h??ng t???i thi???u"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    C??i
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Switch.Group as="div" className="flex items-center justify-between">
                              <span className="flex flex-grow flex-col">
                                <Switch.Label as="span" className="text-sm font-medium text-gray-500" passive>
                                  Tr???ng th??i
                                </Switch.Label>
                                <Switch.Description as="span" className="flex text-gray-500">
                                  { currentActiveCakeSetting.status
                                    ? <p className="mt-2 text-xs text-green-700 font-semibold bg-green-200 px-4 py-1 rounded-full">Hi???n</p>
                                    : <p className="mt-2 text-xs text-red-700 font-semibold bg-red-200 px-4 py-1 rounded-full">???n</p> }
                                </Switch.Description>
                              </span>
                              <Switch
                                checked={status}
                                onChange={beforeUpdateCakeStatus}
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
                            <Switch.Group as="div" className="flex items-center justify-between">
                              <span className="flex flex-grow flex-col">
                                <Switch.Label as="span" className="text-sm font-medium text-gray-500" passive>
                                  Best Sell
                                </Switch.Label>
                                <Switch.Description as="span" className="flex text-gray-500">
                                  { currentActiveCakeSetting.bestSell
                                    ? <p className="mt-2 text-xs text-green-700 font-semibold bg-green-200 px-4 py-1 rounded-full">Yes</p>
                                    : <p className="mt-2 text-xs text-red-700 font-semibold bg-red-200 px-4 py-1 rounded-full">No</p> }
                                </Switch.Description>
                              </span>
                              <Switch
                                checked={bestSell}
                                onChange={beforeUpdateCakeBestSellStatus}
                                className={classNames(
                                  bestSell ? 'bg-green-600' : 'bg-gray-200',
                                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    bestSell ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                  )}
                                />
                              </Switch>
                            </Switch.Group>
                            <div>
                              <label htmlFor="email" className="flex text-sm font-medium text-green-700">
                                <span className='flex'>????n gi??:<br/>(C??C LO???I B??NH KH??NG B??N THEO SIZE):</span>
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <NumericFormat
                                  allowNegative={false}
                                  className="block w-full text-sm rounded-md border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                  type="text"
                                  defaultValue={currentActiveCakeSetting?.unitPrice}
                                  decimalScale={2}
                                  thousandsGroupStyle="thousand"
                                  thousandSeparator=","
                                  onValueChange={(value) => setInputUnitPrice(value.floatValue)}
                                  suffix={' VN??'}
                                  onBlur={beforeUpdateCakeUnitPrice}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                                Ghi ch??
                              </label>
                              <div className="mt-1 w-full">
                                <input
                                  type="text"
                                  defaultValue={currentActiveCakeSetting?.remark}
                                  onBlur={beforeUpdateCakeRemark}
                                  className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="flex text-sm font-medium text-green-700">
                                <span className='flex'>????n gi?? s???p x???p:<br/>(S??? d???ng ????? ng?????i d??ng s???p x???p s???n ph???m):</span>
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <NumericFormat
                                  allowNegative={false}
                                  className="block w-full text-sm rounded-md border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                  type="text"
                                  defaultValue={currentActiveCakeSetting?.sortPrice}
                                  decimalScale={2}
                                  thousandsGroupStyle="thousand"
                                  thousandSeparator=","
                                  onValueChange={(value) => setInputSortPrice(value.floatValue)}
                                  suffix={' VN??'}
                                  onBlur={beforeUpdateCakeSortPrice}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="flex text-sm font-medium text-red-700">
                                <span className='flex'>????n gi?? theo quy c??ch<br/>(D??NH CHO C??C LO???I B??NH B??N THEO QUY C??CH):</span>
                              </label>
                              <div className="text-sm text-gray-600 space-y-1">
                                {!isEmpty(currentActiveCakeSetting?.c_priceBySizes) &&
                                    currentActiveCakeSetting?.c_priceBySizes.map((c_priceBySize) => (
                                      <div key={c_priceBySize.size._id} className='grid grid-cols-2 gap-2'>
                                        <div className='col-span-1'>
                                          <input
                                            type="text"
                                            placeholder='Quy c??ch'
                                            defaultValue={c_priceBySize.size.name}
                                            disabled
                                            className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                          />
                                        </div>
                                        <div className='flex items-center space-x-2 col-span-1'>
                                          <NumericFormat
                                            allowNegative={false}
                                            placeholder='????n gi??'
                                            className="block w-full text-sm rounded-md border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-semibold"
                                            type="text"
                                            defaultValue={c_priceBySize.price}
                                            decimalScale={2}
                                            thousandsGroupStyle="thousand"
                                            thousandSeparator=","
                                            onValueChange={(value) => setInputPriceBySizes(c_priceBySize.size._id, value.floatValue)}
                                            suffix={' VN??'}
                                            onBlur={beforeUpdateCakeUnitPriceBySizes}
                                          />
                                          <div className='flex w-5 h-5 hover:text-red-400' onClick={() => beforeUpdateCakePriceBySize(c_priceBySize.size._id, CAKE_PRICE_BY_SIZES_ACTION_REMOVE)} ><TrashIcon/></div>
                                        </div>
                                      </div>
                                    ))}
                                <CakeSizeSelectPopver
                                  cakeSizes={cakeSizes}
                                  priceBySizes={currentActiveCakeSetting.priceBySizes}
                                  beforeUpdateCakePriceBySize={beforeUpdateCakePriceBySize}
                                  type = {CAKE_SIZE_SELECT_POPOVER_TYPE_CAKESIZE}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='grid grid-cols-1 items-start mt-2 mb-20'>
                          <div className="flex text-sm font-medium text-gray-500 items-center">
                            M?? t???
                            <div
                              className="flex cursor-pointer items-center rounded-md bg-gray-200 px-2 py-0.5 my-2 font-medium text-gray-500 hover:bg-gray-300 ml-2"
                              onClick={enableEditorMode}
                            >
                              <PencilSquareIcon className='flex w-5 h-5 mr-2'/>
                              <span>S???a</span>
                            </div>
                          </div>
                          <div data-color-mode="light">
                            {
                              editorMode
                                ?
                                <div className='grid grid-cols-1 items-start mt-4'>
                                  <MDEditor
                                    value={description}
                                    onChange={setDescription}
                                    previewOptions={{
                                      rehypePlugins: [[rehypeSanitize]]
                                    }}
                                    height={300}
                                    preview="edit"
                                    hideToolbar={false}
                                    autoFocus={true}
                                  />
                                  <div className='flex items-center justify-end'>
                                    <button className='flex items-center bg-blue-500 hover:bg-blue-600 mt-2 px-4 py-1 gap-1 text-white font-medium rounded-xl' onClick={beforeUpdateCakeDescription}><CloudArrowUpIcon className='w-5 h-5'/>L??u m?? t???</button>
                                  </div>
                                </div>
                                :
                                <div className='mt-6'>
                                  <MDEditor.Markdown source={description}/>
                                </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ActiveCakeSettingModal