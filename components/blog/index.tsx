import { FC } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import { PostExcerpt as PostExcerptComponent } from '@/components/blog/post-excerpt'
import Copyright from '@/components/copyright'
import { stagger } from '@/animations/animations'
import Pagination from '@/components/blog/pagination'
import Constants from '@/lib/consts'
import { PostExcerpt } from '@/types/graphcms-api'
import { NavigationLinks } from '@/types/navigations-links'

type BlogIndexProps = {
  indexPosts: PostExcerpt[]
  pagesTotal: number
  currentPage: number
  navLinks: NavigationLinks
}

const BlogIndex: FC<BlogIndexProps> = ({
  indexPosts,
  pagesTotal,
  currentPage,
  navLinks,
}) => (
  <>
    <Head>
      <title>{Constants.SITE_NAME}</title>
    </Head>
    <Header navLinks={navLinks} />
    <div className="container mx-auto">
      <div className="my-4">
        <motion.div variants={stagger({ staggerTime: 1 })}>
          {indexPosts.map((post: PostExcerpt) => {
            const { title, excerpt, slug, author } = post
            return (
              <PostExcerptComponent
                key={slug}
                title={title}
                excerpt={excerpt}
                slug={slug}
                author={author}
              />
            )
          })}
        </motion.div>
        <Pagination currentPage={currentPage} totalPages={pagesTotal} />
        <Copyright />
      </div>
    </div>
  </>
)

export default BlogIndex
