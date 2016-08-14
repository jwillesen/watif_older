/* eslint no-var: "off" */
// Dark magic that requires all spec files

self.TESTING = true

var testsContext = require.context('.', true, /spec\.js$/)
testsContext.keys().forEach(testsContext)
