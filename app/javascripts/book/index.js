export default [
  require('./introduction'),
  require('./front-porch'),
].reduce((a, b) => a.concat(b))
