import React from 'react'
import CakeStyleSetting from '../ListCakeStyleSetting/CakeStyleSetting/CakeStyleSetting'

function ListCakeStyleSetting(props) {
  const { cakeStyles, onUpdateCakeStyleState } = props
  return (
    cakeStyles.map((cakeStyle) => (
      <CakeStyleSetting
        key={cakeStyle._id}
        cakeStyle={cakeStyle}
        onUpdateCakeStyleState = {onUpdateCakeStyleState}
      />
    ))
  )
}

export default React.memo(ListCakeStyleSetting)