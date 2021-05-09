import { Button, Grid } from '@material-ui/core'
import Link from 'next/link'
import { FC } from 'react'

type PaginationProps = {
  totalPages: number
  currentPage: number
  prevDisabled?: boolean
  nextDisabled?: boolean
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  prevDisabled = false,
  nextDisabled = false,
}) => {
  const prevPageUrl =
    currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`

  const nextPageUrl = `/blog/page/${currentPage + 1}`

  return (
    <>
      <Grid container>
        <Grid xs={4} item>
          {prevDisabled && (
            <Button disabled variant="contained" color="secondary">
              Previous page
            </Button>
          )}
          {!prevDisabled && (
            <Link href={prevPageUrl} passHref>
              <Button variant="contained" color="secondary">
                Previous page
              </Button>
            </Link>
          )}
        </Grid>
        <Grid xs={4} item style={{ textAlign: 'center' }}>
          Page {currentPage} of {totalPages}
        </Grid>
        <Grid xs={4} item style={{ textAlign: 'right' }}>
          {nextDisabled && (
            <Button disabled variant="contained" color="secondary">
              Next page
            </Button>
          )}
          {!nextDisabled && (
            <Link href={nextPageUrl} passHref>
              <Button variant="contained" color="secondary">
                Next page
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Pagination
