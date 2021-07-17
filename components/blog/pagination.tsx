import { FC } from 'react'
import PaginationPage from '@/lib/blog/pagination-page'
import Button from '../button'

/** Given the current page number, return details for the previous page
 * @param currentPage - The current page number
 */
const getPrevPage = (currentPage: number): PaginationPage => {
  const prevPage = new PaginationPage()
  prevPage.no = currentPage - 1
  // Page 1 is /blog not /blog/page/1
  prevPage.url = prevPage.no === 1 ? '/blog' : `/blog/page/${prevPage.no}`
  // PageNo must be positive
  prevPage.exists = prevPage.no > 0

  return prevPage
}

/** Given the current page number, return details for the next page
 * @param currentPage - The current page number
 */
const getNextPage = (
  currentPage: number,
  totalPages: number
): PaginationPage => {
  const nextPage = new PaginationPage()
  nextPage.no = currentPage + 1
  nextPage.url = `/blog/page/${nextPage.no}`
  /** Page doesn't exist if it exceeds the total number of pages */
  nextPage.exists = nextPage.no <= totalPages

  return nextPage
}

type PaginationProps = {
  /** Total number of pages in the pagination set */
  totalPages: number
  /** Number of the current page */
  currentPage: number
}

/**
 * Provides 'previous / next' pagination with display of current and total
 * pages
 */
const Pagination: FC<PaginationProps> = ({ totalPages, currentPage }) => {
  /** Details for the previous page */
  const prevPage: PaginationPage = getPrevPage(currentPage)
  /** Details for the next page */
  const nextPage: PaginationPage = getNextPage(currentPage, totalPages)

  return (
    <>
      <div className="grid grid-cols-4 border-t-2 pt-8">
        <div>
          {prevPage.exists ? (
            <Button
              variant="secondary"
              url={prevPage.url}
              text="Previous page"
            />
          ) : (
            <Button variant="disabled" text="Previous page" />
          )}
        </div>
        <div className="col-start-2 col-span-2 inline-block text-center text-gray-400 py-3">
          Page {currentPage} of {totalPages}
        </div>
        <div className="text-right">
          {nextPage.exists ? (
            <Button variant="secondary" url={nextPage.url} text="Next page" />
          ) : (
            <Button variant="disabled" text="Next page" />
          )}
        </div>
      </div>
    </>
  )
}

export default Pagination
