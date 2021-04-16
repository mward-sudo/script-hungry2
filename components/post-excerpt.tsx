import React from "react";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostHeaderImage from "./post-header-image";

type PostExcerptProps = {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: any;
};

const PostExcerpt: React.FC<PostExcerptProps> = ({
  title,
  excerpt,
  slug,
  featuredImage
}) => {
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
            <CardMedia>
              <PostHeaderImage
                url={featuredImage.node.sourceUrl}
                height={featuredImage.node.mediaDetails?.height}
                width={featuredImage.node.mediaDetails?.width}
              />
            </CardMedia>

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
