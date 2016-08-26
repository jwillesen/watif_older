import Immutable from 'immutable'
import * as Actions from './actions'

function createItems (story, universe) {
  let items = Immutable.Map()
  story.items.forEach(ItemClass => {
    items = items.set(ItemClass.name, new ItemClass(universe))
  })
  return items
}

function begin (story, universe) {
  const items = createItems(story, universe)
  universe.getStore().dispatch(Actions.setItems(items))
}

export default {
  begin: (story, universe) => begin(story, universe),
}
