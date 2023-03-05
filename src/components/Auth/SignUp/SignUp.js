import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'


import { signUpUserAPI } from 'actions/ApiCall'

import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  fieldErrorMessage
} from 'utilities/validators'
import { toast } from 'react-toastify'

function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmitSignUp = (data) => {
    //console.log(data)
    toast.promise(signUpUserAPI(data), { pending: 'Đang đăng ký tài khoản ...' })
      .then( user => {
        navigate(`/signIn?registeredEmail=${user.email}`)
      }
      )
  }

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmitSignUp)}>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-semibold text-gray-500">Email</label>
        <input
          type="text"
          placeholder="Email"
          className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          {...register('email', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: EMAIL_RULE,
              message: EMAIL_RULE_MESSAGE
            }
          })}
        />
        {fieldErrorMessage(errors, 'email')}
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-500">Mật khẩu</label>
        </div>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          autoComplete='nope'
          className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          {...register('password', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: PASSWORD_RULE,
              message: PASSWORD_RULE_MESSAGE
            }
          })}
        />
        {fieldErrorMessage(errors, 'password')}
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-500">Nhập lại mật khẩu</label>
        </div>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          autoComplete='nope'
          className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          {...register('password_confirmation', {
            validate: (value) => {
              return value === watch('password') || 'Mật khẩu không khớp.'
            }
          })}
        />
        {fieldErrorMessage(errors, 'password_confirmation')}
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
        >
          Đăng ký
        </button>
      </div>
      <div className='flex justify-center'>
        <Link to={'/signIn'}>
          <div className='text-md text-gray-400 font-semibold underline underline-offset-4'>Đăng nhập</div>
        </Link>
      </div>
    </form>
  )
}

export default SignUp