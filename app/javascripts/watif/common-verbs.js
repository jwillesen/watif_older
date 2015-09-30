import {verb} from './objects'
import {takeItem, openItem, closeItem} from './manipulators'
import {isInInventory, isOpen} from './info'
import {triggerEvent} from './manipulators'
import * as UC from './universal-constants'

export function takeItemVerb (itemKey) {
  return verb(UC.TAKE_VERB_ID,
    [takeItem(itemKey), triggerEvent(UC.TAKE_ITEM_EVENT_ID)], {
      enabled: isInInventory().not(),
    }
  )
}

export function openVerb (options) {
  const verbOptions = {enabled: isOpen().not(), ...options}
  return verb(UC.OPEN_VERB_ID, [openItem()], verbOptions)
}

export function closeVerb (options) {
  const verbOptions = {enabled: isOpen(), ...options}
  return verb(UC.CLOSE_VERB_ID, [closeItem()], verbOptions)
}
