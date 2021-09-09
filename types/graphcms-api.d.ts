export interface iCallGraphCMS {
  (query: string): Promise<unknown>
}

export type iPostsTotal = {
  data: {
    postsConnection: {
      aggregate: {
        count: number
      }
    }
  }
}

export type iPost = {
  author: iAuthor
  excerpt: string
  slug: string
  title: string
  coverImage: iPicture
  content: {
    html: string
  }
}

export type iIndexPostsData = {
  data: {
    posts: iPost[]
    postsConnection: {
      aggregate: {
        count: number
      }
    }
  }
}
export type iPostData = {
  data: {
    post: iPost
  }
}

export type iPostSlugs = {
  data: {
    posts: {
      slug: string
    }[]
  }
}

export type iAuthor = {
  name: string
  twitterHandle: string
  picture: iPicture
}

export type iPicture = {
  url: string
  height: number
  width: number
}

export type iPostExcerpt = {
  author: iAuthor
  excerpt: string
  slug: string
  title: string
  coverImage: iPicture
}

export type iNavigationLinks = {
  data: {
    navigationLinks: iNavigationLink[]
  }
}

export type iNavigationLink = {
  url: string
  linkText: string
}

export type iBlogCategories = iBlogCategory[]

export type iBlogCategoriesData = {
  data: {
    blogCategories: iBlogCategories
  }
}

export type iBlogCategory = {
  slug: string
  name: string
  description: {
    html: string
  }
}

export type iBlogCategoryWithPostExceprts = iBlogCategory & {
  posts: iPostExcerpt[]
}

export type iBlogCategoryWithPostExceprtsData = {
  data: {
    blogCategory: iBlogCategoryWithPostExceprts
  }
}
