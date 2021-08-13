import React, { FC } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PostExcerpt from '@/components/blog/post-excerpt'
import Pagination from '@/components/blog/pagination'
import { iPostExcerpt } from '@/types/graphcms-api'
import { fadeInAndUp } from '@/animations/animations'

type BlogIndexProps = {
  indexPosts: iPostExcerpt[]
  pagesTotal: number
  currentPage: number
}

const BlogIndex: FC<BlogIndexProps> = ({
  indexPosts,
  pagesTotal,
  currentPage,
}) => (
  <>
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-4 lg:col-span-3">
        {indexPosts.map((post: iPostExcerpt) => {
          const { title, excerpt, slug, author, coverImage } = post
          const url = `/blog/posts/${slug}`
          return (
            <div className="mb-16">
              <Link href={url}>
                <a>
                  <PostExcerpt
                    key={slug}
                    title={title}
                    excerpt={excerpt}
                    slug={slug}
                    author={author}
                    coverImage={coverImage}
                  />
                </a>
              </Link>
            </div>
          )
        })}
      </div>
      <motion.div className="hidden lg:block">
        <motion.div
          className="bg-white p-4 border-2 border-gray-200 rounded-lg drop-shadow-xl"
          variants={fadeInAndUp()}
        >
          <p>Test</p>
        </motion.div>
      </motion.div>
    </div>
    <Pagination currentPage={currentPage} totalPages={pagesTotal} />
  </>
)

export default BlogIndex
