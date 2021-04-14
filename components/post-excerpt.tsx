import React from "react";
import iPostExcerpt from "../types/post-excerpt.d";

const PostExcerpt: React.FC<iPostExcerpt> = ({ title, excerpt }) => {
  return (
    <>
      <p>{title}</p>
      <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
    </>
  );
};

export default PostExcerpt;
