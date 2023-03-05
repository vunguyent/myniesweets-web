import React, { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import ConfirmModal from 'components/Common/ConfirmModal'

import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
//const
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { useDispatch } from 'react-redux'
import { updateCurrentActiveCakeStyleSetting } from 'redux/activeCakeStyleSetting/activeCakeStyleSettingSlice'
import { updateCakeStyleAPI } from 'actions/ApiCall'

function CakeStyleSetting( props ) {
  const dispatch = useDispatch()
  const { cakeStyle, onUpdateCakeStyleState } = props

  //Hien thi confirm modal
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () =>
  {
    setShowConfirmModal(!showConfirmModal)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const onConfirmModalAction = (type) => {
    //console.log(type)
    if (type === MODAL_ACTION_CONFIRM) {
      //remove ProductType
      const newCakeStyle = {
        ...cakeStyle,
        _destroy: true
      }
      //Call API
      updateCakeStyleAPI(newCakeStyle._id, newCakeStyle).then(updatedCakeStyle => {
        onUpdateCakeStyleState(updatedCakeStyle)
      })
    }
    toggleShowConfirmModal()
  }

  const setActiveCakeStyleSetting = () => {
    dispatch(updateCurrentActiveCakeStyleSetting(cakeStyle))
  }

  return (
    <>
      <div key={cakeStyle.id} className="group relative">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={cakeStyle.cover}
            alt={cakeStyle.title}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-base text-gray-700 font-normal">
              <div>
                <span aria-hidden="true" className="absolute inset-0" />
                { cakeStyle.title }
              </div>
            </h3>
            <div className='flex'>
              { cakeStyle.status
                ? <p className="mt-1 text-xs text-green-700 font-semibold bg-green-200 px-4 py-0.5 rounded-full">Hiện</p>
                : <p className="mt-1 text-xs text-red-700 font-semibold bg-red-200 px-4 py-0.5 rounded-full">Ẩn</p> }
            </div>
          </div>
          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={setActiveCakeStyleSetting}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-500',
                        'flex px-4 py-2 text-sm'
                      )}
                    >
                      <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
                      <span>Xem chi tiết</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-500',
                        'flex px-4 py-2 text-sm'
                      )}
                      onClick={toggleShowConfirmModal}
                    >
                      <TrashIcon className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
                      <span>Xóa</span>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <ConfirmModal
        show = {showConfirmModal}
        onAction = {onConfirmModalAction}
        title="Xác nhận xóa kiểu vừa chọn"
        content={`Bạn có chắc chắn muốn xóa kiểu <strong>${cakeStyle.title}</strong>!<br/>Tất cả các sản phẩm nằm trong danh mục này cũng sẽ bị xóa!`}
      />
    </>
  )
}

export default React.memo(CakeStyleSetting)


