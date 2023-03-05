import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { isEmpty } from 'lodash'
import './MainContent.css'
// importing aos
import AOS from 'aos'
import 'aos/dist/aos.css'
//images and logo
import mynieCircleLogo from 'resources/images/logo_mynie_sweets_circle.png'
import mynieSweetFacebook from 'resources/images/mynie-sweets-fb.png'
import mynieSweetIns from 'resources/images/mynie-sweets-ins.png'
import { Link } from 'react-router-dom'

import { TbTruckDelivery } from 'react-icons/tb'
import { TfiGift } from 'react-icons/tfi'
import { HiOutlineCheckBadge, HiOutlineShoppingCart, HiArrowRightCircle } from 'react-icons/hi2'
import { HiOutlineCursorClick, HiOutlineShoppingBag } from 'react-icons/hi'
import { RiHandHeartLine } from 'react-icons/ri'
import { AiFillLike } from 'react-icons/ai'
import { GrInstagram } from 'react-icons/gr'
import { submitDateAPI } from 'actions/ApiCall'

//DATE PICKER
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import vi from 'date-fns/locale/vi'
registerLocale('vi', vi)
import { format, getMonth } from 'date-fns'


import { useForm, Controller } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  fieldErrorMessage
} from 'utilities/validators'

import { toast } from 'react-toastify'

const months = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12'
]

