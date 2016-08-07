const itemsContext = require.context('./items', true, /\.js$/)
itemsContext.keys().forEach(itemsContext)
