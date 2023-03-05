import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from 'utilities/customAxios'
import { API_ROOT } from 'utilities/constants'
//functions
import { mapOrder } from 'utilities/sorts'
const initialState = {
  currentFullCategory: null
}
import { CAKE_CATEGORY_ID } from 'utilities/constants'

export const fetchFullCategoryDetailsAPI = createAsyncThunk(
  'activeCategory/fetchFullCategoryDetailsAPI',
  async () => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-categories/active/${CAKE_CATEGORY_ID}`)
    return request.data
  }
)

// Khởi tạo Slice
export const activeCategorySlice = createSlice({
  name: 'activeCategory',
  initialState,
  reducers: {
    updateCurrentFullCategory: (state, action) => {
      state.currentFullCategory = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFullCategoryDetailsAPI.fulfilled, (state, action) => {
      let fullCategory = action.payload //chinh la request.data tra ve sau khi goi API
      fullCategory.cakeTypes = mapOrder(fullCategory.cakeTypes, fullCategory.cakeTypeOrder, '_id')
      fullCategory.cakeStyles = mapOrder(fullCategory.cakeStyles, fullCategory.cakeStyleOrder, '_id')

      state.currentFullCategory = fullCategory
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentFullCategory } = activeCategorySlice.actions

//Selector
export const selectCurrentFullCategory = (state) => {
  return state.activeCategory.currentFullCategory
}
export const activeCategoryReducer = activeCategorySlice.reducer