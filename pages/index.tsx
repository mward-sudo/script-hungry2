import { getAllPostsForHome } from "../lib/api";
import { Container, Typography, Box } from "@material-ui/core";
import PostExcerptList from "../components/post-excerpt-list";
import Copyright from "../components/Copyright";

export default function Index({ allPosts }) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ScriptHungry
        </Typography>

        <PostExcerptList posts={allPosts} />

        <Copyright />
      </Box>
    </Container>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 60
  };
}
