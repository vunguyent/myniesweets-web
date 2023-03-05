import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCakeTypeSetting: null
}

export const activeCakeTypeSettingSlice = createSlice({
  name: 'activeCakeTypeSetting',
  initialState,
  reducers: {
    clearCurrentActiveCakeTypeSetting: (state) => {
      state.currentActiveCakeTypeSetting = null
    },
    updateCurrentActiveCakeTypeSetting: (state, action) => {
      const incomingCakeTypeSetting = action.payload
      state.currentActiveCakeTypeSetting = incomingCakeTypeSetting
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    //
  }
})
// Actions
export const {
  clearCurrentActiveCakeTypeSetting,
  updateCurrentActiveCakeTypeSetting
} = activeCakeTypeSettingSlice.actions

// Selectors
export const selectCurrentActiveCakeTypeSetting = state => {
  return state.activeCakeTypeSetting.currentActiveCakeTypeSetting
}

// Export default reducer
export const activeCakeTypeSettingReducer = activeCakeTypeSettingSlice.reducer