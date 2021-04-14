import React from "react";
import PostExcerpt from "./post-excerpt";

const PostExcerptList: React.FC = ({ posts }) => {
  return (
    <>
      {posts.edges.map((post, index) => {
        const { title, excerpt } = post.node;
        return <PostExcerpt key={index} title={title} excerpt={excerpt} />;
      })}
    </>
  );
};

export default PostExcerptList;
