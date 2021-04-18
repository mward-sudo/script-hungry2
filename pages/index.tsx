import { getAllPostsForHome } from "../lib/api";
import { Container, Box } from "@material-ui/core";
import Header from "../components/header";
import PostExcerptList from "../components/post-excerpt-list";
import Copyright from "../components/copyright";
import Head from "next/head";
import Constants from "../lib/consts";

export default function Index({ allPosts }) {
  return (
    <>
      <Head>
        <title>{Constants.SITE_NAME}</title>
      </Head>
      <Header />
      <Container maxWidth="sm">
        <Box my={4}>
          <PostExcerptList posts={allPosts} />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 60
  };
}
