import React from 'react'
import './App.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import 'react-image-gallery/styles/css/image-gallery.css'
import AuthSignIn from 'components/Auth/AuthSignIn'
import AuthSignUp from 'components/Auth/AuthSignUp'

import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from 'redux/user/userSlice'

import ScrollToTop from 'components/Common/ScrollToTop'

//ADMIN PAGE
import PageDashboard from 'components/AdminSite/PageDashboard/PageDashboard'
import PageCakeTypesSetting from 'components/AdminSite/PageCakeTypesSetting/PageCakeTypesSetting'
import PageCakeStylesSetting from 'components/AdminSite/PageCakeStylesSetting/PageCakeStylesSetting'
import PageCakesSetting from 'components/AdminSite/PageCakesSetting/PageCakesSetting'
import PageGeneralSetting from 'components/AdminSite/PageGeneralSetting/PageGeneralSetting'
import PageWebContentSetting from 'components/AdminSite/PageWebContentSetting/PageWebContentSetting'
import UserPage from 'components/AdminSite/UserPage/UserPage'

//GUEST PAGE
import PageHome from 'components/GuestSite/PageHome/PageHome'
import PageFAQs from 'components/GuestSite/PageFAQs/PageFAQs'
import PageAboutUs from 'components/GuestSite/PageAboutUs/PageAboutUs'
import PageDelivery from 'components/GuestSite/PageDelivery/PageDelivery'
import PageAllProduct from 'components/GuestSite/PageAllProduct/PageAllProduct'
import PageCollections from 'components/GuestSite/PageCollections/PageCollections'
import PageStyles from 'components/GuestSite/PageStyles/PageStyles'
import PageProductDetail from 'components/GuestSite/PageProductDetail/PageProductDetail'
import PageContact from 'components/GuestSite/PageContact/PageContact'
import PageBuyNow from 'components/GuestSite/PageBuyNow/PageBuyNow'
import PageOrderSuccess from 'components/GuestSite/PageOrderSuccess/PageOrderSuccess'
import PageFeedback from 'components/GuestSite/PageFeedback/PageFeedback'
import PageFeedbackThankYou from 'components/GuestSite/PageFeedbackThankYou/PageFeedbackThankYou'

//404
import Page404 from 'components/GuestSite/Page404/Page404'

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const publicRoutes = ['signIn', '404', '', 'faqs', 'about-us', 'delivery', 'all-product', 'product', 'collection', 'style', 'contact', 'feedback', 'feedbackTks', 'buynow', 'orderSucess']
  const location = useLocation()
  const checkPath = location.pathname.split('/')[1]
  if (!publicRoutes.includes(checkPath) && !isAuthenticated) {
    return <Navigate to='/signIn'/>
  }
  return (
    <ScrollToTop>
      <Routes>
        <Route path='/' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageHome/>
          </div>
        }/>
        <Route path='/all-product' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageAllProduct/>
          </div>
        }/>
        <Route path='/collection/:collectionId' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageCollections/>
          </div>
        }/>
        <Route path='/style/:styleId' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageStyles/>
          </div>
        }/>
        <Route path='/product/:cakeId' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageProductDetail/>
          </div>
        }/>
        <Route path='/buynow' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageBuyNow/>
          </div>
        }/>
        <Route path='/orderSuccess' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageOrderSuccess/>
          </div>
        }/>
        <Route path='/feedback' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageFeedback/>
          </div>
        }/>
        <Route path='/feedbackTks' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageFeedbackThankYou/>
          </div>
        }/>
        <Route path='/faqs' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageFAQs/>
          </div>
        }/>
        <Route path='/contact' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageContact/>
          </div>
        }/>
        <Route path='/about-us' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageAboutUs/>
          </div>
        }/>
        <Route path='/delivery' element={
          <div className='h-full max-w-full font-Montserrat'>
            <PageDelivery/>
          </div>
        }/>

        <Route path='/signIn' element={<AuthSignIn/>}/>
        <Route path='/signUp' element={<AuthSignUp/>}/>

        <Route path='/u/:username/dashboard' element={
          !isAuthenticated
            ? <Navigate to='/signIn'/>
            : <div className='h-full font-Montserrat'>
              <PageDashboard/>
            </div>
        }/>

        <Route path='/u/:username/cakeTypesSetting' element={
          !isAuthenticated
            ? <Navigate to='/signIn'/>
            : <div className='h-full max-w-full font-Montserrat'>
              <PageCakeTypesSetting/>
            </div>
        }/>

        <Route path='/u/:username/cakeStylesSetting' element={
          !isAuthenticated
            ? <Navigate to='/signIn'/>
            : <div className='h-full max-w-full font-Montserrat'>
              <PageCakeStylesSetting/>
            </div>
        }/>

        <Route path='/u/:username/generalSetting' element={
          !isAuthenticated
            ? <Navigate to='/signIn'/>
            : <div className='h-full max-w-full font-Montserrat'>
              <PageGeneralSetting/>
            </div>
        }/>

        <Route path='/u/:username/cakesSetting' element={
          !isAuthenticated
            ? <Navigate to='/signIn'/>
            : <div className='h-full max-w-full font-Montserrat'>
              <PageCakesSetting/>
            </div>
        }/>

        <Route path='/u/:username' element={
          <div className='h-full max-w-full font-Montserrat'>
            <UserPage/>
          </div>
        }
        />

        <Route path='/u/:username/webContentSetting' element={
          !isAuthenticated
            ? <Navigate to='/signIn'/>
            : <div className='h-full max-w-full font-Montserrat'>
              <PageWebContentSetting/>
            </div>
        }/>

        <Route path='*' element={
          <div className='h-full max-w-full font-Montserrat'>
            <Page404/>
          </div>
        }/>
      </Routes>
    </ScrollToTop>
  )
}

export default App
