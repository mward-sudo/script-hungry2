import { useRouter } from "next/router";
import { getAllPostsWithSlug, getPost } from "../../lib/api";
import Header from "../../components/header";
import Copyright from "../../components/copyright";
import { Container, Box } from "@material-ui/core";

const Post = ({ post, preview }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Header element="p" />
      <Container maxWidth="sm">
        <Box my={4}>
          <p>{slug}</p>
          <p>{post?.title}</p>
          <Copyright />
        </Box>
      </Container>
    </>
  );
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
