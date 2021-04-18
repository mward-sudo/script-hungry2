import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const PostHeader = ({ title }) => {
  const useStyles = makeStyles(() => ({
    headingSpan: {
      color: "#fff",
      backgroundColor: "red"
    }
  }));
  const classes = useStyles();

  return (
    <Typography variant="h5" component="h1">
      <span className={classes.headingSpan}>{title}</span>
    </Typography>
  );
};

export default PostHeader;
