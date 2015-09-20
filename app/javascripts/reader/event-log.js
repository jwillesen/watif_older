import React, {PropTypes} from 'react'
import Description from './description'

export default class EventLog extends React.Component {
  static get propTypes () {
    return {
      event: PropTypes.shape({
        description: PropTypes.string,
      }).isRequired,
    }
  }

  render () {
    return <Description description={this.props.event.description} />
  }
}
