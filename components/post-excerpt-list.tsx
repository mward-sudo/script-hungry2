import React from 'react'
import PostExcerpt from './post-excerpt'
import Posts, { edges as PostEdges } from '../types/posts'

const PostExcerptList: React.FC<Posts> = ({ posts }) => (
  <>
    {posts.edges.map((post: PostEdges) => {
      const {
        title, excerpt, slug, featuredImage,
      } = post.node
      return (
        <PostExcerpt
          key={slug}
          title={title}
          excerpt={excerpt}
          slug={slug}
          featuredImage={featuredImage}
        />
      )
    })}
  </>
)

export default PostExcerptList
