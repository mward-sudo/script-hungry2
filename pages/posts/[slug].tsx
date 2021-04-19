import { useState } from "react";
import { Box, Container, Button } from "@material-ui/core";
import Head from "next/head";
import dynamic from "next/dynamic";
import Copyright from "../../components/copyright";
import Header from "../../components/header";
import PostHeaderWithImage from "../../components/post-header-with-image";
import PostHeader from "../../components/post-header";
import { getAllPostsWithSlug, getPost } from "../../lib/api";
import Constants from "../../lib/consts";
// import Disqus from "../../components/disqus";
import { useRouter } from "next/router";

const Disqus = dynamic(
() => import('../../components/disqus'), { loading: () => <p>...</p>}
)

const Post = ({ post, comments = false, preview }) => {
  const [showComments, setShowComments] = useState(false);

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
          {post?.featuredImage ? (
            <PostHeaderWithImage
              title={post?.title}
              image={post?.featuredImage}
            />
          ) : (
            <PostHeader title={post?.title} />
          )}
          <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
          {showComments ? (
            <Disqus
              key={post?.id}
              pageTitle={post?.title}
              pageID={post?.id}
              pageURL={`https://scripthungr2.vercel.app${router.asPath}`}
          /> ) : ( <Button variant="outlined" fullWidth color="primary" onClick={() => setShowComments(true)}>Show Comments</Button> ) }
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
