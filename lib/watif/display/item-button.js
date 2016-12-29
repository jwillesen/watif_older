import React, {PropTypes} from 'react'

export default class ItemButton extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  static get propTypes () {
    return {
      children: PropTypes.node,
      watext: PropTypes.object.isRequired,
      onItemClick: PropTypes.func,
    }
  }

  handleClick () {
    if (!this.props.onItemClick) return
    this.props.onItemClick(this.props.watext)
  }

  render () {
    return <button onClick={this.handleClick}>{this.props.children}</button>
  }
}
