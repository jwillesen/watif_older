import React, {PropTypes} from 'react'

import TextDisplay from './text-display'
import ItemLink from './item-link'

require('./inventory-display.scss')

function noop () {}

export default class InventoryDisplay extends React.Component {
  static get propTypes () {
    return {
      inventory: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
      onObjectReferenceSelected: PropTypes.func,
    }
  }

  static get defaultProps () {
    return {
      inventory: [],
      onObjectReferenceSelected: noop,
    }
  }

  renderItem (item) {
    return (
      <li className='inventory-display__list-item' key={item.id}>
        <ItemLink
          item={item}
          className='inventory-display__item-link'
          onActivate={item => this.props.onObjectReferenceSelected(item.id)}
        />
      </li>
    )
  }

  renderInventoryItems () {
    return (
      <ul className='inventory-display__list'>
        {this.props.inventory.map(this.renderItem.bind(this))}
      </ul>
    )
  }

  render () {
    return (
      <TextDisplay title='Inventory'>
        {this.renderInventoryItems()}
      </TextDisplay>
    )
  }
}
