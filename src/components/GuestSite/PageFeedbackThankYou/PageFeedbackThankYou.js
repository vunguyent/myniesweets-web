import MainLayout from 'layouts/MainLayout/MainLayout'
import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function PageFeedbackThankYou() {
  let [ searchParams ] = useSearchParams()
  const status = searchParams.get('status')
  if (status !== 'success') {
    return <Navigate to='/'/>
  }

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="pt-4 sm:pt-16 max-w-3xl mx-auto">
          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <HeartIcon className='w-24 h-24 text-pink-400'/>
            </div>
            <div className='flex justify-center text-center font-bold text-xl text-messenger-blue mt-2'>Mynie Sweets chân thành cảm ơn góp ý của quý khách</div>
            <div className='flex justify-center font-medium text-lg mt-2'>Mong quý khách sẽ tiếp tục ủng hộ sản phẩm và dịch vụ của Mynie Sweets</div>
            <div className='flex justify-center font-medium text-lg mt-2'>Chúc quý khách hàng thật nhiều sức khỏe và thành công !</div>
            <div className='flex items-center justify-center mt-16'>
              <Link
                to='/'
                className='flex items-center bg-messenger-blue text-sm text-white hover:bg-mn-yellow hover:text-mn-blue font-bold px-4 py-2 rounded-full'>Về trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PageFeedbackThankYou