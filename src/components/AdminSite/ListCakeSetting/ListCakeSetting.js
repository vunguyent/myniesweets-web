import React from 'react'
import CakeSetting from '../ListCakeSetting/CakeSetting/CakeSetting'

function ListCakeSetting(props) {
  const { cakes, onUpdateCakeState } = props
  return (
    cakes.map((cake) => (
      <CakeSetting
        key={cake._id}
        cake={cake}
        onUpdateCakeState = {onUpdateCakeState}
      />
    ))
  )
}

export default React.memo(ListCakeSetting)