import React from 'react'

const TableFooter = ({
  totalItems,
  itemsPerPage,
  setCurrentPage,
  currentPage,
  lastItemIndex,
  firstItemIndex,
}) => {
  let pages = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className='relative overflow-hidden rounded-b-lg bg-white shadow-md'>
      <nav
        className='flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0'
        aria-label='Table navigation'
      >
        <span className='text-sm font-normal text-gray-500'>
          Showing
          <span className='font-semibold text-gray-900'>
            {lastItemIndex > totalItems
              ? ` ${totalItems} `
              : ` ${firstItemIndex + 1} - ${lastItemIndex} `}
          </span>
          of
          <span className='font-semibold text-gray-900'> {totalItems}</span>
        </span>
        <ul className='inline-flex items-stretch space-x-px'>
          <li>
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className='flex items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            >
              &lt;
            </button>
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                  page === currentPage ? 'bg-blue-100 text-blue-500' : ''
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                currentPage < Math.ceil(totalItems / itemsPerPage) &&
                setCurrentPage(currentPage + 1)
              }
              className='flex items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default TableFooter
