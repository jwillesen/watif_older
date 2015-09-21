import React, {PropTypes} from 'react'
import LogDisplay from './log-display'
import TextDisplay from './text-display'
import Description from './description'

require('./reader.scss')

export class Reader extends React.Component {
  static get propTypes () {
    return {
      state: PropTypes.shape({
        log: PropTypes.shape({
          history: PropTypes.arrayOf(PropTypes.object),
          verbs: PropTypes.arrayOf(PropTypes.object),
        }),
        'current-room': PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          verbs: PropTypes.arrayOf(PropTypes.object),
        }),
        'current-item': PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          verbs: PropTypes.arrayOf(PropTypes.object),
        }),
      }),
      onVerb: PropTypes.func,
      onObjectReferenceSelected: PropTypes.func,
    }
  }

  render () {
    const state = this.props.state
    const log = state.log
    const room = state['current-room']
    const item = state['current-item']

    return (
      <div className='reader'>
        <div className='reader__section'>
          <LogDisplay
            title='Game Log'
            history={log.history}
            verbs={log.currentVerbs}
            onVerb={this.props.onVerb}
          />
        </div>

        <div className='reader__section'>
          <TextDisplay
            title={room.name}
            verbs={room.verbs}
            onVerb={this.props.onVerb}
          >
            <Description description={room.description} onObjectReferenceSelected={this.props.onObjectReferenceSelected} />
          </TextDisplay>
        </div>

        <div className='reader__section'>
          <TextDisplay
            title={item.name}
            verbs={item.verbs}
            onVerb={this.props.onVerb}
          >
            <Description description={item.description} onObjectReferenceSelected={this.props.onObjectReferenceSelected} />
          </TextDisplay>
        </div>
      </div>
    )
  }
}
