import React, { FC } from 'react'
import { m } from 'framer-motion'
import Link from 'next/link'
import PostExcerpt from '@/components/blog/post-excerpt'
import Pagination from '@/components/blog/pagination'
import { iBlogCategories, iPostExcerpt } from '@/types/graphcms-api'
import { fadeInAndUp } from '@/animations/animations'
import Categories from './categories'

type BlogIndexProps = {
  indexPosts: iPostExcerpt[]
  pagesTotal: number
  currentPage: number
  categories: iBlogCategories
}

const BlogIndex: FC<BlogIndexProps> = ({
  indexPosts,
  pagesTotal,
  currentPage,
  categories,
}) => (
  <>
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-4 lg:col-span-3">
        {indexPosts.map((post: iPostExcerpt) => {
          const { title, excerpt, slug, author, coverImage } = post
          const url = `/blog/post/${slug}`
          return (
            <div className="mb-16" key={slug}>
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
      <m.div className="hidden lg:block">
        <m.div variants={fadeInAndUp()}>
          <Categories categories={categories} />
        </m.div>
      </m.div>
    </div>
    <Pagination currentPage={currentPage} totalPages={pagesTotal} />
  </>
)

export default BlogIndex
