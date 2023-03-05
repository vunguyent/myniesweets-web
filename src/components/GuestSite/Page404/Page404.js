import MainLayout from 'layouts/MainLayout/MainLayout'
import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <MainLayout>
      <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-lg sm:text-3xl font-semibold text-messenger-blue">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Không tìm thấy trang</h1>
          <p className="mt-6 text-base font-medium leading-7 text-gray-600">Xin lỗi, trang mà Bạn vừa tìm kiếm không tồn tại.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to='/'
              className="rounded-md bg-messenger-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-mn-yellow hover:text-mn-blue"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default Page404