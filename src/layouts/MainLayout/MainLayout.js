import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import LogoMynieYellow from 'resources/images/logo-mynie-yellow.png'

import '../MainLayout/MainLayout.css'
import Header from 'components/GuestSite/Header/Header'
import { Link } from 'react-router-dom'
import Footer from 'components/GuestSite/Footer/Footer'

import { useDispatch, useSelector } from 'react-redux'
import { fetchFullCategoryDetailsAPI, selectCurrentFullCategory } from 'redux/activeCategory/activeCategorySlice'
import { isEmpty } from 'lodash'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const category = useSelector(selectCurrentFullCategory)
  const [ cakeTypes, setCakeTypes ] = useState(null)
  const [ cakeStyles, setCakeStyles ] = useState(null)
  //

  useEffect(() => {
    setLoading(true)
    dispatch(fetchFullCategoryDetailsAPI()).finally(() => {
      setLoading(false)
    })
  }, [dispatch])

  useEffect(() => {
    if (category) {
      setCakeTypes(category.cakeTypes)
      setCakeStyles(category.cakeStyles)
    }
  }, [category])

  return (
    <div className='h-full max-w-full bg-gradient-to-r from-rose-100 to-teal-100'>
      <>
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Link to='/'>
                        <img
                          className="h-36 w-auto"
                          src={LogoMynieYellow}
                          alt="MYNIE SWEETS"
                        />
                      </Link>
                    </div>
                    <div className="mt-2 h-0 flex-1 overflow-y-auto">
                      <nav className="px-4">
                        <Link
                          className='group flex items-center px-2 py-1.5 text-sm sm:text-base font-bold rounded-md text-gray-800'
                          to={'/all-product?'}
                        >
                          <span>Tất cả sản phẩm</span>
                        </Link>
                        <Disclosure as="div" className="">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className='group w-full flex items-center px-2 py-1.5 text-left text-sm sm:text-base font-bold rounded-md text-gray-800'
                              >
                                <span className="flex-1">Danh mục sản phẩm</span>
                                <svg
                                  className={classNames(
                                    open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                    'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                                  )}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="">
                                {
                                  !isEmpty(cakeTypes) && cakeTypes.map(cakeType => (
                                    <Disclosure.Button
                                      key={cakeType._id}
                                      as={Link}
                                      to={`/collection/${cakeType._id}`}
                                      className="group flex w-full normal-case items-center rounded-md py-1.5 pl-8 pr-2 text-sm font-normal text-gray-600 hover:bg-gray-50 hover:font-semibold hover:text-gray-900"
                                    >
                                      {cakeType.title}
                                    </Disclosure.Button>
                                  ))
                                }
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className='group w-full flex items-center px-2 py-1.5 text-left text-sm sm:text-base font-bold rounded-md text-gray-800'
                              >
                                <span className="flex-1">Theo nhu cầu</span>
                                <svg
                                  className={classNames(
                                    open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                    'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                                  )}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="">
                                {
                                  !isEmpty(cakeStyles) && cakeStyles.map(cakeStyle => (
                                    <Disclosure.Button
                                      key={cakeStyle._id}
                                      as={Link}
                                      to={`/style/${cakeStyle._id}`}
                                      className="group flex w-full normal-case items-center rounded-md py-1.5 pl-8 pr-2 text-sm font-normal hover:font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                      {cakeStyle.title}
                                    </Disclosure.Button>
                                  ))
                                }
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Link
                          to='/feedback'
                          className='group flex items-center px-2 py-1.5 text-sm sm:text-base font-bold normal-case rounded-md text-gray-800'>
                          <span>Gửi phản hồi</span>
                        </Link>
                        <div className='group flex items-center px-2 py-1.5 text-sm sm:text-base font-bold normal-case text-gray-800 border-gray-800 border-b'>
                        </div>
                        <Link
                          className='group flex items-center px-2 py-1.5 text-sm sm:text-base font-bold rounded-md text-gray-800'
                          to={'/about-us'}
                        >
                          <span>Về Mynie Sweets</span>
                        </Link>
                        <Link
                          className='group flex items-center px-2 py-1.5 text-sm sm:text-base font-bold rounded-md text-gray-800'
                          to={'/delivery'}
                        >
                          <span>Chính sách giao hàng</span>
                        </Link>
                        <Link
                          className='group flex items-center px-2 py-1.5 text-sm sm:text-base font-bold rounded-md text-gray-800'
                          to={'/faqs'}
                        >
                          <span>Câu hỏi thường gặp</span>
                        </Link>
                        <div className='group flex items-center px-2 py-1.5 text-sm sm:text-base font-bold normal-case rounded-md text-gray-800'>
                          <a href='tel:+84393568963'>Hotline: <span className='text-base italic underline underline-offset-4'>0393.568.963</span></a>
                        </div>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="flex flex-col">
            <div className='flex flex-col sticky top-0 z-10  h-20 md:h-28 flex-shrink-0 bg-white shadow place-content-between pb-2'>
              <div className='flex text-xs text-mn-blue h-8 items-center bg-yellow-200 border-b'>
                <div className="wrapper">
                  <div className="marquee space-x-20 font-bold items-center">
                    <p>
                      Gọi 0393 568 963 để được hỗ trợ nếu bạn cần bánh giao gấp
                    </p>
                    <p>
                      Giao bánh tận nơi tại TP Biên Hòa
                    </p>
                    <p>
                      Miễn phí giao hàng trong bán kính cách cửa hàng 5 Km với đơn hàng từ 300k
                    </p>

                    <p>
                      Gọi 0393 568 963 để được hỗ trợ nếu bạn cần bánh giao gấp
                    </p>
                    <p>
                      Giao bánh tận nơi tại TP Biên Hòa
                    </p>
                    <p>
                      Miễn phí giao hàng trong bán kính cách cửa hàng 5 Km với đơn hàng từ 300k
                    </p>
                    <p>
                      Gọi 0393 568 963 để được hỗ trợ nếu bạn cần bánh giao gấp
                    </p>
                    <p>
                      Giao bánh tận nơi tại TP Biên Hòa
                    </p>
                    <p>
                      Miễn phí giao hàng trong bán kính cách cửa hàng 5 Km với đơn hàng từ 300k
                    </p>

                    <p>
                      Gọi 0393 568 963 để được hỗ trợ nếu bạn cần bánh giao gấp
                    </p>
                    <p>
                      Giao bánh tận nơi tại TP Biên Hòa
                    </p>
                    <p>
                      Miễn phí giao hàng trong bán kính cách cửa hàng 5 Km với đơn hàng từ 300k
                    </p>
                    <p>
                      Gọi 0393 568 963 để được hỗ trợ nếu bạn cần bánh giao gấp
                    </p>
                    <p>
                      Giao bánh tận nơi tại TP Biên Hòa
                    </p>
                    <p>
                      Miễn phí giao hàng trong bán kính cách cửa hàng 5 Km với đơn hàng từ 300k
                    </p>

                    <p>
                      Gọi 0393 568 963 để được hỗ trợ nếu bạn cần bánh giao gấp
                    </p>
                    <p>
                      Giao bánh tận nơi tại TP Biên Hòa
                    </p>
                    <p>
                      Miễn phí giao hàng trong bán kính cách cửa hàng 5 Km với đơn hàng từ 300k
                    </p>
                    <p>
                      Gọi 0393 568 963 để được hỗ trợ nếu bạn cần bánh giao gấp
                    </p>
                    <p>
                      Giao bánh tận nơi tại TP Biên Hòa
                    </p>
                    <p>
                      Miễn phí giao hàng trong bán kính cách cửa hàng 5 Km với đơn hàng từ 300k
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-shrink-0'>
                <button
                  type="button"
                  className="px-4 text-gray-500 focus:outline-none focus:ring-none"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex flex-1 justify-between px-4">
                  <div className="flex"></div>
                  <div className="flex items-center">
                    <Link to="/">
                      <span className="font-bold text-2xl sm:text-3xl text-mn-blue">MYNIE SWEETS</span>
                    </Link>
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* <button
                      type="button"
                      className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-none"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                  </div>
                </div>
              </div>
              <div className='flex flex-shrink-0 justify-center items-center'>
                <Header cakeStyles={cakeStyles} cakeTypes={cakeTypes}/>
              </div>
            </div>

            <main className="flex-1 bg-white min-h-[calc(100vh-496px)] overflow-y-auto pb-32">
              <div className="mx-auto">
                {children}
              </div>
            </main>
            <Footer cakeStyles={cakeStyles} cakeTypes={cakeTypes}/>
          </div>
        </div>
      </>
    </div>
  )
}
