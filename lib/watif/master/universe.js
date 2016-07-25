import { createStore } from 'redux'
import StoryPlayerActionAdapter from './story-player-action-adapter'
import * as actions from './actions'
import universalReducer from './reducer'

export default class Universe {
  // externals:
    // story: (required) a watif story
    // plugins: (optional) a list of plugins to use
    // store: (optional) like redux store that uses Immutable.Map for state
    // adapter: (optional) like StoryPlayerActionAdapter
  constructor (externals) {
    this._story = externals.story
    this._applyDefaults(externals)

    if (externals.plugins) this._plugins = externals.plugins
    if (this._story.plugins) this._plugins = this._plugins.concat(this._story.plugins)
  }

  _applyDefaults (externals) {
    if (!externals.adapter) {
      this._adapter = new StoryPlayerActionAdapter({
        selectItem: this.handleSelectItem.bind(this),
        executeVerb: this.handleExecuteVerb.bind(this),
      })
    } else this._adapter = externals.adapter

    if (!externals.store) {
      this._store = this.createStore()
    } else this._store = externals.store
  }

  _createStore () {
    return createStore(this._reducer.bind(this))
  }

  _reducer (state, action) {
    state = universalReducer(state, action)
    this._plugins.forEach((plugin) => {
      if (plugin.reducer) state = plugin.reducer(state, action)
    })
    return state
  }

  getStore () { return this._store }
  getState () { return this._store.getState() }
  getStory () { return this._story }

  showError (errorString) {
    this._store.dispatch(actions.displayError(errorString))
  }

  findPlayer () { return this.findItem('player') }

  findItem (itemId) {
    const item = this.getState().get('items').get(itemId)
    if (!item) this.showError(`could not find item: ${itemId}`)
    return item
  }

  relocate (item, newLocation) {
    this.getState().dispatch(actions.relocateItem(item, newLocation))
  }

  event (eventDescription) {
    this.getState().dispatch(actions.event(eventDescription))
  }

  handleSelectItem (itemId) {
    const item = this._story.getItem(itemId)
    if (!item) {
      this._store.dispatch(actions.displayError(`unrecognized item id: ${itemId}`))
      return
    }

    let handled = item.selectItem(this, item)
    if (handled) return

    handled = this._story.selectItem(this, item)
    if (handled) return

    this._store.dispatch(actions.selectItem(this, item))
  }

  handleExecuteVerb (subjectItemId, verbId, targetItemId) {
    const subject = this._story.getItem(subjectItemId)
    let target = null
    if (targetItemId) target = this._story.getItem(targetItemId)

    let handled = subject.executeVerb(this, verbId, target)
    if (handled) return

    handled = target.executeVerb(this, verbId, subject)
    if (handled) return

    handled = this._story.executeVerb(this, subjectItemId, verbId, targetItemId)
    if (handled) return

    this._store.dispatch(actions.displayError(`verb was not handled: ${subjectItemId} ${verbId} ${targetItemId}`))
  }
}
