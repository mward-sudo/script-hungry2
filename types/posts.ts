import iPost from './post'

export type edges = {
  node: iPost
}
export default interface iPosts {
  posts: {
    edges: edges[]
  }
}
