import { FC } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import { PostExcerpt as PostExcerptComponent } from '@/components/blog/post-excerpt'
import Copyright from '@/components/copyright'
import { stagger } from '@/animations/animations'
import Pagination from '@/components/blog/pagination'
import Constants from '@/lib/consts'
import { iNavigationLinks, iPostExcerpt } from '@/types/graphcms-api'

type BlogIndexProps = {
  indexPosts: iPostExcerpt[]
  pagesTotal: number
  currentPage: number
  navLinks: iNavigationLinks
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
    <div className="mx-4">
      <div className="container mx-auto py-8">
        <div>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-4 lg:col-span-3">
              <motion.div variants={stagger({ staggerTime: 1 })}>
                {indexPosts.map((post: iPostExcerpt) => {
                  const { title, excerpt, slug, author, coverImage } = post
                  return (
                    <PostExcerptComponent
                      key={slug}
                      title={title}
                      excerpt={excerpt}
                      slug={slug}
                      author={author}
                      coverImage={coverImage}
                    />
                  )
                })}
              </motion.div>
            </div>
            <motion.div
              variants={stagger({ staggerTime: 1 })}
              className="hidden lg:block"
            >
              <div className="bg-white p-4 border-2 border-gray-200 rounded-lg drop-shadow-xl">
                <p>Test</p>
              </div>
            </motion.div>
          </div>
          <Pagination currentPage={currentPage} totalPages={pagesTotal} />
          <Copyright />
        </div>
      </div>
    </div>
  </>
)

export default BlogIndex
