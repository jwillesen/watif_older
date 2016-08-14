import App from 'app'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import jailed from 'jailed'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App value={42} />, document.getElementById('app'))

  const path = `${window.location.origin}/js/universe-bundle.js`
  const plugin = new jailed.Plugin(path, {
    storyStarted: () => console.log('story started'),
  })
  plugin.whenConnected(startStory)

  function startStory () {
    axios.get('/stories/house-sitting.js')
    .then((response) => {
      const storyCode = response.data
      plugin.remote.startStory(storyCode)
    })
  }

  // so the worker won't get garbage collected
  window.__watif_universe__ = plugin
})
