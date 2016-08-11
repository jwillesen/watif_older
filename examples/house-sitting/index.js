const itemClasses = []
// const pluginClasses = []

const itemsContext = require.context('./items', true, /\.js$/)
itemsContext.keys().forEach((file) => {
  const exportedItems = itemsContext(file)
  Object.keys(exportedItems).forEach(itemKey => itemClasses.push(exportedItems[itemKey]))
})

export const title = 'House Sitting'
export const items = itemClasses
// export const plugins = pluginClasses
