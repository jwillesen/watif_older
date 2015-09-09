import React from 'react'
import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import * as actions from './actions'
import VerbLog from './verb-log'
import TextLog from './text-log'

const DEFAULT_TEXT_AREA = {text: [], verbs: []}

function createVerbLogElement (verb, id) {
  return <VerbLog verb={verb} key={id} />
}

function createTextLogElement (text, id) {
  return <TextLog text={text} key={id} />
}

function appendVerbToLog (state, action) {
  return updateLog(
    state,
    createVerbLogElement(action.payload, state.text.length),
    state.verbs)
}

function appendTextToLog (state, action) {
  return updateLog(
    state,
    createTextLogElement(action.payload.log.text, state.text.length),
    action.payload.log.verbs)
}

function updateLog (state, logElement, verbs) {
  return {
    text: state.text.concat(logElement),
    verbs,
  }
}

const readerReducers = {
  log: handleActions({
    [actions.UPDATE_INTERFACE]: appendTextToLog,
    [actions.VERB_COMMAND]: appendVerbToLog,
  }, DEFAULT_TEXT_AREA),
}

export const reducer = combineReducers(readerReducers)
