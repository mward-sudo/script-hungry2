import { types, Text } from 'react-bricks'

//=============================
// Local Types
//=============================

//=============================
// Component to be rendered
//=============================
const Heading2: types.Brick = ({ ...rest }) => (
  <div className="max-w-3xl px-4 mx-auto mt-4 mb-0" {...rest}>
    <Text
      propName="title"
      placeholder="Title"
      renderBlock={({ children }) => (
        <h2 className="text-gray-800 dark:text-gray-200">{children}</h2>
      )}
    />
  </div>
)

//=============================
// Block Schema
//=============================
Heading2.schema = {
  name: 'heading2',
  label: 'Heading 2',
  getDefaultProps: () => ({
    title: 'Heading 2',
  }),
  sideEditProps: [],
}

export default Heading2
