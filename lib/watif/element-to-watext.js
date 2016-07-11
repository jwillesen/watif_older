import React from 'react'

const ITEM_TYPE = 'item'
const TEXT_TYPE = 'text'
const PARAGRAPH_TYPE = 'p'

const TRANSLATORS = {
  [TEXT_TYPE]: translateText,
  [ITEM_TYPE]: translateItem,
  [PARAGRAPH_TYPE]: translateParagraph,
}

export default function elementToWatext (reactElement) {
  const elementType = typeof reactElement
  if (elementType === 'string' || elementType === 'number') return plainTextElement(reactElement)
  else if (Array.isArray(reactElement)) return translateArray(reactElement)
  else if (React.isValidElement(reactElement)) return translateElement(reactElement)
  else throw new Error('invalid element: ' + String(reactElement))
}

function generateText (element) {
  return {text: elementToWatext(element.props.children)}
}

function translateElement (element) {
  const translator = TRANSLATORS[element.type]
  if (!translator) throw new Error('unrecognized element: ' + element.type)
  return translator(element)
}

function plainTextElement (element) {
  return String(element)
}

function translateArray (element) {
  return element.map(elt => elementToWatext(elt))
}

function translateText (element) {
  return {type: TEXT_TYPE, ...generateText(element)}
}

function translateItem (element) {
  if (!element.props.id) throw new Error('id property is required for items')
  return {type: ITEM_TYPE, id: element.props.id, ...generateText(element)}
}

function translateParagraph (element) {
  return {type: PARAGRAPH_TYPE, ...generateText(element)}
}
