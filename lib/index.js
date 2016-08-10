import App from 'app'
import React from 'react'
import ReactDOM from 'react-dom'
// import axios from 'axios'
import jailed from 'jailed'

document.addEventListener('DOMContentLoaded', () => {
  // axios.get('stories/house-sitting.js')
  //   .then(response => console.log(response))
  ReactDOM.render(<App value={42} />, document.getElementById('app'))

  // const path = '/stories/house-sitting.js'
  const path = `${window.location.origin}/js/universe.js`
  const plugin = new jailed.Plugin(path, {
    log: (arg) => {
      console.log(arg)
    },
  })

  // intentionally keep a reference to the plugin around so it won't get garbage collected
  window.__universe__ = plugin
})
