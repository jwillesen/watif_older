import React from 'react'
import {connect} from 'react-redux'
import {Reader} from 'reader'

class App extends React.Component {
  render () {
    const state = this.props.state
    return (
      <div className='container'>
        <h1>Watif Reader</h1>
        <Reader state={state.reader} />
      </div>
    )
  }
}

const ConnectedApp = connect(
  (state) => ({state})
)(App)

export default ConnectedApp
