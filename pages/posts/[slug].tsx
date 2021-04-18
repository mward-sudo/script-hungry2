import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import Head from "next/head";
import Copyright from "../../components/copyright";
import Header from "../../components/header";
import PostHeaderImage from "../../components/post-header-image";
import { getAllPostsWithSlug, getPost } from "../../lib/api";
import Constants from "../../lib/consts";
import Disqus from "../../components/disqus";
import { useRouter } from "next/router";

const featuredImage = (post) => {
  return post?.featuredImage ? (
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
  const router = useRouter();
  const useStyles = makeStyles(() => ({
    rootPosition: {
      position: "relative"
    },
    postHeading: {
      position: "absolute",
      top: "1em",
      left: "1em",
      width: "50%",
      lineHeight: "1.3",
      zIndex: 100
    },
    postHeadingSpan: {
      backgroundColor: "red",
      color: "white"
    }
  }));

  const classes = useStyles();

  const ftImg = !!(post.featuredImage);
  
  console.log(post);
  
  return (
    <>
      <Head>
        <title>
          {post?.title} | {Constants.SITE_NAME}
        </title>
      </Head>
      <Header element="p" />
      <Container maxWidth="sm">
        <Box my={4} className={ftImg ? classes.rootPosition : ""}>
          <Typography
            variant="h5"
            component="h1"
            className={ftImg ? classes.postHeading : ""}
          >
            <span className={ftImg ? classes.postHeadingSpan : ""}>
              {post?.title}
            </span>
          </Typography>
          {featuredImage(post)}
          <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
          <Disqus pageTitle={post.title} pageID={post.id} pageURL={router.pageURL} /> 
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
