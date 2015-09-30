import * as UC from './universal-constants'
import {cond, pred} from 'cond'

export const findObject = (universe, objectKey) => universe.getIn([UC.OBJECTS_KEY, objectKey])

export const getId = () => pred((universe, target) => target.get(UC.ID_KEY))

export const getState = (stateKey) =>
  pred((universe, target) => target.getIn([UC.STATE_KEY, stateKey]))

export const getStateOf = (objectId, stateKey) => {
  return pred((universe, target) => {
    const object = findObject(universe, objectId)
    return getState(stateKey)(universe, object)
  })
}

export const getLocation = () => getState(UC.LOCATION_KEY)
export const getLocationOf = (itemId) => getStateOf(itemId, UC.LOCATION_KEY)

export const isInInventory = () => getState(UC.LOCATION_KEY).eq(UC.INVENTORY_LOCATION)
export const isOpen = () => getState(UC.OPEN_KEY).eq(true)

export const ifHere = (itemId) => cond(getLocationOf(itemId).eq(getId()))
