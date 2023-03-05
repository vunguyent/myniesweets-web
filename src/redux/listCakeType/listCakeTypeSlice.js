import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from 'utilities/customAxios'
import { API_ROOT } from 'utilities/constants'

const initialState = {
  currentListCakeType: null
}

export const fetchListCakeTypesAPI = createAsyncThunk (
  'listCakeType/fetchListCakeTypesAPI',
  async () => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cake-types`)
    return request.data
  }
)

export const listCakeTypeSlice = createSlice({
  name: 'listCakeType',
  initialState,
  reducers: {
    updateCurrentListCakeType: (state, action ) => {
      state.currentListCakeType = action.payload
    },
    updateCakeTypeInList: (state, action) => {
      //console.log(current(state.currentListCakeType))
      //console.log('cakeType:', action.payload)
      const incomingCakeTypeSetting = action.payload
      const cakeType = state.currentListCakeType.find(i => i._id === incomingCakeTypeSetting._id)
      if (cakeType) {
        const updateKeys = ['title', 'cover', 'status', 'description']
        updateKeys.forEach(key => {
          cakeType[key] = incomingCakeTypeSetting[key]
        })
        // cakeType.title = incomingCakeTypeSetting.title
        // cakeType.status = incomingCakeTypeSetting.status
        // cakeType.cover = incomingCakeTypeSetting.cover
      }
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    builder.addCase(fetchListCakeTypesAPI.fulfilled, (state, action) => {
      let listCakeType = action.payload //chinh la request.data tra ve sau khi goi API

      state.currentListCakeType = listCakeType
    })
  }
})
// Actions
export const { updateCurrentListCakeType, updateCakeTypeInList } = listCakeTypeSlice.actions

// Selectors
export const selectCurrentListCakeType = state => {
  return state.listCakeType.currentListCakeType
}

// Export default reducer
export const listCakeTypeReducer = listCakeTypeSlice.reducer