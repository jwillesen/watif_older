export const PARAGRAPH_ELEMENT_TYPE = 'paragraph'
export const TEXT_ELEMENT_TYPE = 'text'
export const OBJECT_REFERENCE_ELEMENT_TYPE = 'object'

export function parseContent (text) {
  const paragraphs = text
    .split(/\n\n/)
    .map(stripWhitespace)
    .filter(hasContent)
  return paragraphs.map(text => ({
    type: PARAGRAPH_ELEMENT_TYPE,
    payload: parseText(text),
  }))
}

function parseText (text) {
  // looking for bracket pair that does not have sub-brackets or new lines
  const objectLinkRegex = /(\[[^\n\[\]]+\])/
  const textParts = text
    .split(objectLinkRegex)
    .filter(hasContent)
  return textParts.map(part => {
    if (part.search(objectLinkRegex) === 0) {
      // pull out individual pieces
      const partRegex = /\[([^\|]+)\|?([^\|]+)?\]/
      const match = part.match(partRegex)
      const name = stripWhitespace(match[1])
      const id = stripWhitespace(match[2] || name) // id defaults to name
      return { type: OBJECT_REFERENCE_ELEMENT_TYPE, payload: {id, name} }
    } else {
      return { type: TEXT_ELEMENT_TYPE, payload: part }
    }
  })
}

function hasContent (text) {
  return text.length !== 0
}

function stripWhitespace (text) {
  return text.trim()
}
