import React from 'react'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { Link } from 'react-router-dom'

function PageContact() {
  return (
    <div>
      <MainLayout>
        <div className="abs-subheadline">
          <div className="abs-subheadline-deco-line"></div>
          <div className="abs-subheadline-label">LIÊN HỆ VỚI MYNIE SWEETS</div>
          <div className="abs-subheadline-deco-line"></div>
        </div>
        <div className=' flex max-w-5xl mx-auto px-6 md:px-0 my-16'>
          <p className='font-semibold leading-relaxed text-justify'>
          Khi có thắc mắc, góp ý, cần sự hỗ trợ, hoặc đặt bánh, Bạn có thể liên hệ với Mynie Sweeets bằng một trong những cách dưới đây, trong khung giờ từ 07h00 đến 22h00 tất cả các ngày trong tuần:
          </p>
        </div>
        <div className='flex flex-col max-w-5xl mx-auto px-6 md:px-0 space-y-16'>
          <div>
            <div className='text-xl font-bold leading-relaxed text-justify'>
              1. Gọi điện
            </div>
            <div>
              <span className='font-medium leading-relaxed text-justify'>
              Bạn có thể gọi điện thoại trực tiếp đến hotline:</span> <a className='text-messenger-blue font-bold' href="tel:0393568963">0393 568 963</a><br/>
              <p className='font-medium leading-relaxed text-justify'>MynieSweets luôn sẵn sàng hỗ trợ và lắng nghe, tiếp nhận, giải đáp thắc mắc và góp ý của các Bạn. Nếu nằm ngoài khung giờ trên, cuộc gọi của Bạn có thể sẽ bị bỏ lỡ và chúng mình sẽ liên hệ lại Bạn ngay sớm nhất có thể.
              </p>
            </div>
          </div>
          <div>
            <div className='text-xl font-bold leading-relaxed text-justify'>
              2. Chat trực tiếp qua Facebook
            </div>
            <div>
              <p className='font-medium leading-relaxed text-justify'>
              Bạn có thể chat với MynieSweets tại Fanpage Facebook:&nbsp;
                <a
                  className='text-messenger-blue font-bold'
                  href='https://www.facebook.com/profile.php?id=100089199187681'
                  target="_blank"
                  rel="noopener noreferrer">Mynie Sweets</a><br/>
              Chúng mình luôn sẵn sàng hỗ trợ và lắng nghe, tiếp nhận, giải đáp thắc mắc và góp ý của các Bạn. Nếu nằm ngoài khung giờ làm việc ở trên, tin nhắn của Bạn có thể sẽ được trả lời ngay hoặc có thể sẽ được trả lời vào đầu buổi sáng tiếp theo.
              </p>
            </div>
          </div>
          <div>
            <div className='text-xl font-bold leading-relaxed text-justify'>
              3. Chat qua Zalo
            </div>
            <div>
              <p className='font-medium leading-relaxed text-justify'>
              Bạn có thể nhắn tin cho Mynie Sweets tại Zalo: Mynie Sweets<br/>
              Chúng mình luôn sẵn sàng hỗ trợ và lắng nghe, tiếp nhận, giải đáp thắc mắc và góp ý của các Bạn. Nếu nằm ngoài khung giờ làm việc ở trên, tin nhắn của Bạn có thể sẽ được trả lời ngay hoặc có thể sẽ được trả lời vào đầu buổi sáng tiếp theo.
              </p>
            </div>
          </div>
          <div>
            <div className='text-xl font-bold leading-relaxed text-justify'>
              4. Để lại thông tin, góp ý, phản hồi tại Website
            </div>
            <div>
              <p className='font-medium leading-relaxed text-justify'>
              Bạn có thể để lại thông tin, góp ý, phản hồi tại&nbsp;<Link to='/feedback' className='underline underline-offset-4'>đây:</Link><br/>
              Chúng mình sẽ xử lý và phản hồi lại sớm nhất có thể (trong vòng vài phút).
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default PageContact