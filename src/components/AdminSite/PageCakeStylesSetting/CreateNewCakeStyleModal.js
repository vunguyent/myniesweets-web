import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import {
  fieldErrorMessage
} from 'utilities/validators'

function CreateCakeStyleModal({ show, onClose, onCreateNewCakeStyle }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const cakeStyleTitleInputRef = useRef(null)

  const onSubmit = (data) => {
    onCreateNewCakeStyle(data).then( () => {
      onClose()
      // resetForm()
      reset()
    })
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cakeStyleTitleInputRef} onClose={onClose}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=" w-full sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" >
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Thêm mẫu sản phẩm
                      </Dialog.Title>
                      <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Tiêu đề
                        </label>
                        <div className="mt-1 w-full">
                          <input
                            ref={cakeStyleTitleInputRef}
                            type="text"
                            className="block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                            placeholder="Nhập tiêu đề mẫu sản phẩm"
                            {...register('title', {
                              required: { value: true, message: 'Tiêu đề là bắt buộc.' },
                              minLength: { value: 3, message: 'Tiêu đề tối thiếu 3 ký tự.' },
                              maxLength: { value: 50, message: 'Tiêu đề tối đa 50 ký tự.' }
                            })}
                          />
                        </div>
                        {fieldErrorMessage(errors, 'title')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Thêm
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={onClose}
                    >
                      Hủy
                    </button>
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

export default CreateCakeStyleModal