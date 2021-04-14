import React from "react";
import PostExcerpt from "./post-excerpt";

type PostsExcerptListProps = {
  posts: undefined;
};

const PostExcerptList: React.FC<PostsExcerptListProps> = ({ posts }) => {
  return (
    <>
      {posts.edges.map((post) => {
        const { title, excerpt, slug } = post.node;
        console.log(slug);
        return (
          <PostExcerpt key={slug} title={title} excerpt={excerpt} slug={slug} />
        );
      })}
    </>
  );
};

export default PostExcerptList;
