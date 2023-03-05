import React from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'

import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { FiSend } from 'react-icons/fi'
import { SiInstagram, SiFacebook, SiTiktok } from 'react-icons/si'

export default function (props) {
  const { cakeTypes } = props
  return (
    <div className='w-full bg-mn-blue self-end min-h-[384px]'>
      <div className="px-2 sm:px-8 xl:px-24 mx-auto pb-24 text-white text-xs py-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 md:text-left gap-12 md:items-start">
          <div className="col-span-1">
            <div className="font-bold tracking-wider text-sm text-white mb-4">Về Mynie Sweets</div>
            <div className="flex flex-col gap-3">
              <div className=""><Link href="/about-us" className="font-medium hover:font-bold hover:text-mn-yellow">Let us bake a sweet memory for you!</Link></div>
              <div className='flex flex-row mt-6 gap-8'>
                <a href='https://www.facebook.com/profile.php?id=100089199187681'
                  target="_blank"
                  rel="noopener noreferrer"><SiFacebook className='h-8 w-8 text-gray-400 hover:text-messenger-blue'/></a>
                <a href='https://instagram.com/mynie_sweets?igshid=YmMyMTA2M2Y='
                  target="_blank"
                  rel="noopener noreferrer"><SiInstagram className='h-8 w-8 text-gray-400 hover:text-mynie-pink'/></a>
                <SiTiktok className='h-8 w-8 text-gray-400 hover:text-gray-900'/>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="font-bold tracking-wider text-sm text-white mb-4">Hỗ trợ</div>
            <div className="flex flex-col gap-3">
              <Link className="" to='/faqs'><p className="hover:font-bold hover:text-mn-yellow">Câu hỏi thường gặp - FAQs</p></Link>
              <Link className="" to='/contact'><p className="hover:font-bold hover:text-mn-yellow">Liên hệ</p></Link>
              <Link className="" to='/faqs'><p className="hover:font-bold hover:text-mn-yellow">Hướng dẫn đặt hàng</p></Link>
              <Link className="" to='/delivery'><p className="hover:font-bold hover:text-mn-yellow">Chính sách giao hàng</p></Link>
              {/* <div className=""><a href="#" className="hover:font-bold hover:text-mn-yellow">Chính sách khuyến mãi</a></div>
              <div className=""><a href="#" className="hover:font-bold hover:text-mn-yellow">Chính sách bảo mật</a></div> */}
            </div>
          </div>
          <div className="col-span-1">
            <div className="font-bold tracking-wider text-sm text-white mb-4">Danh mục sản phẩm</div>
            <div className="flex flex-col gap-3">
              {!isEmpty(cakeTypes) && cakeTypes.map((cakeType) => (
                <Link
                  key={cakeType._id}
                  className=""
                  to={`/collection/${cakeType._id}`}>
                  <span className="hover:font-bold hover:text-mn-yellow">
                    {cakeType.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <div className="font-bold tracking-wider text-sm text-white mb-4">Địa chỉ cửa hàng</div>
            <div className="flex flex-col gap-3">
              <div className='flex flex-row items-start'>
                <div><MapPinIcon className='flex h-6 w-6 mr-3'/></div>
                <div className="flex"><span className="">F237 Võ Thị Sáu, khu phố 7, phường Thống Nhất, Tp. Biên Hòa, Đồng Nai</span></div>
              </div>
              <div className='flex flex-row items-start'>
                <div><PhoneIcon className='flex h-6 w-6 mr-3'/></div>
                <div className="flex"><a href='tel:+84393568963' className="font-bold">Hotline: 0393 568 963</a></div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="font-bold tracking-wider text-lg text-white mb-2">Gửi phản hồi và góp ý</div>
            <div className="flex flex-col gap-3">
              <div className=""><p className="leading-relaxed text-justify font-semibold">Mynie Sweeets luôn luôn mong đợi nhận được những phản hồi và đóng góp ý kiến từ quý khách hàng để cải thiện chất lượng sản phẩm và dịch vụ ngày một tốt hơn !<br/>Cảm ơn quý khách hàng đã tin tưởng lựa chọn Mynie Sweets !</p></div>
              <div className='flex items-center justify-end'>
                <Link
                  to='/feedback'
                  className='flex items-center bg-mn-yellow text-sm text-mn-blue hover:bg-messenger-blue hover:text-white font-bold px-4 py-2 rounded-full'>Gửi phản hồi <FiSend className='ml-3 w-6 h-6'/></Link>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-white mt-6'>

        </div>
      </div>
    </div>
  )
}
