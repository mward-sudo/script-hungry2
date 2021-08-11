import { InferGetStaticPropsType, GetStaticProps } from 'next'
import Constants from '@/lib/consts'
import { getIndexPosts } from '@/lib/blog/index-posts'
import { PostExcerpt } from '@/types/graphcms-api'
import getNavigationLinks from '@/lib/navigation-links'
import { NavigationLinks } from '@/types/navigations-links'
import BlogIndex from '@/components/blog'

type IndexProps = {
  indexPosts: PostExcerpt[]
  pagesTotal: number
  navLinks: NavigationLinks
}

const Index: InferGetStaticPropsType<typeof getStaticProps> = ({
  indexPosts,
  pagesTotal,
  navLinks,
}: IndexProps) => {
  return (
    <BlogIndex
      indexPosts={indexPosts}
      pagesTotal={pagesTotal}
      currentPage={1}
      navLinks={navLinks}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()
  const indexPostsData = await getIndexPosts(1)
  const postsTotal: number = indexPostsData?.data?.postsConnection?.aggregate
    ?.count
    ? indexPostsData.data.postsConnection.aggregate.count
    : 1

  const pagesTotal = Math.ceil(postsTotal / Constants.POSTS_PER_PAGE)
  const indexPosts = indexPostsData?.data.posts
  return {
    props: { indexPosts, pagesTotal, navLinks },
    revalidate: 60,
  }
}

export default Index
