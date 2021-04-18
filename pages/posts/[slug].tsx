import { Box, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import Copyright from "../../components/copyright";
import Header from "../../components/header";
import PostHeaderWithImage from "../../components/post-header-with-image";
import PostHeader from "../../components/post-header";
import { getAllPostsWithSlug, getPost } from "../../lib/api";
import Constants from "../../lib/consts";
import Disqus from "../../components/disqus";
import { useRouter } from "next/router";

const Post = ({ post, preview }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {post?.title} | {Constants.SITE_NAME}
        </title>
      </Head>
      <Header element="p" />
      <Container maxWidth="sm">
        <Box my={4}>
          {post.featuredImage ? (
            <PostHeaderWithImage
              title={post.title}
              image={post.featuredImage}
            />
          ) : (
            <PostHeader title={post.title} />
          )}
          <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
          <Disqus
            pageTitle={post.title}
            pageID={post.id}
            pageURL={router.pageURL}
          />
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
