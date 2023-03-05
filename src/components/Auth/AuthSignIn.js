import React from 'react'
import SignIn from 'components/Auth/SignIn/SignIn'

import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from 'redux/user/userSlice'

function AuthSignIn() {

  const isAuthenticated = useSelector(selectIsAuthenticated)
  if (isAuthenticated) {
    return <Navigate to = '/dashboard' />
  }

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white shadow-xl rounded-xl max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-300 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">MYNIE SWEETS</a>
          </div>
          <p className="mt-6 font-normal text-5xl text-center text-white md:mt-0">
            FRESHLY CAKE EVERYDAY
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1 gap-4 py-12">
          <h3 className="flex justify-center text-2xl font-semibold text-gray-700 mb-6">Đăng nhập</h3>
          <SignIn/>
        </div>
      </div>
    </div>
  )
}

export default AuthSignIn