function MainContent(props) {
  useEffect (() => {
    AOS.init()
  }, [])
  const { cakeTypes, cakeStyles, bestSellCakes } = props

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm()

  const beforeSubmitBirthdayInfo = (data) => {
    data.dateInput = format(data.dateInput, 'dd/MM')
    toast.promise(submitDateAPI(data), { pending: 'Đang gửi thông tin...' })
    reset()
  }
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault()
  }

  return (
    <>
      <div className="flex h-[500px] md:h-[650px] justify-center items-center bg-[url('./resources/images/slider-6.png')] bg-cover bg-center bg-no-repeat bg-blend-darken shadow-2xl ">
        <div className="mx-16 text-white text-center">
          <div className="text-xl uppercase mb-6 font-medium">MYNIE SWEETS</div>
          <div className="font-medium text-3xl md:text-4xl mb-6">Let us bake a sweet memory for you!</div>
          <div className="flex justify-center gap-8">
            <Link
              to='/collection/all'
              className="ms-button bg-white text-gray-900 w-max rounded-full hover:bg-mn-yellow">
              TẤT CẢ SẢN PHẨM
            </Link>
          </div>
        </div>
      </div>

      <div className="story flex justify-center items-center">
        <div className="px-4 sm:px-16 max-w-3xl text-mn-blue py-12 md:py-24 text-center">
          <div className="text-base md:text-xl font-bold leading-6 md:leading-10">Hãy để những chiếc bánh tại Mynie Sweets thay bạn bày tỏ yêu thương đến những người thân yêu...</div>
        </div>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="mx-auto w-full drop-shadow-2xl mb-24"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 4,
            partialVisibilityGutter: 40
          },
          smallDesktop: {
            breakpoint: {
              max: 1280,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {
          isEmpty(cakeStyles)
            ?<div>Loading...</div>
            :
            cakeStyles.map((cakeStyle) => (
              <div key={cakeStyle._id} className="group relative bg-white mx-4 md:mx-3 xl:mx-4 rounded-3xl overflow-hidden group">
                <div className="relative border-none overflow-hidden">
                  <div className="min-h-96 aspect-w-7 aspect-h-8">
                    <img
                      src={cakeStyle.cover}
                      alt="MYNIE SWEETS"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:scale-125 ease-in duration-200"
                    />
                  </div>
                  <Link
                    to={`/style/${cakeStyle._id}`}
                    className = 'ms-button cursor-pointer z-10 absolute bg-white text-mn-blue hover:text-mn-blue hover:bg-mn-yellow w-8/12 rounded-full bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn'>Xem Mẫu</Link>
                </div>
                <div className="my-6 flex justify-center">
                  <div className='flex justify-center'>
                    <h3 className="text-gray-900 text-center line-clamp-1">
                      <span className='text-sm font-extrabold uppercase cursor-pointer'>
                        {cakeStyle.title}
                      </span>
                    </h3>
                    {/* <p className="mt-1 text-dm text-gray-500 line-clamp-2">{cakeStyle.description}</p> */}
                  </div>
                </div>
              </div>
            ))
        }
      </Carousel>

      <div className="ms-subheadline">
        <div className="ms-subheadline-label">Tại sao nên lựa chọn Mynie Sweets ^^</div>
      </div>
      <div className='mb-8 sm:mb-24 py-8 md:py-24 bg-slate-50'>
        <div className='flex flex-col md:flex-row max-w-7xl mx-4 md:mx-auto gap-16'>
          <div className='flex justify-center md:basis-1/3 items-start text-center'>
            <div className='flex flex-col justify-center gap-2 md:gap-4'>
              <div className='flex justify-center'><HiOutlineCheckBadge className='flex w-20 h-20 text-gray-400'/></div>
              <span className='text-base font-bold text-gray-900'>Chất lượng</span>
              <p className='text-sm text-justify font-medium text-gray-500'>Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo. Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo</p>
            </div>
          </div>
          <div className='flex justify-center md:basis-1/3 items-start text-center'>
            <div className='flex flex-col justify-center gap-2 md:gap-4'>
              <div className='flex justify-center'><TfiGift className='w-20 h-20 text-gray-400'/></div>
              <span className='text-base font-bold text-gray-900'>Chỉn chu</span>
              <p className='text-sm text-justify font-medium text-gray-500'>Các sản phẩm tại mynie sweets luôn được đóng gói tỉ mỉ, cẩn thận. Đảm bảo cho món quà của bạn dành cho người thân luôn luôn chỉn chu nhất. Nếu bạn có yêu cầu riêng hãy cho chúng mình biết khi đặt hàng nhé, mỗi người đều có 1 cách riêng để bày tỏ tình thương thông qua những món quà ý nghĩa.</p>
            </div>
          </div>
          <div className='flex justify-center md:basis-1/3 items-start text-center'>
            <div className='flex flex-col justify-center gap-2 md:gap-4'>
              <div className='flex justify-center'><HiOutlineShoppingCart className='w-20 h-20 text-gray-400'/></div>
              <span className='text-base font-bold text-gray-900'>Giao bánh tận nơi</span>
              <p className='text-sm text-justify font-medium text-gray-500'>Mynie Sweets cung cấp dịch vụ giao hàng tận nơi tại TP Biên Hòa với quãng đường dưới 15Km tính từ vị trí cửa hàng tại: F237 Võ Thị Sáu, khu phố 7, phường Thống Nhất, TP Biên Hòa, Đồng Nai. (Quãng đường được tính bằng quãng đường ngắn nhất theo Google Map)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ms-subheadline">
        <div className="ms-subheadline-label">Danh mục bánh</div>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="mx-auto w-full drop-shadow-2xl"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 4,
            partialVisibilityGutter: 40
          },
          smallDesktop: {
            breakpoint: {
              max: 1280,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {
          isEmpty(cakeTypes)
            ?<div>Loading...</div>
            :
            cakeTypes.map((cakeType) => (
              <div key={cakeType._id} className="group relative bg-white mx-4 md:mx-3 xl:mx-4 rounded-3xl overflow-hidden group">
                <div className="relative border-none overflow-hidden">
                  <div className="min-h-96 aspect-w-7 aspect-h-8">
                    <img
                      src={cakeType.cover}
                      alt="MYNIE SWEETS"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:scale-125 ease-in duration-200"
                    />
                  </div>
                  <Link
                    to={`/collection/${cakeType._id}`}
                    className = 'ms-button cursor-pointer z-10 absolute bg-white text-mn-blue hover:text-mn-blue hover:bg-mn-yellow w-8/12 rounded-full bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn'>Xem Mẫu</Link>
                </div>
                <div className="my-6 flex justify-center">
                  <div className='flex justify-center'>
                    <h3 className="text-gray-900 text-center line-clamp-1">
                      <span className='text-sm font-extrabold uppercase cursor-pointer'>
                        {cakeType.title}
                      </span>
                    </h3>
                    <p className="mt-1 text-dm text-gray-500 line-clamp-2">{cakeType.description}</p>
                  </div>
                </div>
              </div>
            ))
        }
      </Carousel>

      <div className="ms-subheadline">
        <div className="ms-subheadline-label">NHỮNG MẪU BÁNH ĐƯỢC LỰA CHỌN NHIỀU NHẤT</div>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="mx-auto w-full drop-shadow-2xl mb-24"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 4,
            partialVisibilityGutter: 40
          },
          smallDesktop: {
            breakpoint: {
              max: 1280,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {
          isEmpty(bestSellCakes)
            ?<div>Loading...</div>
            :
            bestSellCakes.map((bestSellCake) => (
              <div key={bestSellCake._id} className="group relative bg-white mx-4 md:mx-3 xl:mx-4 rounded-3xl overflow-hidden">
                <div className="relative border-none overflow-hidden group">
                  <div className="min-h-96 aspect-w-7 aspect-h-8">
                    <img
                      src={bestSellCake.cover}
                      alt="MYNIE SWEETS"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:scale-125 ease-in duration-200"
                    />
                  </div>
                  <Link
                    to={`/product/${bestSellCake._id}`}
                    className="ms-button cursor-pointer z-10 absolute bg-white text-mn-blue hover:text-mn-blue hover:bg-mn-yellow w-8/12 rounded-full bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn">
                      Xem chi tiết
                  </Link>
                </div>
                <div className="my-6 flex justify-center">
                  <div className='flex justify-center text-center'>
                    <h3 className="text-gray-900 line-clamp-1">
                      <a className='text-sm font-extrabold uppercase cursor-pointer'>
                        {bestSellCake.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))
        }
      </Carousel>

      {/* <div className="ms-parallax-section bg-[url('./resources/images/slider-1.jpg')] bg-cover bg-no-repeat bg-center h-[380px] mb-24 bg-fixed
      w-full relative left-[calc(-50vw+50%)] overflow-hidden">
      </div> */}

      <div className="ms-subheadline flex flex-col">
        <div className="ms-subheadline-label">Let us bake a sweet memory for you</div>
        <div className='flex items-center justify-end mb-4'>
          <Link
            to='/collection/all'
            className='flex items-center bg-mn-yellow text-sm text-mn-blue hover:bg-messenger-blue hover:text-white font-bold px-4 py-2 rounded-full'>
            Tất cả sản phẩm <HiArrowRightCircle className='ml-3 w-6 h-6'/>
          </Link>
        </div>
      </div>
      <div className='py-8 md:py-24 bg-slate-50'>
        <div className='flex flex-col md:flex-row max-w-7xl mx-4 md:mx-auto gap-16'>
          <div className='flex justify-center md:basis-1/3 items-start text-center'>
            <div className='flex flex-col justify-center gap-2 md:gap-4'>
              <div className='flex justify-center'><HiOutlineCursorClick className='flex w-20 h-20 text-gray-400 rotate-90'/></div>
              <span className='text-base font-bold text-gray-900'>Chọn mẫu bánh</span>
              {/* <p className='text-sm text-justify font-medium text-gray-500'>Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo. Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo</p> */}
            </div>
          </div>
          <div className='flex justify-center md:basis-1/3 items-start text-center'>
            <div className='flex flex-col justify-center gap-2 md:gap-4'>
              <div className='flex justify-center'><HiOutlineShoppingBag className='w-20 h-20 text-gray-400'/></div>
              <span className='text-base font-bold text-gray-900'>Đặt hàng</span>
              {/* <p className='text-sm text-justify font-medium text-gray-500'>Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo. Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo</p> */}
            </div>
          </div>
          <div className='flex justify-center md:basis-1/3 items-start text-center'>
            <div className='flex flex-col justify-center gap-2 md:gap-4'>
              <div className='flex justify-center'><TbTruckDelivery className='w-20 h-20 text-gray-400'/></div>
              <span className='text-base font-bold text-gray-900'>Nhận hàng</span>
              {/* <p className='text-sm text-justify font-medium text-gray-500'>Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo. Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo</p> */}
            </div>
          </div>
          <div className='flex justify-center md:basis-1/3 items-start text-center'>
            <div className='flex flex-col justify-center gap-2 md:gap-4'>
              <div className='flex justify-center'><RiHandHeartLine className='w-20 h-20 text-gray-400'/></div>
              <span className='text-base font-bold text-gray-900'>Enjoy</span>
              {/* <p className='text-sm text-justify font-medium text-gray-500'>Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo. Các sản phẩm tại mynie sweets cam kết chất lượng, nguồn nguyên liệu đảm bảo</p> */}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row items-start bg-slate-50 drop-shadow-2xl py-16 md:py-20 gap-16 px-4 xl:px-16'>
        <div className='flex flex-col md:basis-1/2'>
          <div className='flex w-full justify-center'>
            <div className="uppercase mx-4 tracking-wider text-mn-blue text-lg md:text-2xl leading-8 mb-4 text-center font-bold">FOLLOW MYNIE SWEETS</div>
          </div>
          <div className='flex flex-col items-start sm:flex-row justify-center gap-8 sm:gap-16 mx-auto'>
            <a
              className='w-full sm:w-2/5 bg-white py-2 px-2 rounded-xl drop-shadow-2xl'
              href='https://www.facebook.com/profile.php?id=100089199187681'
              target="_blank"
              rel="noopener noreferrer">
              <img src={mynieSweetFacebook} className='rounded-xl cursor-pointer'/>
              <div className='flex justify-between rounded-full'>
                <div></div>
                <button
                  type="button"
                  className="flex justify-self-end items-center px-3 py-1.5 mt-2 gap-2 leading-4 font-medium rounded-xl shadow-sm text-white bg-messenger-blue"
                >
                  <AiFillLike className='w-4 h-4 text-white'/>
                  <span>Thích</span>
                </button>
              </div>
            </a>
            <a
              className='w-full relative sm:w-2/5 bg-white py-2 px-2 rounded-xl drop-shadow-2xl -rotate-6'
              href='https://instagram.com/mynie_sweets?igshid=YmMyMTA2M2Y='
              target="_blank"
              rel="noopener noreferrer">
              <img src={mynieSweetIns} className='rounded-xl cursor-pointer'/>
              <div className='flex justify-between rounded-full'>
                <button
                  type="button"
                  className="flex absolute top-14 right-4 justify-self-end items-center px-3 py-1.5 mt-2 gap-2 leading-4 font-medium rounded-xl shadow-sm text-white bg-gradient-to-b from-pink-500 via-red-500 to-yellow-500"
                >
                  <GrInstagram className='w-4 h-4 text-white'/>
                  <span>follow</span>
                </button>
              </div>
            </a>
          </div>
        </div>
        <div className='flex md:basis-1/2'>
          <div className="leave-your-request max-w-screen-xl rounded-[28px] pt-4 pb-6 gap-4 xl:mx-auto bg-white flex flex-col">
            <div className='border-b shadow-lg w-full px-4'>
              <div className='pl-2 pr-4 xl:px-16 flex flex-row py-2 items-center justify-between'>
                <a
                  className='flex items-center gap-2 md:gap-4'
                  href='https://www.facebook.com/profile.php?id=100089199187681'
                  target="_blank"
                  rel="noopener noreferrer">
                  <div className='flex relative'>
                    <img src={mynieCircleLogo} className=' w-[40px] md:w-[40px] border border-gray-200 rounded-full'/>
                    <div className='absolute rounded-full h-4 w-4 bottom-0 right-0 bg-messenger-green z-10'></div>
                  </div>
                  <div className="text-base font-bold uppercase">MYNIE SWEETS</div>
                </a>
                <div className='flex rounded-full hover:bg-gray-200 h-8 w-8 justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-messenger-blue items-center">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className='flex flex-row gap-1 md:gap-4 items-end w-11/12 px-4 xl:px-16'>
              <div className='flex'>
                <img src={mynieCircleLogo} className=' w-[60px] md:w-[40px] border border-gray-200 rounded-full'/>
              </div>
              <div className='text-sm'>
                <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 px-2 py-2 rounded-full">Mynie Sweets xin chào !</div>
                <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 mt-2 px-2 py-2 rounded-3xl">
                Hãy để lại cho Mynie ngày sinh nhật của bạn để nhận những ưu đãi đặc biệt cho đơn hàng trong ngày sinh nhật của bạn nhé ^^
                </div>
              </div>
            </div>

            <div className='flex flex-row items-end px-2 md:px-24'>
              <div className='w-3/12 md:w-5/12'></div>
              <div className="w-9/12 md:w-7/12">
                <form onKeyDown={(e) => checkKeyDown(e)} onSubmit={handleSubmit(beforeSubmitBirthdayInfo)}>
                  <input
                    type="text"
                    className="w-full rounded-full border-none bg-messenger-gray focus:border-none focus:ring-0 sm:text-sm px-2 py-2"
                    placeholder="Tên của Bạn ..."
                    {...register('name', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                  />
                  {fieldErrorMessage(errors, 'name')}

                  <input
                    type="text"
                    className="w-full rounded-full border-none bg-messenger-gray focus:border-none focus:ring-0 sm:text-sm px-2 py-2 mt-2"
                    placeholder="Số điện thoại hoặc email của Bạn ..."
                    {...register('contact', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                  />
                  {fieldErrorMessage(errors, 'contact')}

                  {/* <input
                    type="text"
                    name="text"
                    className="w-full rounded-full border-none bg-messenger-gray focus:border-none focus:ring-0 sm:text-sm px-2 py-2 mt-2"
                    placeholder="Ngày sinh nhật của Bạn là ..."
                  /> */}

                  <Controller
                    control={control}
                    name='dateInput'
                    render={({ field }) => (
                      <DatePicker
                        renderCustomHeader={({
                          date,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <span className='flex mx-4 cursor-pointer' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                              {'<'}
                            </span>
                            <div className='font-bold text-base'>
                              {
                                months[getMonth(date)]
                              }
                            </div>
                            <span className='flex mx-4 cursor-pointer' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                              {'>'}
                            </span>
                          </div>
                        )}
                        placeholderText='Ngày sinh nhật của Bạn là ngày/tháng'
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        className='w-full rounded-full border-none bg-messenger-gray focus:border-none focus:ring-0 sm:text-sm px-2 py-2 mt-2'
                        dateFormat="dd/MM"
                        locale='vi'
                        formatWeekDay={(nameOfDay) => ( <p></p>) }
                        minDate={new Date('2023/1/1')}
                        maxDate={new Date('2023/12/31')}
                      />
                    )}
                  />

                  <div className='flex justify-between rounded-full'>
                    <div></div>
                    <button
                      type="submit"
                      className="flex justify-self-end items-center px-6 py-2 mt-2 gap-2 leading-4 font-medium rounded-full shadow-sm text-white bg-messenger-blue hover:bg-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 rotate-320">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      <span>Gửi</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default MainContent