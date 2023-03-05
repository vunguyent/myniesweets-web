import React from 'react'
import { FiSend } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { feedbackAPI } from 'actions/ApiCall'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'

import {
  FIELD_REQUIRED_MESSAGE,
  fieldErrorMessage
} from 'utilities/validators'

import { toast } from 'react-toastify'

function PageFeedback() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const beforeSendFeedback = (data) => {
    //console.log(data)

    toast.promise(feedbackAPI(data), { pending: 'Đang gửi thông tin...' })
      .then(feedback => {
        navigate('/feedbackTks?status=success')
      })
  }
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault()
  }
  return (
    <div className='grid grid-cols-1 py-20 sm:py-28'>
      {/* <div className="col-span-1"></div> */}
      <form className='col-span-1 flex flex-col items-center mx-8 sm:mx-16' onKeyDown={(e) => checkKeyDown(e)} onSubmit={handleSubmit(beforeSendFeedback)}>
        <div className='mt-4 w-full lg:max-w-lg'>
          <label className="flex text-sm font-semibold leading-6 text-gray-400 items-center mb-8">
            <Link
              to='/'
              className='flex cursor-pointer'><ChevronDoubleLeftIcon className='w-5 h-5'/> <span className='ml-3'>Về trang chủ</span></Link>
          </label>
        </div>
        <div className="lg:max-w-lg">
          <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-xl">Gửi phản hồi và đóng góp ý kiến cho Mynie Sweets</p>
          <p className="mt-6 text-base font-medium leading-6 text-gray-600 text-justify">
            Cảm ơn Bạn đã luôn ủng hộ và tin tưởng lựa chọn Mynie Sweets.
            <br/>Mynie Sweeets luôn luôn mong đợi nhận được những phản hồi, góp ý thẳng thắn từ quý khách hàng để cải thiện chất lượng sản phẩm và dịch vụ ngày một tốt hơn!
            <br/>Các thông tin này sẽ được bảo mật 100% và chỉ phục vụ mục đích nêu trên.
          </p>
        </div>
        <div className='mt-4 w-full lg:max-w-lg'>
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Góp ý của Bạn
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
              defaultValue={''}
              {...register('content', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
          </div>
          {fieldErrorMessage(errors, 'content')}
        </div>
        <div className='mt-4 w-full lg:max-w-lg'>
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Bạn hãy để lại SDT nhé, để nhận một chiếc bánh nhỏ xinh chẳng hạn ...
          </label>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
              placeholder="Số điện thoại của Bạn"
              {...register('contact', { required: false })}
            />
          </div>
        </div>
        <div className='flex mt-4 w-full items-center justify-end lg:max-w-lg'>
          <button
            type='submit'
            className='flex items-center bg-messenger-blue text-sm text-white hover:bg-mn-yellow hover:text-mn-blue font-bold px-4 py-2 rounded-full'>Gửi<FiSend className='ml-3 w-6 h-6'/></button>
        </div>
      </form>

    </div>
  )
}

export default PageFeedback