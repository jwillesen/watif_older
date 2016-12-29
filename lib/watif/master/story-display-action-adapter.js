/* global application */

export default class StoryDisplayActionAdapter {
  // callbacks:
    // itemSelected(itemId)
    // verbSelected(subjectItemId, verbId, targetItemId)
  // externals:
    // application: jailed
  constructor (callbacks, externals = {}) {
    this._callbacks = callbacks
    this._applyExternals(externals)
    this._bindCallbacks()
    this._exportMethods()
  }

  _applyExternals (externals) {
    // don't access the application global if we're just running tests
    if (externals.application) {
      this._application = externals.application
    } else {
      this._application = application // jailed global
    }
  }

  _bindCallbacks () {
    this._thisBind('handleDisplayItemSelected')
    this._thisBind('handleDisplayVerbSelected')
  }

  _thisBind (method) {
    this[method] = this[method].bind(this)
  }

  _exportMethods () {
    const api = {
      examineItem: this.handleDisplayItemSelected,
      selectVerb: this.handleDisplayVerbSelected,
    }
    this._application.setInterface(api)
  }

  handleDisplayItemSelected (subjectItemId) {
    this._callbacks.examineItem(subjectItemId)
  }

  handleDisplayVerbSelected (verbId, subjectItemId, targetItemId) {
    this._callbacks.selectVerb(verbId, subjectItemId, targetItemId)
  }

  sendDisplayState (displayState) {
    this._application.remote.setDisplayState(displayState)
  }
}
