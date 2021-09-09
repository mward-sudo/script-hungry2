import { types, RichText } from 'react-bricks'

//=============================
// Component to be rendered
//=============================
const PostContent: types.Brick = ({ ...rest }) => (
  <div className="max-w-3xl px-4 mx-auto dark:text-gray-200" {...rest}>
    <RichText
      renderBlock={({ children }) => <div>{children}</div>}
      propName="post-content"
      placeholder="Post content"
      allowedFeatures={[
        types.RichTextFeatures.Bold,
        types.RichTextFeatures.Italic,
        types.RichTextFeatures.Code,
        types.RichTextFeatures.Highlight,
        types.RichTextFeatures.Link,
        types.RichTextFeatures.UnorderedList,
        types.RichTextFeatures.OrderedList,
      ]}
      renderCode={({ children }) => (
        <pre>
          <code>{children}</code>
        </pre>
      )}
    />
  </div>
)

//=============================
// Block Schema
//=============================
PostContent.schema = {
  name: 'post-content',
  label: 'Post Content',
  getDefaultProps: () => ({}),
  sideEditProps: [],
}

export default PostContent
