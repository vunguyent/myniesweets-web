import authorizedAxiosInstance from 'utilities/customAxios'
import { API_ROOT, CAKE_CATEGORY_ID } from 'utilities/constants'
import { toast } from 'react-toastify'

//Category
export const updateCakeCategoryAPI = async (id, data) => {
  const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cake-categories/${id}`, data)
  return request.data
}
export const fetchCakeCategoryDetails = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-categories/${CAKE_CATEGORY_ID}`)
  return request.data
}
export const fetchActiveCakeCategoryDetails = async (id) => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-categories/active/${CAKE_CATEGORY_ID}`)
  return request.data
}

// CAKE TYPE APIs
export const fetchListCakeTypesAPI = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-types`)
  return request.data
}
export const createNewCakeTypeAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cake-types`, data)
  toast.success('Đã tạo loại sản phẩm thành công !', { theme: 'colored' })
  return request.data
}
export const updateCakeTypeAPI = async (id, data) => {
  const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cake-types/${id}`, data)
  return request.data
}

//CAKE STYLE API
export const fetchListCakeStylesAPI = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-styles`)
  return request.data
}
export const createNewCakeStyleAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cake-styles`, data)
  toast.success('Đã tạo kiểu sản phẩm thành công !', { theme: 'colored' })
  return request.data
}
export const updateCakeStyleAPI = async (id, data) => {
  const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cake-styles/${id}`, data)
  return request.data
}

// CAKE API
export const fetchListCakesAPI = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cakes`)
  return request.data
}

export const fetchCakeByIdAPI = async (id) => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cakes/${id}`)
  return request.data
}

export const fetchListActiveCakesAPI = async (searchPath) => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cakes/a${searchPath}`)
  return request.data
}
export const createNewCakeAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cakes`, data)
  toast.success('Đã tạo sản phẩm thành công !', { theme: 'colored' })
  return request.data
}
export const updateCakeAPI = async (id, data) => {
  const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cakes/${id}`, data)
  return request.data
}
export const updateCakeImageAPI = async (id, data) => {
  const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cakes/image/${id}`, data)
  return request.data
}

//Cake By Collections
export const fetchListActiveCakesByCollectionAPI = async (collectionId, searchPath) => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cakes/collection/${collectionId}${searchPath}`)
  return request.data
}
//Cake By Demands
export const fetchListActiveCakesByStyleAPI = async (styleId, searchPath) => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cakes/style/${styleId}${searchPath}`)
  return request.data
}


//sign up user api
export const signUpUserAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign_up`, data)
  toast.success('Account created successfully!', { theme: 'colored' })
  return request.data
}

export const refreshTokenAPI = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
  return request.data
}

//SIZE
export const fetchListGeneralCakeDatasAPI = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/general-cake-datas`)
  return request.data
}
export const createNewGeneralCakeDataAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/general-cake-datas`, data)
  return request.data
}

export const updateGeneralCakeDataAPI = async (id, data) => {
  const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/general-cake-datas/${id}`, data)
  return request.data
}


// Buy now API
export const buyNowAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/order`, data)
  toast.success('Đặt hàng thành công !', { theme: 'colored' })
  return request.data
}


// SubmitDate API
export const submitDateAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/dateData`, data)
  toast.success('Mynie Sweets đã ghi nhận thông tin mà Bạn cung cấp, Mynie Sweets sẽ liên hệ đến Bạn một tuần trước sinh nhật nhé ^^', { theme: 'colored' })
  return request.data
}

// SubmitDate API
export const feedbackAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/feedback`, data)
  toast.success('Gửi thông tin thành công !', { theme: 'colored' })
  return request.data
}