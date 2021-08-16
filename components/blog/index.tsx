import React, { FC } from 'react'
import { m } from 'framer-motion'
import Link from 'next/link'
import PostExcerpt from '@/components/blog/post-excerpt'
import Pagination from '@/components/blog/pagination'
import { iBlogCategories, iPostExcerpt } from '@/types/graphcms-api'
import { fadeInAndUp } from '@/animations/animations'

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
          <h2 className="mt-0 mb-2">Categories</h2>
          <ul>
            {categories.map(({ slug, name }) => (
              <li key={slug} className="inline-block">
                <Link href={`/blog/category/${slug}`}>
                  <a className="inline-block text-sm bg-white mr-2 px-2 py-1 border-2 border-gray-200 rounded-lg drop-shadow-xl hover:border-gray-600 hover:bg-gray-600 hover:text-white">
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </m.div>
      </m.div>
    </div>
    <Pagination currentPage={currentPage} totalPages={pagesTotal} />
  </>
)

export default BlogIndex
