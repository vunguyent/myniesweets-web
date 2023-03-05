import MainLayout from 'layouts/MainLayout/MainLayout'
import React, { Fragment, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import { RadioGroup, Listbox, Transition } from '@headlessui/react'
import { BuildingStorefrontIcon, CheckCircleIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FaShippingFast } from 'react-icons/fa'
import { isEmpty } from 'lodash'
import { GOOGLE_MAP_API_KEY } from 'utilities/constants'

import { toast } from 'react-toastify'
//DATE PICKER
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays } from 'date-fns'
import { registerLocale } from 'react-datepicker'
import vi from 'date-fns/locale/vi'
registerLocale('vi', vi)
import { format } from 'date-fns'

//GG MAP
import { Autocomplete, useLoadScript, DistanceMatrixService } from '@react-google-maps/api'
const placesLibrary = ['places']

import { useForm } from 'react-hook-form'

import {
  FIELD_REQUIRED_MESSAGE,
  fieldErrorMessage
} from 'utilities/validators'

import { buyNowAPI } from 'actions/ApiCall'

const shippingTypes = [
  { id: 1, title: 'Lấy bánh tại cửa hàng', icon: BuildingStorefrontIcon },
  { id: 2, title: 'Giao bánh tận nơi', icon: FaShippingFast }
]

