import registry from 'watif/story/item-registry'

const itemsContext = require.context('./items', true, /\.js$/)
itemsContext.keys().forEach((file) => {
  const exportedItems = itemsContext(file)
  Object.keys(exportedItems).forEach(itemKey => registry.register(exportedItems[itemKey]))
})
