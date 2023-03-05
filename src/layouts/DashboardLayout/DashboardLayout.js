import React, { Fragment, useState } from 'react'
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarDaysIcon,
  GlobeAsiaAustraliaIcon,
  HomeIcon,
  XMarkIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  CircleStackIcon,
  SquaresPlusIcon,
  ComputerDesktopIcon,
  GiftIcon,
  InboxIcon,
  UsersIcon,
  PhoneIcon,
  InboxStackIcon
} from '@heroicons/react/24/outline'
import LogoMynieHeader from 'resources/images/logo-mynie-header.png'

import UserAvatar from 'components/Common/UserAvatar'

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, signOutUserAPI } from 'redux/user/userSlice'
import { Link } from 'react-router-dom'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function DashboardLayout ({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
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
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
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
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      <div className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white'>
                        <HomeIcon className='mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300'/>
                        <span>Dashboard</span>
                      </div>
                      <Disclosure as="div" className="space-y-1">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className='group w-full flex items-center px-2 py-2 text-left text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white'
                            >
                              <HomeIcon className="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
                              <span className="flex-1">Calendar</span>
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
                            <Disclosure.Panel className="space-y-1">
                              <Disclosure.Button
                                as={Link}
                                to={'/'}
                                className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              >
                                Home1
                              </Disclosure.Button>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
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
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-56 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-white shadow-md">
            <Link
              to={'/'}
              className="flex h-16 flex-shrink-0 items-center bg-white px-4">
              <img
                className="h-8 w-auto"
                src={LogoMynieHeader}
                alt="Mynie Sweets"
              />
            </Link>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                <Link
                  to={'/dashboard'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <HomeIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Tổng quan</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <CalendarDaysIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Lịch</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <BuildingStorefrontIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Cửa hàng</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <ShoppingBagIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Đơn hàng</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <CircleStackIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Kho</span>
                </Link>
                <Link
                  to={`/u/${user?.username}/cakesSetting?`}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <SquaresPlusIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Sản phẩm</span>
                </Link>
                <Disclosure as="div" className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className='group w-full flex items-center pl-2 pr-1 py-2 text-left text-base font-semibold rounded-md bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                      >
                        <DocumentChartBarIcon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
                        <span className="flex-1">Danh mục</span>
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
                      <Disclosure.Panel className="space-y-1">
                        <Disclosure.Button
                          as={Link}
                          to={`/u/${user?.username}/cakeTypesSetting?`}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Danh mục loại sp
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={`/u/${user?.username}/cakeStylesSetting?`}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Danh mục mẫu sp
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={`/u/${user?.username}/generalSetting?`}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Danh mục chung
                        </Disclosure.Button>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <CurrencyDollarIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Sổ quỹ</span>
                </Link>
                <Disclosure as="div" className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className='group w-full flex items-center pl-2 pr-1 py-2 text-left text-base font-semibold rounded-md bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                      >
                        <DocumentChartBarIcon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
                        <span className="flex-1">Báo cáo</span>
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
                      <Disclosure.Panel className="space-y-1">
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Cuối ngày
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Bán hàng
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Đặt hàng
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Khách hàng
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Nhà cung cấp
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Nhân viên
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Tài chính
                        </Disclosure.Button>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <GiftIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Voucher</span>
                </Link>
                <Disclosure as="div" className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className='group w-full flex items-center pl-2 pr-1 py-2 text-left text-base font-semibold rounded-md bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                      >
                        <GlobeAsiaAustraliaIcon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
                        <span className="flex-1">Khách hàng</span>
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
                      <Disclosure.Panel className="space-y-1">
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Thống kê
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Feedback
                        </Disclosure.Button>
                        <Disclosure.Button
                          as={Link}
                          to={'/'}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Blacklist
                        </Disclosure.Button>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className='group w-full flex items-center pl-2 pr-1 py-2 text-left text-base font-semibold rounded-md bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                      >
                        <ComputerDesktopIcon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
                        <span className="flex-1">Web content</span>
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
                      <Disclosure.Panel className="space-y-1">
                        <Disclosure.Button
                          as={Link}
                          to={`/u/${user?.username}/webContentSetting?`}
                          className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Thứ tự hiển thị
                        </Disclosure.Button>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <InboxIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Tài liệu</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <UsersIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Nhân viên</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <PhoneIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Danh bạ</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 text-base font-semibold rounded-lg'>
                  <InboxStackIcon className='mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'/>
                  <span>Tài khoản</span>
                </Link>
                <Link
                  to={'/'}
                  className='bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 group w-full flex items-center pl-2 py-2 mt-8 text-sm font-semibold rounded-lg'>
                  <span className='px-4 underline'>myniesweets.vn</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:pl-56">
          <div className="sticky top-0 z-10 flex h-14 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1"></div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-none"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-none">
                      <UserAvatar user={user}/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <Link
                          to={`/u/${user?.username}`}
                          className='flex px-4 py-2 items-center hover:bg-gray-100 text-sm font-semibold text-gray-700 gap-6'>
                          <Cog8ToothIcon className='flex w-5 h-5'/> Cài đặt
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        onClick = { () => dispatch(signOutUserAPI())}>
                        <Link className='flex px-4 py-2 items-center hover:bg-gray-100 text-sm font-semibold text-gray-700 gap-6'>
                          <ArrowRightOnRectangleIcon className='flex w-5 h-5'/> Đăng xuất
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 bg-slate-50 min-h-[calc(100vh-56px)] overflow-y-auto">
            <div className="py-6">
              <div className="mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
export default DashboardLayout