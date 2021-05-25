import { FC } from 'react'
import { DiscussionEmbed } from 'disqus-react'

type DisqusProps = {
  /** Unique identifier for the page displaying comments */
  pageID: string
  /** Absolute URL of the page dispalying comments */
  pageURL: string
  /** Title of the page displaying comments */
  pageTitle: string
}

/**
 * Implements Disqus comments
 */
const Disqus: FC<DisqusProps> = ({ pageID, pageURL, pageTitle }) => {
  const disqusConfig = {
    url: pageURL,
    identifier: pageID,
    title: pageTitle,
  }

  return (
    <div>
      <DiscussionEmbed shortname="scripthungry" config={disqusConfig} />
    </div>
  )
}

export default Disqus
