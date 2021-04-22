import iMediaDetails from './media-details'

export default interface iFeaturedImage {
    node: {
        sourceUrl: string,
        mediaDetails: iMediaDetails,
    },
}
