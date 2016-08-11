/* globals application WatifStory */

application.setInterface({
  startStory,
})

function startStory (storyCode) {
  // console.log(storyCode)
  console.log('start story')
  eval.call(this, storyCode) // eslint-disable-line no-eval
  console.log('story var: ', WatifStory)
  application.remote.storyStarted()
  // universe = new Universe({
  //   story: WatifStory,
  // })
}
