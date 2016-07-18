import StoryPlayerActionAdapter from './story-player-action-adapter'
import * as actions from './actions'

export default class Universe {
  // externals:
    // store: (required) like redux store that uses Immutable.Map for state
    // story: (required) like a watif Story
    // adapter: (optional) like StoryPlayerActionAdapter
  constructor (externals) {
    this._store = externals.store
    this._story = externals.story
    this._applyDefaults(externals)
  }

  _applyDefaults (externals) {
    if (!externals.adapter) {
      externals.adapter = new StoryPlayerActionAdapter({
        selectItem: this.handleSelectItem.bind(this),
        executeVerb: this.handleExecuteVerb.bind(this),
      })
    } else this._adapter = externals.adapter
  }

  getStore () { return this._store }
  getStory () { return this._story }

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
