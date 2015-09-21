import React, {PropTypes} from 'react'
import TweenLite from 'gsap/TweenLite'
require('gsap/ScrollToPlugin')

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

  componentDidUpdate () {
    const bodyElement = React.findDOMNode(this.refs.display.refs.body)
    const lastLogElement = bodyElement.lastChild

    const maxScrollTop = bodyElement.scrollHeight - bodyElement.clientHeight
    const extraPadding = 10 // tends to scroll too far without this for some reason
    const desiredScrollTop = bodyElement.scrollHeight -
      lastLogElement.clientHeight - extraPadding
    const targetTop = Math.min(maxScrollTop, desiredScrollTop)

    TweenLite.to(bodyElement, 1, {scrollTo: targetTop, ease: Power2.easeOut}) // eslint-disable-line no-undef
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
      <TextDisplay ref='display' {...this.props}>
        {this.renderHistory()}
      </TextDisplay>
    )
  }
}
