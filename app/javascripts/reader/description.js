import React, {PropTypes} from 'react'
import ItemLink from './item-link'
import {
  parseContent,
  PARAGRAPH_ELEMENT_TYPE, TEXT_ELEMENT_TYPE, OBJECT_REFERENCE_ELEMENT_TYPE,
} from 'watif/content-parser'

function noop () {}

export default class Description extends React.Component {
  constructor () {
    super()
    this.renderers = {
      [PARAGRAPH_ELEMENT_TYPE]: this.renderParagraph.bind(this),
      [TEXT_ELEMENT_TYPE]: this.renderText.bind(this),
      [OBJECT_REFERENCE_ELEMENT_TYPE]: this.renderObjectReference.bind(this),
    }
  }

  static get propTypes () {
    return {
      description: PropTypes.string,
      onObjectReferenceSelected: PropTypes.func,
    }
  }

  static get defaultProps () {
    return {
      description: '',
      onObjectReferenceSelected: noop,
    }
  }

  renderParagraph (paragraph, index) {
    return <div className='text-display__paragraph' key={index}>{this.renderContent(paragraph.payload)}</div>
  }

  renderText (text, index) {
    return <span className='text-display__text' key={index}>{text.payload}</span>
  }

  renderObjectReference (obj, index) {
    return (<ItemLink
      item={obj.payload}
      key={index}
      className='text-display__item-link'
      onActivate={item => this.props.onObjectReferenceSelected(item.id)}
    />)
  }

  renderItem (item, index) {
    return this.renderers[item.type](item, index)
  }

  renderContent (contentItems) {
    return contentItems.map(this.renderItem.bind(this))
  }

  render () {
    const contentItems = parseContent(this.props.description)
    return <div>{this.renderContent(contentItems)}</div>
  }
}
