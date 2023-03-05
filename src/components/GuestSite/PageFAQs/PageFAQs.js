import MainLayout from 'layouts/MainLayout/MainLayout'
import React from 'react'
import { Disclosure } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { HiOutlineArrowRight } from 'react-icons/hi'

function PageFAQs() {
  return (
    <MainLayout>
      <div className='flex mx-auto items-center justify-center mt-2 sm:mt-8 text-xl sm:text-2xl font-bold max-w-full px-4 text-center'>
        CÂU HỎI THƯỜNG GẶP KHI MUA HÀNG TẠI MYNIE SWEEETS
      </div>
      <div className='flex mx-auto items-center justify-center mt-2 text-sm sm:text-base font-medium text-center max-w-3xl px-4'>
        <span className='leading-8'>
          Bạn có thể tìm câu trả lời cho các câu hỏi thường gặp <span className='font-bold text-messenger-blue'>Về đặt hàng, Về chính sách giao hàng, hoặc Về sản phẩm</span> tại đây, hoặc liên hệ trực tiếp với MynieSweets qua <a href='https://www.facebook.com/profile.php?id=100089199187681'
            target="_blank"
            rel="noopener noreferrer" className='font-bold text-green-500 cursor-pointer'>Facebook</a>, hoặc hotline: <a className='text-messenger-blue font-bold' href="tel:0393568963">0393 568 963</a><br/>
        </span>
      </div>
      <div className='bg-white'>
        <div className="w-full px-2 pt-4 sm:pt-16">
          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-2">
            <div className='text-lg text-messenger-blue font-bold py-2'>
              VỀ ĐẶT HÀNG
            </div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể đặt bánh bằng cách nào ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Bạn có thể đặt bánh tại Mynie Sweets bằng các cách sau.
                    <br/><br/>
                    1. Gọi trực tiếp đến hotline: <span className='font-bold text-messenger-blue'>0393 568 963</span>.
                    <br/>
                    2. Đặt hàng qua website: <span className='font-bold text-messenger-blue'>myniesweets.vn</span>
                    <br/>
                    3. Nhắn tin qua fanpage Facebook: <span className='font-bold text-messenger-blue'>Mynie Sweets</span>
                    <br/>
                    4. Đến trực tiếp cửa hàng tại F237 Võ Thị Sáu, phường Thống Nhất, thành phố Biên Hòa.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể đặt các mẫu bánh riêng không nằm trong danh mục mẫu bánh của Mynie Sweets được hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Có, Bạn có thể đặt các mẫu bánh riêng tùy chọn. Trong trường hợp này Bạn vui lòng liên hệ trực tiếp đến hotline <span className='font-bold text-messenger-blue'>0393 568 963</span> hoặc nhắn tin qua fanpage Facebook: <span className='font-bold text-messenger-blue'>Mynie Sweets</span> để được chúng mình hỗ trợ ngay lập tức nhé.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Thời gian đặt bánh trước tối thiểu là bao lâu ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Bạn nên đặt bánh trước tối thiểu là 01 ngày, để có được chiếc bánh với mẫu tùy chọn ưng ý nhất.
                    <br/><br/>
                    Ngoài ra, nếu như Bạn cần bánh gấp giao ngay thì Bạn có thể liên hệ trực tiếp đến hotline <span className='font-bold text-messenger-blue'>0393 568 963</span> để chúng mình hỗ trợ Bạn ngay lập tức nhé. Tuy nhiên số lượng mẫu bánh có sẵn sẽ bị hạn chế.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Hình thức thanh toán khi mua hàng ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Hiện tại Bạn có thể thanh toán bằng tiền mặt hoặc chuyển khoản qua ngân hàng khi nhận bánh hoặc mua bánh tại cửa hàng.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể thay đổi loại bánh hoặc mẫu bánh sau khi đã hoàn tất việc đặt hàng hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Để thay đổi loại bánh hoặc mẫu bánh Bạn vui lòng <span className='font-bold text-messenger-blue'>liên hệ trước ít nhất là 24 tiếng</span>.
                    <br/>
                    <br/>Nếu Bạn liên hệ trễ hơn, mong bạn thông cảm vì khi đó chúng mình sẽ không đủ thời gian để chuẩn bị mẫu bánh mới mà bạn muốn, do đó Bạn có thể lựa chọn đổi qua những mẫu bánh có sẵn tại cửa hàng, tuy nhiên số lượng mẫu sẽ bị hạn chế.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể hủy đơn hàng sau khi đã hoàn tất việc đặt hàng hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Nếu muốn hủy đơn hàng Bạn vui lòng <span className='font-bold text-messenger-blue'>liên hệ trước ít nhất là 24 tiếng</span>.
                    <br/>
                    <br/>Nếu Bạn liên hệ quá trễ, mong bạn thông cảm vì khi đó đơn hàng của Bạn đã đang được sản xuất và chúng mình không thể hỗ trợ Bạn hủy đơn hàng.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Nếu khi nhận bánh mà tôi thấy không ưng ý về mẫu bánh mà mình thì phải làm sao ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Trong trường hợp Bạn không ưng ý về mẫu bánh khi nhận hàng, Bạn vui lòng liên hệ hotline: 0393 568 963 để chúng mình hỗ trợ Bạn ngay lập tức nhé.
                    <br/>
                    <br/>Trước tiên, Bạn sẽ được đổi lại một mẫu bánh có sẵn tại cửa hàng, tuy nhiên số lượng mẫu có thể sẽ bị hạn chế.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <div className='text-lg text-messenger-blue font-bold py-2 my-4'>
              VỀ CHÍNH SÁCH GIAO HÀNG
            </div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4">
                    <span className='text-justify'>Tôi có thể đến lấy bánh tại cửa hàng hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Có, Bạn có thể đến lấy bánh trực tiếp ở cửa hàng Mynie Sweets tại địa chỉ: F237 Võ Thị Sáu, phường Thống Nhất, TP Biên Hòa.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4">
                    <span className='text-justify'>Nếu giao hàng tận nơi, thì phí giao hàng được tính như thế nào ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    <div className='mx-auto max-w-5xl px-4'>
                      <p className='font-medium'>Mynie Sweets cung cấp dịch vụ giao hàng tận nơi tại TP Biên Hòa với quãng đường dưới 15Km tính từ vị trí cửa hàng tại: F237 Võ Thị Sáu, khu phố 7, phường Thống Nhất, TP Biên Hòa, Đồng Nai. <span className='font-medium italic'>(Quãng đường được tính bằng quãng đường ngắn nhất theo Google Map)</span></p><br/>
                      <p className='font-semibold'>Biểu phí giao hàng chi tiết như sau:</p>
                    </div>
                    <div className='mx-auto max-w-5xl px-4 mt-4'>
                      <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5  rounded-xl">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr className=''>
                              <th scope="col" className="py-3 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                                Khoảng cách
                              </th>
                              <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                Phí giao hàng
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white font-medium">
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">Dưới 5 Km</td>
                              <td className="whitespace-normal px-3 py-2 text-sm text-gray-600">20,000 đ<br/><p className='flex font-semibold text-red-500'>Miễn phí đối với đơn hàng có giá trị từ 300,000đ</p></td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 5&nbsp;<HiOutlineArrowRight/>&nbsp; dưới 6 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">25,000 đ</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 6&nbsp;<HiOutlineArrowRight/>&nbsp;dưới 7 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">30,000 đ</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 7&nbsp;<HiOutlineArrowRight/>&nbsp;dưới 8 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">35,000 đ</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 8&nbsp;<HiOutlineArrowRight/>&nbsp;dưới 10 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">40,000 đ</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 10&nbsp;<HiOutlineArrowRight/>&nbsp;dưới 12 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">45,000 đ</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 12&nbsp;<HiOutlineArrowRight/>&nbsp;dưới 13 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">50,000 đ</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 13&nbsp;<HiOutlineArrowRight/>&nbsp;dưới 14 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">55,000 đ</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 flex items-center">Từ 14&nbsp;<HiOutlineArrowRight/>&nbsp;dưới 15 Km</td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">60,000 đ</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4">
                    <span className='text-justify'>Tôi có thể chọn thời gian nhận bánh hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Có, Bạn có thể chọn đến lấy tại cửa hàng hoặc giao hàng tận nơi trong các khung giờ: 7h - 8h, 8h - 9h, 9h - 10h, 10h - 11h, 11h - 12h, 12h - 13h, 13h - 14h, 14h - 15h, 15h - 16h, 16h - 17h, 17h - 18h, 18h - 19h hoặc 19h - 20h.
                    <br/><br/>
                    Đối với bánh kem sinh nhật, Bạn nên lựa chọn khung giờ nhận bánh trước thời điểm cần sử dụng bánh 30 phút hoặc 1 tiếng, để đảm bảo chiếc bánh luôn sẵn sàng.
                    <br/><br/>
                    Đối với kem bánh cưới, Bạn nên lựa chọn khung giờ nhận bánh trước thời điểm cần sử dụng 2 tiếng.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể chọn chính xác thời gian mình muốn nhận bánh, ví dụ như 16h20 hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Hiện tại, Mynie Sweets có thể giao bánh trong khung thời gian, mà không thể hẹn bạn chính xác thời điểm do shipper cần lựa chọn tuyến đường hợp lý và luôn phải cẩn thận đảm bảo chất lượng bánh tốt nhất đến tay khách hàng. Ngoài ra còn do ảnh hưởng của các yếu tố khách quan như tình hình giao thông, thời tiết, ...
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi sẽ nhận được bánh trong khung giờ đã chọn ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Chúng mình luôn luôn cố gắng hết sức để bánh đến tay khách hàng trong khung giờ mà bạn đã chọn. Tuy nhiên sẽ có thể xảy ra những yếu tố khách quan ngoài ý muốn như tình trạng giao thông, thời tiết, ... dẫn đến việc giao bánh sẽ chậm trễ một chút.
                    <br/>
                    <br/>
                    Nếu shipper đến không đúng hẹn, vui lòng liên hệ hotline: 0393 568 963 để chúng mình sẽ hỗ trợ Bạn ngay lập tức.
                    <br/>
                    <br/>
                    Nếu shipper đến trễ hẹn một chút, tuy nhiên không ảnh hưởng đến trải nghiệm của Bạn. Bạn cũng vui lòng phản hồi lại cho chúng mình để <span className='font-bold'>Mynie Sweeets gửi lời xin lỗi đặc biệt đến Bạn</span> và cải thiện chất lượng dịch vụ nhé, cảm ơn Bạn.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể thay đổi khung thời gian nhận bánh sau khi đặt hàng hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Nếu bạn muốn thay đổi khung thời gian nhận bánh, Bạn vui lòng liên hệ Mynie Sweeets trước ít nhất 12 tiếng trước thời điểm Bạn muốn nhận bánh.

                    <br/><br/>
                    Chúng mình luôn luôn giao đến tay khách hàng những chiếc bánh mới ra lò, vừa được sản xuất trong ngày. Do đó nếu Bạn muốn thay đổi thời điểm nhận Bánh sớm hơn, nhưng liên hệ quá sát giờ có thể chiếc bánh của Bạn sẽ chưa sẵn sàng.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể thay đổi địa điểm nhận bánh sau khi đặt hàng hay không?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Nếu Bạn muốn thay đổi địa điểm nhận bánh, vui lòng liên hệ với chúng mình trước 2 tiếng nhé.<br/><br/>Nếu Bạn liên hệ quá sát giờ hoặc khi shipper đã di chuyển thì có thể sẽ gây ảnh hưởng đến thời gian nhận được bánh do thay đổi cung đường di chuyển và tình hình giao thông.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Nếu shipper giao bánh đến mà tôi không nghe điện thoại hoặc tôi có việc bận quên mất việc nhận bánh thì phải làm sao ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    <span className='font-bold text-messenger-blue'>Trước khi shipper di chuyển để giao bánh sẽ gọi điện trước cho Bạn lần 1</span>. Nếu Bạn không thể nghe điện thoại, shipper vẫn sẽ giao bánh đến Bạn để đảm bảo thời gian Bạn mong muốn nhận được bánh.
                    <br/><br/>
                    <span className='font-bold text-messenger-blue'>Khi đã đến địa điểm để nhận bánh, shipper sẽ gọi điện cho Bạn lần 2</span>. Nếu Bạn không thể nghe điện thoại, <span className='font-bold text-messenger-blue'>shipper sẽ chờ tại địa điểm nhận bánh 10 phút</span>.
                    <br/><br/>
                    <span className='font-bold text-messenger-blue'>Sau khi chờ 10 phút, shipper sẽ gọi điện cho Bạn lần 3</span>. Nếu Bạn không thể nghe điện thoại, <span className='font-bold text-messenger-blue'>shipper sẽ mang bánh về cửa hàng</span>.
                    <br/><br/>Sau đó, Bạn sẽ cần phải liên hệ với chúng mình để giao hàng lại và thanh toán phí giao hàng cho cả 2 lần, (hoặc chỉ thanh toán phí giao hàng lại lần 2 nếu như đơn hàng của Bạn ban đầu được miễn phí giao hàng), hoặc Bạn có thể đến nhận bánh tại cửa hàng.
                    <br/><br/>Nếu như đến cuối ngày mà Bạn vẫn chưa liên hệ lại để nhận bánh, thật tiếc vì bánh sẽ bị hủy và rất mong Bạn hiểu rằng chúng mình không thể hoàn lại tiền cho Bạn trong trường hợp này.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi có thể yêu cầu shipper giao bánh đến tận cửa phòng / tầng của chung cư, tòa nhà được không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Xin lỗi Bạn, shipper chỉ có thể hỗ trợ giao bánh đến sảnh của chung cư / tòa nhà, chứ không thể mang lên tận tầng / phòng.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Nếu như khi nhận bánh tôi phát hiện bánh bị xô lệch, không nguyên vẹn thì xử lý như thế nào ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    <span className='font-bold text-red-600'>Bạn hãy kiểm tra bánh khi nhận cùng với shipper và từ chối nhận bánh nếu phát hiện có sự cố.</span> Tất cả bánh kem đều được đóng gói bằng hộp mica trong và rất dễ dàng để kiểm tra tình trạng bánh bằng mắt thường.
                    <br/><br/>Khi có sự cố, Bạn vui lòng liên hệ hotline: 0393 568 963 để chúng mình hỗ trợ Bạn ngay lập tức nhé.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Sau khi tôi nhận bánh và shipper đã ra về thì mới phát hiện bánh bị xô lệch, không nguyên vẹn thì xử lý như thế nào ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Trong trường hợp này, trước tiên Bạn vui lòng liên hệ hotline: 0393 568 963 để chúng mình xem xét tình trạng bánh và hỗ trợ khắc phục trong phạm vi tối đa có thể.
                    <br/><br/>
                     Ngoài ra, <span className='font-bold text-red-500'>rất mong bạn thông cảm chúng mình không thể hỗ trợ thêm do trường hợp này không thể xác định được nguyên nhân sự cố</span> <span className='font-bold text-messenger-blue'>xảy ra do lỗi của shipper khi đi giao hàng </span><span className='font-bold text-red-500'>hay</span> <span className='font-bold text-messenger-blue'>xảy ra sau khi đơn hàng đã được giao đến tay khách</span>.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <div className='text-lg text-messenger-blue font-bold py-2 mt-4'>
              VỀ SẢN PHẨM
            </div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Cách bảo quản các loại bánh như thế nào ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Tất cả các loại bánh của Mynie Sweets <span className='font-bold text-messenger-blue'>hoàn toàn sử dụng nguyên liệu tươi và không sử dụng chất bảo quản</span>, vì vậy Bạn vui lòng giữ bánh trong hộp kín và bảo quản trong ngăn mát tủ lạnh ngay khi bạn nhận bánh <span className='font-bold text-red-500'>(không để bánh vào ngăn đông)</span>.
                    <br/><br/>
                    Nếu Bạn để bánh ở nhiệt độ phòng từ 1 đến 3 tiếng bánh sẽ bị chảy, chỉ nên lấy bánh ra khỏi ngăn mát tủ lạnh ngay trước khi ăn.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Bánh có thể được sử dụng trong bao lâu ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Bánh được bảo quản đúng cách có thể được sử dụng trong vòng 03 ngày.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4 items-start">
                    <span className='text-justify'>Tôi muốn tự di chuyển bánh đến nơi khác thì như thế nào ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify leading-6">
                    Bạn có thể di chuyển bánh bằng ô tô với điều kiện trong thời gian dưới 1 tiếng và máy lạnh trên xe mở ở mức lạnh sâu.
                    <br/><br/>
                    Nếu Bạn di chuyển bánh bằng ô tô, sử dụng thùng xốp cùng với đá khô để bảo quản bánh, thì có thể di chuyển bánh lên đến 7 tiếng mà không ảnh hưởng đến chất lượng và hình thức bánh (theo thực tế mà chúng mình đã từng thử).
                    <br/><br/>
                    Nếu bạn di chuyển bằng xe máy thì quãng đường không nên dài quá 30 phút và thời tiết ngoài trời không vượt mức 30 độ C vì thời tiết quá nóng sẽ làm bánh bị chảy, tốt nhất nếu muốn di chuyển thì Bạn cần kèm theo đá lạnh hoặc đá khô.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PageFAQs