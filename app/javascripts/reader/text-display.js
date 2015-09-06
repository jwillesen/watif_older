import React, {PropTypes} from 'react'
import {Button, ButtonToolbar, Panel} from 'react-bootstrap'

export default class TextDisplay extends React.Component {
  static get propTypes () {
    return {
      title: PropTypes.string,
      text: PropTypes.string,
      verbs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        action: PropTypes.shape({
          type: PropTypes.string,
        }),
      })),
    }
  }

  static get defaultProps () {
    return {
      title: null,
      text: '',
      verbs: [],
    }
  }

  handleVerbClicked (verb) {
    console.log('verb clicked: ', verb)
  }

  title () {
    if (this.props.title) return {header: <h2>{this.props.title}</h2>, bsStyle: 'info'}
    else return null
  }

  verbs () {
    const buttons = this.props.verbs.map((verb) => {
      return (<Button
        key={verb.action.type}
        onClick={() => this.handleVerbClicked(verb)}
        bsStyle='primary'
        bsSize='xsmall'>
          {verb.label}
        </Button>)
    })
    return {footer: <ButtonToolbar>{buttons}</ButtonToolbar>}
  }

  render () {
    const panelProps = {...this.title(), ...this.verbs()}
    return <Panel {...panelProps}>{this.props.text}</Panel>
  }
}
