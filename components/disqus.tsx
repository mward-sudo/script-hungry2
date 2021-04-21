import { FC } from 'react'
import PropTypes from 'prop-types'
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

Disqus.propTypes = {
  pageID: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
}

export default Disqus
