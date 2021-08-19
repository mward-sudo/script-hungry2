import { FC } from 'react'
import Link from 'next/link'
import { iBlogCategories } from '@/types/graphcms-api'

type CategoriesParams = {
  categories: iBlogCategories
}

const Categories: FC<CategoriesParams> = ({ categories }) => (
  <>
    <h2 className="mt-0 mb-2 dark:text-gray-300">Categories</h2>
    <ul>
      {categories?.map(({ slug, name }) => (
        <li key={slug} className="inline-block">
          <Link href={`/blog/category/${slug}`}>
            <a className="inline-block text-sm dark:text-gray-300 bg-white dark:bg-black mr-2 px-2 py-1 border-2 border-gray-200 dark:border-gray-700 rounded-lg drop-shadow-xl hover:border-gray-600 hover:bg-gray-600 hover:text-white">
              {name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </>
)

export default Categories
