import React, { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import {
  iBlogCategoryWithPostExceprts,
  iNavigationLinks,
} from '@/types/graphcms-api'
import getNavigationLinks from '@/lib/navigation-links'
import PostLayout from '@/components/blog/layout'
import PostExcerpt from '@/components/blog/post-excerpt'
import Constants from '@/lib/consts'
import { getBlogCategoryWithPostExcerpts } from '@/lib/blog/category-with-post-excerpts'
import { getBlogCategories } from '@/lib/blog/categories'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '@/animations/animations'

type CategoryProps = {
  category: iBlogCategoryWithPostExceprts
  navLinks: iNavigationLinks
}

const Category: FC<CategoryProps> = ({ category, navLinks }) => {
  return (
    <>
      <PostLayout
        pageTitle={`${category?.name} | ${Constants.SITE_NAME}`}
        navLinks={navLinks}
      >
        <AnimatePresence>
          <motion.div variants={fadeIn()}>
            <h1 className="font-bold">{category?.name}</h1>
            <div
              className="font-light mt-4 mb-12 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: sanitizer(category?.description?.html),
              }}
            />
          </motion.div>
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
      </PostLayout>
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

  return {
    props: {
      category: category?.data?.blogCategory,
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
