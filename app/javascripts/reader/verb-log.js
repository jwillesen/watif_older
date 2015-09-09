import React, {PropTypes} from 'react'
import {Label} from 'react-bootstrap'

export default class VerbLog extends React.Component {
  static get propTypes () {
    return {
      verb: PropTypes.shape({
        label: PropTypes.string,
      }).isRequired,
    }
  }

  render () {
    return (
      <p><Label bsStyle='primary'>{this.props.verb.label}</Label></p>
    )
  }
}
