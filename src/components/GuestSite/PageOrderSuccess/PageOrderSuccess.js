import MainLayout from 'layouts/MainLayout/MainLayout'
import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

function PageOrderSuccess() {
  let [ searchParams ] = useSearchParams()
  const itemCode = searchParams.get('itemCode')
  if (isEmpty(itemCode)) {
    return <Navigate to='/'/>
  }

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="pt-4 sm:pt-16 max-w-3xl mx-auto">
          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <CheckCircleIcon className='w-28 h-28 text-green-500'/>
            </div>
            <div className='flex justify-center font-bold text-3xl text-messenger-blue mt-2'>Cảm ơn Bạn đã lựa chọn Mynie Sweets</div>
            <div className='flex justify-center font-medium text-lg mt-2'>Đơn hàng của Bạn đã được tiếp nhận</div>
            <div className='flex justify-center font-medium text-lg mt-2'>Mynie Sweets sẽ liên hệ Bạn để xác nhận đơn hàng trong ít phút nữa</div>
            <div className='flex items-center justify-center mt-16'>
              <Link
                to='/'
                className='flex items-center bg-messenger-blue text-sm text-white hover:bg-mn-yellow hover:text-mn-blue font-bold px-4 py-2 rounded-full'>Tiếp tục mua sắm</Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PageOrderSuccess