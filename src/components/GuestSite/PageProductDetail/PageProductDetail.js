import MainLayout from 'layouts/MainLayout/MainLayout'
import { React, useState, useEffect, Fragment } from 'react'
import { RadioGroup, Tab } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { fetchCakeByIdAPI } from 'actions/ApiCall'
import { isEmpty } from 'lodash'
import { NumericFormat, PatternFormat } from 'react-number-format'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { PlusIcon, MinusIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { BsCartPlus } from 'react-icons/bs'
import { IoIosSnow } from 'react-icons/io'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { FaShippingFast } from 'react-icons/fa'

import MDEditor from '@uiw/react-md-editor'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import MauTron from 'resources/images/mau-tron.png'
import MauVuong from 'resources/images/mau-vuong.png'

import './PageProductDetail.css'

const candleLists = [
  { id: 1, title: 'Nến thường', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg' },
  { id: 2, title: 'Nến số tuổi', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg' }
]


import ImageGallery from 'react-image-gallery'
import { toast } from 'react-toastify'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PageProductDetail() {
  const [ cake, setCake ] = useState([])
  const { cakeId } = useParams()

  const [ cakeImages, setCakeImages ] = useState([])

  const [ sizes, setSizes ] = useState([])
  const [ spongeTastes, setSpongeTastes ] = useState([])
  const [ jamTastes, setJamTastes ] = useState([])

  //ORDER PRODUCT INFO
  const [ selectedSize, setSelectedSize] = useState(null)
  const [ selectedPriceBySize, setSelectedPriceBySize ] = useState(0)
  const [ selectedSpongeTaste, setSelectedSpongeTase ] = useState([])
  const [ selectedJamTaste, setSelectedJamTase ] = useState([])
  const [ quote, setQuote ] = useState ('')
  const [ selectedCandle, setSelectedCandle ] = useState(candleLists[0])
  const [ candleNumber, setCandleNumber ] = useState(null)
  const [ quantity, setQuantity ] = useState(1)

  //instruction modal
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  //navigate
  const navigate = useNavigate()
  const toggleSizeInstructionModal = () => {
    setSelectedIndex(0)
    setOpen(!open)
  }
  const toggleQuoteInstructionModal = () => {
    setSelectedIndex(1)
    setOpen(!open)
  }

  function increment() {
    //setCount(prevCount => prevCount+=1);
    setQuantity(function (prevCount) {
      return (prevCount += 1)
    })
  }

  function decrement() {
    setQuantity(function (prevCount) {
      if (prevCount > 1) {
        return (prevCount -= 1)
      } else {
        return (prevCount = 1)
      }
    })
  }

  const selectSize = (sizeId) => {
    setSelectedSize(sizeId)
    const selectedPrice = cake.priceBySizes.find(p => p.sizeId === sizeId)
    setSelectedPriceBySize(selectedPrice.price)
  }

  useEffect(() => {
    if (selectedCandle.id === 1) {
      setCandleNumber('')
    }
  }, [selectedCandle])

  useEffect(() => {
    fetchCakeByIdAPI(cakeId).then((res) => {
      setCake(res.cake)
      setSizes(res.cakeSizes)
      setSpongeTastes(res.spongeTastes)
      setJamTastes(res.jamTastes)
      setSelectedSpongeTase(res.spongeTastes[0])
      setSelectedJamTase(res.jamTastes[0])
      //setTotal()
    })
  }, [cakeId])

  useEffect(() => {
    if (!isEmpty(cake)) {
      const newI = cake.imageList
      newI.unshift(cake.cover)
      //console.log(newI)
      const imageLists = newI.map((str, index) => ({ original: str, thumbnail: str }))
      //console.log(images)
      setCakeImages(imageLists)
      if (!isEmpty(cake.priceBySizes)) {
        setSelectedSize(Object.values(cake.priceBySizes)[0].sizeId)
        setSelectedPriceBySize(Object.values(cake.priceBySizes)[0].price)
      }
    }
  }, [cake])

  const beforeUpdateQuote = (e) => {
    setQuote(e.target.value)
  }

  const beforeHandleOrderNow = () => {
    let checkOutItemInfo = {}
    checkOutItemInfo.item = cake
    checkOutItemInfo.quantity = quantity
    if (!isEmpty(cake.priceBySizes) && !isEmpty(sizes)) {
      checkOutItemInfo.sizeCode = selectedSize
      sizes.map(size => {
        if (size._id === selectedSize) {checkOutItemInfo.sizeName = size.name}
      })
      checkOutItemInfo.price = selectedPriceBySize
      checkOutItemInfo.total = selectedPriceBySize*quantity
      checkOutItemInfo.spongeTaste = selectedSpongeTaste
      checkOutItemInfo.jamTaste = selectedJamTaste
      checkOutItemInfo.quote = quote
      if (selectedCandle.id === 1) {
        checkOutItemInfo.candleType = selectedCandle.title
      } else {
        if (!candleNumber) {
          toast.error('Vui lòng nhập số nến tuổi...')
          return
        } else {
          checkOutItemInfo.candleType = selectedCandle.title
          checkOutItemInfo.candleNumber = candleNumber
        }
      }
    } else {
      checkOutItemInfo.price = cake.unitPrice
      checkOutItemInfo.total = cake.unitPrice*quantity
    }

    navigate('/buynow', {
      state: {
        checkOutItemInfo
      }
    })
    //console.log(checkOutItemInfo)

  }

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="pt-4 sm:pt-16">
          { !isEmpty(cake) &&
          <div className='grid grid-cols-2 gap-4 max-w-7xl mx-auto'>
            <div className="col-span-2 lg:col-span-1 px-4 lg:px-0 justify-center">
              <div className='w-full'>
                <ImageGallery items={cakeImages} showPlayButton={false} showThumbnails={true}/>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 px-4">
              <div className='sm:text-lg md:text-2xl font-bold'>{cake?.name}</div>
              {
                (!isEmpty(cake.priceBySizes) && !isEmpty(sizes))?
                  <>
                    <div><p className="mt-1 mb-4 text-xl md:text-2xl font-bold text-green-600">
                      <NumericFormat
                        value={selectedPriceBySize}
                        displayType={'text'}
                        suffix={' đ'}
                        thousandSeparator={true}
                        decimalScale={2}
                        thousandsGroupStyle="thousand"/>
                    </p></div>

                    {/* {((cake.preOrderTime !== 0)) &&
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-[13px] font-semibold text-gray-900">Bánh cần đặt trước trong vòng: {cake.preOrderTime} giờ</h3>
                      </div>
                    </div>
                    } */}
                    <div className='mt-2'>
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-messenger-blue">Chọn size:</span>
                        <button onClick={toggleSizeInstructionModal} className="text-[12px] font-semibold text-gray-900 hover:text-messenger-blue">
                          Hd chọn size
                        </button>
                      </div>
                      <div className='mt-0.5'>
                        <RadioGroup value={selectedSize} onChange={selectSize} className="flex space-x-2 md:space-x-4">
                          {cake.priceBySizes.map((item, i) =>
                            (sizes.map(size => {
                              if (size._id === item.sizeId) return (
                                <RadioGroup.Option value={size._id} key={i}>
                                  {({ checked }) => (
                                    <span
                                      className={checked ? 'flex rounded-xl py-0.5 px-2 items-center justify-center text-[13px] font-bold border focus:outline-none border-gray-900 bg-gray-100 text-gray-900 cursor-pointer' : 'flex text-gray-400 border border-gray-300 rounded-xl py-0.5 px-2 items-center justify-center text-[13px] font-medium focus:outline-none cursor-pointer'}>
                                      {size?.name}
                                    </span>
                                  )}
                                </RadioGroup.Option>
                              )
                            })
                            )
                          )}
                        </RadioGroup>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <div className="flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold text-messenger-blue">Chọn vị bánh bông lan:</h3>
                      </div>
                      {
                        !isEmpty(spongeTastes) &&
                          <RadioGroup value={selectedSpongeTaste} onChange={setSelectedSpongeTase} className="mt-0.5 flex space-x-2 md:space-x-4">
                            { spongeTastes.map((spongeTaste, i) => (
                              <RadioGroup.Option value={spongeTaste} key={i}>
                                {({ checked }) => (
                                  <span
                                    className={checked ? 'flex rounded-xl py-0.5 px-2 items-center justify-center text-[13px] font-bold border focus:outline-none border-gray-900 bg-gray-100 text-gray-900 cursor-pointer' : 'flex text-gray-400 border border-gray-300 rounded-xl py-0.5 px-2 items-center justify-center text-[13px] font-medium focus:outline-none cursor-pointer'}>
                                    {spongeTaste?.name}
                                  </span>
                                )}
                              </RadioGroup.Option>
                            ))
                            }
                          </RadioGroup>
                      }
                    </div>
                    <div className='mt-2'>
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-messenger-blue">Chọn vị mứt:</span>
                      </div>
                      {
                        !isEmpty(jamTastes) &&
                          <RadioGroup value={selectedJamTaste} onChange={setSelectedJamTase} className="mt-0.5 flex space-x-2 md:space-x-4">
                            { jamTastes.map((jamTaste, i) => (
                              <RadioGroup.Option value={jamTaste} key={i}>
                                {({ checked }) => (
                                  <span
                                    className={checked ? 'flex rounded-xl py-0.5 px-2 items-center justify-center text-[13px] font-bold border focus:outline-none border-gray-900 bg-gray-100 text-gray-900 cursor-pointer' : 'flex text-gray-400 border border-gray-300 rounded-xl py-0.5 px-2 items-center justify-center text-[13px] font-medium focus:outline-none cursor-pointer'}>
                                    {jamTaste?.name}
                                  </span>
                                )}
                              </RadioGroup.Option>
                            ))
                            }
                          </RadioGroup>
                      }
                    </div>
                    <div className='mt-4'>
                      <div className="flex justify-between items-start">
                        <h3 className="text-[13px] font-semibold text-gray-900">Nội dung lời chúc trên bánh:<br/>(có thể để trống)</h3>
                        <button onClick={toggleQuoteInstructionModal} className="text-[12px] font-semibold text-gray-900 hover:text-messenger-blue">
                          *Lưu ý khi viết lời chúc
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder='...lời chúc tối đa 70 ký tự'
                        onBlur={beforeUpdateQuote}
                        className="block w-full text-[13px] rounded-xl font-semibold text-messenger-blue border-gray-300 shadow-sm mt-1 focus:border-gray-500 focus:ring-0"
                        maxLength={70}
                      />
                    </div>
                    <div className='mt-4'>
                      <div className="flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold text-gray-900">Chọn loại nến (nến được tặng kèm):</h3>
                      </div>
                      <RadioGroup value={selectedCandle} onChange={setSelectedCandle}>
                        <div className="grid gap-y-2 grid-cols-2 gap-x-4">
                          {candleLists.map((candle) => (
                            <RadioGroup.Option
                              key={candle.id}
                              value={candle}
                              className={({ checked, active }) =>
                                classNames(
                                  checked ? 'border-transparent' : 'border-gray-200',
                                  active ? 'border-blue-500 ring-none' : '',
                                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                )
                              }
                            >
                              {({ checked, active }) => (
                                <>
                                  <span className="flex flex-1">
                                    <span className="flex flex-col">
                                      <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900 ">
                                        {candle?.title}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                          <img
                                            src={candle.imageSrc}
                                            alt={candle.imageAlt}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                          />
                                        </div>
                                      </RadioGroup.Description>
                                    </span>
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
                    { selectedCandle.id === 2 &&
                      <div className='mt-1'>
                        <div className="flex items-center">
                          <h3 className="text-[13px] font-semibold text-gray-900">Chọn số nến:</h3>
                        </div>
                        <PatternFormat
                          type='text'
                          value={candleNumber}
                          format="##"
                          onValueChange={(values) => {
                            setCandleNumber(values.formattedValue)
                          }}
                          className='flex w-full text-[13px] rounded-xl font-semibold text-messenger-blue border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0'
                        />
                      </div>
                    }
                  </>
                  :
                  <>
                    <div><p className="mt-1 text-xl md:text-2xl font-semibold text-green-500">
                      <NumericFormat
                        value={cake.unitPrice}
                        displayType={'text'}
                        suffix={' đ'}
                        thousandSeparator={true}
                        decimalScale={2}
                        thousandsGroupStyle="thousand"/>
                    </p></div>
                  </>
              }

              <div className='flex mt-8 gap-4'>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-gray-900">Số lượng:</span>
                </div>
                <div className='flex border border-gray-900 rounded-full px-3 py-1 gap-2 items-center w-32 justify-between'>
                  <button onClick={decrement}><MinusIcon className='w-4 h-4' /></button>
                  <div className='px-2'><span className='font-medium text-base'>{quantity}</span></div>
                  <button onClick={increment}><PlusIcon className='w-4 h-4' /></button>
                </div>
                <button
                  className='flex basis-1/2 border border-gray-900 font-medium rounded-full px-3 py-2 gap-2 items-center justify-center hover:bg-gray-700 hover:text-white'
                  onClick={beforeHandleOrderNow}
                >
                  <BsCartPlus className='h-6 w-6'/><p>Mua ngay</p>
                </button>
              </div>
              {/* <div className='flex mt-4 gap-4 sm:gap-8 text-[15px] font-medium'>
                <button className='flex basis-1/2 border border-gray-900 font-medium rounded-full px-3 py-2 gap-2 items-center justify-center hover:bg-gray-700 hover:text-white'>
                  <BsCartPlus className='h-6 w-6'/><p>Mua ngay</p>
                </button>
              </div> */}
              <div className='grid grid-cols-2 px-4 sm:px-12 border-y border-gray-300 text-gray-700 my-6 sm:my-8 py-4 gap-x-8 sm:gap-x-10 gap-y-4'>
                <div className='flex flex-col justify-center items-center'>
                  <IoIosSnow className='w-8 h-8'/>
                  <div className='mt-1 text-xs font-medium text-center'>100% không chất bảo quản, bánh mới hàng ngày</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <FaShippingFast className='w-8 h-8'/>
                  <div className='mt-1 text-xs font-medium text-center'>Giao hàng tận nơi tại TP Biên Hòa</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <FaRegMoneyBillAlt className='w-8 h-8'/>
                  <div className='text-xs font-medium text-center'>Free ship bán kính 5Km với đơn hàng từ 300K</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <PhoneIcon className='w-8 h-8'/>
                  <div className='mt-1 text-xs font-medium text-center'>Hotline đặt bánh và hỗ trợ: 0393.568.963</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-gray-900">Mô tả sản phẩm:</h3>
                </div>
                <div className="flex items-center justify-between" data-color-mode="light">
                  <MDEditor.Markdown source={cake.description}/>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
      {/* Hướng dẫn chọn size */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                  <div className="absolute top-0 right-0 pt-4 pr-4 block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-none"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start mt-4">
                    <div className="text-left sm:mt-0 w-full">
                      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                        <Tab.List className="flex space-x-1 rounded-3xl bg-white sm:w-2/3 border-2 border-gray-200">
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                'w-full rounded-2xl py-2 text-sm font-medium leading-5 text-gray-700',
                                selected
                                  ? 'bg-gray-200 text-gray-900 shadow'
                                  : 'text-gray-700'
                              )
                            }>Hướng dẫn chọn size</Tab>
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                'w-full rounded-2xl py-2 text-sm font-medium leading-5 text-gray-700',
                                selected
                                  ? 'bg-gray-200 text-gray-900 shadow'
                                  : 'text-gray-700 '
                              )
                            }>Lưu ý khi viết lời chúc</Tab>
                        </Tab.List>
                        <Tab.Panels className='mt-3'>
                          <Tab.Panel
                            className='rounded-xl bg-white text-[13px]'
                          >
                            <div className='mt-2'>
                              <table className="min-w-full divide-y divide-gray-300 mb-2">
                                <tbody className="divide-y divide-gray-200 bg-white font-medium border-y border-gray-200">
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">Size 10cm</td>
                                    <td className="whitespace-normal px-3 py-2 text-sm text-gray-700">dành cho 1-2 người ăn</td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">Size 12cm</td>
                                    <td className="whitespace-normal px-3 py-2 text-sm text-gray-700">dành cho 2-3 người ăn</td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">Size 14cm</td>
                                    <td className="whitespace-normal px-3 py-2 text-sm text-gray-700">dành cho 2-4 người ăn</td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">Size 16cm</td>
                                    <td className="whitespace-normal px-3 py-2 text-sm text-gray-700">dành cho 2-5 người ăn</td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">Size 18cm</td>
                                    <td className="whitespace-normal px-3 py-2 text-sm text-gray-700">dành cho 3-6 người ăn</td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">Size 20cm</td>
                                    <td className="whitespace-normal px-3 py-2 text-sm text-gray-700">dành cho 4-8 người ăn</td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">Size 22cm</td>
                                    <td className="whitespace-normal px-3 py-2 text-sm text-gray-700">dành cho 5-10 người ăn</td>
                                  </tr>
                                </tbody>
                              </table>
                              <p className='font-bold text-messenger-blue'>Đối với các mẫu bánh tròn</p>
                              <div className='grid grid-cols-2 gap-2 sm:gap-4 font-medium'>
                                <div className='text-justify'>
                                  <p>Size bánh là đường kính cốt bánh bông lan (chưa bao gồm kem phủ bên ngoài)</p>
                                  <p>Chiều cao bánh từ 8cm - 12cm tùy mẫu bánh</p>
                                </div>
                                <div className='flex flex-col'>
                                  <div className='w-full text-center font-semibold text-green-500'>Ví dụ: mẫu tròn, size 12cm</div>
                                  <div className='w-full flex justify-center relative mt-1'>
                                    <img src={MauTron} className=' w-[100px] border border-gray-200 rounded-full'/>
                                    <p className='absolute top-8'>12cm</p>
                                  </div>
                                </div>
                              </div>
                              <p className='font-bold text-messenger-blue'>Đối với các mẫu bánh vuông/chữ nhật</p>
                              <div className='grid grid-cols-2 gap-2 sm:gap-4 font-medium'>
                                <div className='text-justify'>
                                  <p>Size bánh là chiều dài cạnh phần cốt bánh bông lan (chưa bao gồm kem phủ bên ngoài)</p>
                                  <p>Chiều cao bánh từ 8cm - 12cm tùy mẫu bánh</p>
                                </div>
                                <div className='flex flex-col'>
                                  <div className='w-full text-center font-semibold text-green-500'>Ví dụ: mẫu vuông, size 12cm</div>
                                  <div className='w-full flex justify-center relative mt-1'>
                                    <img src={MauVuong} className=' w-[100px]'/>
                                    <p className='absolute top-8 right-10 sm:right-8'>12cm</p>
                                  </div>
                                </div>
                              </div>
                              <p className='font-bold text-messenger-blue'>Đối với các mẫu bánh hình đặc biệt</p>
                              <div className='text-justify font-medium'>
                                <p>Size bánh sẽ được mô tả theo thông tin mẫu bánh</p>
                              </div>
                            </div>
                          </Tab.Panel>
                          <Tab.Panel
                            className='rounded-xl bg-white text-[13px] font-medium'>
                            <div className='text-justify'>
                              <p className='font-bold text-messenger-blue'>Với các mẫu bánh mà Bạn muốn ghi lời chúc trên bánh hoặc đế bánh</p>
                              <br/>
                              Bạn vui lòng chỉ nhập nội dung cần ghi trên bánh.<br/><br/>
                              Nếu nội dung có ký hiệu, hình vẽ đặc biệt Bạn vui lòng gọi trực tiếp 0393 568 963 hoặc nhắn tin qua fanpage.<br/><br/>

                              Để tránh hiểu nhầm, đối với xưng hô: anh / Anh / chị / Chị,... và tên riêng, nickname (ví dụ như samSon, Samson), Bạn vui lòng ghi đúng các từ in hoa, in thường mà Bạn muốn nhé ^^
                              <br/><br/>
                              Mynie Sweets sẽ ghi lên bánh theo đúng như thông tin của Bạn điền.

                              <br/><br/>
                              Bạn cũng yên tâm vì Mynie Sweets sẽ liên hệ Bạn để confirm những thông tin này nhằm tránh những lỗi nhỏ nhất có thể ảnh hưởng đến chiếc Bánh của Bạn.
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </MainLayout>
  )
}

export default PageProductDetail