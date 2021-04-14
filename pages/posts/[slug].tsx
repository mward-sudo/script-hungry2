import { useRouter } from "next/router";
import { getAllPostsWithSlug, getPost } from "../../lib/api";

const Post = ({ post, preview }) => {
  const router = useRouter();
  const { slug } = router.query;

  return <>{post.title}</>;
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPost(params.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true
  };
}

export default Post;
