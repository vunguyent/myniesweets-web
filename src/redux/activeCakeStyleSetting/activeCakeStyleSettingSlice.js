import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCakeStyleSetting: null
}

export const activeCakeStyleSettingSlice = createSlice({
  name: 'activeCakeStyleSetting',
  initialState,
  reducers: {
    clearCurrentActiveCakeStyleSetting: (state) => {
      state.currentActiveCakeStyleSetting = null
    },
    updateCurrentActiveCakeStyleSetting: (state, action) => {
      const incomingCakeStyleSetting = action.payload
      state.currentActiveCakeStyleSetting = incomingCakeStyleSetting
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    //
  }
})
// Actions
export const {
  clearCurrentActiveCakeStyleSetting,
  updateCurrentActiveCakeStyleSetting
} = activeCakeStyleSettingSlice.actions

// Selectors
export const selectCurrentActiveCakeStyleSetting = state => {
  return state.activeCakeStyleSetting.currentActiveCakeStyleSetting
}

// Export default reducer
export const activeCakeStyleSettingReducer = activeCakeStyleSettingSlice.reducer