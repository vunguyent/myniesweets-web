import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout'
import CakeTypeSetting from '../ListCakeTypeSetting/CakeTypeSetting/CakeTypeSetting'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import LoadingSpinner from 'components/Common/LoadingSpinner'

import {
  FIELD_REQUIRED_MESSAGE,
  fieldErrorMessage
} from 'utilities/validators'

import {
  createNewCakeTypeAPI
} from 'actions/ApiCall'

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchFullCategoryDetailsAPI,
  selectCurrentFullCategory
} from 'redux/activeCategory/activeCategorySlice'


function PageDashboard() {
  const [cakeTypes, setCakeTypes] = useState([])

  const dispatch = useDispatch()
  const category = useSelector(selectCurrentFullCategory)

  useEffect(() => {
    const categoryId = '639c8d01ce84704f64cf97d3'
    dispatch(fetchFullCategoryDetailsAPI(categoryId))
    // setCategory(category)
    // setCakeTypes(mapOrder(category.cakeTypes, category.cakeTypeOrder, '_id'))
    // setCakeStyles(mapOrder(category.cakeStyles, category.cakeStyleOrder, '_id'))
  }, [dispatch])

  useEffect(() => {
    if (category) {
      setCakeTypes(category.cakeTypes)
    }
  }, [category])

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const [openNewCakeTypeForm, setOpenNewCakeTypeForm] = useState(false)
  const toggleOpenNewCakeTypeForm = () => {
    setOpenNewCakeTypeForm(!openNewCakeTypeForm)
    reset()
  }

  if (isEmpty(category)) {
    return <div className='not-found'>Menu not found</div>
  }

  const onSubmitNewCakeType = (data) => {
    const newCakeTypeToAdd = {
      cakeCategoryId: category._id,
      title: data.cakeTypeTitle.trim()
    }

    createNewCakeTypeAPI(newCakeTypeToAdd).then(cakeType => {
      let newCakeTypes = [...cakeTypes]
      newCakeTypes.push(cakeType)

      let newCategory = { ...category }
      newCategory.cakeTypeOrder = newCakeTypes.map(p => p._id)
      newCategory.cakeTypes = newCakeTypes

      //flushSync(() => { setCakeTypes(newCakeTypes) })
      //flushSync(() => dispatch(updateCurrentFullCategory(newCategory)))
      reset({})
      //toggleOpenNewCakeTypeForm()
    })
  }

  const onUpdateCakeType = (newCakeTypeToUpdate) => {
    const cakeTypeIdToUpdate = newCakeTypeToUpdate._id
    let newCakeTypes = [...cakeTypes]
    const cakeTypeIndexToUpdate = newCakeTypes.findIndex(i => i._id === cakeTypeIdToUpdate)

    if (newCakeTypeToUpdate._destroy) {
      /// remove productType
      newCakeTypes.splice(cakeTypeIndexToUpdate, 1)
    }
    else {
      /// update productTypeInfo
      newCakeTypes.splice(cakeTypeIndexToUpdate, 1, newCakeTypeToUpdate)
    }

    let newCategory = { ...category }
    newCategory.cakeTypeOrder = newCakeTypes.map(p => p._id)
    newCategory.cakeTypes = newCakeTypes

    //flushSync(() => {setCakeTypes(newCakeTypes)})
    //flushSync(() => dispatch(updateCurrentFullCategory(newCategory)))
    //console.log(newProductTypeToUpdate)
  }

  //CAKE STYLE FUNCTION
  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    }
    // More products...
  ]

  return (
    <DashboardLayout>
      <main className="mx-auto px-2 pb-12 lg:pb-16">
        <div className="flex items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Tổng quan</h1>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default PageDashboard