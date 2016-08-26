import Immutable from 'immutable'

function createItems (story, universe) {
  let items = Immutable.Map()
  story.items.forEach(ItemClass => {
    items = items.set(ItemClass.name, new ItemClass(universe))
  })
  return items
}

function placeItems (items, universe) {
  items.forEach((item, id) => {
    universe.relocate(id, item.initialLocation())
  })
}

function begin (story, universe) {
  const items = createItems(story, universe)
  universe.setItems(items)
  placeItems(items, universe)
}

export default {
  begin: (story, universe) => begin(story, universe),
}
