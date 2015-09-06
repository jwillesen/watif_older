import React from 'react'
import TextDisplay from './text-display'

export class Reader extends React.Component {
  render () {
    const state = this.props.state
    return (
      <div>
        <TextDisplay
          title='Game Log'
          text={state.log.text}
          verbs={state.log.verbs}
        />
      </div>
    )
  }
}
