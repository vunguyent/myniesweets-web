import React from 'react'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import StepDelivery from 'resources/images/step-delivery.png'

function PageDelivery() {
  return (
    <MainLayout>
      {/* <div className='flex mx-auto items-center justify-center mt-2 sm:mt-8 text-xl sm:text-2xl font-bold max-w-full px-4'>
        Bakdorund image
      </div>
      <div className="abs-subheadline">
        <div className="abs-subheadline-deco-line"></div>
        <div className="abs-subheadline-label">BÁNH ĐƯỢC VẬN CHUYỂN NHƯ THẾ NÀO?</div>
        <div className="abs-subheadline-deco-line"></div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 max-w-5xl mx-auto'>
        <div>
          <img src={ StepDelivery }/>
        </div>
      </div>
      FROM OUR KITCHEN - ĐÓNG GÓI - GIỮ NHIỆT - KIỂM TRA - NHẬN BÁNH - HAPPY */}
      <div className="abs-subheadline">
        <div className="abs-subheadline-deco-line"></div>
        <div className="abs-subheadline-label">BIỂU PHÍ GIAO HÀNG</div>
        <div className="abs-subheadline-deco-line"></div>
      </div>
      <div className='mx-auto max-w-5xl px-4'>
        <p className='font-medium text-justify'>Mynie Sweets cung cấp dịch vụ giao hàng tận nơi tại TP Biên Hòa với quãng đường dưới 15Km tính từ vị trí cửa hàng tại: F237 Võ Thị Sáu, khu phố 7, phường Thống Nhất, TP Biên Hòa, Đồng Nai. <span className='font-medium italic'>(Quãng đường được tính bằng quãng đường ngắn nhất theo Google Map)</span></p><br/>
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


      <div className="abs-subheadline">
        <div className="abs-subheadline-deco-line"></div>
        <div className="abs-subheadline-label">CÂU HỎI THƯỜNG GẶP VỀ GIAO HÀNG</div>
        <div className="abs-subheadline-deco-line"></div>
      </div>
      <div className='bg-white'>
        <div className="w-full px-2 pt-2 sm:pt-8">
          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between border-t px-4 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50 gap-4">
                    <span className='text-justify'>Tôi có thể đến lấy bánh tại cửa hàng hay không ?</span>
                    { open ? <div><PlusIcon className='h-5 w-5 text-gray-900'/></div> : <div><MinusIcon className='h-5 w-5 text-gray-900'/></div> }
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-6 text-sm text-gray-700 font-medium text-justify">
                    Có, Bạn có thể đến lấy bánh trực tiếp ở cửa hàng Mynie Sweets tại địa chỉ: F237 Võ Thị Sáu, phường Thống Nhất, TP Biên Hòa.
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
                     Ngoài ra, <span className='font-bold text-red-600'>rất mong bạn thông cảm chúng mình không thể hỗ trợ thêm do trường hợp này không thể xác định được nguyên nhân sự cố</span> <span className='font-bold text-messenger-blue'>xảy ra do lỗi của shipper khi đi giao hàng </span><span className='font-bold text-red-600'>hay</span> <span className='font-bold text-messenger-blue'>xảy ra sau khi đơn hàng đã được giao đến tay khách</span>.
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

export default PageDelivery