const shippingTimes = [
  { id: 1, title: '07h00 - 08h00' },
  { id: 2, title: '08h00 - 09h00' },
  { id: 3, title: '09h00 - 10h00' },
  { id: 4, title: '10h00 - 11h00' },
  { id: 5, title: '11h00 - 12h00' },
  { id: 6, title: '12h00 - 13h00' },
  { id: 7, title: '13h00 - 14h00' },
  { id: 8, title: '14h00 - 15h00' },
  { id: 9, title: '15h00 - 16h00' },
  { id: 10, title: '16h00 - 17h00' },
  { id: 11, title: '17h00 - 18h00' },
  { id: 12, title: '18h00 - 19h00' },
  { id: 13, title: '19h00 - 20h00' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PageBuyNow() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: placesLibrary
  })
  const componentRestrictions ={ country: 'vn' }
  const navigate = useNavigate()

  const { state } = useLocation()

  const storeCoor = [{ lng: 106.82845593536486, lat: 10.947283057076582 }]
  const [ shippingCoor, setShippingCoor ] = useState([])

  const checkOutItemInfo = state?.checkOutItemInfo
  const [ shippingFee, setShippingFee ] = useState(0)
  const [ selectedShippingType, setSelectedShippingType] = useState (shippingTypes[0])
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1))
  const [selectedShippingTime, setSelectedShippingTime] = useState(shippingTimes[0])
  const [checkedGift, setCheckedGift] = useState(false)
  const [ shippingAdress, setShippingAddress ] = useState(null)

  const [ searchResult, setSearchResult] = useState(null)
  const [ distance, setDistance ] = useState(null)

  const { register, handleSubmit, resetField, formState: { errors } } = useForm()


  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete)
  }

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace()
      // const name = place.name
      // const status = place.business_status
      // const formattedAddress = place.formatted_address
      // console.log(place)
      // console.log(`Name: ${name}`)
      // console.log(`Business Status: ${status}`)
      // console.log(`Formatted Address: ${formattedAddress}`)
      if (place) {
        setShippingAddress(place.formatted_address)
        // console.log(place.geometry.location.lat())
        // console.log(place.geometry.location.lng())
        let destination = []
        destination.push({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
        // destination.push(place.geometry.location.lng())
        // console.log(destination)
        setShippingCoor(destination)
        // setShippingCoorLat(place.geometry.location.lat())
        // setShippingCoorLng(place.geometry.location.lng())
        // console.log(shippingCoorLat, shippingCoorLng)
      }
    } else {
      alert('Please enter text')
    }
  }

  useEffect (() => {
    if (isEmpty(distance)) {
      // console.log(distance)
      if ( 0 < distance && distance < 5000 ) {
        setShippingFee(20000)
      } else if ( 5000 <= distance && distance < 6000 ) {
        setShippingFee(25000)
      } else if ( 6000 <= distance && distance < 7000 ) {
        setShippingFee(30000)
      } else if ( 7000 <= distance && distance < 8000 ) {
        setShippingFee(35000)
      } else if ( 8000 <= distance && distance < 10000 ) {
        setShippingFee(40000)
      } else if ( 10000 <= distance && distance < 12000 ) {
        setShippingFee(45000)
      } else if ( 12000 <= distance && distance < 13000 ) {
        setShippingFee(50000)
      } else if ( 13000 <= distance && distance < 14000 ) {
        setShippingFee(55000)
      } else if ( 14000 <= distance && distance <= 15000 ) {
        setShippingFee(60000)
      } else if ( distance > 15000 ) {
        setShippingFee(0)
        toast.error('Mong bạn thông cảm, hiện tại Mynie Sweets chỉ giao hàng tận nơi trong quãng đường 15km...')
        resetField('shippingAddress')
        return
      }
    }
  }, [distance, resetField])


  useEffect (() => {
    if (selectedShippingType.id === 1) {
      setShippingFee(0)
      setShippingCoor([])
      setDistance(0)
      resetField('shippingAddress')
    }
  }, [selectedShippingType, resetField])

  useEffect (() => {
    resetField('receiverName')
    resetField('receiverPhoneNumber')
  }
  , [checkedGift, resetField])


  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const beforeHandleBuyNow = (data) => {
    data.shippingDate = format(selectedDate, 'dd-MM-yy')
    data.shippingTime = selectedShippingTime.title
    data.shippingType = selectedShippingType.title
    data.shippingDistance = distance
    data.asGift = checkedGift
    data.item = checkOutItemInfo
    data.shippingFee = shippingFee
    data.totalAmount = shippingFee + checkOutItemInfo.total

    //console.log(data)

    toast.promise(buyNowAPI(data), { pending: 'Đang tạo đơn hàng...' })
      .then(order => {
        navigate(`/orderSuccess?itemCode=${order.item.item.code}`)
      })
  }
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault()
  }

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="pt-4 sm:pt-16">
          {
            !isEmpty(checkOutItemInfo) ?
              <form onKeyDown={(e) => checkKeyDown(e)} onSubmit={handleSubmit(beforeHandleBuyNow)}>
                <div className='grid grid-cols-2 gap-12 max-w-7xl mx-auto'>
                  <div className="col-span-2 lg:col-span-1 px-4 xl:px-0 justify-center">
                    <div className='sm:text-base md:text-xl font-bold'>Tóm tắt đơn hàng</div>
                    <div className="flex mt-4 lg:mt-8">
                      <div className="mr-4 flex-shrink-0">
                        <div className="aspect-w-3 aspect-h-4  overflow-hidden rounded-xl bg-gray-200 w-28">
                          <img
                            src={checkOutItemInfo.item.cover}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                      </div>
                      <div className='w-full'>
                        <h4 className="text-base font-semibold">{checkOutItemInfo.item.name}</h4>
                        <div>
                          <p className="mt-1 mb-2 text-sm md:text-base font-medium text-gray-900">
                            <NumericFormat
                              value={checkOutItemInfo?.price}
                              displayType={'text'}
                              suffix={' đ'}
                              thousandSeparator={true}
                              decimalScale={2}
                              thousandsGroupStyle="thousand"/>
                          </p>
                        </div>
                        {
                          !isEmpty(checkOutItemInfo.sizeName) &&
                          <>
                            <div className='flex'><div className='text-[13px] font-medium'>Vị bánh bông lan:&nbsp;</div><div className='text-[13px] font-semibold'>{checkOutItemInfo?.spongeTaste.name}</div></div>
                            <div className='flex'><div className='text-[13px] font-medium'>Vị mứt:&nbsp;</div><div className='text-[13px] font-semibold'>{checkOutItemInfo?.jamTaste.name}</div></div>
                            <div className='flex'><div className='text-[13px] font-medium'>Size:&nbsp;</div><div className='text-[13px] font-semibold'>{checkOutItemInfo?.sizeName}</div></div>
                            <div className='flex'><div className='text-[13px] font-medium'>Lời chúc:&nbsp;</div><div className='italic text-[13px] font-semibold'>{checkOutItemInfo?.quote}</div></div>
                            <div className='flex'><div className='text-[13px] font-medium'>Loại nến:&nbsp;</div><div className='text-[13px] font-semibold'>{checkOutItemInfo?.candleType}</div></div>
                            {!isEmpty(checkOutItemInfo.candleNumber) && <div className='flex'><div className='text-sm font-medium'>Số nến:&nbsp;</div><div className='text-sm font-semibold'>{checkOutItemInfo?.candleNumber}</div></div>}
                          </>
                        }
                        <div className='flex justify-between'><div className='text-sm font-medium'>Số lượng:&nbsp;</div><div className='text-sm font-semibold mr-4'>
                          {checkOutItemInfo?.quantity}
                        </div></div>
                        <div className="mt-1 border-t border-gray-300">
                          <div className='flex justify-between'><div className='text-sm font-medium'>Tạm tính:&nbsp;</div><div className='text-base font-medium'>
                            <NumericFormat
                              value={checkOutItemInfo?.quantity * checkOutItemInfo?.price}
                              displayType={'text'}
                              suffix={' đ'}
                              thousandSeparator={true}
                              decimalScale={2}
                              thousandsGroupStyle="thousand"/></div></div>
                          <div className='flex justify-between'><div className='text-sm font-medium'>Phí giao hàng:&nbsp;</div><div className='text-base font-medium'>
                            <NumericFormat
                              value={shippingFee}
                              displayType={'text'}
                              suffix={' đ'}
                              thousandSeparator={true}
                              decimalScale={2}
                              thousandsGroupStyle="thousand"/>
                          </div></div>
                          <div className='flex justify-between'><div className='text-sm font-medium'>Tổng:&nbsp;</div><div className='text-lg font-medium'>
                            <NumericFormat
                              value={checkOutItemInfo?.quantity * checkOutItemInfo?.price + shippingFee}
                              displayType={'text'}
                              suffix={' đ'}
                              thousandSeparator={true}
                              decimalScale={2}
                              thousandsGroupStyle="thousand"/>
                          </div></div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-span-2 lg:col-span-1 px-4">
                    <div className='sm:text-base md:text-xl font-bold'>Thông tin giao hàng</div>
                    <div className='mt-4 lg:mt-8 space-y-3'>
                      <div className="mt-1 w-full">
                        <input
                          type="text"
                          placeholder='Họ Tên người đặt hàng'
                          {...register('ordererName', {
                            required: FIELD_REQUIRED_MESSAGE
                          })}
                          className="block w-full text-sm rounded-full border-gray-200 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm font-medium"
                        />
                        {fieldErrorMessage(errors, 'ordererName')}
                      </div>
                      <div className="mt-1 w-full">
                        <input
                          type="text"
                          placeholder='Số điện thoại người đặt hàng'
                          // defaultValue={currentActiveCakeSetting?.code}
                          // onBlur={beforeUpdateCakeCode}
                          {...register('ordererPhoneNumber', {
                            required: FIELD_REQUIRED_MESSAGE
                          })}
                          className="block w-full text-sm rounded-full border-gray-200 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm font-medium"
                        />
                        {fieldErrorMessage(errors, 'ordererPhoneNumber')}
                      </div>
                      <div className='grid grid-cols-2 gap-2 lg:gap-4'>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-900">Chọn ngày nhận bánh:</p>
                          <div>
                            <DatePicker
                              locale='vi'
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              className='w-full rounded-full border border-gray-300 bg-white py-1.5 text-left shadow-sm focus:border-blue-500 focus:ring-0 text-[13px] mt-1'
                              dateFormat="dd-MM-yyyy"
                              minDate={addDays(new Date(), 1)}
                              maxDate={addDays(new Date(), 30)}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-900">Khung giờ nhận bánh:</p>
                          <Listbox value={selectedShippingTime} onChange={setSelectedShippingTime}>
                            {({ open }) => (
                              <>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:ring-0 text-[13px]">
                                    <span className="block truncate">{selectedShippingTime.title}</span>
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
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-[13px]">
                                      {shippingTimes.map((shippingTime) => (
                                        <Listbox.Option
                                          key={shippingTime.id}
                                          className={({ active }) =>
                                            classNames(
                                              active ? 'text-gray-900 bg-gray-200' : 'text-gray-900',
                                              'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                          }
                                          value={shippingTime}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                {shippingTime.title}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active ? 'text-white' : 'text-blue-500',
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
                        </div>
                      </div>
                      <p className="text-[12px] font-medium text-gray-900">Nếu Bạn cần bánh giao gấp trong hôm nay, vui lòng gọi: 0393 568 963</p>
                      <div className='mt-4'>
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] font-semibold text-gray-900">Chọn hình thức giao hàng:</p>
                        </div>
                        <RadioGroup defaultValue={selectedShippingType} onChange={setSelectedShippingType}>
                          <div className="grid gap-y-2 grid-cols-2 gap-x-4">
                            {shippingTypes.map((type) => (
                              <RadioGroup.Option
                                key={type.id}
                                value={type}
                                className={({ checked, active }) =>
                                  classNames(
                                    checked ? 'border-transparent' : 'border-gray-200',
                                    active ? 'border-blue-500 ring-none' : '',
                                    'relative flex cursor-pointer rounded-lg border bg-white p-2 shadow-sm focus:outline-none'
                                  )
                                }
                              >
                                {({ checked, active }) => (
                                  <>
                                    <span className="flex flex-1">
                                      <div className="flex flex-col items-center">
                                        <RadioGroup.Label as="span" className="block text-[12px] font-medium text-gray-900 ">
                                          {type?.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-400">
                                          <type.icon className='w-8 h-8'/>
                                        </RadioGroup.Description>
                                      </div>
                                    </span>
                                    <CheckCircleIcon
                                      className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-blue-600')}
                                      aria-hidden="true"
                                    />
                                    <span
                                      className={classNames(
                                        active ? 'border' : 'border',
                                        checked ? 'border-blue-500' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-lg'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      { selectedShippingType.id === 2 &&
                      <>
                        <div className="mt-1 w-full">
                          <Autocomplete
                            onLoad={onLoad}
                            onPlaceChanged = { onPlaceChanged }
                            restrictions = {componentRestrictions}
                          >
                            <input
                              type="text"
                              placeholder="Địa chỉ giao hàng"
                              className="block w-full text-[13px] rounded-full border-gray-200 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm font-medium"
                              {...register('shippingAddress', {
                                required: FIELD_REQUIRED_MESSAGE
                              })}
                            />
                          </Autocomplete>
                          {fieldErrorMessage(errors, 'shippingAddress')}
                        </div>
                        {
                          (!isEmpty(shippingCoor)) &&
                          <DistanceMatrixService
                            options={{
                              destinations: shippingCoor,
                              origins: storeCoor,
                              travelMode: 'DRIVING'
                            }}
                            callback = {(response) => {
                              // setDistance(response)
                              setDistance(response.rows[0].elements[0].distance.value)
                            }}
                          />
                        }

                        <div className="mt-1 w-full">
                          <input
                            type="text"
                            placeholder='Ghi chú giao hàng (tùy chọn ...)'
                            {...register('shippingNote')}
                            className="block w-full text-sm rounded-full border-gray-200 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm font-medium"
                          />
                        </div>
                      </>
                      }


                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="offers"
                            aria-describedby="offers-description"
                            type="checkbox"
                            defaultChecked={checkedGift}
                            onChange={() => setCheckedGift(!checkedGift)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-0"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <span id="offers-description" className="text-gray-800 text-[13px] font-medium">
                            Bạn muốn tặng bánh cho người khác?
                          </span>
                        </div>
                      </div>
                      { checkedGift === true &&
                      <>
                        <div className="mt-1 w-full">
                          <input
                            type="text"
                            placeholder='Họ Tên người nhận'
                            {...register('receiverName', {
                              required: FIELD_REQUIRED_MESSAGE
                            })}
                            className="block w-full text-sm rounded-full border-gray-200 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm font-medium"
                          />
                          {fieldErrorMessage(errors, 'receiverName')}
                        </div>
                        <div className="mt-1 w-full">
                          <input
                            type="text"
                            placeholder='Số điện thoại người nhận'
                            {...register('receiverPhoneNumber', {
                              required: FIELD_REQUIRED_MESSAGE
                            })}
                            className="block w-full text-sm rounded-full border-gray-200 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm font-medium"
                          />
                          {fieldErrorMessage(errors, 'receiverPhoneNumber')}
                        </div>
                      </>
                      }
                    </div>
                  </div>
                </div>
                <div className='mt-8'>
                  <div className='grid grid-cols-2 gap-12 max-w-7xl mx-auto'>
                    <div className='hidden lg:block lg:col-span-1'>
                    </div>
                    <div className='col-span-2 lg:col-span-1 px-4 xl:px-0 justify-end'>
                      <button
                        type='submit'
                        // onClick={beforeHandleBuyNow}
                        className="border border-gray-300 text-center py-3 px-8 text-sm tracking-wider font-semibold cursor-pointer bg-white text-gray-900 rounded-full w-full hover:bg-gray-100">
                      XÁC NHẬN ĐẶT HÀNG
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              :
              <div>Chưa có thông tin mua hàng, Bạn vui lòng chọn sản phẩm và đặt hàng nhé</div>
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default PageBuyNow