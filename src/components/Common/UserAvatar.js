import React from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function UserAvatar({ user={}, width='30px', height='30px', fontSize='16px', tooltip }) {
  return (
    <>
      <Tooltip anchorId="anchor-element"/>
      {user.avatar
        ? <div className="user-avatar" data-tooltip-content={tooltip || user.displayName} id='anchor-element'>
          <img src={user.avatar} style={{ 'width': width, 'height': height }} />
        </div>
        : <div className="default-avatar"
          style={{ 'width': width, 'height': height, 'fontSize': fontSize }}
          data-tooltip-content={tooltip || user.displayName}
          id='anchor-element'
        >
          <span className='first-username-char'>{user?.displayName?.charAt(0) || 'A'}</span>
        </div>
      }
    </>
  )
}

export default UserAvatar