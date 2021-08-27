import { types, Repeater, Text } from 'react-bricks'

const Cards: types.Brick = () => (
  <div className="container mx-auto">
    <Text
      propName="cardsHeading"
      placeholder="Header"
      renderBlock={({ children }) => <h2 className="mt-0 mb-2">{children}</h2>}
    />
    <div className="flex flex-wrap justify-center">
      <Repeater propName="cards" />
    </div>
  </div>
)

Cards.schema = {
  name: 'cards',
  label: 'Cards',
  getDefaultProps: () => ({
    cardsHeading: 'Cards',
    cards: [
      { cardText: 'Card 1' },
      { cardText: 'Card 2' },
      { cardText: 'Card 3' },
      { cardText: 'Card 4' },
    ],
  }),
  repeaterItems: [
    {
      name: 'cards',
      itemType: 'card',
      itemLabel: 'Card',
    },
  ],
}

export default Cards
