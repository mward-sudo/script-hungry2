import { types } from 'react-bricks'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    excludedBlockTypes: ['postContent'],
  },
  {
    name: 'blog post',
    pluralName: 'blog posts',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Draft,
    getDefaultContent: () => ['title'],
    allowedBlockTypes: [
      'title',
      'heading2',
      'heading3',
      'post-content',
      'code',
    ],
  },
]

export default pageTypes
