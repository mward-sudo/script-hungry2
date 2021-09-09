import { types, Text } from 'react-bricks'

//=============================
// Local Types
//=============================

//=============================
// Component to be rendered
//=============================
const Heading3: types.Brick = ({ ...rest }) => (
  <div className="max-w-3xl px-4 mx-auto mt-8 mb-0" {...rest}>
    <Text
      propName="title"
      placeholder="Title"
      renderBlock={({ children }) => (
        <h3 className="font-bold text-gray-800 dark:text-gray-200">
          {children}
        </h3>
      )}
    />
  </div>
)

//=============================
// Block Schema
//=============================
Heading3.schema = {
  name: 'heading3',
  label: 'Heading 3',
  getDefaultProps: () => ({
    title: 'Heading 3',
  }),
  sideEditProps: [],
}

export default Heading3
