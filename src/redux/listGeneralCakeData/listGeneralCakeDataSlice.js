import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from 'utilities/customAxios'
import { API_ROOT } from 'utilities/constants'

const initialState = {
  currentListGeneralCakeData: null,
  currentCakeSizes: null,
  currentSpongeTastes: null,
  currentJamTastes: null
}

export const fetchListGeneralCakeDatasAPI = createAsyncThunk (
  'listGeneralCakeData/fetchListGeneralCakeDatasAPI',
  async () => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/general-cake-datas`)
    return request.data
  }
)

export const listGeneralCakeDataSlice = createSlice({
  name: 'listGeneralCakeData',
  initialState,
  reducers: {
    updateCurrentListGeneralCakeData: (state, action ) => {
      state.currentListGeneralCakeData = action.payload
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    builder.addCase(fetchListGeneralCakeDatasAPI.fulfilled, (state, action) => {
      let listGeneralCakeData = action.payload //chinh la request.data tra ve sau khi goi API
      state.currentListGeneralCakeData = listGeneralCakeData
      state.currentCakeSizes = listGeneralCakeData.filter(generalCakeData => generalCakeData.type === 'SIZE')
      state.currentJamTastes = listGeneralCakeData.filter(generalCakeData => generalCakeData.type === 'JAM_TASTE')
      state.currentSpongeTastes = listGeneralCakeData.filter(generalCakeData => generalCakeData.type === 'SPONGE_TASTE')
    })
  }
})
// Actions
export const { updateCurrentListGeneralCakeData } = listGeneralCakeDataSlice.actions

// Selectors
export const selectListGeneralCakeData = state => {
  return state.listGeneralCakeData.currentListGeneralCakeData
}

export const selectListCakeSizes = state => {
  return state.listGeneralCakeData.currentCakeSizes
}

export const selectListJamTastes = state => {
  return state.listGeneralCakeData.currentJamTastes
}

export const selectListSpongeTastes = state => {
  return state.listGeneralCakeData.currentSpongeTastes
}

// Export default reducer
export const listGeneralCakeDataReducer = listGeneralCakeDataSlice.reducer