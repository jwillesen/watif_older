import React, {PropTypes} from 'react'
import Watypes from 'watif/watext/types'
import ItemButton from './item-button'

export default class WatextView extends React.Component {
  static get propTypes () {
    return {
      // The watext to render
      watext: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
      // The callback when an item is clicked
      // receives the item watext as a parameter
      onItemClick: PropTypes.func,
    }
  }

  renderChildren (children) {
    if (typeof children === 'string') return children
    else if (Array.isArray(children)) {
      return children.map((child, index) => <WatextView watext={child} key={index}/>)
    }
  }

  ['render_' + Watypes.TEXT] () {
    return <span>{this.renderChildren(this.props.watext.text)}</span>
  }

  ['render_' + Watypes.PARAGRAPH] () {
    return <p>{this.renderChildren(this.props.watext.text)}</p>
  }

  ['render_' + Watypes.ITEM] () {
    return <ItemButton {...this.props}>{this.renderChildren(this.props.watext.text)}</ItemButton>
  }

  render () {
    const rendererName = 'render_' + this.props.watext.type
    const renderer = this[rendererName]
    if (!renderer) return <span>Error: Unrecognized type: {this.props.watext.type}</span>
    return renderer.call(this)
  }
}
