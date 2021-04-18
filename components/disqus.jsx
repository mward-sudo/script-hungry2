import { DiscussionEmbed } from "disqus-react";

const Disqus = ({ pageID, pageURL, pageTitle }) => {
  return (
    <DiscussionEmbed
      shortname="scripthungry.disqus.com"
      config={{
        url: pageURL,
        identifier: pageID,
        title: pageTitle,
        language: "en_GB"
      }}
    />
  );
};

export default Disqus;
