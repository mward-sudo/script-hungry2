import React from "react";
import { getAllPostsForHome } from "../lib/api";
import { Container, Typography, Box } from "@material-ui/core";
import PostExcerptList from "../components/post-excerpt-list";
import ProTip from "../components/ProTip";
import Link from "../components/Link";
import Copyright from "../components/Copyright";

export default function Index({ allPosts }) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>

        <PostExcerptList posts={allPosts} />

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview }
  };
}
