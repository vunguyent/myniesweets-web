import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

function CustomPagination({ totalItems, itemsPerPage=4, currentPage=1, onPageChange }) {
  const [pageCount, setPageCount] = useState(+currentPage)

  useEffect(() => {
    setPageCount(Math.ceil(totalItems / itemsPerPage))
  }, [totalItems, itemsPerPage])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    //console.log(`User requested page number ${(event.selected + 1)}`)
    const selectedPage = event.selected + 1
    onPageChange(selectedPage, itemsPerPage)
  }


  return (
    <ReactPaginate
      initialPage={(+currentPage-1)}
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< Previous"
      renderOnZeroPageCount={null}

      containerClassName="pagination"

      pageClassName="page-item"
      pageLinkClassName="page-link"

      previousClassName="page-item-previous"
      previousLinkClassName="page-link-previous-link"

      nextClassName="page-item-next"
      nextLinkClassName="page-link-next-link"

      breakClassName="page-item-break"
      breakLinkClassName="page-link-break-link"

      activeLinkClassName="activePage"
    />
  )
}

export default CustomPagination
