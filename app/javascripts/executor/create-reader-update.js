import * as UC from 'watif/universal-constants'
import Immutable from 'immutable'
import _ from 'lodash'

export default function createReaderState (universe) {
  return {
    ...createInventory(universe),
    ...createUiField(universe, UC.CURRENT_EVENT_KEY),
    ...createUiField(universe, UC.CURRENT_ROOM_KEY),
    ...createUiField(universe, UC.CURRENT_ITEM_KEY),
  }
}

function isVerbEnabled (verb, universe, context) {
  const isEnabled = verb.get(UC.ENABLED_KEY)
  if (!isEnabled) return true
  return isEnabled(universe, context)
}

function createVerbContent (watifObject, verb) {
  return {
    [UC.ID_KEY]: verb.get(UC.ID_KEY),
    [UC.NAME_KEY]: verb.get(UC.NAME_KEY),
    [UC.OBJECT_KEY]: watifObject.get(UC.ID_KEY),
  }
}

function createVerbsContent (universe, watifObject) {
  const verbs = watifObject.get(UC.VERBS_KEY)
  if (!verbs) return []
  return verbs
    .filter(verb => isVerbEnabled(verb, universe, watifObject))
    .map(verb => createVerbContent(watifObject, verb))
    .toJS()
}

function recurseCreateDescriptionContent (description, universe, watifObject) {
  if (Immutable.List.isList(description)) {
    return (description
      .map(d => recurseCreateDescriptionContent(d, universe, watifObject))
      .join(' ')
    )
  } else if (_.isFunction(description)) {
    return description(universe, watifObject)
  }
  return description
}

function createDescriptionContent (universe, watifObject) {
  const description = watifObject.get(UC.DESCRIPTION_KEY)
  return recurseCreateDescriptionContent(description, universe, watifObject)
}

function createInventory (universe) {
  let objects = universe.get(UC.OBJECTS_KEY)
    .valueSeq()
    .filter(obj => obj.getIn([UC.STATE_KEY, UC.LOCATION_KEY]) === UC.INVENTORY_LOCATION)
    .map(obj => ({id: obj.get(UC.ID_KEY), name: obj.get(UC.NAME_KEY)}))
  if (objects.isEmpty()) return null
  return { [UC.INVENTORY_KEY]: objects.toJS() }
}

function createFieldContent (universe, watifObject) {
  return {
    [UC.ID_KEY]: watifObject.get(UC.ID_KEY),
    [UC.NAME_KEY]: watifObject.get(UC.NAME_KEY),
    [UC.DESCRIPTION_KEY]: createDescriptionContent(universe, watifObject),
    [UC.VERBS_KEY]: createVerbsContent(universe, watifObject),
  }
}

function createUiField (universe, fieldKey) {
  const currentObjectId = universe.getIn([UC.READER_KEY, fieldKey])
  const currentObject = universe.getIn([UC.OBJECTS_KEY, currentObjectId])
  if (currentObject) return {[fieldKey]: createFieldContent(universe, currentObject)}
}
