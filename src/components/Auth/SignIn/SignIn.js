import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  fieldErrorMessage
} from 'utilities/validators'
import { signInUserAPI } from 'redux/user/userSlice'
import { useDispatch } from 'react-redux'

function SignIn() {
  const dispatch = useDispatch()
  //let [searchParams] = useSearchParams()
  //const registeredEmail = searchParams.get('registeredEmail')
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmitSignIn = (data) => {
    toast.promise(dispatch(signInUserAPI(data)), { pending: 'Đang đăng nhập...' })
      .then(res => {
        if (!res.error) { navigate('/dashboard') }
      })
  }

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmitSignIn)}>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-semibold text-gray-500">Email</label>
        <input
          type="text"
          placeholder="Email"
          autoComplete='nope'
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
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  )
}

export default SignIn