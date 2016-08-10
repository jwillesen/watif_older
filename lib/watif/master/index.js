/* globals application */

// import axios from 'axios'
// import Universe from './universe'

application.setInterface({
  doLog: function () { application.remote.log('worker doLog!') },
  doAlert: function () { application.remote.alert('worker doAlert!') },
})

application.whenConnected(() => {
  application.remote.log('worker whenConnected!')
})

// axios.get('/stories/house-sitting.js')
// .then((response) => {
//   if (response.status !== 200) {
//     console.log(response)
//     return // TODO: better error handling here
//   }
//   const storyJsString = response.data
//   eval(storyJsString) // eslint-disable-line no-eval
//   console.log(HouseSitting)
  // universe = new Universe()
// })
