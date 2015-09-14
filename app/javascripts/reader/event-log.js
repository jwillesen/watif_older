import React, {PropTypes} from 'react'

export default class EventLog extends React.Component {
  static get propTypes () {
    return {
      event: PropTypes.shape({
        description: PropTypes.string,
      }).isRequired,
    }
  }

  render () {
    return <p>{this.props.event.description}</p>
  }
}
