import React from 'react'
import LogDisplay from './log-display'

export class Reader extends React.Component {
  render () {
    const state = this.props.state
    const log = state.log
    return (
      <div>
        <LogDisplay
          title='Game Log'
          history={log.history}
          verbs={log.currentVerbs}
          onVerb={this.props.onVerb}
        />
      </div>
    )
  }
}
