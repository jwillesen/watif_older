require('file?name=[name].[ext]!index.html')
require('bootstrap/dist/css/bootstrap.css')
require('imports?jQuery=jquery!bootstrap/dist/js/bootstrap.js')

import React from 'react'

document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <div className='container'>
      <h1>Hello World!</h1>
    </div>,
    document.body)
})
