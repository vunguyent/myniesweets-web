import MainLayout from 'layouts/MainLayout/MainLayout'
import React, { useEffect } from 'react'

import { ArrowRightIcon } from '@heroicons/react/24/outline'

// importing aos
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom'

function PageAboutUs() {
  useEffect (() => {
    AOS.init()
  }, [])
  return (
    <div>
      <MainLayout>
        <div className="abs-subheadline">
          <div className="abs-subheadline-deco-line"></div>
          <div className="abs-subheadline-label">VỀ MYNIE SWEETS</div>
          <div className="abs-subheadline-deco-line"></div>
        </div>
        <div className=' flex max-w-5xl mx-auto px-6 md:px-0'>
          <p className='font-medium leading-relaxed text-justify'>
          Ở Mynie Sweets, mỗi chiếc bánh là một câu chuyện riêng với hơi thở và tinh thần chẳng thể lẫn vào đâu được.
          Chúng mình – những người thợ làm bánh thủ công tâm niệm rằng nguyên liệu tốt sẽ làm nên một chiếc bánh hoàn hảo. Vậy nên, Mynie Sweets luôn cẩn trọng trong từng khâu chọn nguyên liệu, vệ sinh dụng cụ, kĩ thuật làm bánh cùng với cái tâm của người làm nghề sẽ tạo ra những chiếc bánh có hương vị đặc biệt.
          Bất cứ khi nào bạn cần những hương vị mộc mạc, tinh tế nhưng chẳng kém phần hấp dẫn, hãy đến với chúng mình. Luôn có rất nhiều những điều đặc biệt đợi bạn khám phá đó nhé!
          </p>
        </div>
        <div className="abs-subheadline">
          <div className="abs-subheadline-deco-line"></div>
          <div className="abs-subheadline-label">TẠI SAO CHỌN<br/>MYNIE SWEETS?</div>
          <div className="abs-subheadline-deco-line"></div>
        </div>
        <div className='flex flex-col max-w-5xl mx-auto px-6 md:px-0 space-y-16'>
          <div>
            <div className='text-xl font-bold leading-relaxed text-justify'>
              1. Chất lượng
            </div>
            <div>
              <p className='font-medium leading-relaxed text-justify'>
            Các sản phẩm của Mynie Sweets được thiết kế riêng cho khẩu vị khách hàng, hương vị tươi mới và đa dạng, phù hợp với lifestyle hiện đại.
            Ở Mynie Sweets – Chúng tôi luôn coi trọng sức khoẻ và vị giác của khách hàng.
            - Sản phẩm của Mynie Sweets
            Thế mạnh của Mynie Sweets là các dòng bánh kem sữa tươi, kem bơ, kem whipping kết hợp với lớp nhân phô mai và mứt hoa quả tươi. Ngoài ra còn là các dòng bánh lạnh châu Âu xinh xắn và phù hợp với khẩu vị người Việt.
              </p>
            </div>
          </div>
          <div>
            <div className='text-xl font-bold leading-relaxed text-justify'>
              2. Chỉn chu
            </div>
            <div>
              <p className='font-medium leading-relaxed text-justify'>
            Các sản phẩm của Mynie Sweets được thiết kế riêng cho khẩu vị khách hàng, hương vị tươi mới và đa dạng, phù hợp với lifestyle hiện đại.
            Ở Mynie Sweets – Chúng tôi luôn coi trọng sức khoẻ và vị giác của khách hàng.
            - Sản phẩm của Mynie Sweets
            Thế mạnh của Mynie Sweets là các dòng bánh kem sữa tươi, kem bơ, kem whipping kết hợp với lớp nhân phô mai và mứt hoa quả tươi. Ngoài ra còn là các dòng bánh lạnh châu Âu xinh xắn và phù hợp với khẩu vị người Việt.
              </p>
            </div>
          </div>
          <div>
            <div className='text-xl font-bold leading-relaxed text-justify'>
              3. Chân thành
            </div>
            <div>
              <p className='font-medium leading-relaxed text-justify'>
            Các sản phẩm của Mynie Sweets được thiết kế riêng cho khẩu vị khách hàng, hương vị tươi mới và đa dạng, phù hợp với lifestyle hiện đại.
            Ở Mynie Sweets – Chúng tôi luôn coi trọng sức khoẻ và vị giác của khách hàng.
            - Sản phẩm của Mynie Sweets
            Thế mạnh của Mynie Sweets là các dòng bánh kem sữa tươi, kem bơ, kem whipping kết hợp với lớp nhân phô mai và mứt hoa quả tươi. Ngoài ra còn là các dòng bánh lạnh châu Âu xinh xắn và phù hợp với khẩu vị người Việt.
              </p>
            </div>
          </div>
        </div>
        <div className="abs-subheadline">
          <div className="abs-subheadline-deco-line"></div>
          <div className="abs-subheadline-label">SẢN PHẨM TẠI<br/> MYNIE SWEETS</div>
          <div className="abs-subheadline-deco-line"></div>
        </div>
        <div className='flex flex-col max-w-5xl mx-auto px-6 md:px-0 space-y-16'>
          <div>
            <p className='font-medium leading-relaxed text-justify'>
            Các sản phẩm tại mynie gồm Bánh kem, bánh tiramisu, bánh mousse, bánh cupcake, pannacotta,...
            được làm từ nguyên liệu chọn lọc, đảm bảo chất lượng và vệ sinh an toàn thực phẩm
            theo hướng hương vị ít ngọt nhưng vẫn giữ được đặc trưng của từng loại bánh.
            </p>
          </div>
        </div>

        <div className='flex justify-center my-8'>
          <Link
            to = '/all-product'
            className='flex items-center font-medium bg-mynie-yellow text-white text-base px-6 py-1.5 hover:bg-gray-900 rounded-2xl'>Xem tất cả sản phẩm <ArrowRightIcon className='ml-2 flex text-white h-5 w-5'/></Link>
        </div>
        {/* <div className="abs-subheadline">
          <div className="abs-subheadline-deco-line"></div>
          <div className="abs-subheadline-label">KHÁCH HÀNG NÓI GÌ VỀ CHÚNG MÌNH</div>
          <div className="abs-subheadline-deco-line"></div>
        </div>
        <div className='flex justify-center'>
          ẢNH MESSENGER Feedback
        </div> */}
        <div className='py-16 bg-messenger-blue'>
          <div className='flex mx-auto justify-center text-center items-center'>
            <p className='text-2xl font-bold text-white'>Giữa rất nhiều sự lựa chọn ngoài kia<br/>Cảm ơn Bạn đã tin tưởng lựa chọn Mynie Sweets!</p>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default PageAboutUs