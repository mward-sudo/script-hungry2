import React from "react";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type PostExcerptProps = {
  title: string;
  excerpt: string;
  slug: string;
};

const PostExcerpt: React.FC<PostExcerptProps> = ({ title, excerpt, slug }) => {
  const useStyles = makeStyles(() => ({
    body: {
      fontSize: 16
    }
  }));
  const classes = useStyles();

  return (
    <Card>
      <Link href={`/posts/${slug}`} passHref>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>

            <div
              className={classes.body}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            ></div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default PostExcerpt;
