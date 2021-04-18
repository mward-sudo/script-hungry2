import { DiscussionEmbed } from "disqus-react";

const Disqus = ({ pageID, pageUrl, pageTitle }) => {
  return (
    <DiscussionEmbed
      shortname="scripthungry"
      config={{
        url: pageUrl,
        identifier: pageID,
        title: pageTitle,
        language: "en_GB"
      }}
    />
  );
};

export default Disqus;
