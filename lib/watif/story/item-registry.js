const registry = {
  register: function (itemClass) {
    this._itemClasses.push(itemClass)
  },

  getClasses: function () { return this._itemClasses },

  _itemClasses: [],
}

export default registry
