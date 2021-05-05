import { FC } from 'react'
import { DiscussionEmbed } from 'disqus-react'

type DisqusProps = {
  pageID: string
  pageURL: string
  pageTitle: string
}

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
