/* global application */

export default class StoryPlayerActionAdapter {
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
    this._thisBind('handlePlayerItemSelected')
    this._thisBind('handlePlayerVerbSelected')
  }

  _thisBind (method) {
    this[method] = this[method].bind(this)
  }

  _exportMethods () {
    const api = {
      examineItem: this.handlePlayerItemSelected,
      selectVerb: this.handlePlayerVerbSelected,
    }
    this._application.setInterface(api)
  }

  handlePlayerItemSelected (subjectItemId) {
    this._callbacks.examineItem(subjectItemId)
  }

  handlePlayerVerbSelected (verbId, subjectItemId, targetItemId) {
    this._callbacks.selectVerb(verbId, subjectItemId, targetItemId)
  }

  sendPlayerState (playerState) {
    this._application.remote.setPlayerState(playerState)
  }
}
