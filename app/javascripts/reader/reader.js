import React from 'react'
import LogDisplay from './log-display'
import TextDisplay from './text-display'
import Description from './description'

export class Reader extends React.Component {
  render () {
    const state = this.props.state
    const log = state.log
    const room = state['current-room']

    return (
      <div>
        <LogDisplay
          title='Game Log'
          history={log.history}
          verbs={log.currentVerbs}
          onVerb={this.props.onVerb}
        />

        <TextDisplay
          title={room.name}
          verbs={room.verbs}
          onVerb={this.props.onVerb}
        >
          <Description description={room.description} />
        </TextDisplay>
      </div>
    )
  }
}
