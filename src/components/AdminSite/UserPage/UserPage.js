import React, { useState } from 'react'
import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentUser,
  updateUserAPI,
  signOutUserAPI
} from 'redux/user/userSlice'
import { useForm } from 'react-hook-form'
import {
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  fieldErrorMessage
} from 'utilities/validators'
import { toast } from 'react-toastify'
import ConfirmModal from 'components/Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import UserAvatar from 'components/Common/UserAvatar'
import { singleFileValidator } from 'utilities/validators'

function UserPage() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      displayName: currentUser?.displayName
    }
  })

  //Hien thi confirm modal
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  //const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const onSubmitGeneralInformation = data => {
    const { displayName } = data
    if (displayName === currentUser?.displayName) {
      return
    }
    toast.promise(dispatch(updateUserAPI({ displayName })),
      { pending: 'Đang cập nhật...' }
    )
  }

  const onSubmitChangePassword = data => {
    const { currentPassword, newPassword, newPasswordConfirmation } = data
    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      toast.error('Vui lòng nhập tất cả các trường mật khẩu')
      return
    }
    toast.promise(dispatch(updateUserAPI({ currentPassword, newPassword })),
      { pending: 'Đang cập nhật...' }
    ).then((res) => {
      setValue('currentPassword', null)
      setValue('newPassword', null)
      setValue('newPasswordConfirmation', null)

      if (!res.error) {
        setShowConfirmModal(true)
      }
    })
  }

  const onSubmitChangeAvatar = (event) => {
    //console.log(event.target?.files[0])
    const err = singleFileValidator(event.target?.files[0])
    if (err) {
      toast.error(err)
      return
    }

    let reqData = new FormData()
    reqData.append('avatar', event.target?.files[0])
    // console.log(reqData)
    // for (const value of reqData.values()) {
    //   console.log(value)
    // }
    toast.promise(dispatch(updateUserAPI(reqData)),
      { pending: 'Đang cập nhật...' }
    ).then(() => {
      event.target.value = ''
    })
  }

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      dispatch(signOutUserAPI())
    }
    setShowConfirmModal(false)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto py-6 px-4 sm:p-6 lg:pb-8 max-w-xl justify-items-center">
        <div>
          <h2 className="text-xl font-medium leading-6 text-gray-900">Thông tin chung</h2>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row">
          <form className="flex-grow space-y-3" onSubmit={handleSubmit(onSubmitGeneralInformation)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                value={currentUser?.email}
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên người dùng
              </label>
              <input
                type="text"
                value={currentUser?.username}
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên hiển thị
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                {...register('displayName', {
                  minLength: { value: 3, message: 'Tên hiển thị tối thiểu 03 ký tự' },
                  maxLength: { value: 50, message: 'Tên hiển thị tối đa 50 ký tự' }
                })}
              />
              {fieldErrorMessage(errors, 'displayName')}
            </div>
            <button
              type="submit"
              className="justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Lưu
            </button>
          </form>

          <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
            <p className="text-sm font-medium text-gray-700" aria-hidden="true">
              Avatar
            </p>

            <div className="relative overflow-hidden rounded-full lg:block">
              <UserAvatar
                user={currentUser}
                width="160px"
                height="160px"
                fontSize="40px"
                tooltip="Nhấn để thay đổi avatar!"
              />
              <label
                htmlFor="desktop-user-photo"
                className="absolute inset-0 flex h-40 w-40 rounded-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
              >
                <span>Đổi Avatar</span>
                <input
                  type="file"
                  id="desktop-user-photo"
                  name="user-photo"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  onChange={onSubmitChangeAvatar}
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mt-8 leading-6 text-gray-900">Đổi mật khẩu</h2>
        </div>

        <form className="mt-4 gap-3 space-y-3" onSubmit={handleSubmit(onSubmitChangePassword)}>
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              autoComplete='nope'
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              {...register('currentPassword', {
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
          </div>
          {fieldErrorMessage(errors, 'currentPassword')}

          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              autoComplete='nope'
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              {...register('newPassword', {
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
          </div>
          {fieldErrorMessage(errors, 'newPassword')}

          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận lại mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              autoComplete='nope'
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              {...register('newPasswordConfirmation', {
                validate: (value) => {
                  return value === watch('newPassword') || 'Mật khẩu không khớp.'
                }
              })}
            />
          </div>
          {fieldErrorMessage(errors, 'newPasswordConfirmation')}
          <button
            type="submit"
            className="flex justify-center rounded-md border border-transparent bg-sky-700 py-2 mt-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
      <ConfirmModal
        show = {showConfirmModal}
        onAction = {onConfirmModalAction}
        title="Đăng xuất"
        content={'Bạn có muốn đăng xuất ?'}
      />
    </DashboardLayout>
  )
}

export default UserPage