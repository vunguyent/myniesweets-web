import React from 'react'
import CakeTypeSetting from '../ListCakeTypeSetting/CakeTypeSetting/CakeTypeSetting'

function ListCakeTypeSetting(props) {
  const { cakeTypes, onUpdateCakeTypeState } = props
  return (
    cakeTypes.map((cakeType) => (
      <CakeTypeSetting
        key={cakeType._id}
        cakeType={cakeType}
        onUpdateCakeTypeState = {onUpdateCakeTypeState}
      />
    ))
  )
}

export default React.memo(ListCakeTypeSetting)