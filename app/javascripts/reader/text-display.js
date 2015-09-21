import React, {PropTypes} from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'

require('./text-display.scss')

export default class TextDisplay extends React.Component {
  static get propTypes () {
    return {
      title: PropTypes.string,
      verbs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
      onVerb: PropTypes.func,
    }
  }

  static get defaultProps () {
    return {
      title: null,
      text: [],
      verbs: [],
      onVerb: null,
    }
  }

  handleVerbClick (verb) {
    if (this.props.onVerb) this.props.onVerb(verb)
  }

  renderTitle () {
    return <div className='text-display__header'>{this.props.title}</div>
  }

  renderBody () {
    return <div ref='body' className='text-display__body'>{this.props.children}</div>
  }

  renderFooter () {
    return <div className='text-display__footer'>{this.renderVerbs()}</div>
  }

  renderVerbButtons () {
    return this.props.verbs.map((verb) => {
      return (
        <Button
          key={verb.name}
          onClick={() => this.handleVerbClick(verb)}
          bsStyle='primary'
          bsSize='xsmall'>
          {verb.name}
        </Button>
      )
    })
  }

  renderVerbs () {
    const buttons = this.renderVerbButtons()
    return <ButtonToolbar>{buttons}</ButtonToolbar>
  }

  render () {
    return (<div className='text-display'>
      {this.renderTitle()}
      {this.renderBody()}
      {this.renderFooter()}
    </div>)
  }
}
