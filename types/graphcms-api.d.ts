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

export interface iHomePageHeroes {
  data: {
    homePageHeroes: iHomePageHero[]
  }
}

export interface iHomePageHero {
  backgroundImage: Picture
  lineOneText: string
  lineTwoText: string
}

export interface iHomePageCards {
  data: {
    homePageCards: iHomePageCard[]
  }
}

export interface iHomePageCard {
  image: {
    url: string
    width: number
    height: number
    caption: string
  }
  url: string
  text: string
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
