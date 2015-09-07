/* eslint no-var: 0 */
require('babel/polyfill')

var context = require.context('./test', true, /-test\.js$/)
context.keys().forEach(context)
