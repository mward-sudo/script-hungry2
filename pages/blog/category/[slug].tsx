import React, { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import {
  iBlogCategories,
  iBlogCategoryWithPostExceprts,
  iNavigationLinks,
} from '@/types/graphcms-api'
import getNavigationLinks from '@/lib/navigation-links'
import PostIndexLayout from '@/components/blog/post-index-layout'
import PostExcerpt from '@/components/blog/post-excerpt'
import Constants from '@/lib/consts'
import { getBlogCategoryWithPostExcerpts } from '@/lib/blog/category-with-post-excerpts'
import { getBlogCategories } from '@/lib/blog/categories'
import { fadeIn, fadeInAndUp } from '@/animations/animations'

type CategoryProps = {
  category: iBlogCategoryWithPostExceprts
  categories: iBlogCategories
  navLinks: iNavigationLinks
}

const Category: FC<CategoryProps> = ({ category, categories, navLinks }) => {
  return (
    <>
      <PostIndexLayout
        pageTitle={`${category?.name} | ${Constants.SITE_NAME}`}
        navLinks={navLinks}
      >
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-4 lg:col-span-3">
            <AnimatePresence>
              <m.div variants={fadeIn()}>
                <h1 className="font-bold -mb-4">{category?.name}</h1>
                <div
                  className="font-light mb-12 text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(category?.description?.html),
                  }}
                />
              </m.div>
            </AnimatePresence>

            {category?.posts.map((post) => (
              <Link href={`/blog/post/${post.slug}`}>
                <a>
                  <div className="-m-5 p5 mb-0 md:m-0 md:p-0">
                    <PostExcerpt
                      title={post?.title}
                      author={post?.author}
                      excerpt={post?.excerpt}
                      slug={post?.slug}
                      coverImage={post?.coverImage}
                    />
                  </div>
                </a>
              </Link>
            ))}
          </div>
          <m.div className="hidden lg:block">
            <m.div variants={fadeInAndUp()}>
              <h2 className="mt-0 mb-2">Categories</h2>
              <ul>
                {categories?.map(({ slug, name }) => (
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
      </PostIndexLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const navLinks = await getNavigationLinks()

  let slug = ''
  if (params !== undefined && params.slug !== undefined) {
    if (typeof params.slug === 'string') {
      slug = params.slug
    } else if (typeof params.slug === 'object') {
      ;[slug] = params.slug
    }
  }

  const category = await getBlogCategoryWithPostExcerpts(slug)
  const categories = await getBlogCategories()

  return {
    props: {
      category: category?.data?.blogCategory,
      categories: categories.data.blogCategories,
      navLinks,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getBlogCategories()
  const paths: Array<string> =
    categories !== null
      ? categories?.data.blogCategories.map(
          (category) => `/blog/category/${category.slug}`
        )
      : []

  return {
    paths,
    fallback: true,
  }
}

export default Category
