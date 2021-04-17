import { getAllPostsWithSlug, getPost } from "../../lib/api";
import Header from "../../components/header";
import PostHeaderImage from "../../components/post-header-image";
import Copyright from "../../components/copyright";
import { Container, Box, Typography } from "@material-ui/core";

const featuredImage = (post) => {
  return post.featuredImage ? (
    <PostHeaderImage
      url={post.featuredImage?.node.sourceUrl}
      height={post.featuredImage?.node.mediaDetails?.height}
      width={post.featuredImage?.node.mediaDetails?.width}
    />
  ) : (
    <></>
  );
};

const Post = ({ post, preview }) => {
  return (
    <>
      <Header element="p" />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h5" component="h1">
            {post?.title}
          </Typography>
          {featuredImage(post)}
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
