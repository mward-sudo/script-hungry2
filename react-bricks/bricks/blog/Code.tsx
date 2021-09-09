import { types, RichText } from 'react-bricks'

//=============================
// Component to be rendered
//=============================
const Code: types.Brick = ({ ...rest }) => (
  <div className="max-w-3xl px-4 mx-auto dark:text-gray-200" {...rest}>
    <RichText
      renderBlock={({ children }) => (
        <pre>
          <code>{children}</code>
        </pre>
      )}
      propName="code"
      placeholder="Code"
      allowedFeatures={[]}
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
Code.schema = {
  name: 'code',
  label: 'Code',
  getDefaultProps: () => ({}),
  sideEditProps: [],
}

export default Code
