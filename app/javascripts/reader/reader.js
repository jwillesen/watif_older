import React from 'react'
import TextDisplay from './text-display'

export class Reader extends React.Component {
  handleVerb (verb) {
    console.log('verb: ', verb)
  }

  render () {
    const state = this.props.state
    return (
      <div>
        <TextDisplay
          title='Game Log'
          text={state.log.text}
          verbs={state.log.verbs}
          onVerb={this.handleVerb.bind(this)}
        />
      </div>
    )
  }
}
