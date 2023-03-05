import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCakeSetting: null
}

export const activeCakeSettingSlice = createSlice({
  name: 'activeCakeSetting',
  initialState,
  reducers: {
    clearCurrentActiveCakeSetting: (state) => {
      state.currentActiveCakeSetting = null
    },
    updateCurrentActiveCakeSetting: (state, action) => {
      const incomingCakeSetting = action.payload
      state.currentActiveCakeSetting = incomingCakeSetting
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    //
  }
})
// Actions
export const {
  clearCurrentActiveCakeSetting,
  updateCurrentActiveCakeSetting
} = activeCakeSettingSlice.actions

// Selectors
export const selectCurrentActiveCakeSetting = state => {
  return state.activeCakeSetting.currentActiveCakeSetting
}

// Export default reducer
export const activeCakeSettingReducer = activeCakeSettingSlice.reducer