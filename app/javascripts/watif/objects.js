const checker = require('api-check')()

import * as UC from './universal-constants'

const OBJECT_TYPES = [UC.EVENT_TYPE, UC.ROOM_TYPE, UC.ITEM_TYPE]

const VERB_SHAPE = checker.shape({
  [UC.KEY_KEY]: checker.string,
  [UC.NAME_KEY]: checker.string,
  [UC.ACTION_KEY]: checker.oneOfType(
    [checker.func, checker.arrayOf(checker.func)]
  ),
}).strict

const COMMON_SHAPE = {
  [UC.KEY_KEY]: checker.string,
  [UC.TYPE_KEY]: checker.oneOf(OBJECT_TYPES),
  [UC.NAME_KEY]: checker.string,
  [UC.DESCRIPTION_KEY]: checker.string,
  [UC.VERBS_KEY]: checker.arrayOf(VERB_SHAPE).optional,
}

const STATE_SHAPE = {
  [UC.STATE_KEY]: checker.object.optional,
}

const LOCATION_SHAPE = {
  [UC.LOCATION_KEY]: checker.string,
}

const OBJECT_SHAPES = {
  [UC.EVENT_TYPE]: checker.shape({
    ...COMMON_SHAPE,
  }).strict,

  [UC.ROOM_TYPE]: checker.shape({
    ...COMMON_SHAPE,
    ...STATE_SHAPE,
  }).strict,

  [UC.ITEM_TYPE]: checker.shape({
    ...COMMON_SHAPE,
    ...STATE_SHAPE,
    ...LOCATION_SHAPE,
  }).strict,
}

export function validateVerb (verb) {
  checker.throw(VERB_SHAPE, verb)
}

export function validateObject (obj) {
  if (!obj.type) throw new Error('Watif objects must have a type')
  checker.throw(OBJECT_SHAPES[obj.type], obj)
}

export function createObject (key, type, attributes) {
  const obj = {
    [UC.KEY_KEY]: key,
    [UC.TYPE_KEY]: type,
    [UC.NAME_KEY]: key,
    ...attributes,
  }
  validateObject(obj)
  return obj
}

export function event (key, attributes) {
  return createObject(key, UC.EVENT_TYPE, attributes)
}

export function room (key, attributes) {
  return createObject(key, UC.ROOM_TYPE, attributes)
}

export function item (key, attributes) {
  return createObject(key, UC.ITEM_TYPE, attributes)
}

export function verb (key, action, attributes) {
  if (!Array.isArray(action) && typeof action === 'object' && attributes === undefined) {
    attributes = action
    action = undefined
  }

  const result = {
    [UC.KEY_KEY]: key,
    [UC.NAME_KEY]: key,
    [UC.ACTION_KEY]: action,
    ...attributes,
  }
  validateVerb(result)
  return result
}
