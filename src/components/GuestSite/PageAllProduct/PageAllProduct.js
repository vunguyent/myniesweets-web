import MainLayout from 'layouts/MainLayout/MainLayout'
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from 'components/Common/LoadingSpinner'
import { NumericFormat } from 'react-number-format'
import { fetchListActiveCakesAPI } from 'actions/ApiCall'
import { isEmpty } from 'lodash'
import { fetchFullCategoryDetailsAPI, selectCurrentFullCategory } from 'redux/activeCategory/activeCategorySlice'
import { Link } from 'react-router-dom'

const filters = [
  { id: 1, name: 'Mới nhất' },
  { id: 2, name: 'Giá cao đến thấp' },
  { id: 3, name: 'Giá thấp đến cao' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PageAllProduct() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const category = useSelector(selectCurrentFullCategory)
  const [ cakeTypes, setCakeTypes ] = useState(null)
  const [ cakes, setCakes ] = useState([])
  //
  const [ page, setPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(0)
  //
  const isFilterApplied = useRef(false)
  const [type, setType] = useState('all')
  const [typeName, setTypeName] = useState('all')
  //
  const [selected, setSelected] = useState(filters[0])
  useEffect(() => {
    setLoading(true)
    dispatch(fetchFullCategoryDetailsAPI()).finally(() => {
      setLoading(false)
    })
  }, [dispatch])

  useEffect(() => {
    if (category) {
      setCakeTypes(category.cakeTypes)
    }
  }, [category])

  useEffect(() => {
    isFilterApplied.current = true
    setPage(1)
    const searchPath = `?type=${type}&currentPage=1&itemsPerPage=20&filter=${selected.id}`
    fetchListActiveCakesAPI(searchPath).then((res) => {
      setCakes(res.cakes)
      setTotalPages(Math.ceil(res.totalCakes / 2))
    })
  }, [type, selected])

  useEffect(() => {
    if (isFilterApplied.current) {
      return
    }
    const fetchData = async () => {
      const searchPath = `?type=${type}&currentPage=${page}&itemsPerPage=20&filter=${selected.id}`
      fetchListActiveCakesAPI(searchPath).then((res) => {
        setCakes(pre => [...pre, ...res.cakes])
        setTotalPages(Math.ceil(res.totalCakes / 2))
      })
    }
    fetchData()
  }
  , [type, page, selected])

  const nextPage = (page) => {
    isFilterApplied.current = false
    setPage(page + 1)
  }
  const setTypeInfo = (cakeType) => {
    setType(cakeType._id)
    setTypeName(cakeType.title)
  }

  if (loading)
  {
    return <LoadingSpinner/>
  }
  return (
    <MainLayout>
      <div className='block flex-col'>
        {/* header filter */}
        <div className='border-b border-gray-300 py-6'>
          <div className="px-2 flex flex-wrap justify-center gap-y-2 md:gap-y-4 mx-auto max-w-7xl content-center">
            <div className="basis-1/3 sm:basis-1/4 md:basis-1/6 px-1 sm:px-2">
              <div
                className="aspect-w-3 aspect-h-2"
              >
                <button
                  className='cursor-pointer focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 rounded-xl hover:opacity-80'
                  onClick={() => setTypeInfo({ _id: 'all', title: 'Tất cả sản phẩm' })}
                >
                  <div className="relative flex h-full w-full justify-center items-center">
                    <div className='absolute flex text-sm font-extrabold text-red-300 uppercase mx-auto my-auto items-center h-full w-full ring-1 ring-gray-300 ring-inset rounded-xl'>
                      <span className='mx-auto text-center'>
                        TẤT CẢ SẢN PHẨM
                      </span>
                    </div>
                    {/* <img
                      // src={cakeType.cover}
                      alt="ALL"
                      className="h-full w-full object-cover object-center rounded-xl"
                    /> */}
                  </div>
                </button>
              </div>
            </div>
            {
              isEmpty(cakeTypes)
                ?<div>Loading ...</div>
                :
                cakeTypes.map((cakeType) => (
                  <div key={cakeType._id} className="basis-1/3 sm:basis-1/4 md:basis-1/6 px-1 sm:px-2">
                    <div
                      className="aspect-w-3 aspect-h-2"
                    >
                      <button
                        className='cursor-pointer focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 rounded-xl hover:opacity-80'
                        onClick={() => setTypeInfo(cakeType)}
                      >
                        <div className="relative flex h-full w-full justify-center items-center">
                          <div className='absolute flex text-sm font-extrabold text-white uppercase mx-auto my-auto items-center'>
                            <span className='mx-auto text-center'>{cakeType.title}</span>
                          </div>
                          <img
                            src={cakeType.cover}
                            alt={cakeType.title}
                            className="h-full w-full object-cover object-center rounded-xl"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="pt-4 pb-4 sm:pb-8 px-4 md:px-16">
          <div className="flex flex-col sm:flex-row item-center py-4 md:py-6">
            <div className='flex text-base sm:text-lg font-bold text-gray-600 uppercase items-center mr-2 sm:mr-8'>
              <span>{typeName}</span>
            </div>
            <div className='flex flex-row items-center space-x-2'>
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block sm:hidden text-xs font-semibold text-gray-700">Sắp xếp: </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-40 cursor-default rounded-full border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm text-xs font-semibold">
                        <span className="block truncate">{selected.name}</span>
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
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs font-semibold shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {filters.map((filter) => (
                            <Listbox.Option
                              key={filter.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white bg-mn-blue' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-8 pr-4'
                                )
                              }
                              value={filter}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                    {filter.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-mn-blue',
                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
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
          <div className="grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 pb-4 sm:pb-6">
            {
              isEmpty (cakes)
                ?<div>Chưa có sản phẩm ...</div>
                :
                cakes.map((cake, i) => {
                  const priceBySizesArray = cake?.priceBySizes
                  var lowest = Number.POSITIVE_INFINITY
                  var highest = Number.NEGATIVE_INFINITY
                  var tmp
                  if ( !isEmpty(priceBySizesArray)) {
                    for (var index=priceBySizesArray.length-1; index>=0; index--) {
                      tmp = priceBySizesArray[index].price
                      if (tmp < lowest) lowest = tmp
                      if (tmp > highest) highest = tmp
                    }
                  }
                  return (
                    <div key={i} className="group relative flex flex-col ">
                      <div className='relative '>
                        <div className="aspect-w-7 aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={cake.cover}
                            alt={cake.name}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <Link
                          to={`/product/${cake._id}`}
                          className="text-center uppercase tracking-wider py-3 px-8 text-sm font-semibold cursor-pointer z-10 absolute bg-white text-mn-blue hover:text-white hover:bg-mn-blue w-8/12 rounded-full bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn">
                            Xem Mẫu
                        </Link>
                      </div>
                      <h3 className="mt-4 text-sm font-bold text-gray-700 line-clamp-2">{cake.name}</h3>
                      {isEmpty(priceBySizesArray) ?
                        <div className='grow flex items-end'>
                          <p className="mt-1 text-xs font-semibold text-red-400">
                            <NumericFormat
                              value={cake.unitPrice}
                              displayType={'text'}
                              suffix={' đ'}
                              thousandSeparator={true}
                              decimalScale={2}
                              thousandsGroupStyle="thousand"/>
                          </p>
                        </div>
                        :
                        <div className='grow flex items-end'>
                          <p className="mt-1 text-xs font-semibold text-red-400">
                            <NumericFormat
                              value={lowest}
                              displayType={'text'}
                              suffix={'đ'}
                              thousandSeparator={true}
                              decimalScale={2}
                              thousandsGroupStyle="thousand"/> - <NumericFormat
                              value={highest}
                              displayType={'text'}
                              suffix={'đ'}
                              thousandSeparator={true}
                              decimalScale={2}
                              thousandsGroupStyle="thousand"/>
                          </p>
                        </div>
                      }
                    </div>
                  )})}
          </div>
          { page < totalPages &&
            <div className='flex items-center justify-center'>
              <button className='bg-mn-yellow text-sm text-mn-blue px-4 py-2 rounded-full hover:bg-messenger-blue hover:text-white font-bold' onClick={() => nextPage(page)}>Xem thêm mẫu</button>
            </div>
          }

          { page >= totalPages &&
            <p className='mt-4' style={{ textAlign: 'center' }}>
              <b>Bạn đã xem tất cả các mẫu hiện có, chúng mình sẽ tiếp tục cập nhật các mẫu bánh mới ^^</b>
            </p>
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default PageAllProduct