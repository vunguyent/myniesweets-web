import React from 'react'

export const FIELD_REQUIRED_MESSAGE = 'Vui lòng nhập trường này.'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Chưa đúng định dạng email.'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'Mật khẩu tối thiểu 8 ký tự, có ít nhất 1 chữ cái và 1 số.'

export const fieldErrorMessage = (errors, fieldName) => {
  if (!errors || !errors[fieldName]) return null

  return <div className='text-red-600 text-xs font-medium mt-2'>{errors[fieldName]?.message}</div>
}

//file validator
export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return 'File cannot be blank.'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size exceeded. (10MB)'
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return 'File type is invalid.'
  }
  return null
}
