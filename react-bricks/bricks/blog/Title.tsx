import { types, Text } from 'react-bricks'

//=============================
// Local Types
//=============================

//=============================
// Component to be rendered
//=============================
const Title: types.Brick = ({ ...rest }) => (
  <div className="max-w-3xl px-4 mx-auto mt-2 mb-0" {...rest}>
    <Text
      propName="title"
      placeholder="Title"
      renderBlock={({ children }) => (
        <h1 className="dark:text-gray-200">{children}</h1>
      )}
    />
  </div>
)

//=============================
// Block Schema
//=============================
Title.schema = {
  name: 'title',
  label: 'Title',
  getDefaultProps: () => ({
    title: 'Title',
  }),
  sideEditProps: [],
}

export default Title
