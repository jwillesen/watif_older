import * as UC from 'watif/universal-constants'

export default function createReaderState (universe) {
  return {
    ...createInventory(universe),
    ...createUiField(universe, UC.CURRENT_EVENT_KEY),
    ...createUiField(universe, UC.CURRENT_ROOM_KEY),
    ...createUiField(universe, UC.CURRENT_ITEM_KEY),
  }
}

function createVerbContent (watifObject, verb) {
  return {
    [UC.ID_KEY]: verb.get(UC.ID_KEY),
    [UC.NAME_KEY]: verb.get(UC.NAME_KEY),
    [UC.OBJECT_KEY]: watifObject.get(UC.ID_KEY),
  }
}

function createVerbsContent (watifObject) {
  const verbs = watifObject.get(UC.VERBS_KEY)
  if (!verbs) return []
  return verbs.map(verb => createVerbContent(watifObject, verb)).toJS()
}

function createInventory (universe) {
  let objects = universe.get(UC.OBJECTS_KEY)
    .valueSeq()
    .filter(obj => obj.getIn([UC.STATE_KEY, UC.LOCATION_KEY]) === UC.INVENTORY_LOCATION)
    .map(obj => ({id: obj.get(UC.ID_KEY), name: obj.get(UC.NAME_KEY)}))
  if (objects.isEmpty()) return null
  return { [UC.INVENTORY_KEY]: objects.toJS() }
}

function createFieldContent (watifObject) {
  return {
    [UC.ID_KEY]: watifObject.get(UC.ID_KEY),
    [UC.NAME_KEY]: watifObject.get(UC.NAME_KEY),
    [UC.DESCRIPTION_KEY]: watifObject.get(UC.DESCRIPTION_KEY),
    [UC.VERBS_KEY]: createVerbsContent(watifObject),
  }
}

function createUiField (universe, fieldKey) {
  const currentObjectId = universe.getIn([UC.READER_KEY, fieldKey])
  const currentObject = universe.getIn([UC.OBJECTS_KEY, currentObjectId])
  if (currentObject) return {[fieldKey]: createFieldContent(currentObject)}
}
