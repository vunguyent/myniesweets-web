import React, { useState, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { updateGeneralCakeDataAPI } from 'actions/ApiCall'
import ConfirmModal from 'components/Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'

function GeneralCakeDataSetting(props) {
  const { generalCakeData, onUpdateGeneralCakeDataState } = props
  const [ dataName, setDataName ] = useState('')
  const handleChangeDataName = (e) => setDataName(e.target.value)
  useEffect(() => {
    setDataName(generalCakeData.name)
  }, [generalCakeData.name])

  //Hien thi confirm modal
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () =>
  {
    setShowConfirmModal(!showConfirmModal)
  }

  const handleDataNameBlur = () => {
    if (dataName !== generalCakeData.name) {
      const newGeneralCakeData = {
        ...generalCakeData,
        name: dataName
      }
      // Call api update column
      updateGeneralCakeDataAPI(newGeneralCakeData._id, newGeneralCakeData).then(updatedGeneralCakeData => {
        onUpdateGeneralCakeDataState(updatedGeneralCakeData)
      })
    }
  }

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newGeneralCakeData = {
        ...generalCakeData,
        _destroy: true
      }
      //Call API
      updateGeneralCakeDataAPI(newGeneralCakeData._id, newGeneralCakeData).then(updatedGeneralCakeData => {
        onUpdateGeneralCakeDataState(updatedGeneralCakeData)
      })
    }
    toggleShowConfirmModal()
  }

  return (
    <div className="flex rounded-md items-center">
      <div className="relative flex flex-grow items-stretch">
        <input
          type="text"
          value={dataName}
          onChange={handleChangeDataName}
          onBlur={handleDataNameBlur}
          className="block w-full rounded-md border-none focus:ring-inset focus:ring-2 focus:ring-mn-blue sm:text-sm shadow-md"
        />
      </div>
      <XCircleIcon
        className="ml-4 relative h-6 w-6 text-gray-400 hover:text-mn-red"
        aria-hidden="true"
        onClick={toggleShowConfirmModal}
      />
      <ConfirmModal
        show = {showConfirmModal}
        onAction = {onConfirmModalAction}
        title="Xác nhận xóa sản phẩm vừa chọn"
        content={`Bạn có chắc chắn muốn xóa sản phẩm <strong>${generalCakeData.name}</strong>!`}
      />
    </div>
  )
}

export default React.memo(GeneralCakeDataSetting)