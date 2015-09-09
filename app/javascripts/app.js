import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Reader, actions} from 'reader'

class App extends React.Component {
  static get propTypes () {
    return {
      executor: PropTypes.object.isRequired,
    }
  }

  handleVerb (verb) {
    this.props.verbCommand(verb)
    if (this.props.executor) {
      this.props.executor.executeVerb(verb)
    }
  }

  render () {
    const state = this.props.state
    return (
      <div className='container'>
        <h1>Watif Reader</h1>
        <Reader state={state.reader} onVerb={this.handleVerb.bind(this)} />
      </div>
    )
  }
}

const ConnectedApp = connect(
  (state) => ({state}),
  actions
)(App)

export default ConnectedApp
