import App from 'app'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import jailed from 'jailed'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App value={42} />, document.getElementById('app'))

  const path = `${window.location.origin}/js/universe.js`
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

  // intentionally keep a reference to the plugin around so it won't get garbage collected
  window.__universe__ = plugin
})
