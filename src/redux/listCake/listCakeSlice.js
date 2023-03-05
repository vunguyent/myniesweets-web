import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from 'utilities/customAxios'
import { API_ROOT } from 'utilities/constants'
import { CAKE_CATEGORY_ID } from 'utilities/constants'

const initialState = {
  currentListCake: null,
  cakeTypes: null,
  cakeStyles: null,
  cakeSizes: null,
  spongeTastes: null,
  jamTastes: null
}

export const fetchListCakesAPI = createAsyncThunk (
  'listCake/fetchListCakesAPI',
  async () => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-categories/${CAKE_CATEGORY_ID}`)
    return request.data
  }
)

export const listCakeSlice = createSlice({
  name: 'listCake',
  initialState,
  reducers: {
    updateCurrentListCake: (state, action ) => {
      state.currentListCake = action.payload
    },
    updateCakeInList: (state, action) => {
      //console.log(current(state.currentListCake))
      //console.log('cake:', action.payload)
      const incomingCakeSetting = action.payload
      const cake = state.currentListCake.find(i => i._id === incomingCakeSetting._id)
      if (cake) {
        const updateKeys = ['code', 'name', 'moq', 'bestSell', 'unitPrice', 'cakeTypeIds', 'cakeStyleIds', 'priceBySizes', 'c_cakeTypes', 'sortPrice', 'c_cakeStyles', 'c_priceBySizes', 'preOrderTime', 'description', 'cover', 'status', 'remark', 'imageList']
        updateKeys.forEach(key => {
          cake[key] = incomingCakeSetting[key]
        })
      }
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    builder.addCase(fetchListCakesAPI.fulfilled, (state, action) => {
      let listCake = action.payload.cakes //chinh la request.data tra ve sau khi goi API
      let cakeTypes = action.payload.cakeTypes
      let cakeStyles = action.payload.cakeStyles
      let cakeSizes = action.payload.cakeSizes
      let spongeTastes = action.payload.spongeTastes
      let jamTastes = action.payload.jamTastes

      state.currentListCake = listCake
      state.cakeStyles = cakeStyles
      state.cakeTypes = cakeTypes
      state.cakeSizes = cakeSizes
      state.spongeTastes = spongeTastes
      state.jamTastes = jamTastes

      listCake.forEach(cake => {
        let c_cakeTypes = []
        let c_cakeStyles = []
        let c_priceBySizes = []
        if (Array.isArray(cake.cakeTypeIds)) {
          cake.cakeTypeIds.forEach(cakeTypeId => {
            const fullCakeTypeInfo = cakeTypes.find(t => t._id === cakeTypeId)
            if (fullCakeTypeInfo) c_cakeTypes.push(fullCakeTypeInfo)
          })
        }
        if (Array.isArray(cake.cakeStyleIds)) {
          cake.cakeStyleIds.forEach(cakeStyleId => {
            const fullCakeStyleInfo = cakeStyles.find(s => s._id === cakeStyleId)
            if (fullCakeStyleInfo) c_cakeStyles.push(fullCakeStyleInfo)
          })
        }
        if (Array.isArray(cake.priceBySizes)) {
          cake.priceBySizes.forEach(priceBySize => {
            const sizeInfo = cakeSizes.find(s => s._id === priceBySize.sizeId)
            if (sizeInfo) c_priceBySizes.push({ size: sizeInfo, price: priceBySize.price })
          })
        }
        cake['c_cakeTypes'] = c_cakeTypes
        cake['c_cakeStyles'] = c_cakeStyles
        cake['c_priceBySizes'] = c_priceBySizes
      })
    })
  }
})
// Actions
export const { updateCurrentListCake, updateCakeInList } = listCakeSlice.actions

// Selectors
export const selectCurrentListCake = state => {
  return state.listCake.currentListCake
}

export const selectCurrentListCakeTypes = state => {
  return state.listCake.cakeTypes
}

export const selectCurrentListCakeStyles = state => {
  return state.listCake.cakeStyles
}

// Export default reducer
export const listCakeReducer = listCakeSlice.reducer