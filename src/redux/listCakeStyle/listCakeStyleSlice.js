import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from 'utilities/customAxios'
import { API_ROOT } from 'utilities/constants'

const initialState = {
  currentListCakeStyle: null
}

export const fetchListCakeStylesAPI = createAsyncThunk (
  'listCakeStyle/fetchListCakeStylesAPI',
  async () => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-styles`)
    return request.data
  }
)

export const listCakeStyleSlice = createSlice({
  name: 'listCakeStyle',
  initialState,
  reducers: {
    updateCurrentListCakeStyle: (state, action ) => {
      state.currentListCakeStyle = action.payload
    },
    updateCakeStyleInList: (state, action) => {
      //console.log(current(state.currentListCakeStyle))
      //console.log('cakeStyle:', action.payload)
      const incomingCakeStyleSetting = action.payload
      const cakeStyle = state.currentListCakeStyle.find(i => i._id === incomingCakeStyleSetting._id)
      if (cakeStyle) {
        const updateKeys = ['title', 'cover', 'status', 'description']
        updateKeys.forEach(key => {
          cakeStyle[key] = incomingCakeStyleSetting[key]
        })
        // cakeStyle.title = incomingCakeStyleSetting.title
        // cakeStyle.status = incomingCakeStyleSetting.status
        // cakeStyle.cover = incomingCakeStyleSetting.cover
      }
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    builder.addCase(fetchListCakeStylesAPI.fulfilled, (state, action) => {
      let listCakeStyle = action.payload //chinh la request.data tra ve sau khi goi API

      state.currentListCakeStyle = listCakeStyle
    })
  }
})
// Actions
export const { updateCurrentListCakeStyle, updateCakeStyleInList } = listCakeStyleSlice.actions

// Selectors
export const selectCurrentListCakeStyle = state => {
  return state.listCakeStyle.currentListCakeStyle
}

// Export default reducer
export const listCakeStyleReducer = listCakeStyleSlice.reducer