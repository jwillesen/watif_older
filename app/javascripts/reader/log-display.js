import React, {PropTypes} from 'react'
import TextDisplay from './text-display'
import EventLog from './event-log'
import CommandLog from './command-log'

export default class LogDisplay extends React.Component
{
  static get propTypes () {
    // also accepts TextDisplay properties
    return {
      history: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['event', 'command']),
        payload: PropTypes.object,
      })),
    }
  }

  static get defaultProps () {
    return {history: []}
  }

  renderEventHistory (history, index) {
    return <EventLog event={history.payload} key={index} />
  }

  renderCommandHistory (history, index) {
    return <CommandLog command={history.payload} key={index} />
  }

  renderHistoryElement (history, index) {
    const historyRenderers = {
      event: this.renderEventHistory,
      command: this.renderCommandHistory,
    }
    return historyRenderers[history.type].call(this, history, index)
  }

  renderHistory () {
    return this.props.history.map(this.renderHistoryElement, this)
  }

  render () {
    return (
      <TextDisplay {...this.props}>
        {this.renderHistory()}
      </TextDisplay>
    )
  }
}
