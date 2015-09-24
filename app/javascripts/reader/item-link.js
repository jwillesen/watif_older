import React, {PropTypes} from 'react'

export default class ItemLink extends React.Component {
  static get propTypes () {
    return {
      item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    }
  }

  static get defaultProps () {
    return {
    }
  }

  handleClick (event) {
    event.preventDefault()
    this.props.onActivate(this.props.item)
  }

  handleKeyPress (event) {
    if (event.key === ' ') {
      event.preventDefault()
      this.props.onActivate(this.props.item)
    }
  }

  render () {
    return (
      <a href='#' role='button'
        onClick={this.handleClick.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
        {...this.props}
      >
        {this.props.item.name}
      </a>
    )
  }
}
