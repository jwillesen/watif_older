import React, {PropTypes} from 'react'
import shouldUpdate from './smart-should-update'
import newTextAnimation from './new-text-animation'

export default class ItemLink extends React.Component {
  static get propTypes () {
    return {
      item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
      shouldAnimate: PropTypes.bool,
    }
  }

  static get defaultProps () {
    return {
      shouldAnimate: false,
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shouldUpdate(this, nextProps, nextState)
  }

  componentDidMount () {
    if (this.props.shouldAnimate) {
      newTextAnimation(React.findDOMNode(this))
    }
  }

  componentDidUpdate () {
    if (this.props.shouldAnimate) {
      newTextAnimation(React.findDOMNode(this))
    }
  }

  handleClick (event) {
    event.preventDefault()
    this.props.onActivate(this.props.item)
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.props.onActivate(this.props.item)
    }
  }

  render () {
    return (
      <a role='button' tabIndex='0'
        onClick={this.handleClick.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
        {...this.props}
      >
        {this.props.item.name}
      </a>
    )
  }
}
