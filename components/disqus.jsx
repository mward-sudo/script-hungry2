import { DiscussionEmbed } from "disqus-react";

const Disqus = ({ pageID, pageURL, pageTitle }) => {
  const disqusConfig = {
    url: pageURL,
    identifier: pageID,
    title: pageTitle
  };

  return (
    <div>
      <DiscussionEmbed shortname="scripthungry" config={disqusConfig} />
    </div>
  );
};

export default Disqus;
