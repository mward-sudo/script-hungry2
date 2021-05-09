export interface CallGraphCMS {
  (query: string): Promise<unknown>
}

export type PostsTotal = {
  data: {
    postsConnection: {
      aggregate: {
        count: number
      }
    }
  }
}

export type IndexPostsData = {
  data: {
    posts: {
      author: {
        name: string
      }
      excerpt: string
      slug: string
      title: string
    }[]
    postsConnection: {
      aggregate: {
        count: number
      }
    }
  }
}
export type PostData = PostsIndexData & {
  data: {
    post: {
      content: {
        html: string
      }
    }
  }
}

export type PostSlugs = {
  data: {
    posts: {
      slug: string
    }[]
  }
}

export type Author = {
  name: string
}
export type PostExcerpt = {
  author: Author
  excerpt: string
  slug: string
  title: string
}
