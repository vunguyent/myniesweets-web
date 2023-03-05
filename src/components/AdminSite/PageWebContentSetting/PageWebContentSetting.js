import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
//Css
import './PageWebContentSetting.css'
import LoadingSpinner from 'components/Common/LoadingSpinner'
import { CAKE_CATEGORY_ID } from 'utilities/constants'
//component
import CakeTypeDragItem from 'components/AdminSite/CakeTypeDragItem/CakeTypeDragItem'
import CakeStyleDragItem from 'components/AdminSite/CakeStyleDragItem/CakeStyleDragItem'
//react-mooth-dnd
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from 'utilities/dragDrop'
//functions
import { mapOrder } from 'utilities/sorts'
import { cloneDeep } from 'lodash'

import {
  fetchCakeCategoryDetails,
  updateCakeCategoryAPI
} from 'actions/ApiCall'
import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout'
import { flushSync } from 'react-dom'

function PageWebContentSetting() {
  const [category, setCategory] = useState({})
  const [cakeTypes, setCakeTypes] = useState([])
  const [cakeStyles, setCakeStyles] = useState([])

  useEffect(() => {
    const categoryId = CAKE_CATEGORY_ID
    fetchCakeCategoryDetails(categoryId).then(category => {
      setCategory(category)
      setCakeTypes(mapOrder(category.cakeTypes, category.cakeTypeOrder, '_id'))
      setCakeStyles(mapOrder(category.cakeStyles, category.cakeStyleOrder, '_id'))
    })
  }, [])
  //CAKE TYPE FUNCTION
  const onCakeTypeDrop = (dropResult) => {
    const originalCategory = cloneDeep(category)
    const originalCakeTypes = cloneDeep(cakeTypes)
    //console.log(dropResult)
    let newCakeTypes = [...cakeTypes]
    newCakeTypes = applyDrag(newCakeTypes, dropResult)

    let newCategory = { ...category }
    newCategory.cakeTypeOrder = newCakeTypes.map(p => p._id)
    newCategory.cakeTypes = newCakeTypes
    flushSync(() => setCakeTypes(newCakeTypes))
    flushSync(() => setCategory(newCategory))
    //Call Api Update CakeTypes Order
    updateCakeCategoryAPI(newCategory._id, newCategory)
      .catch(() => {
        flushSync(() => setCakeTypes(originalCakeTypes))
        flushSync(() => setCategory(originalCategory))
      })
  }

  //CAKE STYLE FUNCTION
  const onCakeStyleDrop = (dropResult) => {
    //console.log(dropResult)
    const originalCategory = cloneDeep(category)
    const originalCakeStyles = cloneDeep(cakeStyles)
    let newCakeStyles = [...cakeStyles]
    newCakeStyles = applyDrag(newCakeStyles, dropResult)

    let newCategory = { ...category }
    newCategory.cakeStyleOrder = newCakeStyles.map(p => p._id)
    newCategory.cakeStyles = newCakeStyles

    flushSync(() => setCakeStyles(newCakeStyles))
    flushSync(() => setCategory(newCategory))

    updateCakeCategoryAPI(newCategory._id, newCategory)
      .catch(() => {
        flushSync(() => setCakeTypes(originalCakeStyles))
        flushSync(() => setCategory(originalCategory))
      })
  }

  return (
    <>
      <DashboardLayout>
        <div className="px-2 lg:px-16 pb-12 lg:pb-16">
          <div className="flex items-center">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900">Sắp xếp thứ tự hiển thị danh mục</h1>
          </div>
          <div className='mt-4'>
            <div className='py-4 text-gray-500 text-sm'>
              <span>Kéo thả để thay đổi thứ tự hiển thị danh mục trên UI</span>
            </div>
            {!category
              ? <LoadingSpinner caption="Loading ..."/>
              : isEmpty(category)
                ?<div>Chưa có danh mục</div>
                :
                <>
                  <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-2 lg:gap-x-6 gap-y-2 lg:gap-y-6">
                    <div className='bg-slate-100 col-span-1 px-4 py-4 rounded-xl space-y-2'>
                      <div>
                        <span className='font-semibold text-gray-500'>Danh mục loại bánh</span>
                      </div>
                      <div className='space-y-2'>
                        <Container
                          orientation="vertical"
                          onDrop={onCakeTypeDrop}
                          getChildPayload={index => cakeTypes[index]}
                          dragClass="item-ghost"
                          dropClass="item-ghost-drop"
                          dropPlaceholder={{
                            animationDuration: 500,
                            showOnTop: true,
                            className: 'item-drop-preview'
                          }}
                        >
                          {cakeTypes.map((cakeType, index) => (
                            <Draggable key={index} className="overflow-config">
                              <CakeTypeDragItem cakeType={cakeType} />
                            </Draggable>
                          ))}
                        </Container>
                      </div>
                    </div>
                    <div className='bg-slate-100 col-span-1 px-4 py-4 rounded-xl space-y-2'>
                      <div>
                        <span className='font-semibold text-gray-500'>Danh mục mẫu bánh</span>
                      </div>
                      <div className='space-y-2'>
                        <Container
                          orientation="vertical"
                          onDrop={onCakeStyleDrop}
                          getChildPayload={index => cakeTypes[index]}
                          dragClass="item-ghost"
                          dropClass="item-ghost-drop"
                          dropPlaceholder={{
                            animationDuration: 500,
                            showOnTop: true,
                            className: 'item-drop-preview'
                          }}
                        >
                          {cakeStyles.map((cakeStyle, index) => (
                            <Draggable key={index} className="overflow-config">
                              <CakeStyleDragItem cakeStyle={cakeStyle} />
                            </Draggable>
                          ))}
                        </Container>
                      </div>
                    </div>
                  </div>
                </>
            }
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default PageWebContentSetting