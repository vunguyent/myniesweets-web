import { configureStore } from '@reduxjs/toolkit'
import { activeCategoryReducer } from 'redux/activeCategory/activeCategorySlice'
import { userReducer } from 'redux/user/userSlice'
import { activeCakeTypeSettingReducer } from 'redux/activeCakeTypeSetting/activeCakeTypeSettingSlice'
import { listCakeTypeReducer } from './listCakeType/listCakeTypeSlice'
import { listCakeStyleReducer } from './listCakeStyle/listCakeStyleSlice'
import { listCakeReducer } from './listCake/listCakeSlice'
import { activeCakeStyleSettingReducer } from './activeCakeStyleSetting/activeCakeStyleSettingSlice'
import { activeCakeSettingReducer } from './activeCakeSetting/activeCakeSettingSlice'
import { listGeneralCakeDataReducer } from './listGeneralCakeData/listGeneralCakeDataSlice'

// https://www.npmjs.com/package/redux-persist
// https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default là localstorage

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] // định nghĩa các slice được phép duy trì qua mỗi lần f5 trình duyệt
  // blacklist: ['user'] // // định nghĩa các slice không được phép duy trì qua mỗi lần f5 trình duyệt
}

const reducers = combineReducers({
  activeCategory: activeCategoryReducer,
  user: userReducer,
  listCakeType: listCakeTypeReducer,
  activeCakeTypeSetting: activeCakeTypeSettingReducer,
  listCakeStyle: listCakeStyleReducer,
  activeCakeStyleSetting: activeCakeStyleSettingReducer,
  listCake: listCakeReducer,
  activeCakeSetting: activeCakeSettingReducer,
  listGeneralCakeData: listGeneralCakeDataReducer
})

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})