import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunker from 'redux-thunk'

import StoryDisplayActionAdapter from './story-display-action-adapter'
import * as Const from './constants'
import * as Actions from './actions'
import universalReducer from './reducer'
import preface from './preface'

export default class Universe {
  // externals:
    // story: (required) a watif story
    // plugins: (optional) a list of plugins to use
    // store: (optional) like redux store that uses Immutable.Map for state
    // adapter: (optional) like StoryDisplayActionAdapter
    // preface: (optional) object with `begin` method that accepts this
  constructor (story, externals = {}) {
    this._plugins = []
    if (story.plugins && Array.isArray(story.plugins)) {
      this._plugins = this._plugins.concat(story.plugins)
    }
    this._applyExternals(externals)
    this._preface.begin(this)
  }

  _applyExternals (externals) {
    this._applyPreface(externals)
    this._applyAdapter(externals)
    this._applyStore(externals)
  }

  _applyPreface (externals) {
    this._preface = externals.preface || preface
  }

  _applyAdapter (externals) {
    if (!externals.adapter) {
      this._adapter = new StoryDisplayActionAdapter({
        examineItem: this.handleSelectItem.bind(this),
        executeVerb: this.handleExecuteVerb.bind(this),
      })
    } else this._adapter = externals.adapter
  }

  _applyStore (externals) {
    if (!externals.store) {
      this._store = this._createStore()
    } else this._store = externals.store
  }

  _createStore () {
    const middleware = [thunker]
    if (!self.TESTING) {
      middleware.push(logger({
        stateTransformer: this._transformStateForLogger.bind(this),
        actionTransformer: this._transformActionForLogger.bind(this),
      }))
    }

    return createStore(this._reducer.bind(this), applyMiddleware(...middleware))
  }

  _transformStateForLogger (state) {
    return state.toJS()
  }

  _transformActionForLogger (action) {
    if (action.payload.toJS) {
      action.payload = action.payload.toJS()
    }
    return action
  }

  _reducer (state, action) {
    state = universalReducer(state, action)
    this._plugins.forEach((plugin) => {
      if (plugin.reducer) state = plugin.reducer(state, action)
    })
    return state
  }

  _examineItem () { console.log('TODO: _examineItem') }

  getStore () { return this._store }
  getState () { return this._store.getState() }
  dispatch (action) { return this._store.dispatch(action) }

  showError (errorString) {
    this.dispatch(Actions.displayError(errorString))
  }

  findPlayer () { return this.findItem(Const.PLAYER) }

  findItem (itemId) {
    const item = this.getState().getIn(['items', itemId])
    if (!item) this.showError(`could not find item: ${itemId}`)
    return item
  }

  getStateOf (item) {
    return this.getState().getIn([item, 'state'])
  }

  setStateOf (item, newState) {
    this.getStore().dispatch(Actions.modifyItemState(item, newState))
  }

  createItem (newItem) {
    this.dispatch(Actions.createItem(newItem))
  }

  setItems (items) {
    this.getStore().dispatch(Actions.setItems(items))
  }

  relocate (item, newLocation) {
    this.getState().dispatch(Actions.relocateItem(item, newLocation))
  }

  event (eventDescription) {
    this.getState().dispatch(Actions.event(eventDescription))
  }

  handleSelectItem (itemId) {
    const item = this.findItem(itemId)
    if (!item) {
      this.showError(`unrecognized item id: ${itemId}`)
      return
    }

    this._examineItem(this, item)
  }

  handleExecuteVerb (verbId, subjectItemId, targetItemId) {
    const subjectItem = this.findItem(subjectItemId)
    if (!subjectItem) {
      return this.showError(`subject item '${subjectItemId}' not found`)
    }
    let targetItem = null
    if (targetItemId) {
      targetItem = this.findItem(targetItemId)
      if (!targetItem) {
        return this.showError(`targt item '${targetItemId}' not found`)
      }
    }
    if (!subjectItem[`verb${verbId}`]) {
      return this.showError(`subject does not respond to verb '${verbId}'`)
    }

    subjectItem[`verb${verbId}`](targetItem)
  }
}
