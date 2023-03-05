import React, { useState } from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header(props) {

  const [isShowing, setIsShowing] = useState(false)

  const { cakeTypes, cakeStyles } = props

  return (
    <Popover.Group className="hidden lg:flex lg:self-center items-center">
      <div className="flex h-full space-x-16">
        <Popover className="flex">
          {({ open }) => (
            <>
              <div className="relative flex">
                <Popover.Button
                  onMouseEnter={() => setIsShowing(true)}
                  onMouseLeave={() => setIsShowing(false)}
                  className={classNames(
                    open
                      ? 'border-gray-400 text-gray-400'
                      : 'border-transparent text-mn-blue hover:text-gray-400',
                    'relative z-10 flex items-center border-b-2 pt-px text-sm font-bold transition-colors duration-200 ease-out uppercase'
                  )}
                >
                  DANH MỤC BÁNH
                </Popover.Button>
              </div>

              <Transition
                show={isShowing}
                onMouseEnter={() => setIsShowing(true)}
                onMouseLeave={() => setIsShowing(false)}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  className="absolute inset-x-0 top-full text-sm text-gray-500">
                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                  <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                  <div className="relative bg-white">
                    <div className="mx-auto max-w-7xl px-8">
                      <div className="grid grid-cols-2 gap-x-8 py-4">
                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                        </div>
                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-16 text-sm">
                          <div>
                            <Link
                              to='/collection/all'
                              className="font-bold text-gray-900">
                              TẤT CẢ SẢN PHẨM
                            </Link>
                            <ul
                              role="list"
                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                            >
                              {!isEmpty(cakeTypes) && cakeTypes.map((cakeType) => (
                                <Link
                                  key={cakeType._id}
                                  className="flex font-semibold text-sm"
                                  to={`/collection/${cakeType._id}`}>
                                  <span className="hover:text-messenger-blue">
                                    {cakeType.title}
                                  </span>
                                </Link>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              THEO NHU CẦU
                            </p>
                            <ul
                              role="list"
                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                            >
                              {!isEmpty(cakeStyles) && cakeStyles.map((cakeStyle) => (
                                <Link
                                  key={cakeStyle._id}
                                  className="flex font-semibold text-sm"
                                  to={`/style/${cakeStyle._id}`}>
                                  <span className="hover:text-messenger-blue">
                                    {cakeStyle.title}
                                  </span>
                                </Link>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Link
          to='/delivery'
          className="flex items-center text-sm font-bold text-gray-700 hover:text-gray-800 cursor-pointer"
        >
          CHÍNH SÁCH GIAO HÀNG
        </Link>

        <Link
          to='/faqs'
          className="flex items-center text-sm font-bold text-gray-700 hover:text-gray-800 cursor-pointer"
        >
          CÂU HỎI THƯỜNG GẶP
        </Link>

        <Link
          to='/about-us'
          className="flex items-center text-sm font-bold text-gray-700 hover:text-gray-800 cursor-pointer"
        >
          VỀ MYNIE SWEETS
        </Link>

        <Link
          to='/feedback'
          className="flex items-center text-sm font-bold text-gray-700 hover:text-gray-800 cursor-pointer"
        >
          GỬI PHẢN HỒI
        </Link>
      </div>
    </Popover.Group>
  )
}
