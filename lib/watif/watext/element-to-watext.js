import React from 'react'
import Types from './types'

const TRANSLATORS = {
  [Types.TEXT]: translateText,
  [Types.ITEM]: translateItem,
  [Types.PARAGRAPH]: translateParagraph,
}

export default elementToWatext

function elementToWatext (reactElement) {
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
  return {type: Types.TEXT, ...generateText(element)}
}

function translateItem (element) {
  if (!element.props.id) throw new Error('id property is required for items')
  return {type: Types.ITEM, id: element.props.id, ...generateText(element)}
}

function translateParagraph (element) {
  return {type: Types.PARAGRAPH, ...generateText(element)}
}
