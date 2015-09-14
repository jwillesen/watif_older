import React, {PropTypes} from 'react'
import {Label} from 'react-bootstrap'

export default class CommandLog extends React.Component {
  static get propTypes () {
    return {
      command: PropTypes.shape({
        name: PropTypes.string,
      }).isRequired,
    }
  }

  render () {
    return (
      <p><Label bsStyle='primary'>{this.props.command.name}</Label></p>
    )
  }
}
