import React, {PropTypes} from 'react'

export default class TextLog extends React.Component {
  static get propTypes () {
    return {
      text: PropTypes.string,
    }
  }

  render () {
    return <p>{this.props.text}</p>
  }
}
