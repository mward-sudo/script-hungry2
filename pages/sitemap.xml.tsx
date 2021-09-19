import { GetServerSideProps } from 'next'
import { getBlogCategories } from '@/lib/blog/categories'
import { getAllPostSlugs } from '@/lib/blog/post-slugs'

const Sitemap: VoidFunction = () => <></>

const baseUrl = {
  development: 'http://localhost:3000',
  test: 'http://localhost:3000',
  production: 'https://scripthungry.com',
}[process.env.NODE_ENV]

const getBlogPages = async (): Promise<string[]> => {
  const blogSlugs = await getAllPostSlugs()
  return blogSlugs.data.posts.map(
    (blogSlug) => `${baseUrl}/blog/post/${blogSlug.slug}`
  )
}

const getBlogCategoryPages = async (): Promise<string[]> => {
  const categories = await getBlogCategories()

  return categories?.data.blogCategories.map(
    (category) => `${baseUrl}/blog/category/${category.slug}`
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pages = [
    `${baseUrl}/`,
    `${baseUrl}/blog`,
    `${baseUrl}/showcase`,
    `${baseUrl}/showcase/parallax`,
    ...(await getBlogPages()),
    ...(await getBlogCategoryPages()),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  context.res.setHeader('Content-Type', 'text/xml')
  context.res.write(sitemap)
  context.res.end()

  return {
    props: {},
  }
}

export default Sitemap
